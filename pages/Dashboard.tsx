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
import { getProjectByClient, getTicketsByClient, getInvoicesByClient, createTicket, addTicketMessage, subscribeToTicketMessages, subscribeToClientTickets, updateClientPreferences, updateClientProfile, updateClientPassword } from '../services/firestore';
import type { ProjectData, TicketData, InvoiceData, TicketMessageData } from '../types/db';
import { useClientSubscription } from '../hooks/useClientSubscription';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { clientData, logout } = useAuth();
  const { status, isLocked, isReadOnly, isTrial, daysLeftInTrial } = useClientSubscription();
  const { t, language: currentLanguage, setLanguage } = useLanguage();
  
  const [project, setProject] = useState<ProjectData | null>(null);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Preferences state
  const [preferences, setPreferences] = useState({
    notificationsEnabled: clientData?.notificationsEnabled ?? true,
  });

  // Modals
  const [showSettings, setShowSettings] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);

  // Forms State
  const [newTicketForm, setNewTicketForm] = useState({ subject: '', priority: 'medium' as 'low'|'medium'|'high' });
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [ticketMessages, setTicketMessages] = useState<TicketMessageData[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Profile & Password State
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    if (!clientData?.uid) {
      setIsLoadingData(false);
      return;
    }

    setIsLoadingData(true);
    let unsubscribeTickets: (() => void) | null = null;
    let isMounted = true;

    const fetchProjectAndInvoices = async () => {
      try {
        const [projData, invoicesData] = await Promise.all([
          getProjectByClient(clientData.uid),
          getInvoicesByClient(clientData.uid)
        ]);
        if (isMounted) {
          setProject(projData);
          setInvoices(invoicesData);
        }
      } catch (error) {
        console.error("Failed to fetch project/invoices", error);
      }
    };

    // Subscribe to real-time tickets
    unsubscribeTickets = subscribeToClientTickets(clientData.uid, (ticketsData) => {
      if (isMounted) {
        setTickets(ticketsData);
        setIsLoadingData(false); // Stop loading after first tickets snapshot
      }
    });

    fetchProjectAndInvoices();

    return () => {
      isMounted = false;
      if (unsubscribeTickets) unsubscribeTickets();
    };
  }, [clientData]);

  useEffect(() => {
      if (!selectedTicket?.id) return;
      const unsubscribe = subscribeToTicketMessages(selectedTicket.id, setTicketMessages);
      return () => unsubscribe();
  }, [selectedTicket]);

  useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticketMessages]);

  // Update preferences when clientData changes
  useEffect(() => {
    if (clientData) {
      setPreferences({
        notificationsEnabled: clientData.notificationsEnabled ?? true,
      });
    }
  }, [clientData]);

  const handleCreateTicket = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!clientData?.uid) return;
      
      setIsCreatingTicket(true);
      try {
          const newTicket = await createTicket(clientData.uid, newTicketForm.subject, newTicketForm.priority);
          setTickets(prev => [newTicket, ...prev]);
          setIsNewTicketOpen(false);
          setNewTicketForm({ subject: '', priority: 'medium' });
          setSelectedTicket(newTicket); // Open chat for the new ticket
      } catch(error) {
          console.error("Failed to create ticket:", error);
      } finally {
          setIsCreatingTicket(false);
      }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!selectedTicket?.id || !newMessage.trim() || !clientData) return;
      
      await addTicketMessage(selectedTicket.id, clientData.uid, newMessage, clientData.companyName || 'Client', false);
      setNewMessage('');
  }

  const handleSavePreferences = async () => {
    if (!clientData?.uid) return;
    
    try {
      await updateClientPreferences(clientData.uid, preferences);
      // Close settings modal
      setShowSettings(false);
      // Optionally show a success message (could be added later)
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
  };

  const handleUpdateProfile = async (profileData: any) => {
    if (!clientData?.uid) return;
    
    setIsUpdatingProfile(true);
    setProfileError(null);
    setProfileSuccess(false);
    
    try {
      await updateClientProfile(clientData.uid, profileData);
      setProfileSuccess(true);
      // Reset error state
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      setProfileError(error.message || "Erreur lors de la mise à jour du profil");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
    setIsUpdatingPassword(true);
    setPasswordError(null);
    setPasswordSuccess(false);
    
    try {
      await updateClientPassword(currentPassword, newPassword);
      setPasswordSuccess(true);
      // Reset error state
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error: any) {
      console.error("Failed to update password:", error);
      setPasswordError(error.message || "Erreur lors du changement de mot de passe");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (isLoadingData) {
      return (
          <div className="min-h-screen bg-[#050505] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          </div>
      );
  }

  if (isLocked) {
      return <BlockedAccessScreen t={t} onLogout={logout} />;
  }

  return (
    <section className="pt-28 pb-12 px-6 min-h-screen bg-[#050505] text-neutral-200">
      <div className="max-w-7xl mx-auto mb-8 space-y-4">
          {isTrial && <TrialBanner daysLeft={daysLeftInTrial} t={t} />}
          {isReadOnly && <PastDueBanner t={t} />}
      </div>

      <div className="max-w-7xl mx-auto">
        <DashboardHeader project={project} clientData={clientData} onNewTicket={() => setIsNewTicketOpen(true)} onLogout={logout} isReadOnly={isReadOnly} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProjectStatusCard project={project} />
            <SupportTicketsCard tickets={tickets} onTicketSelect={setSelectedTicket} onNewTicket={() => setIsNewTicketOpen(true)} isReadOnly={isReadOnly} t={t} />
          </div>
          <div className="space-y-8">
            <SubscriptionCard clientData={clientData} status={status} onShowInvoices={() => setShowInvoices(true)} t={t} isReadOnly={isReadOnly} isTrial={isTrial} />
            <TechStatusCard />
            <QuickActions onShowSettings={() => setShowSettings(true)} onLogout={logout} />
          </div>
        </div>
      </div>

      {isNewTicketOpen && <NewTicketModal onClose={() => setIsNewTicketOpen(false)} onSubmit={handleCreateTicket} form={newTicketForm} setForm={setNewTicketForm} isCreating={isCreatingTicket} t={t} />}
      {selectedTicket && <TicketChatModal ticket={selectedTicket} messages={ticketMessages} onClose={() => setSelectedTicket(null)} onSendMessage={handleSendMessage} newMessage={newMessage} setNewMessage={setNewMessage} chatEndRef={chatEndRef} isReadOnly={isReadOnly} t={t} />}
      {showInvoices && <InvoicesModal invoices={invoices} onClose={() => setShowInvoices(false)} t={t} />}
      {showSettings && (
        <SettingsModal 
          onClose={() => setShowSettings(false)} 
          preferences={preferences}
          setPreferences={setPreferences}
          onSave={handleSavePreferences}
          clientData={clientData}
          onUpdateProfile={handleUpdateProfile}
          onUpdatePassword={handleUpdatePassword}
          isUpdatingProfile={isUpdatingProfile}
          isUpdatingPassword={isUpdatingPassword}
          profileError={profileError}
          passwordError={passwordError}
          profileSuccess={profileSuccess}
          passwordSuccess={passwordSuccess}
        />
      )}

    </section>
  );
};

// These are now dumb components, receiving props.
const BlockedAccessScreen = ({ t, onLogout }: any) => (
    <section className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
                <Lock className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Accès Bloqué</h2>
            <p className="text-neutral-400 mb-6">
                Votre compte est actuellement suspendu. Veuillez contacter le support pour régulariser votre situation.
            </p>
            <button
                onClick={onLogout}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-colors"
            >
                Se déconnecter
            </button>
        </div>
    </section>
);
const TrialBanner = ({ daysLeft, t }: any) => (
    <FadeIn>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20">
                        <Clock className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white text-lg">{t.dashboard.alerts.trial_title}</h3>
                        <p className="text-neutral-300 mt-1">
                            {t.dashboard.alerts.trial_desc} <span className="font-bold text-white">{daysLeft}</span> {t.dashboard.alerts.trial_days} {t.dashboard.alerts.trial_end}
                        </p>
                    </div>
                </div>
                <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
                    {t.dashboard.alerts.trial_btn}
                </button>
            </div>
        </div>
    </FadeIn>
);
const PastDueBanner = ({ t }: any) => (
    <FadeIn>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20">
                        <AlertTriangle className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white text-lg">{t.dashboard.alerts.past_due_title}</h3>
                        <p className="text-neutral-300 mt-1">
                            {t.dashboard.alerts.past_due_desc}
                        </p>
                    </div>
                </div>
                <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
                    {t.dashboard.subscription.btn_regularize}
                </button>
            </div>
        </div>
    </FadeIn>
);
const DashboardHeader = ({ project, clientData, onNewTicket, onLogout, isReadOnly }: any) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
            <h1 className="text-3xl font-bold text-white">Bonjour, {clientData?.fullName || clientData?.companyName || 'Client'}</h1>
            <p className="text-neutral-400 mt-2">
                {project ? `Votre projet "${project.name}" est en cours.` : 'Aucun projet actif.'}
            </p>
        </div>
        <div className="flex items-center gap-4">
            {!isReadOnly && (
                <button
                    onClick={onNewTicket}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                    <Plus size={18} />
                    Nouveau ticket
                </button>
            )}
            <button
                onClick={onLogout}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
                <LogOut size={18} />
                Déconnexion
            </button>
        </div>
    </div>
);
const ProjectStatusCard = ({ project }: any) => (
    <FadeIn delay={200}>
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <LayoutDashboard size={18} />
                    État du Projet
                </h3>
                {project && (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                        {project.status || 'En cours'}
                    </span>
                )}
            </div>
            {project ? (
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-neutral-300">Progression</span>
                            <span className="text-white font-medium">{project.progress || 0}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                style={{ width: `${project.progress || 0}%` }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-lg">
                            <p className="text-neutral-400 text-sm">Étape actuelle</p>
                            <p className="text-white font-medium mt-1">{project.currentStage || 'Design'}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg">
                            <p className="text-neutral-400 text-sm">Délai estimé</p>
                            <p className="text-white font-medium mt-1">{project.estimatedDays || 14} jours</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-neutral-500">Aucun projet actif pour le moment.</p>
                    <p className="text-neutral-400 text-sm mt-2">Un projet sera créé sous peu par notre équipe.</p>
                </div>
            )}
        </div>
    </FadeIn>
);
const SupportTicketsCard = ({ tickets, onTicketSelect, onNewTicket, isReadOnly, t }: any) => (
    <FadeIn delay={300}>
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center gap-2"><MessageSquare size={18} /> {t.dashboard.tickets.last_tickets}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.02] text-neutral-400 font-medium">
                        <tr>
                            <th className="px-6 py-3">{t.dashboard.tickets.table_headers.subject}</th>
                            <th className="px-6 py-3">{t.dashboard.tickets.table_headers.date}</th>
                            <th className="px-6 py-3">{t.dashboard.tickets.table_headers.status}</th>
                            <th className="px-6 py-3 text-right">{t.dashboard.tickets.table_headers.action}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {tickets.length > 0 ? tickets.map((ticket: TicketData) => (
                            <tr key={ticket.id} onClick={() => onTicketSelect(ticket)} className="hover:bg-white/5 cursor-pointer">
                                <td className="px-6 py-4 text-white font-medium">{ticket.subject}</td>
                                <td className="px-6 py-4 text-neutral-400">{ticket.createdAt ? new Date(ticket.createdAt.seconds * 1000).toLocaleDateString() : '-'}</td>
                                <td className="px-6 py-4 text-neutral-400 capitalize">{ticket.status}</td>
                                <td className="px-6 py-4 text-right"><ChevronRight size={16} /></td>
                            </tr>
                        )) : (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-neutral-500">{t.dashboard.tickets.no_tickets}</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            {!isReadOnly && <div className="p-4 bg-white/[0.02] border-t border-white/5"><button onClick={onNewTicket} className="w-full py-2 border border-dashed border-white/10 rounded-lg text-neutral-400 text-sm hover:text-emerald-400 transition-all">{t.dashboard.tickets.new_ticket_button}</button></div>}
        </div>
    </FadeIn>
);
// ... Other dumb components for UI ...
const SubscriptionCard = ({ clientData, status, onShowInvoices, t, isReadOnly, isTrial }: any) => (
    <FadeIn delay={400}>
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <CreditCard size={18} />
                    {t.dashboard.subscription.title}
                </h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                    status === 'trial' ? 'bg-blue-500/20 text-blue-400' :
                    status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                }`}>
                    {t.dashboard.subscription[`status_${status}`] || status}
                </span>
            </div>
            <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-neutral-400 text-sm">Plan</p>
                    <p className="text-white font-medium mt-1">{clientData?.plan || 'Pack BOOST'}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-neutral-400 text-sm">{t.dashboard.subscription.next_due}</p>
                    <p className="text-white font-medium mt-1">15 {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</p>
                </div>
                <p className="text-neutral-400 text-sm">{t.dashboard.subscription.trust_message}</p>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onShowInvoices}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <FileText size={16} />
                        {t.dashboard.subscription.btn_invoices}
                    </button>
                    {isTrial && !isReadOnly && (
                        <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors">
                            {t.dashboard.subscription.btn_activate}
                        </button>
                    )}
                    {status === 'pending' && (
                        <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors">
                            {t.dashboard.subscription.btn_regularize}
                        </button>
                    )}
                </div>
            </div>
        </div>
    </FadeIn>
);
const TechStatusCard = () => (
    <FadeIn delay={500}>
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold text-white flex items-center gap-2 mb-6">
                <ShieldCheck size={18} />
                État Technique
            </h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-white font-medium">Site en ligne</p>
                            <p className="text-neutral-400 text-sm">Uptime 99.9%</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                        OK
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Save className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-white font-medium">Sauvegarde</p>
                            <p className="text-neutral-400 text-sm">Dernière: Aujourd'hui</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                        À jour
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-white font-medium">Sécurité</p>
                            <p className="text-neutral-400 text-sm">Scan quotidien</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm font-medium rounded-full">
                        Vigilance
                    </div>
                </div>
            </div>
        </div>
    </FadeIn>
);
const QuickActions = ({ onShowSettings, onLogout }: any) => (
    <FadeIn delay={600}>
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold text-white flex items-center gap-2 mb-6">
                <Settings size={18} />
                Actions Rapides
            </h3>
            <div className="space-y-3">
                <button
                    onClick={onShowSettings}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <Settings size={16} />
                    Paramètres
                </button>
                <button
                    onClick={onLogout}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <LogOut size={16} />
                    Déconnexion
                </button>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Download size={16} />
                    Télécharger mes données
                </button>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    Accéder au site public
                </button>
            </div>
        </div>
    </FadeIn>
);
const NewTicketModal = ({ onClose, onSubmit, form, setForm, isCreating, t }: any) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-semibold text-white text-lg">{t.dashboard.tickets.new_title}</h3>
                <button onClick={onClose} className="text-neutral-400 hover:text-white">
                    <X size={20} />
                </button>
            </div>
            <form onSubmit={onSubmit} className="p-6 space-y-6">
                <div>
                    <label className="block text-neutral-300 text-sm mb-2">{t.dashboard.tickets.subject_label}</label>
                    <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder={t.dashboard.tickets.subject_placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-neutral-300 text-sm mb-2">{t.dashboard.tickets.priority_label}</label>
                    <div className="grid grid-cols-3 gap-3">
                        {(['low', 'medium', 'high'] as const).map((priority) => (
                            <button
                                key={priority}
                                type="button"
                                onClick={() => setForm({ ...form, priority })}
                                className={`py-3 rounded-lg border text-sm font-medium transition-colors ${
                                    form.priority === priority
                                        ? priority === 'low' ? 'bg-blue-500/20 border-blue-500 text-blue-400' :
                                          priority === 'medium' ? 'bg-amber-500/20 border-amber-500 text-amber-400' :
                                          'bg-red-500/20 border-red-500 text-red-400'
                                        : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'
                                }`}
                            >
                                {t.dashboard.tickets[`priority_${priority}`]}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={isCreating}
                        className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {isCreating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {t.dashboard.tickets.creating}
                            </>
                        ) : t.dashboard.tickets.create_btn}
                    </button>
                </div>
            </form>
        </div>
    </div>
);
const TicketChatModal = ({ ticket, messages, onClose, onSendMessage, newMessage, setNewMessage, chatEndRef, isReadOnly, t }: any) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-white text-lg">{t.dashboard.tickets.chat_header}</h3>
                    <p className="text-neutral-400 text-sm">Ticket: {ticket.subject}</p>
                </div>
                <button onClick={onClose} className="text-neutral-400 hover:text-white">
                    <X size={20} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length > 0 ? messages.map((msg: any, idx: number) => (
                    <div key={idx} className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.isAdmin ? 'bg-white/5' : 'bg-emerald-500/20'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.isAdmin ? 'bg-blue-500/20' : 'bg-emerald-500/20'}`}>
                                    {msg.isAdmin ? <Bot size={16} /> : <User size={16} />}
                                </div>
                                <span className="font-medium text-white">{msg.senderName}</span>
                                <span className="text-neutral-400 text-sm">{msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleString() : 'Now'}</span>
                            </div>
                            <p className="text-white">{msg.content}</p>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-12">
                        <p className="text-neutral-500">{t.dashboard.tickets.no_messages}</p>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            {!isReadOnly && (
                <form onSubmit={onSendMessage} className="p-6 border-t border-white/5">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={t.dashboard.tickets.chat_placeholder}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Send size={16} />
                            {t.dashboard.tickets.send_btn}
                        </button>
                    </div>
                </form>
            )}
        </div>
    </div>
);
const InvoicesModal = ({ invoices, onClose, t }: any) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-semibold text-white text-lg">{t.dashboard.invoices.title}</h3>
                <button onClick={onClose} className="text-neutral-400 hover:text-white">
                    <X size={20} />
                </button>
            </div>
            <div className="overflow-y-auto flex-1 p-6">
                {invoices.length > 0 ? (
                    <div className="space-y-4">
                        {invoices.map((inv: any) => (
                            <div key={inv.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <p className="text-white font-medium">{inv.description || t.dashboard.invoices.monthly_label}</p>
                                        <p className="text-neutral-400 text-sm mt-1">
                                            {inv.createdAt?.seconds ? new Date(inv.createdAt.seconds * 1000).toLocaleDateString() : 'Date inconnue'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-white font-bold text-xl">{inv.amount} MAD</p>
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${inv.paid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                {inv.paid ? t.dashboard.invoices.status_paid : t.dashboard.invoices.status_unpaid}
                                            </span>
                                        </div>
                                        {!inv.paid && (
                                            <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors">
                                                {t.dashboard.invoices.pay_btn}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-neutral-500">{t.dashboard.invoices.empty}</p>
                    </div>
                )}
            </div>
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                <p className="text-neutral-400 text-sm text-center">{t.dashboard.invoices.footer}</p>
            </div>
        </div>
    </div>
);
const SettingsModal = ({ onClose, preferences, setPreferences, onSave, clientData, onUpdateProfile, onUpdatePassword, isUpdatingProfile, isUpdatingPassword, profileError, passwordError, profileSuccess, passwordSuccess }: any) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'profile' | 'password'>('notifications');
  const [profileForm, setProfileForm] = useState({
    displayName: clientData?.fullName || '',
    companyName: clientData?.companyName || '',
    phone: clientData?.phone || '',
    notes: clientData?.notes || ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const toggleNotifications = () => {
    setPreferences({ ...preferences, notificationsEnabled: !preferences.notificationsEnabled });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateProfile(profileForm);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    await onUpdatePassword(passwordForm.currentPassword, passwordForm.newPassword);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-semibold text-white text-lg">Paramètres</h3>
                <button onClick={onClose} className="text-neutral-400 hover:text-white">
                    <X size={20} />
                </button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-white/5">
                <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'notifications' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-neutral-400 hover:text-white'}`}
                >
                    Notifications
                </button>
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'profile' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-neutral-400 hover:text-white'}`}
                >
                    Profil
                </button>
                <button
                    onClick={() => setActiveTab('password')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'password' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-neutral-400 hover:text-white'}`}
                >
                    Mot de passe
                </button>
            </div>

            <div className="p-6">
                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-neutral-300 text-sm mb-2">Notifications par email</label>
                            <div className="flex items-center justify-between">
                                <span className="text-white">Recevoir les notifications</span>
                                <div className="relative">
                                    <input 
                                      type="checkbox" 
                                      className="sr-only" 
                                      id="notifications" 
                                      checked={preferences.notificationsEnabled}
                                      onChange={toggleNotifications}
                                    />
                                    <label htmlFor="notifications" className="block w-12 h-6 bg-white/10 rounded-full cursor-pointer">
                                        <span 
                                          className={`block w-6 h-6 bg-emerald-500 rounded-full transform transition-transform ${preferences.notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <button 
                              onClick={onSave}
                              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
                            >
                                Enregistrer les modifications
                            </button>
                        </div>
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        {profileSuccess && (
                            <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
                                Profil mis à jour avec succès
                            </div>
                        )}
                        {profileError && (
                            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                {profileError}
                            </div>
                        )}
                        <div>
                            <label className="block text-neutral-300 text-sm mb-2">Nom complet</label>
                            <input
                                type="text"
                                name="displayName"
                                value={profileForm.displayName}
                                onChange={handleProfileChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Votre nom complet"
                            />
                        </div>
                        <div>
                            <label className="block text-neutral-300 text-sm mb-2">Nom de l'entreprise</label>
                            <input
                                type="text"
                                name="companyName"
                                value={profileForm.companyName}
                                onChange={handleProfileChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Nom de votre entreprise"
                            />
                        </div>
                        <div>
                            <label className="block text-neutral-300 text-sm mb-2">Téléphone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={profileForm.phone}
                                onChange={handleProfileChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Votre numéro de téléphone"
                            />
                        </div>
                        <div>
                            <label className="block text-neutral-300 text-sm mb-2">Notes (optionnel)</label>
                            <textarea
                                name="notes"
                                value={profileForm.notes}
                                onChange={handleProfileChange}
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                                placeholder="Notes supplémentaires..."
                            />
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <button 
                              type="submit"
                              disabled={isUpdatingProfile}
                              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isUpdatingProfile ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Mise à jour...
                                    </>
                                ) : 'Mettre à jour le profil'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Password Tab */}
                {activeTab === 'password' && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        {passwordSuccess && (
                            <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
                                Mot de passe mis à jour avec succès
                            </div>
                        )}
                        {passwordError && (
                            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                {passwordError}
                            </div>
                        )}
                        <div>
                            <label className="block text-neutral-300 text-sm mb-2">Mot de passe actuel</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordForm.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Entrez votre mot de passe actuel"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-neutral-300 text-sm mb-2">Nouveau mot de passe</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Entrez votre nouveau mot de passe"
                                required
                                minLength={6}
                            />
                            <p className="text-neutral-500 text-xs mt-1">Minimum 6 caractères</p>
                        </div>
                        <div>
                            <label className="block text-neutral-300 text-sm mb-2">Confirmer le nouveau mot de passe</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Confirmez votre nouveau mot de passe"
                                required
                            />
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <button 
                              type="submit"
                              disabled={isUpdatingPassword}
                              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isUpdatingPassword ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Mise à jour...
                                    </>
                                ) : 'Changer le mot de passe'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    </div>
  );
};



export default Dashboard;