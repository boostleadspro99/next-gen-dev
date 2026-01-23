import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Settings, 
  Globe, 
  MessageSquare,
  LogOut,
  CheckCircle2,
  Clock,
  FileText,
  Download,
  Plus,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  X,
  Lock,
  Save,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import { useAuth } from '../contexts/AuthContext';
import { getProjectByClient, getTicketsByClient } from '../services/firestore';
import type { ProjectData, TicketData } from '../types/db';

const Dashboard: React.FC = () => {
  const { clientData, logout } = useAuth();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [showSettings, setShowSettings] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  useEffect(() => {
    const fetchData = async () => {
        if (!clientData?.uid) return;
        
        try {
            const [projData, ticketsData] = await Promise.all([
                getProjectByClient(clientData.uid),
                getTicketsByClient(clientData.uid)
            ]);
            setProject(projData);
            setTickets(ticketsData);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    fetchData();
  }, [clientData]);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    // Simulate API Call for now (Requires re-authentication in Firebase)
    setTimeout(() => {
        setSaveStatus('success');
        setTimeout(() => {
            setSaveStatus('idle');
            setShowSettings(false);
            setPasswordForm({ current: '', new: '', confirm: '' });
        }, 1500);
    }, 1000);
  };

  if (isLoadingData) {
      return (
          <div className="min-h-screen bg-[#050505] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          </div>
      );
  }

  return (
    // THÈME SOMBRE : Fond #050505
    <section className="pt-28 pb-12 px-6 min-h-screen bg-[#050505] relative text-neutral-200">
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
          
          <FadeIn delay={100} className="flex gap-3">
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
             
             <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
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
                                        status={step.status} 
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
                    <div className="p-4 bg-white/[0.02] border-t border-white/5">
                        <button className="w-full py-2 border border-dashed border-white/10 rounded-lg text-neutral-400 text-sm hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2 font-medium">
                            <Plus size={16} />
                            Ouvrir un nouveau ticket
                        </button>
                    </div>
                </div>
            </FadeIn>

          </div>

          {/* COLONNE DROITE (1/3) */}
          <div className="space-y-8">
            
            {/* 3. ABONNEMENT & FACTURATION */}
            <FadeIn delay={200} direction="left">
                <div className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/10 rounded-2xl p-6 relative overflow-hidden group text-white shadow-2xl">
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-700"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-white font-semibold">Mon Abonnement</h3>
                            <p className="text-xs text-neutral-400 mt-1 capitalize">Pack {clientData?.plan || 'Boost'}</p>
                        </div>
                        <div className={`px-2 py-1 border text-[10px] font-bold uppercase rounded tracking-wide ${clientData?.subscriptionStatus === 'active' || clientData?.subscriptionStatus === 'trial' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-red-500/20 border-red-500/30 text-red-400'}`}>
                            {clientData?.subscriptionStatus === 'trial' ? 'Essai' : clientData?.subscriptionStatus === 'active' ? 'Actif' : 'Inactif'}
                        </div>
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold text-white">
                            {clientData?.plan === 'business' ? '399' : clientData?.plan === 'presence' ? '199' : '249'} MAD
                        </span>
                        <span className="text-sm text-neutral-400">/mois</span>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3 mb-6 flex items-center gap-3 border border-white/5">
                        <Clock size={16} className="text-neutral-400" />
                        <div className="flex-1">
                            <div className="text-[10px] text-neutral-500 uppercase font-bold">Prochain Paiement</div>
                            <div className="text-sm text-white font-medium">01 Prochain Mois</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                            <CreditCard size={16} />
                            Gérer le paiement
                        </button>
                        <button className="w-full py-2.5 bg-transparent border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                            <Download size={16} />
                            Dernière facture
                        </button>
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
}

const TicketRow: React.FC<TicketRowProps> = ({ id, subject, date, priority, status }) => {
    let statusBadge;
    if (status === 'resolved' || status === 'Résolu') statusBadge = <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Résolu</span>;
    else if (status === 'open' || status === 'pending' || status === 'En cours') statusBadge = <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">En cours</span>;
    else statusBadge = <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-neutral-400 border border-white/10">Fermé</span>;

    return (
        <tr className="hover:bg-white/5 transition-colors group cursor-pointer border-b border-white/5 last:border-0">
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