import React from 'react';
import { LayoutTemplate, MapPin, MessageCircle, FileText, Bot, BarChart3, CheckCircle2, LayoutDashboard, Smartphone, Globe, ExternalLink, MessageSquare, LogOut, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const Features: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section 
      id="solutions" 
      className="py-24 lg:py-32 px-6 relative z-20 border-y border-white/5 bg-[#030303]" 
    >
      <style>{`
        @keyframes moveDot {
          0%, 100% { top: 10%; right: 10%; }
          25% { top: 10%; right: calc(100% - 35px); }
          50% { top: calc(100% - 30px); right: calc(100% - 35px); }
          75% { top: calc(100% - 30px); right: 10%; }
        }
      `}</style>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 lg:mb-24">
          <FadeIn>
            <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-3 block">
               Puissantes Fonctionnalités
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              {t.features.header_title_1} <br className="hidden md:block" />
              <span className="text-emerald-500">{t.features.header_title_2}</span>
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
              {t.features.header_desc}
            </p>
          </FadeIn>
        </div>

        {/* 6 Conversion Features Grid - Animated Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <AnimatedFeatureCard 
            icon={<LayoutTemplate size={24} />}
            title={t.features.cards.structure.title}
            desc={t.features.cards.structure.desc}
            delay={0}
          />
          <AnimatedFeatureCard 
            icon={<MapPin size={24} />}
            title={t.features.cards.seo.title}
            desc={t.features.cards.seo.desc}
            delay={100}
          />
          <AnimatedFeatureCard 
            icon={<Smartphone size={24} />}
            title={t.features.cards.contact.title}
            desc={t.features.cards.contact.desc}
            delay={200}
          />
          <AnimatedFeatureCard 
            icon={<FileText size={24} />}
            title={t.features.cards.forms.title}
            desc={t.features.cards.forms.desc}
            delay={300}
          />
          <AnimatedFeatureCard 
            icon={<Bot size={24} />}
            title={t.features.cards.chatbot.title}
            desc={t.features.cards.chatbot.desc}
            delay={400}
          />
          <AnimatedFeatureCard 
            icon={<BarChart3 size={24} />}
            title={t.features.cards.stats.title}
            desc={t.features.cards.stats.desc}
            delay={500}
          />
        </div>

        {/* Dashboard Visual Spotlight - Updated to Match Real App UI exactly (DARK THEME) */}
        <div className="perspective-1000 w-full max-w-5xl mx-auto">
          <FadeIn delay={200} direction="up" className="h-full">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Inclus : Votre Espace Client
              </span>
            </div>
            
            {/* Main Wrapper */}
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-[#1a1a1a] to-[#0A0A0A] border border-white/10 shadow-2xl backdrop-blur-sm lg:rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="bg-[#050505] rounded-xl overflow-hidden border border-white/10 h-full relative shadow-inner font-sans">
                
                {/* Fake Browser Header (Dark) */}
                <div className="px-4 py-3 border-b border-white/10 flex items-center gap-4 bg-[#0A0A0A]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E] opacity-80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] opacity-80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29] opacity-80"></div>
                  </div>
                  <div className="flex-1 bg-[#050505] rounded-md py-1 px-3 text-[10px] text-neutral-500 font-medium text-center border border-white/5 flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    app.nexgen.com/dashboard
                  </div>
                </div>

                {/* REAL APP DASHBOARD REPLICA (DARK MODE) */}
                <div className="p-6 md:p-8 bg-[#050505] text-left">
                  
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">Espace Client</h2>
                      <p className="text-neutral-400 mt-1 flex items-center gap-2 text-sm">
                        Compte : <span className="text-white font-medium">Alex Rénovation SARL</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-bold uppercase tracking-wider">Client Premium</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                       <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-neutral-300 flex items-center gap-2 shadow-sm hover:text-white transition-colors">
                          <Globe size={14} className="text-neutral-400" />
                          Voir mon site
                          <ExternalLink size={10} className="text-neutral-500" />
                       </div>
                       <div className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm">
                          <MessageSquare size={14} />
                          Nouveau Ticket
                       </div>
                       <div className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-neutral-400 shadow-sm hover:text-white transition-colors">
                          <LogOut size={14} />
                       </div>
                    </div>
                  </div>

                  {/* PROJECT PROGRESS CARD (Dark) */}
                  <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 shadow-sm mb-6 relative overflow-hidden">
                     {/* Glow Accent */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none opacity-60"></div>
                     
                     <div className="flex items-center justify-between mb-8 relative z-10">
                        <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                            <LayoutDashboard size={16} className="text-emerald-500" />
                            Avancement du Projet
                        </h3>
                        <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Phase 3 : Développement en cours
                        </span>
                    </div>

                    {/* Timeline Replica */}
                    <div className="relative z-10 px-2">
                        <div className="hidden md:block absolute top-3.5 left-0 w-full h-0.5 bg-white/5 z-0"></div>
                        <div className="flex flex-col md:flex-row justify-between relative gap-6 md:gap-0">
                            <TimelineStep step="1" title="Audit & Stratégie" date="Complété le 10 Oct" status="completed" />
                            <TimelineStep step="2" title="Design & Maquettes" date="Validé le 15 Oct" status="completed" />
                            <TimelineStep step="3" title="Développement" date="Livraison : 28 Oct" status="current" />
                            <TimelineStep step="4" title="Mise en ligne" date="En attente" status="pending" />
                        </div>
                    </div>
                  </div>

                  {/* TICKETS CARD (Dark) */}
                  <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                        <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                            <MessageSquare size={16} className="text-neutral-400" />
                            Derniers Tickets Support
                        </h3>
                        <span className="text-[10px] text-neutral-400 font-medium cursor-pointer hover:text-white transition-colors">Voir l'historique</span>
                    </div>
                    <div className="p-0">
                        <div className="grid grid-cols-1 divide-y divide-white/5">
                             <div className="px-6 py-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                                <div>
                                    <div className="text-xs font-bold text-white">Modification horaire footer</div>
                                    <div className="text-[10px] text-neutral-500">#2930 • Aujourd'hui</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] text-neutral-500 hidden sm:block">Basse</span>
                                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded">En cours</span>
                                    <ChevronRight size={14} className="text-neutral-600" />
                                </div>
                             </div>
                             <div className="px-6 py-3 flex items-center justify-between hover:bg-white/5 transition-colors">
                                <div>
                                    <div className="text-xs font-bold text-white">Problème formulaire contact</div>
                                    <div className="text-[10px] text-neutral-500">#2812 • 12 Oct 2023</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] text-neutral-500 hidden sm:block">Haute</span>
                                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded">Résolu</span>
                                    <ChevronRight size={14} className="text-neutral-600" />
                                </div>
                             </div>
                        </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const AnimatedFeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <FadeIn delay={delay}>
    <div className="w-full h-full min-h-[250px] rounded-[10px] p-[1px] relative overflow-hidden group">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_230px_at_0%_0%,#10b981,#0c0d0d)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

      {/* Moving Dot */}
      <div 
        className="aspect-square z-[2] w-[5px] rounded-full absolute bg-emerald-400 shadow-[0_0_10px_#34d399]"
        style={{ 
            animation: 'moveDot 6s linear infinite',
            boxShadow: '0 0 10px #34d399, 0 0 20px #34d399'
        }} 
      />

      {/* Main Content Container */}
      <div className="relative z-[1] flex flex-col text-white w-full h-full bg-[#050505] border border-white/5 rounded-[9px] p-6 items-center justify-center transition-colors">
        
        {/* Glow Blob Top Left */}
        <div 
            className="absolute top-0 left-0 w-[150px] h-[150px] bg-emerald-500/10 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
            style={{ transformOrigin: 'center' }}
        />

        {/* Icon Container */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4 z-10 text-emerald-500 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight z-10 text-center group-hover:text-emerald-400 transition-colors">
            {title}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed text-center z-10">
            {desc}
        </p>

        {/* Grid Lines */}
        <div 
            className="absolute w-full h-[1px] top-[10%] bg-gradient-to-r from-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
            style={{ maskImage: 'linear-gradient(90deg, transparent, black 0%, black 100%, transparent)' }}
        />
        <div 
            className="absolute w-[1px] h-full left-[10%] bg-gradient-to-b from-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ maskImage: 'linear-gradient(180deg, transparent, black 0%, black 100%, transparent)' }}
        />
        
        {/* Subtle static lines */}
        <div className="absolute w-full h-[1px] bottom-[10%] bg-white/5" />
        <div className="absolute w-[1px] h-full right-[10%] bg-white/5" />
      </div>
    </div>
  </FadeIn>
);

const TimelineStep = ({ step, title, date, status }: { step: string, title: string, date: string, status: 'completed' | 'current' | 'pending' }) => {
    // Styles for Dark Mode Dashboard mockup
    const bg = status === 'completed' 
        ? 'bg-emerald-600 text-white border-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
        : status === 'current' 
            ? 'bg-[#0A0A0A] text-emerald-400 border-emerald-500 ring-4 ring-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
            : 'bg-[#0A0A0A] text-neutral-600 border-white/10';
    
    const titleColor = status === 'pending' ? 'text-neutral-500' : 'text-white';

    return (
        <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 relative z-10">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] border-2 transition-all ${bg}`}>
                {status === 'completed' ? <CheckCircle2 size={12} /> : step}
            </div>
            <div className="md:text-center">
                <div className={`text-xs font-bold ${titleColor}`}>{title}</div>
                <div className="text-[10px] text-neutral-500">{date}</div>
            </div>
        </div>
    )
}

export default Features;