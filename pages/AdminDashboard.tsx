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
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import { getAllClients } from '../services/firestore';
import type { ClientData } from '../types/db';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<ClientData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({ show: false, message: '', type: 'success' });
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    plan: 'Presence'
  });

  useEffect(() => {
      const fetchClients = async () => {
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
  }, []);

  const generateTempPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let pass = "";
    for (let i = 0; i < 12; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // NOTE: In a real app, this would call a Cloud Function to create a user.
    // Client-side SDK cannot create another user without logging out the admin.
    setTimeout(() => {
        setIsSubmitting(false);
        setIsModalOpen(false);
        setNotification({
            show: true,
            type: 'error',
            message: "La création de compte admin nécessite une Cloud Function (non implémentée)."
        });
        setTimeout(() => setNotification(prev => ({...prev, show: false})), 5000);
    }, 1000);
  };

  if (isLoading) {
      return (
          <div className="min-h-screen bg-[#050505] flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
          </div>
      );
  }

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
             <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
             >
                <Plus size={18} />
                Ajouter un client
             </button>
             <button onClick={() => logout()} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-neutral-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors flex items-center gap-2 shadow-sm">
                <LogOut size={16} />
             </button>
          </FadeIn>
        </div>

        {/* KPI Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
            <KpiCard 
                title="MRR (Revenu Récurrent)" 
                value={`${clients.reduce((acc, curr) => acc + (curr.plan === 'business' ? 399 : curr.plan === 'presence' ? 199 : 249), 0).toLocaleString()} MAD`} 
                trend="Mensuel" 
                isPositive 
                icon={<CreditCard size={20} />} 
                delay={0}
            />
            <KpiCard 
                title="Clients Actifs" 
                value={clients.length.toString()} 
                trend="Total" 
                isPositive 
                icon={<Users size={20} />} 
                delay={100}
            />
            <KpiCard 
                title="Taux d'impayés" 
                value="0%" 
                trend="Stable" 
                isPositive 
                icon={<ShieldAlert size={20} />} 
                delay={200}
            />
            <KpiCard 
                title="Tickets Ouverts" 
                value="0" 
                trend="Stable" 
                isPositive={false} 
                icon={<Activity size={20} />} 
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
                                placeholder="Rechercher..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full sm:w-64 placeholder:text-neutral-600 transition-all"
                            />
                        </div>
                        <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/[0.02] text-neutral-400 font-medium border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Client / Société</th>
                                <th className="px-6 py-4">Offre</th>
                                <th className="px-6 py-4">État Site</th>
                                <th className="px-6 py-4">Facturation</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-neutral-300">
                            {clients.length > 0 ? clients.filter(c => 
                                (c.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                                (c.email || '').toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((client) => (
                                <ClientRow 
                                    key={client.uid}
                                    name={client.companyName} 
                                    company={client.email} // Using Email as secondary line for admin
                                    plan={client.plan} 
                                    // Note: In real app, siteStatus would come from ProjectData, simplified here for checklist
                                    siteStatus="online" 
                                    billingStatus={client.subscriptionStatus}
                                    amount={client.plan === 'business' ? '399 MAD' : client.plan === 'presence' ? '199 MAD' : '249 MAD'}
                                />
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
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

      {/* CREATE CLIENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-lg relative z-10 shadow-2xl animate-fade-in-up">
                
                <div className="p-6 border-b border-white/10 flex justify-between items-center rounded-t-2xl">
                    <h3 className="text-xl font-bold text-white">Ajouter un nouveau client</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleCreateClient} className="p-6 space-y-5">
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Prénom</label>
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-3 text-neutral-500" />
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-neutral-600 transition-colors"
                                    placeholder="Jean"
                                    value={formData.firstName}
                                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Nom</label>
                            <input 
                                type="text" 
                                required
                                className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-neutral-600 transition-colors"
                                placeholder="Dupont"
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Société</label>
                        <div className="relative">
                            <Building2 size={16} className="absolute left-3 top-3 text-neutral-500" />
                            <input 
                                type="text" 
                                required
                                className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-neutral-600 transition-colors"
                                placeholder="Nom de l'entreprise"
                                value={formData.company}
                                onChange={e => setFormData({...formData, company: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Email (Identifiant)</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-3 text-neutral-500" />
                            <input 
                                type="email" 
                                required
                                className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-neutral-600 transition-colors"
                                placeholder="contact@entreprise.com"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-1">Le client recevra son mot de passe provisoire sur cette adresse.</p>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Forfait Choisi</label>
                        <select 
                            className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer"
                            value={formData.plan}
                            onChange={e => setFormData({...formData, plan: e.target.value})}
                        >
                            <option value="Presence">Présence (199 MAD/mois)</option>
                            <option value="Boost">Boost (249 MAD/mois)</option>
                            <option value="Business">Business (399 MAD/mois)</option>
                        </select>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3 rounded-lg border border-white/10 text-neutral-400 font-medium hover:bg-white/5 hover:text-white transition-colors"
                        >
                            Annuler
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-1 py-3 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        >
                            {isSubmitting ? (
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <Lock size={16} />
                                    Créer & Envoyer
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
      )}

    </section>
  );
};

const KpiCard = ({ title, value, trend, isPositive, icon, delay }: { title: string, value: string, trend: string, isPositive: boolean, icon: React.ReactNode, delay: number }) => (
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

const ClientRow = ({ name, company, email, plan, siteStatus, billingStatus, amount }: any) => {
    
    const getPlanBadge = (p: string) => {
        const pl = p.toLowerCase();
        if (pl === 'business') return <span className="px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase">Business</span>
        if (pl === 'boost') return <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">Boost</span>
        return <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-neutral-400 text-[10px] font-bold uppercase">Presence</span>
    }

    const getSiteStatus = (s: string) => {
        if (s === 'online') return <div className="flex items-center gap-2 text-xs text-emerald-500 font-medium"><CheckCircle2 size={14}/> En ligne</div>
        if (s === 'maintenance') return <div className="flex items-center gap-2 text-xs text-orange-400 font-medium"><Clock size={14}/> Maintenance</div>
        return <div className="flex items-center gap-2 text-xs text-red-400 font-medium"><ShieldAlert size={14}/> Hors ligne</div>
    }

    const getBillingStatus = (s: string) => {
        if (s === 'paid' || s === 'active' || s === 'trial') return <span className="text-neutral-500 text-xs">À jour</span>
        if (s === 'late' || s === 'past_due') return <span className="text-red-400 font-bold text-xs">Retard</span>
        return <span className="text-neutral-600 text-xs">Annulé</span>
    }

    return (
        <tr className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-neutral-300 uppercase">
                        {(name || 'C').charAt(0)}
                    </div>
                    <div>
                        <div className="font-medium text-white text-sm">{name}</div>
                        <div className="text-xs text-neutral-500">{company}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                {getPlanBadge(plan)}
            </td>
            <td className="px-6 py-4">
                {getSiteStatus(siteStatus)}
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-col">
                    <span className="text-white font-medium text-sm">{amount}</span>
                    {getBillingStatus(billingStatus)}
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <button className="p-1.5 hover:bg-white/10 rounded text-neutral-500 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                </button>
            </td>
        </tr>
    )
}

export default AdminDashboard;
