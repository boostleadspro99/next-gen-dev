import React, { useState, useMemo } from 'react';
import { ArrowRight, Calculator, BrainCircuit, Users, Search, TrendingUp, Wallet, CheckCircle2 } from 'lucide-react';
import CountUp from 'react-countup';
import { Tooltip } from 'react-tooltip';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';
import { Link } from 'react-router-dom';
import '../styles/slider.css';
import '../styles/tooltip.css';

const SimulatorSection: React.FC = () => {
  const { t, dir } = useLanguage();
  const [averageBasket, setAverageBasket] = useState(1500);

  const estimatedLeads = useMemo(() => [15, 25], []);

  const potentialRevenue = useMemo(() => {
    const averageLeads = (estimatedLeads[0] + estimatedLeads[1]) / 2;
    return averageLeads * averageBasket * 12;
  }, [averageBasket, estimatedLeads]);

  return (
    <section className="relative w-full border-t border-emerald-900/30 bg-[#050505] overflow-hidden">
        
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <FadeIn>
                <p className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-emerald-400 mb-4 flex items-center gap-2">
                <Calculator size={14} />
                {t.simulator.preheader}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-6">
                {t.simulator.title_1} <br/>
                <span className="italic text-emerald-400 font-serif">{t.simulator.title_2}</span>
                </h2>
                <p className="text-base sm:text-lg text-neutral-400 max-w-lg leading-relaxed mb-8">
                {t.simulator.desc}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <Link to="/simulator" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-black px-6 py-3.5 text-sm font-bold uppercase tracking-wide hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all group">
                        {t.simulator.cta_primary}
                        <ArrowRight size={18} className={`transition-transform duration-300 group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Link>
                    <button 
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all"
                      data-tooltip-id="methodology-tooltip"
                      data-tooltip-content="Notre IA analyse le volume de recherche de votre service dans votre ville, le coût par clic et les taux de conversion pour estimer votre potentiel."
                    >
                        {t.simulator.cta_secondary}
                        <BrainCircuit size={18} className="text-emerald-400" />
                    </button>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 text-xs font-medium text-emerald-300/80">
                    <div 
                      className="flex items-center gap-2 bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-900/50 cursor-pointer"
                      data-tooltip-id="gemini-tooltip"
                      data-tooltip-content="Gemini 3 Pro est le modèle d'intelligence artificielle de Google, utilisé ici pour analyser les données de marché et fournir des estimations précises."
                    >
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span>{t.simulator.badge_1}</span>
                    </div>
                    <div 
                      className="flex items-center gap-2 bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-900/50 cursor-pointer"
                      data-tooltip-id="realtime-tooltip"
                      data-tooltip-content="Les estimations sont basées sur les tendances de recherche Google et les données de coût par clic les plus récentes pour votre secteur et votre région."
                    >
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span>{t.simulator.badge_2}</span>
                    </div>
                </div>
            </FadeIn>
          </div>

          <div className="w-full lg:w-1/2">
             <FadeIn delay={200} direction={dir === 'rtl' ? 'right' : 'left'}>
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#050505] to-[#0A0A0A] overflow-hidden shadow-2xl group hover:border-emerald-500/20 transition-colors duration-500">
                
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 blur-[80px] group-hover:bg-emerald-500/15 transition-colors duration-700"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/5 blur-[80px]"></div>

                <div className="relative px-6 py-8 sm:px-8 sm:py-10 flex flex-col gap-8">
                    
                    <div className="space-y-4 border-b border-white/5 pb-8">
                      <label htmlFor="average-basket" className="block text-sm font-medium text-neutral-300">{t.simulatorPage.form.ticket_label}</label>
                      <div className="flex items-center gap-4">
                        <input 
                          id="average-basket"
                          type="range"
                          min="250"
                          max="5000"
                          step="50"
                          value={averageBasket}
                          onChange={(e) => setAverageBasket(Number(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider-thumb"
                        />
                        <span className="text-lg font-bold text-emerald-400 tabular-nums w-28 text-center">
                          <CountUp start={0} end={averageBasket} duration={1} delay={0.5} /> {t.simulatorPage.form.currency}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                        {/* Social Proof Counter */}
                        <div className="flex items-center justify-center gap-4 mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <div className="text-center">
                                <p className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                                    <CountUp start={200} end={247} duration={2} suffix="+" />
                                </p>
                                <p className="text-xs sm:text-sm text-neutral-400">
                                    {t.simulator.card.footer}
                                </p>
                            </div>
                            <div className="h-10 w-px bg-emerald-500/30"></div>
                            <div className="text-center">
                                <p className="text-lg sm:text-xl font-bold text-white">24/7</p>
                                <p className="text-xs sm:text-sm text-neutral-400">Support WhatsApp</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3">
                            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                                <Users size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-wider uppercase text-neutral-500 mb-1">
                                    {t.simulator.card.step_2_title}
                                </p>
                                <p className="text-lg font-bold text-white mb-1">
                                    {t.simulator.card.step_2_val}
                                </p>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    {t.simulator.card.step_2_desc}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-black shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                                <Wallet size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-wider uppercase text-emerald-400 mb-1">
                                    {t.simulator.card.step_3_title}
                                </p>
                                <p className="text-xl sm:text-2xl font-bold text-white mb-1 transition-colors duration-200">
                                  +
                                  <CountUp
                                    start={0}
                                    end={potentialRevenue / 1000}
                                    duration={1.5}
                                    separator=" "
                                    decimals={0}
                                    suffix="k MAD / an"
                                  />
                                </p>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    {t.simulator.card.step_3_desc}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                </div>
             </FadeIn>
          </div>
        </div>
      </div>
      <Tooltip id="methodology-tooltip" className="react-tooltip" />
      <Tooltip id="gemini-tooltip" className="react-tooltip" />
      <Tooltip id="realtime-tooltip" className="react-tooltip" />
    </section>
  );
};

export default SimulatorSection;