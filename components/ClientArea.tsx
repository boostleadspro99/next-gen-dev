import React from 'react';
import { CreditCard, MessageSquare, Clock, FileCheck, LayoutDashboard } from 'lucide-react';
import FadeIn from './FadeIn';

const ClientArea: React.FC = () => {
  return (
    <section className="py-24 relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div>
           <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <LayoutDashboard size={14} className="text-emerald-500" />
                <span className="text-xs font-medium text-white uppercase tracking-wider">Inclus dans l'abonnement</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
                Plus qu'une agence. <br />
                <span className="text-emerald-500">Une plateforme.</span>
              </h2>
              <p className="text-neutral-400 text-lg mb-8 leading-relaxed font-light">
                NexGen n'est pas un prestataire avec qui vous échangez des emails perdus. 
                C'est un véritable <strong>Mini-SaaS</strong> qui centralise toute votre activité digitale. 
                Transparence totale, contrôle absolu.
              </p>

              <div className="space-y-6">
                <FeatureRow 
                  icon={<Clock size={20} />}
                  title="Suivi de projet en temps réel"
                  desc="Une timeline interactive pour savoir exactement où en est la création de votre site. Zéro zone d'ombre."
                />
                <FeatureRow 
                  icon={<MessageSquare size={20} />}
                  title="Support & Tickets SAV"
                  desc="Une demande de modification ? Ouvrez un ticket, suivez son traitement et soyez notifié quand c'est fait."
                />
                 <FeatureRow 
                  icon={<FileCheck size={20} />}
                  title="Facturation centralisée"
                  desc="Retrouvez toutes vos factures, gérez votre abonnement et vos moyens de paiement en un clic."
                />
              </div>
           </FadeIn>
        </div>

        {/* Right Visual - The SaaS Interface */}
        <FadeIn delay={200} direction="left">
           {/* Abstract representation of the UI */}
           <div className="relative pt-8 lg:pt-0">
              {/* Main Card (Project) */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10 hover:border-emerald-500/20 transition-colors duration-500">
                 {/* Header Mockup */}
                 <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs">N</div>
                        <div className="text-sm font-medium text-white">Espace Client</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/10"></div>
                 </div>

                 {/* Kanban / Timeline Mockup */}
                 <div className="space-y-4 mb-8">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Avancement du projet</div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <StatusCard stage="1. Audit" status="done" />
                        <StatusCard stage="2. Design" status="done" />
                        <StatusCard stage="3. Dév." status="active" />
                        <StatusCard stage="4. Ligne" status="pending" />
                    </div>
                 </div>

                 {/* Ticket Mockup Overlay */}
                 <div className="bg-[#111] rounded-xl border border-white/10 p-4 mt-4 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-2 items-center">
                             <div className="p-1.5 rounded bg-blue-500/10 text-blue-400"><MessageSquare size={14}/></div>
                             <span className="text-xs sm:text-sm text-white font-medium">Ticket #204 - Modif' Horaire</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-medium">Résolu</span>
                    </div>
                    <p className="text-xs text-neutral-500 pl-8 leading-relaxed">"C'est fait ! Les horaires ont été mis à jour sur le pied de page et la page contact..."</p>
                 </div>
              </div>

              {/* Floating Element - Invoice */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 md:-right-12 bg-[#0F0F0F] border border-white/10 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-20 w-56 sm:w-64 animate-float">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><CreditCard size={16}/></div>
                    <div>
                        <div className="text-[10px] text-neutral-400 uppercase tracking-wide">Abonnement BOOST</div>
                        <div className="text-sm font-bold text-white">Actif • 99€/mois</div>
                    </div>
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-3/4 bg-emerald-500 rounded-full"></div>
                 </div>
                 <div className="mt-2 text-[10px] text-neutral-500 text-right">Prochaine facture: 01 Nov</div>
              </div>
           </div>
        </FadeIn>

      </div>
    </section>
  );
};

const FeatureRow = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex gap-4 group">
    <div className="mt-1 w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-medium mb-1 group-hover:text-emerald-400 transition-colors">{title}</h4>
      <p className="text-sm text-neutral-400 leading-relaxed font-light">{desc}</p>
    </div>
  </div>
)

const StatusCard = ({ stage, status }: { stage: string, status: 'done' | 'active' | 'pending' }) => {
    let styles = "border-white/5 bg-white/5 text-neutral-600";
    if (status === 'done') styles = "border-emerald-500/20 bg-emerald-500/10 text-emerald-500";
    if (status === 'active') styles = "border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)] bg-emerald-900/20";

    return (
        <div className={`flex-1 min-w-[70px] py-2 px-1 rounded border text-[10px] font-medium text-center transition-all ${styles}`}>
            {stage}
        </div>
    )
}

export default ClientArea;