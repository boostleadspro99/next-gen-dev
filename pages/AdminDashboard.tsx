import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, CreditCard, Activity, Search, LogOut, ShieldAlert, CheckCircle2, Clock, X, Mail,
  Loader2, Edit2, Calendar, FileText, AlertTriangle, Save, Plus, MessageSquare, Send, ArrowRight
} from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import FadeIn from '../components/FadeIn';
import { 
  getAllClients, 
  updateClientSubscription, 
  getInvoicesByClient, 
  createInvoice, 
  updateInvoiceStatus,
  getAllTickets,
  addTicketMessage,
  subscribeToTicketMessages,
  updateTicketStatus
} from '../services/firestore';
import type { 
  ClientData, PlanType, SubscriptionStatus, SetupFeeStatus, InvoiceData, InvoiceType, InvoiceStatus, TicketData, TicketMessageData 
} from '../types/db';
import { useAuth } from '../contexts/AuthContext';

// Combine ticket with client company name for easier display
type DisplayTicket = TicketData & { companyName?: string };

const AdminDashboard: React.FC = () => {
  const { logout, currentUser, isSuperAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<ClientData[]>([]);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Modal State
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<DisplayTicket | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [notification, setNotification] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({ show: false, message: '', type: 'success' });

  useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true);
          try {
              const [clientData, ticketData] = await Promise.all([
                  getAllClients(),
                  getAllTickets()
              ]);
              setClients(clientData);
              setTickets(ticketData);
          } catch (error) {
              console.error("Error fetching data:", error);
          } finally {
              setIsLoading(false);
          }
      };
      fetchData();
  }, [refreshTrigger]);

  const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

  const handleEditClientClick = (client: ClientData) => {
      setSelectedClient(client);
      setIsEditModalOpen(true);
  };
  
  const handleOpenChat = (ticket: DisplayTicket) => {
    setSelectedTicket(ticket);
    setIsChatModalOpen(true);
  };

  const handleUpdateSuccess = (msg: string = 'Données mises à jour.') => {
      handleRefresh();
      setIsEditModalOpen(false);
      setIsChatModalOpen(false);
      setNotification({ show: true, type: 'success', message: msg });
      setTimeout(() => setNotification(prev => ({...prev, show: false})), 4000);
  };

  const combinedTickets = useMemo(() => {
    const clientMap = new Map(clients.map(c => [c.uid, c.companyName]));
    return tickets.map(t => ({
      ...t,
      companyName: clientMap.get(t.clientId) || 'Client Inconnu'
    }));
  }, [tickets, clients]);

  const filteredClients = clients.filter(c => 
    (c.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTickets = combinedTickets.filter(t => 
    (t.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.companyName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading && clients.length === 0) {
      return (
          <div className="min-h-screen bg-[#050505] flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
          </div>
      );
  }

  return (
    <section className="pt-28 pb-12 px-6 min-h-screen bg-[#050505] relative text-neutral-200">
      
      {notification.show && (
        <div className="fixed top-24 right-6 z-[100] max-w-md w-full animate-fade-in-up">
            <div className="bg-[#0A0A0A] border border-emerald-500/30 text-white p-4 rounded-xl shadow-2xl flex gap-4 items-start shadow-emerald-500/10">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0"><CheckCircle2 size={20} /></div>
                <div>
                    <h4 className="font-bold text-sm mb-1 text-emerald-400">Notification</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">{notification.message}</p>
                </div>
                <button onClick={() => setNotification(prev => ({...prev, show: false}))} className="text-neutral-500 hover:text-white ml-auto"><X size={16} /></button>
            </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <FadeIn>
            <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-bold uppercase tracking-wider">Admin</div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Administration NexGen</h1>
            </div>
            <p className="text-neutral-400 mt-1 ml-1">Vue d'ensemble de la flotte et des tickets de support.</p>
          </FadeIn>
          <FadeIn delay={100} className="flex gap-3">
             <button onClick={() => logout()} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-neutral-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors flex items-center gap-2 shadow-sm"><LogOut size={16} /></button>
          </FadeIn>
        </div>

        {/* Client Management Table */}
        <FadeIn delay={400}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl mb-12">
                <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A0A0A]">
                    <h2 className="font-semibold text-white flex items-center gap-2">Liste des Clients <span className="px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 text-xs font-bold">{clients.length}</span></h2>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input type="text" placeholder="Rechercher client, ticket..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full sm:w-64 placeholder:text-neutral-600 transition-all" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/[0.02] text-neutral-400 font-medium border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Client / Société</th>
                                <th className="px-6 py-4">Forfait</th>
                                <th className="px-6 py-4">Statut Abo.</th>
                                <th className="px-6 py-4">Prochaine Échéance</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-neutral-300">
                            {filteredClients.length > 0 ? filteredClients.map((client) => (<ClientRow key={client.uid} client={client} onEdit={() => handleEditClientClick(client)}/>)) : (<tr><td colSpan={5} className="px-6 py-8 text-center text-neutral-500">Aucun client trouvé.</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </FadeIn>

        {/* Global Support Tickets Table */}
        <FadeIn delay={600}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0A0A0A]">
                    <h2 className="font-semibold text-white flex items-center gap-2">Tickets Support Globaux <span className="px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 text-xs font-bold">{tickets.length}</span></h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/[0.02] text-neutral-400 font-medium border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Sujet</th>
                                <th className="px-6 py-4">Priorité</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4">Dernière MàJ</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-neutral-300">
                            {filteredTickets.length > 0 ? filteredTickets.map((ticket) => (<TicketRow key={ticket.id} ticket={ticket} onOpen={() => handleOpenChat(ticket)} />)) : (<tr><td colSpan={6} className="px-6 py-8 text-center text-neutral-500">Aucun ticket trouvé.</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </FadeIn>

      </div>

      {isEditModalOpen && selectedClient && (<ClientEditModal client={selectedClient} onClose={() => setIsEditModalOpen(false)} onSuccess={handleUpdateSuccess} />)}
      {isChatModalOpen && selectedTicket && (<TicketChatModal ticket={selectedTicket} user={currentUser} isSuperAdmin={isSuperAdmin} onClose={() => setIsChatModalOpen(false)} onUpdate={handleRefresh} />)}

    </section>
  );
};


/* --- SUB COMPONENTS --- */

const ClientRow: React.FC<{ client: ClientData, onEdit: () => void }> = ({ client, onEdit }) => {
    const formatDate = (ts: any) => {
        if (!ts || !ts.seconds) return '-';
        return new Date(ts.seconds * 1000).toLocaleDateString();
    };
    const getPlanBadge = (p: string) => {
        if (p === 'business') return <span className="px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase">Business</span>;
        if (p === 'boost') return <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">Boost</span>;
        return <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-neutral-400 text-[10px] font-bold uppercase">Presence</span>;
    }
    const getStatusBadge = (s: string) => {
        if (s === 'active') return <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Actif</span>;
        if (s === 'trial') return <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div>Essai</span>;
        if (s === 'past_due') return <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div>Retard</span>;
        return <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-neutral-600"></div>Annulé</span>;
    }

    return (
        <tr className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={onEdit}>
            <td className="px-6 py-4">
                <div className="font-medium text-white">{client.companyName}</div>
                <div className="text-xs text-neutral-500">{client.email}</div>
            </td>
            <td className="px-6 py-4">{getPlanBadge(client.plan)}</td>
            <td className="px-6 py-4"><div className="font-medium text-xs">{getStatusBadge(client.subscriptionStatus)}</div></td>
            <td className="px-6 py-4 text-neutral-400 text-xs">{formatDate(client.nextBillingDate)}</td>
            <td className="px-6 py-4 text-right">
                <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-2 hover:bg-white/10 rounded text-neutral-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
            </td>
        </tr>
    )
}

const TicketRow: React.FC<{ ticket: DisplayTicket, onOpen: () => void }> = ({ ticket, onOpen }) => {
    const formatDate = (ts: any) => {
        if (!ts || !ts.seconds) return '-';
        const date = new Date(ts.seconds * 1000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString().substring(0,5);
    };
    const getPriorityBadge = (p: string) => {
      if (p === 'high') return <span className="text-red-400">Haute</span>;
      if (p === 'medium') return <span className="text-orange-400">Moyenne</span>;
      return <span className="text-emerald-400">Basse</span>;
    };
    const getStatusBadge = (s: string) => {
      if (s === 'open') return <span className="flex items-center gap-1.5 text-orange-400"><Clock size={12}/> Ouvert</span>;
      if (s === 'pending') return <span className="flex items-center gap-1.5 text-blue-400"><Mail size={12}/> En attente client</span>;
      if (s === 'resolved') return <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 size={12}/> Résolu</span>;
      return <span className="flex items-center gap-1.5 text-neutral-500"><X size={12}/> Fermé</span>;
    };

    return (
        <tr className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={onOpen}>
            <td className="px-6 py-4 font-medium text-white">{ticket.companyName}</td>
            <td className="px-6 py-4 text-neutral-300">{ticket.subject}</td>
            <td className="px-6 py-4 text-xs font-bold">{getPriorityBadge(ticket.priority)}</td>
            <td className="px-6 py-4 text-xs font-bold">{getStatusBadge(ticket.status)}</td>
            <td className="px-6 py-4 text-neutral-500 text-xs">{formatDate(ticket.lastMessageAt)}</td>
            <td className="px-6 py-4 text-right">
                <button onClick={(e) => { e.stopPropagation(); onOpen(); }} className="p-2 hover:bg-white/10 rounded text-neutral-500 hover:text-white transition-colors"><ArrowRight size={16} /></button>
            </td>
        </tr>
    );
};

const TicketChatModal: React.FC<{ ticket: DisplayTicket, user: any, isSuperAdmin: boolean, onClose: () => void, onUpdate: () => void }> = ({ ticket, user, isSuperAdmin, onClose, onUpdate }) => {
    const [messages, setMessages] = useState<TicketMessageData[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [currentTicket, setCurrentTicket] = useState<DisplayTicket>(ticket);
    const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ticket.id) return;
        const unsubscribe = subscribeToTicketMessages(ticket.id, setMessages);
        return () => unsubscribe();
    }, [ticket.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Update local ticket state when prop changes
    useEffect(() => {
        setCurrentTicket(ticket);
    }, [ticket]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !ticket.id || !user) return;

        setIsSending(true);
        try {
            await addTicketMessage(ticket.id, user.uid, newMessage, "Admin Support", true);
            setNewMessage('');
            onUpdate(); // Trigger refresh on the main dashboard
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsSending(false);
        }
    };

    const handleUpdateStatus = async (newStatus: 'pending' | 'resolved' | 'closed') => {
        if (!currentTicket.id) return;
        
        // Check admin permissions
        if (!isSuperAdmin) {
            setStatusUpdateError("Permission refusée : vous devez être super administrateur pour modifier le statut des tickets.");
            return;
        }
        
        setStatusUpdateError(null);
        setIsUpdatingStatus(true);
        
        try {
            await updateTicketStatus(currentTicket.id, newStatus);
            
            // Update local state immediately for better UX
            setCurrentTicket(prev => ({
                ...prev,
                status: newStatus,
                updatedAt: Timestamp.now()
            }));
            
            // Trigger parent refresh to update the tickets list
            onUpdate();
            
        } catch (error: any) {
            console.error("Error updating ticket status:", error);
            setStatusUpdateError(error.message || "Échec de la mise à jour du statut");
        } finally {
            setIsUpdatingStatus(false);
        }
    };
    
    // Individual loading states for each button
    const [updatingToPending, setUpdatingToPending] = useState(false);
    const [updatingToResolved, setUpdatingToResolved] = useState(false);
    const [updatingToClosed, setUpdatingToClosed] = useState(false);
    
    const handleStatusUpdateWithFeedback = async (newStatus: 'pending' | 'resolved' | 'closed') => {
        // Set individual loading state
        if (newStatus === 'pending') setUpdatingToPending(true);
        else if (newStatus === 'resolved') setUpdatingToResolved(true);
        else if (newStatus === 'closed') setUpdatingToClosed(true);
        
        setStatusUpdateError(null);
        
        try {
            await handleUpdateStatus(newStatus);
        } finally {
            // Reset individual loading state
            if (newStatus === 'pending') setUpdatingToPending(false);
            else if (newStatus === 'resolved') setUpdatingToResolved(false);
            else if (newStatus === 'closed') setUpdatingToClosed(false);
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl animate-fade-in-up flex flex-col max-h-[80vh]">
                <div className="p-5 border-b border-white/10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-white">Ticket: {currentTicket.subject}</h3>
                            <p className="text-sm text-neutral-400">Client: {currentTicket.companyName}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                    currentTicket.status === 'open' ? 'bg-orange-500/20 text-orange-400' :
                                    currentTicket.status === 'pending' ? 'bg-blue-500/20 text-blue-400' :
                                    currentTicket.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                                    'bg-neutral-500/20 text-neutral-400'
                                }`}>
                                    {currentTicket.status === 'open' ? 'Ouvert' :
                                     currentTicket.status === 'pending' ? 'En attente' :
                                     currentTicket.status === 'resolved' ? 'Résolu' : 'Fermé'}
                                </span>
                                <span className="text-xs text-neutral-500">Priorité: {currentTicket.priority}</span>
                            </div>
                            {statusUpdateError && (
                                <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs">
                                    ❌ {statusUpdateError}
                                </div>
                            )}
                        </div>
                        <button onClick={onClose} className="text-neutral-400 hover:text-white"><X size={20} /></button>
                    </div>
                </div>

                <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-6">
                    {messages.map((msg, index) => (
                        <div key={msg.id || index} className={`flex gap-3 ${msg.isAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${msg.isAdmin ? 'bg-emerald-900 text-emerald-300' : 'bg-neutral-700 text-neutral-200'}`}>
                                {msg.isAdmin ? 'A' : 'C'}
                            </div>
                            <div className={`p-4 rounded-xl max-w-lg ${msg.isAdmin ? 'bg-emerald-500/10 text-neutral-300' : 'bg-white/5 text-neutral-300'}`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <div className="text-xs text-neutral-500 mt-2 text-right">
                                    {msg.createdAt && msg.createdAt.seconds 
                                        ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString().substring(0,5)
                                        : 'À l\'instant'
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-white/10 flex flex-wrap gap-2">
                    <button
                        onClick={() => handleStatusUpdateWithFeedback('pending')}
                        disabled={updatingToPending || updatingToResolved || updatingToClosed || currentTicket.status === 'pending'}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                    >
                        {updatingToPending ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <Mail size={14} />
                        )}
                        {updatingToPending ? 'Mise à jour...' : 'Marquer en attente'}
                    </button>
                    <button
                        onClick={() => handleStatusUpdateWithFeedback('resolved')}
                        disabled={updatingToPending || updatingToResolved || updatingToClosed || currentTicket.status === 'resolved'}
                        className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                    >
                        {updatingToResolved ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <CheckCircle2 size={14} />
                        )}
                        {updatingToResolved ? 'Mise à jour...' : 'Marquer résolu'}
                    </button>
                    <button
                        onClick={() => handleStatusUpdateWithFeedback('closed')}
                        disabled={updatingToPending || updatingToResolved || updatingToClosed || currentTicket.status === 'closed'}
                        className="px-4 py-2 bg-neutral-500/20 hover:bg-neutral-500/30 border border-neutral-500/30 text-neutral-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                    >
                        {updatingToClosed ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <X size={14} />
                        )}
                        {updatingToClosed ? 'Mise à jour...' : 'Fermer le ticket'}
                    </button>
                </div>
                
                <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
                    <div className="relative">
                        <textarea
                            rows={2}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Répondre au client..."
                            className="w-full bg-[#050505] border border-white/10 rounded-lg pr-14 pl-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none placeholder:text-neutral-600 resize-none"
                        />
                        <button type="submit" disabled={isSending || !newMessage.trim()} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white disabled:bg-neutral-700 disabled:cursor-not-allowed transition-colors">
                            {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const ClientEditModal = ({ client, onClose, onSuccess }: { client: ClientData, onClose: () => void, onSuccess: (msg: string) => void }) => {
    const { isSuperAdmin } = useAuth();
    const [formData, setFormData] = useState<Partial<ClientData>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [invoices, setInvoices] = useState<InvoiceData[]>([]);
    const [isLoadingInvoices, setIsLoadingInvoices] = useState(false);
    
    // Initialize form data with client data
    useEffect(() => {
        setFormData({
            companyName: client.companyName,
            email: client.email,
            phone: client.phone || '',
            plan: client.plan,
            subscriptionStatus: client.subscriptionStatus,
            setupFeeStatus: client.setupFeeStatus,
            billingCycle: client.billingCycle,
            notes: client.notes || ''
        });
        
        // Load invoices for this client
        const loadInvoices = async () => {
            setIsLoadingInvoices(true);
            try {
                const clientInvoices = await getInvoicesByClient(client.uid);
                setInvoices(clientInvoices);
            } catch (err) {
                console.error("Error loading invoices:", err);
            } finally {
                setIsLoadingInvoices(false);
            }
        };
        
        loadInvoices();
    }, [client]);
    
    const handleChange = (field: keyof ClientData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleSave = async () => {
        if (!isSuperAdmin) {
            setError("Permission refusée : vous devez être super administrateur pour modifier les informations des clients.");
            return;
        }
        
        setIsSaving(true);
        setError(null);
        
        try {
            // Filter out unchanged fields
            const updates: Partial<ClientData> = {};
            const formKeys = Object.keys(formData) as Array<keyof ClientData>;
            formKeys.forEach((k) => {
                const formValue = formData[k];
                const clientValue = client[k];
                if (formValue !== clientValue) {
                    // Type-safe assignment with explicit type assertion
                    (updates as any)[k] = formValue;
                }
            });
            
            if (Object.keys(updates).length > 0) {
                await updateClientSubscription(client.uid, updates, client);
                onSuccess(`Client ${client.companyName} mis à jour avec succès.`);
            } else {
                onClose();
            }
        } catch (err: any) {
            console.error("Error updating client:", err);
            setError(err.message || "Erreur lors de la mise à jour du client");
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleCreateInvoice = async (type: InvoiceType, amount: number) => {
        if (!isSuperAdmin) {
            setError("Permission refusée : vous devez être super administrateur pour créer des factures.");
            return;
        }
        
        try {
            const period = new Date().toISOString().slice(0, 7); // YYYY-MM
            await createInvoice(client.uid, type, amount, period);
            
            // Refresh invoices list
            const updatedInvoices = await getInvoicesByClient(client.uid);
            setInvoices(updatedInvoices);
            
            onSuccess(`Facture créée pour ${client.companyName}`);
        } catch (err: any) {
            console.error("Error creating invoice:", err);
            setError(err.message || "Erreur lors de la création de la facture");
        }
    };
    
    const handleUpdateInvoiceStatus = async (invoiceId: string, status: InvoiceStatus) => {
        if (!isSuperAdmin) {
            setError("Permission refusée : vous devez être super administrateur pour modifier les factures.");
            return;
        }
        
        try {
            await updateInvoiceStatus(invoiceId, status);
            
            // Refresh invoices list
            const updatedInvoices = await getInvoicesByClient(client.uid);
            setInvoices(updatedInvoices);
            
            onSuccess(`Statut de la facture mis à jour`);
        } catch (err: any) {
            console.error("Error updating invoice:", err);
            setError(err.message || "Erreur lors de la mise à jour de la facture");
        }
    };
    
    const formatDate = (ts: any) => {
        if (!ts || !ts.seconds) return '-';
        return new Date(ts.seconds * 1000).toLocaleDateString();
    };
    
    const getPlanOptions = () => [
        { value: 'presence', label: 'Presence' },
        { value: 'boost', label: 'Boost' },
        { value: 'business', label: 'Business' }
    ];
    
    const getStatusOptions = () => [
        { value: 'trial', label: 'Essai' },
        { value: 'active', label: 'Actif' },
        { value: 'past_due', label: 'Retard' },
        { value: 'canceled', label: 'Annulé' }
    ];
    
    const getSetupFeeOptions = () => [
        { value: 'unpaid', label: 'Non payé' },
        { value: 'pending', label: 'En attente' },
        { value: 'paid', label: 'Payé' }
    ];
    
    const getBillingCycleOptions = () => [
        { value: 'monthly', label: 'Mensuel' },
        { value: 'quarterly', label: 'Trimestriel' },
        { value: 'yearly', label: 'Annuel' }
    ];
    
    return (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
                <div className="p-6 border-b border-white/10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white">Édition du client</h3>
                            <p className="text-neutral-400 mt-1">{client.companyName} • {client.email}</p>
                            {error && (
                                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                                    ❌ {error}
                                </div>
                            )}
                        </div>
                        <button onClick={onClose} className="text-neutral-400 hover:text-white p-2">
                            <X size={20} />
                        </button>
                    </div>
                </div>
                
                <div className="p-6 space-y-8">
                    {/* Informations de base */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Users size={18} /> Informations de base
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Nom de la société</label>
                                <input
                                    type="text"
                                    value={formData.companyName || ''}
                                    onChange={(e) => handleChange('companyName', e.target.value)}
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Téléphone</label>
                                <input
                                    type="text"
                                    value={formData.phone || ''}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Notes internes</label>
                                <textarea
                                    value={formData.notes || ''}
                                    onChange={(e) => handleChange('notes', e.target.value)}
                                    rows={2}
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none resize-none"
                                    placeholder="Notes sur le client..."
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Abonnement et facturation */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <CreditCard size={18} /> Abonnement & Facturation
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Forfait</label>
                                <select
                                    value={formData.plan || 'presence'}
                                    onChange={(e) => handleChange('plan', e.target.value)}
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                >
                                    {getPlanOptions().map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Statut d'abonnement</label>
                                <select
                                    value={formData.subscriptionStatus || 'trial'}
                                    onChange={(e) => handleChange('subscriptionStatus', e.target.value)}
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                >
                                    {getStatusOptions().map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Frais de setup</label>
                                <select
                                    value={formData.setupFeeStatus || 'unpaid'}
                                    onChange={(e) => handleChange('setupFeeStatus', e.target.value)}
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                >
                                    {getSetupFeeOptions().map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Cycle de facturation</label>
                                <select
                                    value={formData.billingCycle || 'monthly'}
                                    onChange={(e) => handleChange('billingCycle', e.target.value)}
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                >
                                    {getBillingCycleOptions().map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/5 p-4 rounded-lg">
                                <p className="text-sm text-neutral-400">Début de période</p>
                                <p className="text-white font-medium">{formatDate(client.currentPeriodStart)}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <p className="text-sm text-neutral-400">Fin de période</p>
                                <p className="text-white font-medium">{formatDate(client.currentPeriodEnd)}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <p className="text-sm text-neutral-400">Prochaine facturation</p>
                                <p className="text-white font-medium">{formatDate(client.nextBillingDate)}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Factures */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                <FileText size={18} /> Factures
                            </h4>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleCreateInvoice('setup', 5000)}
                                    disabled={!isSuperAdmin}
                                    className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    + Frais de setup
                                </button>
                                <button
                                    onClick={() => handleCreateInvoice('monthly', 2000)}
                                    disabled={!isSuperAdmin}
                                    className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    + Facture mensuelle
                                </button>
                            </div>
                        </div>
                        
                        {isLoadingInvoices ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                            </div>
                        ) : invoices.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/[0.02] text-neutral-400 font-medium">
                                        <tr>
                                            <th className="px-4 py-3">Type</th>
                                            <th className="px-4 py-3">Montant (MAD)</th>
                                            <th className="px-4 py-3">Période</th>
                                            <th className="px-4 py-3">Statut</th>
                                            <th className="px-4 py-3">Échéance</th>
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {invoices.map((invoice) => (
                                            <tr key={invoice.id} className="hover:bg-white/5">
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 text-xs rounded ${
                                                        invoice.type === 'setup' ? 'bg-purple-500/20 text-purple-400' :
                                                        invoice.type === 'monthly' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                        {invoice.type === 'setup' ? 'Setup' : 
                                                         invoice.type === 'monthly' ? 'Mensuel' : 'Extra'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-white">{invoice.amountMAD.toLocaleString()} MAD</td>
                                                <td className="px-4 py-3 text-neutral-400">{invoice.period}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 text-xs rounded ${
                                                        invoice.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        'bg-red-500/20 text-red-400'
                                                    }`}>
                                                        {invoice.status === 'paid' ? 'Payé' : 'Impayé'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-neutral-400">{formatDate(invoice.dueDate)}</td>
                                                <td className="px-4 py-3 text-right">
                                                    {invoice.status === 'unpaid' && isSuperAdmin && (
                                                        <button
                                                            onClick={() => handleUpdateInvoiceStatus(invoice.id!, 'paid')}
                                                            className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg transition-colors"
                                                        >
                                                            Marquer payé
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-neutral-500">
                                Aucune facture pour ce client.
                            </div>
                        )}
                    </div>
                    
                    {/* Actions */}
                    <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Enregistrement...
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Enregistrer les modifications
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
