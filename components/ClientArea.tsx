import React from 'react';
import { CreditCard, MessageSquare, Clock, FileCheck, LayoutDashboard, Download, ShieldCheck } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const ClientArea: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="py-24 relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Visual background elements */}
      <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/2 h-full bg-emerald-500/5 blur-[100px] pointer-events-none`}></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content (or Right in RTL) */}
        <div>
           <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <LayoutDashboard size={14} className="text-emerald-500" />
                <span className="text-xs font-medium text-white uppercase tracking-wider">{t.clientArea.badge}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
                {t.clientArea.title_1} <br />
                <span className="text-emerald-500">{t.clientArea.title_2}</span>
              </h2>
              <p 
                className="text-neutral-400 text-xl mb-8 leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: t.clientArea.desc }}
              ></p>

              <div className="space-y-6">
                <FeatureRow 
                  icon={<Clock size={20} />}
                  title={t.clientArea.features.tracking.title}
                  desc={t.clientArea.features.tracking.desc}
                />
                <FeatureRow 
                  icon={<MessageSquare size={20} />}
                  title={t.clientArea.features.support.title}
                  desc={t.clientArea.features.support.desc}
                />
                 <FeatureRow 
                  icon={<FileCheck size={20} />}
                  title={t.clientArea.features.billing.title}
                  desc={t.clientArea.features.billing.desc}
                />
              </div>
           </FadeIn>
        </div>

        {/* Right Visual - Composition of the Real Dashboard Cards */}
        <FadeIn delay={200} direction={dir === 'rtl' ? 'right' : 'left'}>
           <div className="relative pt-10 px-4 sm:px-0">
              
              {/* Card 1: Technical Status (Back layer) */}
              <div className="absolute top-0 right-0 sm:right-10 w-full sm:w-3/4 bg-white rounded-xl p-5 shadow-lg opacity-80 scale-95 origin-bottom-right z-0">
                  <div className="h-4 w-32 bg-slate-100 rounded mb-4"></div>
                  <div className="space-y-3">
                      <div className="h-2 w-full bg-slate-50 rounded"></div>
                      <div className="h-2 w-5/6 bg-slate-50 rounded"></div>
                      <div className="h-2 w-full bg-slate-50 rounded"></div>
                  </div>
              </div>

              {/* Card 2: Subscription Card (Main Focus - Dark Theme as per Screenshot) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group text-white shadow-2xl z-10 w-full sm:max-w-sm mx-auto sm:mr-auto sm:ml-0 transform transition-transform hover:-translate-y-1 duration-500">
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-700"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-white font-semibold text-lg">Mon Abonnement</h3>
                            <p className="text-xs text-slate-400 mt-1">Pack Boost (Mensuel)</p>
                        </div>
                        <div className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase rounded tracking-wide">
                            Actif
                        </div>
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-bold text-white">99,00 €</span>
                        <span className="text-sm text-slate-400">/mois</span>
                    </div>

                    <div className="bg-white/10 rounded-lg p-3 mb-6 flex items-center gap-3 border border-white/5">
                        <Clock size={16} className="text-slate-300" />
                        <div className="flex-1">
                            <div className="text-[10px] text-slate-400 uppercase font-bold">Prochain Paiement</div>
                            <div className="text-sm text-white font-medium">01 Novembre 2025</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full py-2.5 bg-emerald-500 text-slate-950 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
                            <CreditCard size={16} />
                            Gérer le paiement
                        </button>
                        <button className="w-full py-2.5 bg-transparent border border-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                            <Download size={16} />
                            Dernière facture
                        </button>
                    </div>
              </div>

              {/* Card 3: Floating Status Pill */}
              <div className="absolute -bottom-5 right-4 sm:-right-4 bg-white border border-slate-200 py-3 px-4 rounded-xl shadow-xl z-20 animate-float flex items-center gap-3">
                  <div className="relative">
                      <ShieldCheck size={24} className="text-emerald-500" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                  </div>
                  <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">État Technique</div>
                      <div className="text-xs font-bold text-slate-900">100% Opérationnel</div>
                  </div>
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
      <h4 className="text-white text-lg font-medium mb-1 group-hover:text-emerald-400 transition-colors">{title}</h4>
      <p className="text-base text-neutral-400 leading-relaxed font-light">{desc}</p>
    </div>
  </div>
)

export default ClientArea;