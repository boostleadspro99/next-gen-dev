import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Settings, 
  Globe, 
  MessageSquare,
  LogOut,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  X,
  Lock,
  Save,
  Loader2,
  AlertTriangle,
  Ban,
  FileText,
  Send,
  User,
  Bot
} from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { useAuth } from '../contexts/AuthContext';
import { getProjectByClient, getTicketsByClient, getInvoicesByClient, createTicket, addTicketMessage, subscribeToTicketMessages } from '../services/firestore';
import type { ProjectData, TicketData, InvoiceData, TicketMessageData } from '../types/db';
import { useClientSubscription } from '../hooks/useClientSubscription';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { clientData, logout } = useAuth();
  const { status, isLocked, isReadOnly, isTrial, daysLeftInTrial } = useClientSubscription();
  const { t, dir } = useLanguage();
  
  const [project, setProject] = useState<ProjectData | null>(null);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Modals
  const [showSettings, setShowSettings] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);
  
  // Ticket Modals
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newTicketForm, setNewTicketForm] = useState({ subject: '', priority: 'medium' as 'low'|'medium'|'high' });
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

  // Chat Modal
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [ticketMessages, setTicketMessages] = useState<TicketMessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Settings Form
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  useEffect(() => {
    const fetchData = async () => {
        if (!clientData?.uid) return;
        
        try {
            const [projData, ticketsData, invoicesData] = await Promise.all([
                getProjectByClient(clientData.uid),
                getTicketsByClient(clientData.uid),
                getInvoicesByClient(clientData.uid)
            ]);
            setProject(projData);
            setTickets(ticketsData);
            setInvoices(invoicesData);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    fetchData();
  }, [clientData]);

  // Real-time Chat Subscription
  useEffect(() => {
      if (!selectedTicket?.id) return;

      const unsubscribe = subscribeToTicketMessages(selectedTicket.id, (msgs) => {
          setTicketMessages(msgs);
          // Scroll to bottom on new message
          setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      });

      return () => unsubscribe();
  }, [selectedTicket]);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    // Simulate API Call
    setTimeout(() => {
        setSaveStatus('success');
        setTimeout(() => {
            setSaveStatus('idle');
            setShowSettings(false);
            setPasswordForm({ current: '', new: '', confirm: '' });
        }, 1500);
    }, 1000);
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!clientData?.uid) return;
      setIsCreatingTicket(true);
      try {
          const ticketId = await createTicket(clientData.uid, newTicketForm.subject, newTicketForm.priority);
          
          // Refresh list
          const ticketsData = await getTicketsByClient(clientData.uid);
          setTickets(ticketsData);
          
          setIsNewTicketOpen(false);
          setNewTicketForm({ subject: '', priority: 'medium' });
          
          // Open the new ticket chat immediately
          const newTicket = ticketsData.find(t => t.id === ticketId);
          if(newTicket) setSelectedTicket(newTicket);

      } catch(error) {
          console.error(error);
      } finally {
          setIsCreatingTicket(false);
      }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!selectedTicket?.id || !newMessage.trim() || !clientData) return;
      
      const text = newMessage;
      setNewMessage(''); // Optimistic clear
      
      await addTicketMessage(selectedTicket.id, clientData.uid, text, clientData.companyName || 'Client', false);
  }

  if (isLoadingData) {
      return (
          <div className="min-h-screen bg-[#050505] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          </div>
      );
  }

  // --- STATE 1: BLOCKED ACCESS (Canceled) ---
  if (isLocked) {
      return (
          <section className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
              <div className="absolute inset-0 bg-red-500/5 pointer-events-none"></div>
              
              <div className="max-w-md w-full bg-[#0A0A0A] border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl relative z-10">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 text-red-500">
                      <Ban size={32} />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">{t.dashboard.alerts.canceled_title}</h1>
                  <p className="text-neutral-400 mb-8 leading-relaxed">
                      {t.dashboard.alerts.canceled_desc}
                  </p>
                  <div className="space-y-3">
                      <a href="https://wa.me/212600000000" className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                          <MessageSquare size={18} />
                          {t.dashboard.alerts.canceled_btn_support}
                      </a>
                      <button onClick={() => logout()} className="w-full py-3 bg-white/5 border border-white/10 text-neutral-400 font-medium rounded-xl hover:text-white transition-colors flex items-center justify-center gap-2">
                          <LogOut size={18} />
                          {t.dashboard.alerts.canceled_btn_logout}
                      </button>
                  </div>
              </div>
          </section>
      );
  }

  // --- Status Helpers ---
  const getStatusBadge = () => {
      let label = '';
      let style = '';
      
      switch(status) {
          case 'trial': 
              label = t.dashboard.subscription.status_trial;
              style = 'bg-orange-500/20 text-orange-400 border-orange-500/30';
              break;
          case 'active':
              label = t.dashboard.subscription.status_active;
              style = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
              break;
          case 'past_due':
              label = t.dashboard.subscription.status_pending;
              style = 'bg-red-500/20 text-red-400 border-red-500/30';
              break;
          case 'canceled':
              label = t.dashboard.subscription.status_disabled;
              style = 'bg-neutral-700/50 text-neutral-400 border-neutral-700';
              break;
          default:
              label = t.dashboard.subscription.status_pending;
              style = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      }

      return (
          <div className={`px-3 py-1 border text-[10px] font-bold uppercase rounded tracking-wide ${style}`}>
              {label}
          </div>
      );
  };

  const getStatusColor = () => {
      if (status === 'active') return 'text-emerald-400';
      if (status === 'trial') return 'text-orange-400';
      if (status === 'past_due') return 'text-red-400';
      return 'text-neutral-400';
  }

  return (
    // THÈME SOMBRE : Fond #050505
    <section className="pt-28 pb-12 px-6 min-h-screen bg-[#050505] relative text-neutral-200">
      
      {/* ALERTS & BANNERS */}
      <div className="max-w-7xl mx-auto mb-8 space-y-4">
          
          {/* TRIAL BANNER */}
          {isTrial && (
              <FadeIn>
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-900/10 border border-orange-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-orange-500/5">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400 shrink-0">
                            <Clock size={20} />
                        </div>
                        <div>
                            <h3 className="text-orange-400 font-bold text-sm">{t.dashboard.alerts.trial_title}</h3>
                            <p className="text-orange-200/70 text-xs">
                                {t.dashboard.alerts.trial_desc} <span className="text-white font-bold">{daysLeftInTrial} {t.dashboard.alerts.trial_days}</span> {t.dashboard.alerts.trial_end}
                            </p>
                        </div>
                    </div>
                    <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-orange-500 text-black text-xs font-bold uppercase rounded-lg hover:bg-orange-400 transition-colors shrink-0">
                        {t.dashboard.alerts.trial_btn}
                    </a>
                </div>
              </FadeIn>
          )}

          {/* PAST DUE BANNER (Read Only) */}
          {isReadOnly && (
              <FadeIn>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-4 shadow-lg">
                    <AlertTriangle size={24} className="text-red-500 shrink-0" />
                    <div>
                        <h3 className="text-red-400 font-bold text-sm">{t.dashboard.alerts.past_due_title}</h3>
                        <p className="text-red-200/70 text-xs">
                            {t.dashboard.alerts.past_due_desc}
                        </p>
                    </div>
                </div>
              </FadeIn>
          )}
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <FadeIn>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Espace Client</h1>
              <p className="text-neutral-400 mt-1 flex items-center gap-2">
                Compte : <span className="text-white font-medium">{clientData?.companyName || 'Mon Entreprise'}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-bold uppercase tracking-wider">
                    {clientData?.plan || 'Standard'}
                </span>
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={100} className="flex flex-wrap gap-3 items-center">
             {/* Global Status Badge (Top Right) */}
             <div className="mr-2">
                {getStatusBadge()}
             </div>

             {project?.domain ? (
                 <a href={`https://${project.domain}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <Globe size={16} className="text-neutral-400 group-hover:text-white" />
                    Voir mon site
                    <ExternalLink size={12} className="text-neutral-500" />
                 </a>
             ) : (
                 <button disabled className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-neutral-500 cursor-not-allowed flex items-center gap-2">
                    <Globe size={16} />
                    Site en construction
                 </button>
             )}
             
             <button 
                onClick={() => setIsNewTicketOpen(true)}
                disabled={isReadOnly}
                className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] ${isReadOnly ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}
             >
                <MessageSquare size={16} />
                Nouveau Ticket
             </button>
             <button onClick={() => logout()} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-neutral-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors shadow-sm">
                <LogOut size={18} />
             </button>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* COLONNE GAUCHE (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. SUIVI D'AVANCEMENT DU PROJET */}
            <FadeIn delay={200}>
                {/* Carte Sombre */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
                    {/* Background accent dark */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none opacity-40"></div>
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <LayoutDashboard size={18} className="text-emerald-500" />
                            Avancement du Projet
                        </h3>
                        <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 animate-pulse">
                            État : {project?.status === 'audit' ? 'Audit en cours' : project?.status === 'design' ? 'Design' : project?.status === 'development' ? 'Développement' : 'En ligne'}
                        </span>
                    </div>

                    {/* Timeline */}
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-8 md:gap-0">
                            {/* Ligne de fond (Desktop) */}
                            <div className="hidden md:block absolute top-4 left-0 w-full h-0.5 bg-white/5 z-0"></div>

                            {project?.timeline ? (
                                project.timeline.map((step) => (
                                    <ProjectStepItem 
                                        key={step.id}
                                        step={step.id.toString()}
                                        title={step.label}
                                        date={step.date || 'En attente'} 
                                        status={step.status as any} 
                                    />
                                ))
                            ) : (
                                <div className="text-neutral-500 text-sm">Chargement de la timeline...</div>
                            )}
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* 2. SUPPORT & TICKETS */}
            <FadeIn delay={300}>
                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#0A0A0A]">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <MessageSquare size={18} className="text-neutral-400" />
                            Derniers Tickets Support
                        </h3>
                        {tickets.length > 0 && (
                            <button className="text-xs text-neutral-400 hover:text-emerald-400 transition-colors font-medium">Voir tout</button>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/[0.02] text-neutral-400 font-medium border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-3">Sujet</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Priorité</th>
                                    <th className="px-6 py-3">Statut</th>
                                    <th className="px-6 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-neutral-300">
                                {tickets.length > 0 ? tickets.map((ticket) => (
                                    <TicketRow 
                                        key={ticket.id}
                                        onClick={() => setSelectedTicket(ticket)}
                                        subject={ticket.subject} 
                                        id={`#${ticket.id?.slice(0,4)}`} 
                                        date={ticket.createdAt ? new Date(ticket.createdAt.seconds * 1000).toLocaleDateString() : '-'} 
                                        priority={ticket.priority} 
                                        status={ticket.status} 
                                    />
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                                            Aucun ticket ouvert. Tout va bien !
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Disable ticket creation if read-only */}
                    {!isReadOnly && (
                        <div className="p-4 bg-white/[0.02] border-t border-white/5">
                            <button 
                                onClick={() => setIsNewTicketOpen(true)}
                                className="w-full py-2 border border-dashed border-white/10 rounded-lg text-neutral-400 text-sm hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2 font-medium"
                            >
                                <Plus size={16} />
                                Ouvrir un nouveau ticket
                            </button>
                        </div>
                    )}
                </div>
            </FadeIn>

          </div>

          {/* COLONNE DROITE (1/3) */}
          <div className="space-y-8">
            
            {/* 3. ABONNEMENT & FACTURATION */}
            <FadeIn delay={200} direction="left">
                <div className={`bg-gradient-to-br from-[#111] to-[#0A0A0A] border rounded-2xl p-6 relative overflow-hidden group text-white shadow-2xl ${isReadOnly ? 'border-red-500/30' : 'border-white/10'}`}>
                    <div className={`absolute top-0 right-0 w-full h-1 bg-gradient-to-r ${isReadOnly ? 'from-red-500 to-red-700' : 'from-emerald-500 to-emerald-700'}`}></div>
                    
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-white font-semibold">{t.dashboard.subscription.title}</h3>
                            <p className="text-xs text-neutral-400 mt-1 capitalize">Pack {clientData?.plan || 'Boost'}</p>
                        </div>
                        {getStatusBadge()}
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                        <span className={`text-3xl font-bold ${getStatusColor()}`}>
                            {clientData?.plan === 'business' ? '399' : clientData?.plan === 'presence' ? '199' : '249'} MAD
                        </span>
                        <span className="text-sm text-neutral-400">/mois</span>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3 mb-6 flex items-center gap-3 border border-white/5">
                        <Clock size={16} className="text-neutral-400" />
                        <div className="flex-1">
                            <div className="text-[10px] text-neutral-500 uppercase font-bold">{t.dashboard.subscription.next_due}</div>
                            <div className="text-sm text-white font-medium">
                                {clientData?.currentPeriodEnd ? new Date(clientData.currentPeriodEnd.seconds * 1000).toLocaleDateString() : '...'}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {/* Dynamic Main Action Button */}
                        {isTrial ? (
                            <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                                <CreditCard size={16} />
                                {t.dashboard.subscription.btn_activate}
                            </a>
                        ) : isReadOnly ? (
                            <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-500 transition-colors flex items-center justify-center gap-2">
                                <CreditCard size={16} />
                                {t.dashboard.subscription.btn_regularize}
                            </a>
                        ) : (
                            <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                                <Settings size={16} />
                                {t.dashboard.subscription.btn_manage}
                            </a>
                        )}

                        <button 
                            onClick={() => setShowInvoices(true)}
                            className="w-full py-2.5 bg-transparent border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                        >
                            <Download size={16} />
                            {t.dashboard.subscription.btn_invoices}
                        </button>
                    </div>

                    {/* Trust Message */}
                    <div className="mt-6 pt-4 border-t border-white/5">
                        <p className="text-[10px] text-neutral-500 text-center leading-relaxed">
                            <ShieldCheck size={12} className="inline mr-1 text-emerald-500" />
                            {t.dashboard.subscription.trust_message}
                        </p>
                    </div>
                </div>
            </FadeIn>

            {/* 4. ÉTAT TECHNIQUE DU SITE */}
            <FadeIn delay={400} direction="left">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl">
                    <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                        <ActivityStatus />
                        État Technique
                    </h3>
                    
                    <div className="space-y-4">
                        <TechStatusRow label="Serveur & Hébergement" status="operational" />
                        <TechStatusRow label="Certificat SSL (HTTPS)" status="operational" />
                        <TechStatusRow label="Sauvegardes (J-1)" status="operational" />
                        <TechStatusRow label="Protection Anti-DDoS" status="operational" />
                        <TechStatusRow label="API Connexions" status="maintenance" message="Mise à jour en cours" />
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/5">
                        <div className="flex gap-3">
                             <div className="p-2 bg-white/5 rounded-lg text-neutral-400 border border-white/5">
                                <ShieldCheck size={20} />
                             </div>
                             <div>
                                <div className="text-xs text-neutral-500">Dernier scan de sécurité</div>
                                <div className="text-sm text-white font-medium">Il y a 24 minutes</div>
                             </div>
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* QUICK SETTINGS */}
            <FadeIn delay={600} direction="left">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <button 
                        onClick={() => setShowSettings(true)}
                        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 group"
                    >
                        <div className="flex items-center gap-3">
                            <Settings size={18} className="text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                            <span className="text-sm text-neutral-300 group-hover:text-white font-medium">Paramètres du compte</span>
                        </div>
                        <ChevronRight size={16} className="text-neutral-500 group-hover:text-neutral-300" />
                    </button>
                    <button onClick={() => logout()} className="w-full p-4 flex items-center justify-between hover:bg-red-500/10 transition-colors group">
                        <div className="flex items-center gap-3">
                            <LogOut size={18} className="text-neutral-400 group-hover:text-red-400 transition-colors" />
                            <span className="text-sm text-neutral-300 group-hover:text-red-400 font-medium">Se déconnecter</span>
                        </div>
                    </button>
                </div>
            </FadeIn>

          </div>
        </div>
      </div>

      {/* NEW TICKET MODAL */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsNewTicketOpen(false)}></div>
             <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-lg relative z-10 shadow-2xl animate-fade-in-up">
                
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0F0F0F] rounded-t-2xl">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <MessageSquare size={20} className="text-emerald-500" />
                        {t.dashboard.tickets.new_title}
                    </h3>
                    <button onClick={() => setIsNewTicketOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleCreateTicket} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">{t.dashboard.tickets.subject_label}</label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-neutral-600 transition-colors"
                            placeholder={t.dashboard.tickets.subject_placeholder}
                            value={newTicketForm.subject}
                            onChange={e => setNewTicketForm({...newTicketForm, subject: e.target.value})}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">{t.dashboard.tickets.priority_label}</label>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => setNewTicketForm({...newTicketForm, priority: 'low'})}
                                className={`p-3 rounded-lg border text-xs font-bold transition-all ${newTicketForm.priority === 'low' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                            >
                                {t.dashboard.tickets.priority_low}
                            </button>
                            <button
                                type="button"
                                onClick={() => setNewTicketForm({...newTicketForm, priority: 'medium'})}
                                className={`p-3 rounded-lg border text-xs font-bold transition-all ${newTicketForm.priority === 'medium' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                            >
                                {t.dashboard.tickets.priority_medium}
                            </button>
                            <button
                                type="button"
                                onClick={() => setNewTicketForm({...newTicketForm, priority: 'high'})}
                                className={`p-3 rounded-lg border text-xs font-bold transition-all ${newTicketForm.priority === 'high' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'}`}
                            >
                                {t.dashboard.tickets.priority_high}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isCreatingTicket || !newTicketForm.subject}
                        className="w-full py-3.5 bg-emerald-600 text-white rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCreatingTicket ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                        {isCreatingTicket ? t.dashboard.tickets.creating : t.dashboard.tickets.create_btn}
                    </button>
                </form>
             </div>
        </div>
      )}

      {/* TICKET CHAT MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTicket(null)}></div>
             <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl animate-fade-in-up flex flex-col h-[80vh]">
                
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0F0F0F] rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400`}>
                            <MessageSquare size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white line-clamp-1">{selectedTicket.subject}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-neutral-500">#{selectedTicket.id?.slice(0,6)}</span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold border ${selectedTicket.status === 'resolved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                                    {selectedTicket.status}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setSelectedTicket(null)} className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#050505]">
                    {ticketMessages.length === 0 ? (
                        <div className="text-center py-12 text-neutral-500 text-sm">
                            {t.dashboard.tickets.no_messages}
                        </div>
                    ) : (
                        ticketMessages.map((msg) => {
                            const isMe = !msg.isAdmin; // Current user is client
                            return (
                                <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${isMe ? 'bg-white/10 border-white/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                                        {isMe ? <User size={14} className="text-white" /> : <Bot size={14} className="text-emerald-500" />}
                                    </div>
                                    <div className={`flex flex-col gap-1 max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isMe ? 'bg-white text-black rounded-tr-none' : 'bg-[#151515] border border-white/10 text-neutral-200 rounded-tl-none'}`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-neutral-600 px-1">
                                            {msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '...'}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-[#0F0F0F] rounded-b-2xl">
                    <div className="relative flex items-center gap-2">
                        <input 
                            type="text" 
                            className="w-full bg-[#050505] border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-neutral-600 transition-colors"
                            placeholder={t.dashboard.tickets.chat_placeholder}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={isReadOnly}
                        />
                        <button 
                            type="submit"
                            disabled={!newMessage.trim() || isReadOnly}
                            className="absolute right-2 p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </form>
             </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowSettings(false)}></div>
             <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-md relative z-10 shadow-2xl animate-fade-in-up">
                
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0F0F0F] rounded-t-2xl">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Settings size={20} className="text-emerald-500" />
                        Sécurité & Mot de passe
                    </h3>
                    <button onClick={() => setShowSettings(false)} className="text-neutral-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Mot de passe actuel</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-3 text-neutral-500" />
                            <input 
                                type="password" 
                                className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-neutral-600 transition-colors"
                                placeholder="••••••••"
                                value={passwordForm.current}
                                onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Nouveau mot de passe</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-3 text-neutral-500" />
                            <input 
                                type="password" 
                                className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-neutral-600 transition-colors"
                                placeholder="••••••••"
                                value={passwordForm.new}
                                onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Confirmer le mot de passe</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-3 text-neutral-500" />
                            <input 
                                type="password" 
                                className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-neutral-600 transition-colors"
                                placeholder="••••••••"
                                value={passwordForm.confirm}
                                onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={saveStatus === 'saving' || saveStatus === 'success'}
                        className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 mt-4 transition-all duration-300 ${
                            saveStatus === 'success' 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                            : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20'
                        }`}
                    >
                        {saveStatus === 'saving' && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>}
                        {saveStatus === 'success' && <CheckCircle2 size={18} />}
                        {saveStatus === 'idle' && <Save size={18} />}
                        {saveStatus === 'idle' ? 'Mettre à jour' : saveStatus === 'saving' ? 'Enregistrement...' : 'Modifié avec succès'}
                    </button>
                </form>
             </div>
        </div>
      )}

      {/* INVOICES MODAL */}
      {showInvoices && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowInvoices(false)}></div>
             <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl animate-fade-in-up flex flex-col max-h-[85vh]">
                
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0F0F0F] rounded-t-2xl">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText size={20} className="text-emerald-500" />
                        {t.dashboard.invoices.title}
                    </h3>
                    <button onClick={() => setShowInvoices(false)} className="text-neutral-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {invoices.length > 0 ? (
                        <div className="space-y-3">
                            {invoices.map((inv) => (
                                <div key={inv.id} className="p-4 rounded-xl border bg-white/[0.02] border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${inv.status === 'paid' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white capitalize">{inv.type === 'setup' ? t.dashboard.invoices.setup_label : t.dashboard.invoices.monthly_label}</div>
                                            <div className="text-xs text-neutral-500">Période : {inv.period} • Date : {new Date(inv.createdAt.seconds * 1000).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-6 flex-1">
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-white">{inv.amountMAD} MAD</div>
                                            <div className={`text-[10px] font-bold uppercase tracking-wider ${inv.status === 'paid' ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {inv.status === 'paid' ? t.dashboard.invoices.status_paid : t.dashboard.invoices.status_unpaid}
                                            </div>
                                        </div>
                                        {inv.status === 'unpaid' && (
                                            <a 
                                                href="https://wa.me/212600000000" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 bg-white text-black text-xs font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                                            >
                                                {t.dashboard.invoices.pay_btn}
                                            </a>
                                        )}
                                        {inv.status === 'paid' && (
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 transition-colors">
                                                <Download size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-neutral-500">
                            {t.dashboard.invoices.empty}
                        </div>
                    )}
                </div>
                
                <div className="p-4 border-t border-white/10 bg-[#0F0F0F] rounded-b-2xl">
                    <p className="text-center text-[10px] text-neutral-500">
                        {t.dashboard.invoices.footer}
                    </p>
                </div>
             </div>
        </div>
      )}

    </section>
  );
};

/* --- SUB-COMPONENTS --- */

interface ProjectStepProps {
    step: string;
    title: string;
    date: string;
    status: 'completed' | 'current' | 'pending' | 'upcoming';
}

const ProjectStepItem: React.FC<ProjectStepProps> = ({ step, title, date, status }) => {
    // Treat 'pending' same as 'upcoming' visually for now or handle separately
    const visualStatus = status === 'pending' ? 'upcoming' : status;

    // Styles Dark Mode
    const bg = visualStatus === 'completed' ? 'bg-emerald-600 border-emerald-600' : visualStatus === 'current' ? 'bg-[#0A0A0A] border-2 border-emerald-500 text-emerald-400' : 'bg-[#0A0A0A] border-2 border-neutral-700 text-neutral-500';
    const text = visualStatus === 'completed' ? 'text-white' : visualStatus === 'current' ? 'text-emerald-400' : 'text-neutral-500';
    const titleColor = visualStatus === 'upcoming' ? 'text-neutral-500' : 'text-white';

    return (
        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 relative z-10 w-full md:w-auto">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${bg} ${text} transition-colors shadow-lg`}>
                {visualStatus === 'completed' ? <CheckCircle2 size={16} /> : step}
            </div>
            <div className="md:text-center flex-1">
                <div className={`text-sm font-medium ${titleColor}`}>{title}</div>
                <div className="text-xs text-neutral-500">{date}</div>
            </div>
            {visualStatus === 'current' && (
                <div className="md:hidden absolute right-0">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                </div>
            )}
        </div>
    )
}

interface TicketRowProps {
    id: string;
    subject: string;
    date: string;
    priority: string;
    status: string;
    onClick: () => void;
}

const TicketRow: React.FC<TicketRowProps> = ({ id, subject, date, priority, status, onClick }) => {
    let statusBadge;
    if (status === 'resolved' || status === 'Résolu') statusBadge = <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Résolu</span>;
    else if (status === 'open' || status === 'pending' || status === 'En cours') statusBadge = <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">En cours</span>;
    else statusBadge = <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-neutral-400 border border-white/10">Fermé</span>;

    return (
        <tr onClick={onClick} className="hover:bg-white/5 transition-colors group cursor-pointer border-b border-white/5 last:border-0">
            <td className="px-6 py-4">
                <div className="text-sm font-medium text-white">{subject}</div>
                <div className="text-xs text-neutral-500">{id}</div>
            </td>
            <td className="px-6 py-4 text-xs text-neutral-400">{date}</td>
            <td className="px-6 py-4 text-xs text-neutral-400 capitalize">{priority === 'low' ? 'Basse' : priority === 'medium' ? 'Moyenne' : 'Haute'}</td>
            <td className="px-6 py-4">{statusBadge}</td>
            <td className="px-6 py-4 text-right">
                <ChevronRight size={16} className="text-neutral-600 group-hover:text-emerald-400 inline-block transition-colors" />
            </td>
        </tr>
    );
};

const TechStatusRow = ({ label, status, message }: { label: string, status: 'operational' | 'maintenance' | 'down', message?: string }) => {
    return (
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${status === 'operational' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : status === 'maintenance' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                <span className="text-neutral-300">{label}</span>
            </div>
            <span className={`text-xs font-medium ${status === 'operational' ? 'text-emerald-500' : status === 'maintenance' ? 'text-orange-400' : 'text-red-500'}`}>
                {message || (status === 'operational' ? 'Opérationnel' : 'Erreur')}
            </span>
        </div>
    )
}

const ActivityStatus = () => (
    <span className="relative flex h-2.5 w-2.5 mr-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
    </span>
)

export default Dashboard;