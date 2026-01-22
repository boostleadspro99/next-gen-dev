import React from 'react';
import { LayoutTemplate, MapPin, MessageCircle, FileText, Bot, BarChart3, CheckCircle2, LayoutDashboard, Smartphone, Globe, ExternalLink, MessageSquare, LogOut, ChevronRight, Clock } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const Features: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section 
      id="solutions" 
      className="py-24 lg:py-32 px-6 relative z-20 border-y border-white/5" 
      style={{ backgroundColor: '#030303' }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 lg:mb-24">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              {t.features.header_title_1} <br className="hidden md:block" />
              <span className="text-emerald-500">{t.features.header_title_2}</span>
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
              {t.features.header_desc}
            </p>
          </FadeIn>
        </div>

        {/* 6 Conversion Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <FeatureCard 
            icon={<LayoutTemplate size={24} />}
            title={t.features.cards.structure.title}
            desc={t.features.cards.structure.desc}
            delay={0}
          />
          <FeatureCard 
            icon={<MapPin size={24} />}
            title={t.features.cards.seo.title}
            desc={t.features.cards.seo.desc}
            delay={100}
          />
          <FeatureCard 
            icon={<Smartphone size={24} />}
            title={t.features.cards.contact.title}
            desc={t.features.cards.contact.desc}
            delay={200}
          />
          <FeatureCard 
            icon={<FileText size={24} />}
            title={t.features.cards.forms.title}
            desc={t.features.cards.forms.desc}
            delay={300}
          />
          <FeatureCard 
            icon={<Bot size={24} />}
            title={t.features.cards.chatbot.title}
            desc={t.features.cards.chatbot.desc}
            delay={400}
          />
          <FeatureCard 
            icon={<BarChart3 size={24} />}
            title={t.features.cards.stats.title}
            desc={t.features.cards.stats.desc}
            delay={500}
          />
        </div>

        {/* Dashboard Visual Spotlight - Updated to Match Real App UI exactly */}
        <div className="perspective-1000 w-full max-w-5xl mx-auto">
          <FadeIn delay={200} direction="up" className="h-full">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Inclus : Votre Espace Client
              </span>
            </div>
            
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-slate-200 to-slate-500/20 border border-slate-200/20 shadow-2xl backdrop-blur-sm lg:rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 h-full relative shadow-inner font-sans">
                
                {/* Fake Browser Header */}
                <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-4 bg-white">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                  </div>
                  <div className="flex-1 bg-slate-100 rounded-md py-1 px-3 text-[10px] text-slate-500 font-medium text-center border border-slate-200 flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    app.nexgen.com/dashboard
                  </div>
                </div>

                {/* REAL APP DASHBOARD REPLICA */}
                <div className="p-6 md:p-8 bg-slate-50 text-left">
                  
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Espace Client</h2>
                      <p className="text-slate-500 mt-1 flex items-center gap-2 text-sm">
                        Compte : <span className="text-slate-900 font-medium">Alex Rénovation SARL</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] border border-emerald-200 font-bold uppercase tracking-wider">Client Premium</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                       <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-2 shadow-sm">
                          <Globe size={14} className="text-slate-400" />
                          Voir mon site
                          <ExternalLink size={10} className="text-slate-400" />
                       </div>
                       <div className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm">
                          <MessageSquare size={14} />
                          Nouveau Ticket
                       </div>
                       <div className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 shadow-sm">
                          <LogOut size={14} />
                       </div>
                    </div>
                  </div>

                  {/* PROJECT PROGRESS CARD */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6 relative overflow-hidden">
                     {/* Light Accent */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[40px] pointer-events-none opacity-60"></div>
                     
                     <div className="flex items-center justify-between mb-8 relative z-10">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
                            <LayoutDashboard size={16} className="text-emerald-600" />
                            Avancement du Projet
                        </h3>
                        <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Phase 3 : Développement en cours
                        </span>
                    </div>

                    {/* Timeline Replica */}
                    <div className="relative z-10 px-2">
                        <div className="hidden md:block absolute top-3.5 left-0 w-full h-0.5 bg-slate-100 z-0"></div>
                        <div className="flex flex-col md:flex-row justify-between relative gap-6 md:gap-0">
                            <TimelineStep step="1" title="Audit & Stratégie" date="Complété le 10 Oct" status="completed" />
                            <TimelineStep step="2" title="Design & Maquettes" date="Validé le 15 Oct" status="completed" />
                            <TimelineStep step="3" title="Développement" date="Livraison : 28 Oct" status="current" />
                            <TimelineStep step="4" title="Mise en ligne" date="En attente" status="pending" />
                        </div>
                    </div>
                  </div>

                  {/* TICKETS CARD */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
                            <MessageSquare size={16} className="text-slate-400" />
                            Derniers Tickets Support
                        </h3>
                        <span className="text-[10px] text-slate-500 font-medium cursor-pointer">Voir l'historique</span>
                    </div>
                    <div className="p-0">
                        <div className="grid grid-cols-1 divide-y divide-slate-50">
                             <div className="px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div>
                                    <div className="text-xs font-bold text-slate-900">Modification horaire footer</div>
                                    <div className="text-[10px] text-slate-500">#2930 • Aujourd'hui</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] text-slate-500 hidden sm:block">Basse</span>
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border border-blue-100">En cours</span>
                                    <ChevronRight size={14} className="text-slate-300" />
                                </div>
                             </div>
                             <div className="px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div>
                                    <div className="text-xs font-bold text-slate-900">Problème formulaire contact</div>
                                    <div className="text-[10px] text-slate-500">#2812 • 12 Oct 2023</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] text-slate-500 hidden sm:block">Haute</span>
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200">Résolu</span>
                                    <ChevronRight size={14} className="text-slate-300" />
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

const TimelineStep = ({ step, title, date, status }: { step: string, title: string, date: string, status: 'completed' | 'current' | 'pending' }) => {
    const bg = status === 'completed' ? 'bg-emerald-600 text-white border-emerald-600' : status === 'current' ? 'bg-white text-emerald-600 border-emerald-500 ring-4 ring-emerald-50' : 'bg-white text-slate-300 border-slate-200';
    
    return (
        <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 relative z-10">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] border-2 transition-all ${bg}`}>
                {status === 'completed' ? <CheckCircle2 size={12} /> : step}
            </div>
            <div className="md:text-center">
                <div className={`text-xs font-bold ${status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{title}</div>
                <div className="text-[10px] text-slate-400">{date}</div>
            </div>
        </div>
    )
}

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <FadeIn delay={delay}>
    <div className="h-full bg-white/[0.02] backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.1)] group">
      <div className="flex flex-col gap-5">
        <div className="w-14 h-14 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-500 group-hover:text-black">
            {icon}
        </div>
        <div>
          <h4 className="text-white text-xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors">{title}</h4>
          <p className="text-base text-neutral-400 leading-relaxed font-normal">{desc}</p>
        </div>
      </div>
    </div>
  </FadeIn>
);

export default Features;