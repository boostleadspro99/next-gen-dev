import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  Activity, 
  Search, 
  MoreVertical, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter,
  LogOut,
  ShieldAlert,
  CheckCircle2,
  Clock,
  X,
  Mail,
  Lock,
  Building2,
  User,
  Loader2,
  Edit2,
  Calendar,
  FileText,
  AlertTriangle,
  Save,
  Check,
  RefreshCw
} from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import FadeIn from '../components/FadeIn';
import { getAllClients, updateClientSubscription, getInvoicesByClient, createInvoice, updateInvoiceStatus } from '../services/firestore';
import type { ClientData, PlanType, SubscriptionStatus, SetupFeeStatus, InvoiceData, InvoiceType } from '../types/db';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<ClientData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Modal State
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({ show: false, message: '', type: 'success' });

  useEffect(() => {
      const fetchClients = async () => {
          setIsLoading(true);
          try {
              const data = await getAllClients();
              setClients(data);
          } catch (error) {
              console.error("Error fetching clients:", error);
          } finally {
              setIsLoading(false);
          }
      };
      fetchClients();
  }, [refreshTrigger]);

  const handleEditClick = (client: ClientData) => {
      setSelectedClient(client);
      setIsEditModalOpen(true);
  };

  const handleUpdateSuccess = (msg: string = 'Client mis à jour avec succès.') => {
      setRefreshTrigger(prev => prev + 1); // Reload data
      setIsEditModalOpen(false);
      setNotification({ show: true, type: 'success', message: msg });
      setTimeout(() => setNotification(prev => ({...prev, show: false})), 4000);
  };

  if (isLoading && clients.length === 0) {
      return (
          <div className="min-h-screen bg-[#050505] flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
          </div>
      );
  }

  // Filter clients
  const filteredClients = clients.filter(c => 
    (c.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.phone || '').includes(searchTerm)
  );

  return (
    // THÈME SOMBRE : #050505
    <section className="pt-28 pb-12 px-6 min-h-screen bg-[#050505] relative text-neutral-200">
      
      {/* Toast Notification */}
      {notification.show && (
        <div className="fixed top-24 right-6 z-50 max-w-md w-full animate-fade-in-up">
            <div className="bg-[#0A0A0A] border border-emerald-500/30 text-white p-4 rounded-xl shadow-2xl flex gap-4 items-start shadow-emerald-500/10">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                    <CheckCircle2 size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-sm mb-1 text-emerald-400">Notification</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">{notification.message}</p>
                </div>
                <button onClick={() => setNotification(prev => ({...prev, show: false}))} className="text-neutral-500 hover:text-white ml-auto">
                    <X size={16} />
                </button>
            </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <FadeIn>
            <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-bold uppercase tracking-wider">
                    Admin
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Administration NexGen</h1>
            </div>
            <p className="text-neutral-400 mt-1 ml-1">Vue d'ensemble de la flotte de sites clients.</p>
          </FadeIn>
          
          <FadeIn delay={100} className="flex gap-3">
             <button onClick={() => logout()} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-neutral-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors flex items-center gap-2 shadow-sm">
                <LogOut size={16} />
             </button>
          </FadeIn>
        </div>

        {/* KPI Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
            <KpiCard 
                title="MRR (Revenu Récurrent)" 
                value={`${clients.reduce((acc, curr) => acc + (curr.subscriptionStatus === 'active' ? (curr.plan === 'business' ? 399 : curr.plan === 'presence' ? 199 : 249) : 0), 0).toLocaleString()} MAD`} 
                trend="Mensuel" 
                isPositive 
                icon={<CreditCard size={20} />} 
                delay={0}
            />
            <KpiCard 
                title="Clients Actifs" 
                value={clients.filter(c => c.subscriptionStatus === 'active').length.toString()} 
                trend="Total" 
                isPositive 
                icon={<Users size={20} />} 
                delay={100}
            />
            <KpiCard 
                title="En période d'essai" 
                value={clients.filter(c => c.subscriptionStatus === 'trial').length.toString()} 
                trend="Prospects" 
                isPositive 
                icon={<Clock size={20} />} 
                delay={200}
            />
            <KpiCard 
                title="Retards Paiement" 
                value={clients.filter(c => c.subscriptionStatus === 'past_due').length.toString()} 
                trend="Action requise" 
                isPositive={false} 
                icon={<ShieldAlert size={20} />} 
                delay={300}
            />
        </div>

        {/* Client Management Table */}
        <FadeIn delay={400}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Table Header / Toolbar */}
                <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A0A0A]">
                    <h2 className="font-semibold text-white flex items-center gap-2">
                        Liste des Clients 
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 text-xs font-bold">{clients.length}</span>
                    </h2>
                    
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                            <input 
                                type="text" 
                                placeholder="Rechercher nom, email..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full sm:w-64 placeholder:text-neutral-600 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/[0.02] text-neutral-400 font-medium border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Client / Société</th>
                                <th className="px-6 py-4">Forfait</th>
                                <th className="px-6 py-4">Statut Abo.</th>
                                <th className="px-6 py-4">Frais Setup</th>
                                <th className="px-6 py-4">Prochaine Échéance</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-neutral-300">
                            {filteredClients.length > 0 ? filteredClients.map((client) => (
                                <ClientRow 
                                    key={client.uid}
                                    client={client}
                                    onEdit={() => handleEditClick(client)}
                                />
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                                        Aucun client trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </FadeIn>
      </div>

      {/* EDIT MODAL */}
      {isEditModalOpen && selectedClient && (
          <ClientEditModal 
            client={selectedClient} 
            onClose={() => setIsEditModalOpen(false)} 
            onSuccess={handleUpdateSuccess} 
          />
      )}

    </section>
  );
};

/* --- SUB COMPONENTS --- */

const KpiCard = ({ title, value, trend, isPositive, icon, delay }: any) => (
    <FadeIn delay={delay}>
        <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-xl hover:bg-white/[0.02] transition-all group shadow-2xl">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/5 rounded-lg text-neutral-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {trend}
                </div>
            </div>
            <div className="text-neutral-500 text-xs font-medium uppercase tracking-wide mb-1">{title}</div>
            <div className="text-2xl font-bold text-white">{value}</div>
        </div>
    </FadeIn>
);

const ClientRow: React.FC<{ client: ClientData, onEdit: () => void }> = ({ client, onEdit }) => {
    
    const getPlanBadge = (p: string) => {
        const pl = p.toLowerCase();
        if (pl === 'business') return <span className="px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase">Business</span>
        if (pl === 'boost') return <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">Boost</span>
        return <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-neutral-400 text-[10px] font-bold uppercase">Presence</span>
    }

    const getStatusBadge = (s: string) => {
        if (s === 'active') return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase"><CheckCircle2 size={10}/> Actif</span>
        if (s === 'trial') return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase"><Clock size={10}/> Essai</span>
        if (s === 'past_due') return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase"><ShieldAlert size={10}/> Retard</span>
        return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-800 text-neutral-500 border border-neutral-700 text-[10px] font-bold uppercase">Annulé</span>
    }

    const getFeeStatus = (s: string) => {
        if (s === 'paid') return <span className="text-emerald-500 text-xs font-bold">Payé</span>
        return <span className="text-neutral-500 text-xs">Impayé</span>
    }

    // Date formatting helper safely handles Timestamp or null
    const formatDate = (ts: any) => {
        if (!ts) return '-';
        return new Date(ts.seconds * 1000).toLocaleDateString();
    }

    return (
        <tr className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0 cursor-pointer" onClick={onEdit}>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-neutral-300 uppercase">
                        {(client.companyName || 'C').charAt(0)}
                    </div>
                    <div>
                        <div className="font-medium text-white text-sm">{client.companyName}</div>
                        <div className="text-xs text-neutral-500">{client.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                {getPlanBadge(client.plan)}
            </td>
            <td className="px-6 py-4">
                {getStatusBadge(client.subscriptionStatus)}
            </td>
            <td className="px-6 py-4">
                {getFeeStatus(client.setupFeeStatus)}
            </td>
            <td className="px-6 py-4 text-neutral-400 text-xs">
                {formatDate(client.nextBillingDate)}
            </td>
            <td className="px-6 py-4 text-right">
                <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-2 hover:bg-white/10 rounded text-neutral-500 hover:text-white transition-colors">
                    <Edit2 size={16} />
                </button>
            </td>
        </tr>
    )
}

/* --- EDIT MODAL COMPONENT --- */

const ClientEditModal = ({ client, onClose, onSuccess }: { client: ClientData, onClose: () => void, onSuccess: (msg: string) => void }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'invoices'>('info');
    
    // --- INFO TAB STATE ---
    const [formData, setFormData] = useState({
        plan: client.plan,
        subscriptionStatus: client.subscriptionStatus,
        setupFeeStatus: client.setupFeeStatus,
        nextBillingDate: client.nextBillingDate ? new Date(client.nextBillingDate.seconds * 1000).toISOString().split('T')[0] : '',
        notes: client.notes || ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // --- INVOICES TAB STATE ---
    const [invoices, setInvoices] = useState<InvoiceData[]>([]);
    const [isLoadingInvoices, setIsLoadingInvoices] = useState(false);
    const [newInvoice, setNewInvoice] = useState<{type: InvoiceType, amount: number, period: string}>({
        type: 'monthly',
        amount: client.plan === 'business' ? 399 : client.plan === 'presence' ? 199 : 249, // Auto-set based on plan
        period: new Date().toISOString().slice(0, 7) // YYYY-MM
    });

    useEffect(() => {
        if (activeTab === 'invoices') {
            loadInvoices();
        }
    }, [activeTab]);

    const loadInvoices = async () => {
        setIsLoadingInvoices(true);
        try {
            const data = await getInvoicesByClient(client.uid);
            setInvoices(data);
        } catch(e) {
            console.error(e);
        } finally {
            setIsLoadingInvoices(false);
        }
    }

    const handleSubmitInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!showConfirm && (formData.subscriptionStatus === 'canceled' || formData.subscriptionStatus === 'past_due')) {
            setShowConfirm(true);
            return;
        }

        setIsSaving(true);
        try {
            let nextBillingTs = null;
            if (formData.nextBillingDate) {
                const d = new Date(formData.nextBillingDate);
                nextBillingTs = Timestamp.fromDate(d);
            }

            await updateClientSubscription(client.uid, {
                plan: formData.plan,
                subscriptionStatus: formData.subscriptionStatus,
                setupFeeStatus: formData.setupFeeStatus,
                notes: formData.notes,
                nextBillingDate: nextBillingTs as any,
                currentPeriodEnd: nextBillingTs as any
            }, client);

            onSuccess('Informations mises à jour.');
        } catch (error) {
            console.error("Update failed", error);
            setIsSaving(false);
        }
    };

    const handleCreateInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await createInvoice(client.uid, newInvoice.type, newInvoice.amount, newInvoice.period);
            await loadInvoices();
            setNewInvoice(prev => ({ ...prev, period: getNextMonth(prev.period) })); // Auto increment month
        } catch(e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    }

    const handleTogglePaid = async (inv: InvoiceData) => {
        const newStatus = inv.status === 'paid' ? 'unpaid' : 'paid';
        await updateInvoiceStatus(inv.id!, newStatus);
        await loadInvoices();
    }

    const getNextMonth = (currentPeriod: string) => {
        const [y, m] = currentPeriod.split('-').map(Number);
        const date = new Date(y, m, 1); // Month is 0-indexed in Date, but currentPeriod is 1-12. using m gives next month.
        return date.toISOString().slice(0, 7);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-[#0F0F0F] rounded-t-2xl">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Edit2 size={20} className="text-emerald-500" />
                                Gestion Client
                            </h3>
                            <p className="text-xs text-neutral-400 mt-1">{client.companyName} ({client.email})</p>
                        </div>
                        <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 border-b border-white/5 -mb-6">
                        <button 
                            onClick={() => setActiveTab('info')}
                            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'info' ? 'text-emerald-400 border-emerald-500' : 'text-neutral-500 border-transparent hover:text-white'}`}
                        >
                            Informations & Statut
                        </button>
                        <button 
                            onClick={() => setActiveTab('invoices')}
                            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'invoices' ? 'text-emerald-400 border-emerald-500' : 'text-neutral-500 border-transparent hover:text-white'}`}
                        >
                            Facturation
                        </button>
                    </div>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    
                    {/* --- TAB: INFO --- */}
                    {activeTab === 'info' && (
                        <form id="edit-form" onSubmit={handleSubmitInfo} className="space-y-6">
                            
                            <div className="grid grid-cols-2 gap-6">
                                {/* Plan */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Forfait</label>
                                    <div className="relative">
                                        <Building2 size={16} className="absolute left-3 top-3 text-neutral-500" />
                                        <select 
                                            className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none appearance-none"
                                            value={formData.plan}
                                            onChange={e => setFormData({...formData, plan: e.target.value as PlanType})}
                                        >
                                            <option value="presence">Présence (199 MAD)</option>
                                            <option value="boost">Boost (249 MAD)</option>
                                            <option value="business">Business (399 MAD)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Statut Abonnement</label>
                                    <div className="relative">
                                        <Activity size={16} className="absolute left-3 top-3 text-neutral-500" />
                                        <select 
                                            className={`w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none appearance-none font-bold ${
                                                formData.subscriptionStatus === 'active' ? 'text-emerald-400' : 
                                                formData.subscriptionStatus === 'past_due' ? 'text-red-400' : 
                                                formData.subscriptionStatus === 'trial' ? 'text-orange-400' : 'text-neutral-400'
                                            }`}
                                            value={formData.subscriptionStatus}
                                            onChange={e => setFormData({...formData, subscriptionStatus: e.target.value as SubscriptionStatus})}
                                        >
                                            <option value="trial">Essai (Trial)</option>
                                            <option value="active">Actif (Payé)</option>
                                            <option value="past_due">Retard (Past Due)</option>
                                            <option value="canceled">Annulé / Suspendu</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Setup Fee */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Frais de mise en place</label>
                                    <div className="relative">
                                        <CreditCard size={16} className="absolute left-3 top-3 text-neutral-500" />
                                        <select 
                                            className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none appearance-none"
                                            value={formData.setupFeeStatus}
                                            onChange={e => setFormData({...formData, setupFeeStatus: e.target.value as SetupFeeStatus})}
                                        >
                                            <option value="unpaid">Impayé</option>
                                            <option value="paid">Payé</option>
                                            <option value="pending">En attente</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Next Billing Date */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Prochaine Échéance</label>
                                    <div className="relative">
                                        <Calendar size={16} className="absolute left-3 top-3 text-neutral-500" />
                                        <input 
                                            type="date" 
                                            className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none appearance-none"
                                            value={formData.nextBillingDate}
                                            onChange={e => setFormData({...formData, nextBillingDate: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Admin Notes */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Notes Internes (Admin)</label>
                                <div className="relative">
                                    <FileText size={16} className="absolute left-3 top-3 text-neutral-500" />
                                    <textarea 
                                        rows={4}
                                        className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-neutral-700 resize-none"
                                        placeholder="Notes sur le client, historique de paiement, etc..."
                                        value={formData.notes}
                                        onChange={e => setFormData({...formData, notes: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Warning Block */}
                            {showConfirm && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 animate-fade-in-up">
                                    <AlertTriangle size={24} className="text-red-500 shrink-0" />
                                    <div>
                                        <h4 className="text-red-400 font-bold text-sm">Confirmation Requise</h4>
                                        <p className="text-red-200/70 text-xs mt-1">
                                            Vous allez changer le statut en <span className="uppercase font-bold">{formData.subscriptionStatus}</span>. 
                                            Cela impactera immédiatement l'accès du client à son tableau de bord. Êtes-vous sûr ?
                                        </p>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}

                    {/* --- TAB: INVOICES --- */}
                    {activeTab === 'invoices' && (
                        <div className="space-y-8">
                            {/* Create Invoice Form */}
                            <form onSubmit={handleCreateInvoice} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Plus size={16} className="text-emerald-500" />
                                    Créer une facture
                                </h4>
                                <div className="grid grid-cols-3 gap-3">
                                    <select 
                                        className="bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                                        value={newInvoice.type}
                                        onChange={e => setNewInvoice({...newInvoice, type: e.target.value as InvoiceType})}
                                    >
                                        <option value="monthly">Mensuelle</option>
                                        <option value="setup">Frais Setup</option>
                                        <option value="extra">Extra</option>
                                    </select>
                                    <input 
                                        type="number" 
                                        placeholder="Montant MAD"
                                        className="bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                                        value={newInvoice.amount}
                                        onChange={e => setNewInvoice({...newInvoice, amount: parseFloat(e.target.value)})}
                                    />
                                    <input 
                                        type="month" 
                                        className="bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                                        value={newInvoice.period}
                                        onChange={e => setNewInvoice({...newInvoice, period: e.target.value})}
                                    />
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <button 
                                        type="button" 
                                        className="text-xs text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
                                        onClick={() => setNewInvoice(prev => ({...prev, period: getNextMonth(prev.period)}))}
                                    >
                                        <RefreshCw size={12} /> Mois suivant
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors"
                                    >
                                        Générer
                                    </button>
                                </div>
                            </form>

                            {/* Invoices List */}
                            <div className="space-y-3">
                                {isLoadingInvoices ? (
                                    <div className="text-center py-4"><Loader2 className="animate-spin mx-auto text-emerald-500" size={20} /></div>
                                ) : invoices.length > 0 ? (
                                    invoices.map(inv => (
                                        <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                                            <div>
                                                <div className="text-sm font-bold text-white capitalize">{inv.type === 'setup' ? 'Frais Setup' : inv.type === 'monthly' ? 'Abonnement Mensuel' : 'Extra'}</div>
                                                <div className="text-xs text-neutral-500">{inv.period} • {new Date(inv.createdAt.seconds * 1000).toLocaleDateString()}</div>
                                            </div>
                                            <div className="text-right flex items-center gap-4">
                                                <div className="text-sm font-bold text-white">{inv.amountMAD} MAD</div>
                                                <button 
                                                    onClick={() => handleTogglePaid(inv)}
                                                    className={`px-3 py-1 rounded text-[10px] font-bold uppercase border transition-colors ${
                                                        inv.status === 'paid' 
                                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30' 
                                                        : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30'
                                                    }`}
                                                >
                                                    {inv.status === 'paid' ? 'Payé' : 'Impayé'}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-xs text-neutral-500 py-4">Aucune facture.</div>
                                )}
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Actions (Only for Info Tab) */}
                {activeTab === 'info' && (
                    <div className="p-6 border-t border-white/10 bg-[#0F0F0F] rounded-b-2xl flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg border border-white/10 text-neutral-400 font-medium hover:bg-white/5 hover:text-white transition-colors text-sm"
                        >
                            Annuler
                        </button>
                        <button 
                            type="submit" 
                            form="edit-form"
                            disabled={isSaving}
                            className={`px-5 py-2.5 rounded-lg font-bold text-white transition-colors text-sm flex items-center gap-2 ${
                                showConfirm ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/20'
                            }`}
                        >
                            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            {showConfirm ? 'Confirmer la modification' : 'Enregistrer'}
                        </button>
                    </div>
                )}
                {activeTab === 'invoices' && (
                     <div className="p-4 border-t border-white/10 bg-[#0F0F0F] rounded-b-2xl flex justify-end">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg border border-white/10 text-neutral-400 font-medium hover:bg-white/5 hover:text-white transition-colors text-sm"
                        >
                            Fermer
                        </button>
                     </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
