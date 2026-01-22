import React from 'react';
import { CreditCard, MessageSquare, Clock, FileCheck, LayoutDashboard, Download, ShieldCheck, Activity, CheckCircle2, FileText, Lock, Search, Bell } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const ClientArea: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="py-24 lg:py-32 relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Ambient Background */}
      <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-2/3 h-full bg-emerald-500/5 blur-[120px] pointer-events-none`}></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Content */}
        <div className="relative z-10">
           <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                <LayoutDashboard size={14} className="text-emerald-500" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">{t.clientArea.badge}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                {t.clientArea.title_1} <br />
                <span className="text-emerald-500">{t.clientArea.title_2}</span>
              </h2>
              <p 
                className="text-neutral-400 text-lg md:text-xl mb-8 leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: t.clientArea.desc }}
              ></p>

              <div className="space-y-6 border-l border-white/10 pl-6 ml-2">
                <FeatureRow 
                  icon={<Clock size={18} />}
                  title={t.clientArea.features.tracking.title}
                  desc={t.clientArea.features.tracking.desc}
                />
                <FeatureRow 
                  icon={<MessageSquare size={18} />}
                  title={t.clientArea.features.support.title}
                  desc={t.clientArea.features.support.desc}
                />
                 <FeatureRow 
                  icon={<FileCheck size={18} />}
                  title={t.clientArea.features.billing.title}
                  desc={t.clientArea.features.billing.desc}
                />
              </div>
           </FadeIn>
        </div>

        {/* Right Visual - Unified SaaS Platform Interface */}
        <FadeIn delay={200} direction={dir === 'rtl' ? 'right' : 'left'} className="w-full">
           <div className="relative group perspective-1000">
              
              {/* Main Window Container */}
              <div className="relative bg-[#080808] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-700 hover:rotate-x-2 hover:scale-[1.01]">
                  
                  {/* Window Header */}
                  <div className="h-10 bg-[#0F0F0F] border-b border-white/5 flex items-center px-4 justify-between">
                      <div className="flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/20 border border-white/5 text-[10px] text-neutral-500 font-mono">
                          <Lock size={8} /> platform.nexgen.com
                      </div>
                      <div className="flex gap-3 text-neutral-600">
                          <Search size={12} />
                          <Bell size={12} />
                      </div>
                  </div>

                  {/* Dashboard Content - Bento Grid */}
                  <div className="p-6 grid grid-cols-12 gap-4 bg-gradient-to-br from-[#0A0A0A] to-[#050505]">
                      
                      {/* Module 1: Project Timeline (Full Width Top) */}
                      <div className="col-span-12 bg-[#0F0F0F] border border-white/5 rounded-xl p-5 relative overflow-hidden group/card">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card:opacity-20 transition-opacity">
                              <Activity size={40} className="text-emerald-500" />
                          </div>
                          <div className="flex justify-between items-center mb-6">
                              <div>
                                  <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                                      <LayoutDashboard size={14} className="text-emerald-500" />
                                      {t.clientArea.ui.project_progress}
                                  </h4>
                                  <p className="text-[10px] text-neutral-500 mt-1">Ref: NX-2024-884</p>
                              </div>
                              <span className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                                  En cours
                              </span>
                          </div>
                          
                          {/* Timeline Visual */}
                          <div className="relative mt-2 px-2">
                              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-white/5 rounded-full"></div>
                              <div className="relative flex justify-between">
                                  {[0, 1, 2, 3].map((step) => (
                                      <div key={step} className="flex flex-col items-center gap-2 relative group/step">
                                          <div className={`w-3 h-3 rounded-full border-2 z-10 transition-all duration-500 ${step < 2 ? 'bg-emerald-500 border-emerald-500' : step === 2 ? 'bg-[#0F0F0F] border-emerald-500 animate-pulse' : 'bg-[#0F0F0F] border-white/10'}`}></div>
                                          <span className={`text-[10px] font-medium transition-colors ${step <= 2 ? 'text-white' : 'text-neutral-600'}`}>
                                              {t.clientArea.ui.stages[step]}
                                          </span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>

                      {/* Module 2: Support Tickets (Left Bottom) */}
                      <div className="col-span-12 sm:col-span-7 bg-[#0F0F0F] border border-white/5 rounded-xl p-5 flex flex-col justify-between group/card">
                          <div className="flex justify-between items-center mb-4">
                              <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                                  <MessageSquare size={14} className="text-blue-400" />
                                  Support
                              </h4>
                              <span className="text-[10px] text-neutral-500">24h avg.</span>
                          </div>
                          
                          <div className="space-y-3">
                              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors cursor-default">
                                  <div className="flex justify-between items-start mb-1">
                                      <span className="text-[11px] font-medium text-white line-clamp-1">{t.clientArea.ui.ticket.title}</span>
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">{t.clientArea.ui.ticket.status}</span>
                                  </div>
                                  <p className="text-[10px] text-neutral-500 line-clamp-2 leading-relaxed italic">
                                      {t.clientArea.ui.ticket.message}
                                  </p>
                              </div>
                              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 opacity-60">
                                   <div className="flex justify-between items-start mb-1">
                                      <span className="text-[11px] font-medium text-white">Maintenance Serveur</span>
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-700/50 text-neutral-400 border border-neutral-700">Fermé</span>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Module 3: Billing (Right Bottom) */}
                      <div className="col-span-12 sm:col-span-5 bg-gradient-to-b from-[#0F0F0F] to-emerald-950/10 border border-white/5 rounded-xl p-5 flex flex-col relative overflow-hidden">
                          {/* Shine effect */}
                          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-emerald-500/20 to-transparent"></div>
                          
                          <div className="flex justify-between items-center mb-6">
                              <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                                  <CreditCard size={14} className="text-emerald-400" />
                                  Abonnement
                              </h4>
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></div>
                          </div>

                          <div className="mt-auto">
                              <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1">Plan Actif</div>
                              <div className="text-lg font-bold text-white tracking-tight mb-1">Boost <span className="text-emerald-500">PRO</span></div>
                              <div className="text-[11px] text-neutral-500 mb-4 font-sans font-medium">249,00 MAD/mois</div>
                              
                              <button className="w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-[10px] font-bold text-white uppercase tracking-wide group/btn">
                                  <Download size={12} className="group-hover/btn:translate-y-0.5 transition-transform" />
                                  Factures
                              </button>
                          </div>
                      </div>

                  </div>
              </div>

              {/* Decorative Floating Badge */}
              <div className="absolute -right-4 top-10 bg-[#151515] border border-white/10 p-3 rounded-xl shadow-2xl animate-float z-20 hidden lg:block">
                  <div className="flex items-center gap-3">
                      <div className="relative">
                        <ShieldCheck size={20} className="text-emerald-500" />
                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      </div>
                      <div>
                          <div className="text-[9px] text-neutral-500 uppercase font-bold">Système</div>
                          <div className="text-[11px] font-bold text-white">100% Sécurisé</div>
                      </div>
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