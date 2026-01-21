import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  CreditCard, 
  Settings, 
  Users, 
  ArrowUpRight, 
  Globe, 
  Server, 
  MessageSquare,
  LogOut,
  TrendingUp,
  Download,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

const Dashboard: React.FC = () => {
  return (
    <section className="pt-24 pb-12 px-6 min-h-screen bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <FadeIn>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Bonjour, Alexandre</h1>
              <p className="text-neutral-400 mt-1">Voici ce qui se passe sur <span className="text-emerald-400 font-medium">alex-renovation.com</span> aujourd'hui.</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={100} className="flex gap-3">
             <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                <Globe size={16} className="text-neutral-400" />
                Voir le site
             </button>
             <button className="px-4 py-2 bg-emerald-500 text-neutral-950 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2">
                <MessageSquare size={16} />
                Support
             </button>
          </FadeIn>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            title="Visiteurs uniques" 
            value="1,284" 
            change="+12.5%" 
            icon={<Users size={20} />} 
            delay={100}
          />
          <StatCard 
            title="Taux de conversion" 
            value="4.2%" 
            change="+0.8%" 
            icon={<TrendingUp size={20} />} 
            delay={200}
            isHighlighted
          />
          <StatCard 
            title="Leads générés (30j)" 
            value="42" 
            change="+5" 
            icon={<BarChart3 size={20} />} 
            delay={300}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Column (Leads & Content) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Recent Leads Table */}
            <FadeIn delay={400}>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-semibold text-white">Derniers Contacts</h3>
                  <button className="text-xs font-medium text-emerald-500 hover:text-emerald-400">Tout voir</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.02] text-neutral-500 font-medium">
                      <tr>
                        <th className="px-6 py-3">Nom</th>
                        <th className="px-6 py-3">Source</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-neutral-300">
                      <LeadRow name="Sophie Martin" source="Formulaire Devis" date="Aujourd'hui, 14:20" status="Nouveau" />
                      <LeadRow name="Jean Dupont" source="Appel Clic" date="Hier, 09:15" status="Traité" />
                      <LeadRow name="Agence Immo Pro" source="WhatsApp" date="28 Oct, 18:30" status="En attente" />
                      <LeadRow name="Lucas B." source="Formulaire Contact" date="27 Oct, 11:45" status="Traité" />
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Quick Actions */}
            <FadeIn delay={500}>
               <div className="grid sm:grid-cols-2 gap-4">
                  <ActionCard 
                    title="Demander une modification" 
                    desc="Changer du texte, une image ou une couleur."
                    icon={<Settings size={20} />}
                  />
                  <ActionCard 
                    title="Télécharger mes factures" 
                    desc="Historique complet de vos paiements."
                    icon={<Download size={20} />}
                  />
               </div>
            </FadeIn>
          </div>

          {/* Right Column (Server Status & Plan) */}
          <div className="space-y-8">
            
            {/* Server Status */}
            <FadeIn delay={600} direction="left">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                  <Server size={18} className="text-neutral-500" />
                  État Technique
                </h3>
                
                <div className="space-y-5">
                  <StatusRow label="Disponibilité (Uptime)" value="100%" status="good" />
                  <StatusRow label="Certificat SSL" value="Actif (Sécurisé)" status="good" />
                  <StatusRow label="Vitesse (PageSpeed)" value="98/100" status="good" />
                  <StatusRow label="Dernière sauvegarde" value="Il y a 2h" status="neutral" />
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="flex items-start gap-3 p-3 bg-emerald-900/10 border border-emerald-500/20 rounded-lg">
                    <AlertCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-emerald-100/80 leading-relaxed">
                      Votre site est à jour. La dernière optimisation SEO a été effectuée le 25 Octobre.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Plan Info */}
            <FadeIn delay={700} direction="left">
              <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 rounded">Pack Boost</span>
                  <span className="text-xs text-neutral-500">Actif</span>
                </div>
                
                <div className="mb-6 relative z-10">
                  <div className="text-3xl font-bold text-white mb-1">99€<span className="text-sm font-normal text-neutral-500">/mois</span></div>
                  <p className="text-xs text-neutral-400">Prochain prélèvement le 01 Nov.</p>
                </div>

                <button className="w-full py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <CreditCard size={16} />
                  Gérer l'abonnement
                </button>
              </div>
            </FadeIn>

            <div className="text-center">
                <Link to="/" className="inline-flex items-center gap-2 text-xs text-neutral-600 hover:text-red-400 transition-colors">
                    <LogOut size={12} />
                    Se déconnecter
                </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ title, value, change, icon, delay, isHighlighted }: { title: string, value: string, change: string, icon: React.ReactNode, delay: number, isHighlighted?: boolean }) => (
  <FadeIn delay={delay}>
    <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
      isHighlighted 
        ? 'bg-emerald-500/5 border-emerald-500/30' 
        : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${isHighlighted ? 'bg-emerald-500 text-black' : 'bg-white/5 text-neutral-400 group-hover:text-white'}`}>
          {icon}
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
          isHighlighted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-500/10 text-emerald-500'
        }`}>
          <ArrowUpRight size={12} />
          {change}
        </div>
      </div>
      <div className="text-neutral-500 text-xs font-medium uppercase tracking-wide mb-1">{title}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  </FadeIn>
);

const LeadRow = ({ name, source, date, status }: { name: string, source: string, date: string, status: string }) => {
    let statusStyle = "bg-white/5 text-neutral-400 border-white/10";
    if (status === 'Nouveau') statusStyle = "bg-emerald-500/20 text-emerald-400 border-emerald-500/20";
    if (status === 'En attente') statusStyle = "bg-orange-500/10 text-orange-400 border-orange-500/20";
    
    return (
        <tr className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
            <td className="px-6 py-4 font-medium text-white">{name}</td>
            <td className="px-6 py-4">{source}</td>
            <td className="px-6 py-4 text-neutral-500">{date}</td>
            <td className="px-6 py-4">
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded border ${statusStyle}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
};

const StatusRow = ({ label, value, status }: { label: string, value: string, status: 'good' | 'neutral' | 'bad' }) => (
    <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-400">{label}</span>
        <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${status === 'good' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-neutral-500'}`}></span>
            <span className="text-white font-medium">{value}</span>
        </div>
    </div>
);

const ActionCard = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
    <button className="flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-emerald-500/30 transition-all text-left group w-full">
        <div className="p-2.5 rounded-lg bg-white/5 text-neutral-400 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
            {icon}
        </div>
        <div>
            <h4 className="text-white font-medium text-sm mb-1 group-hover:text-emerald-400 transition-colors">{title}</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
        </div>
    </button>
)

export default Dashboard;