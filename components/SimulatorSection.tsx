import React from 'react';
import { ArrowRight, Calculator, BrainCircuit, Users, CheckCircle2, Search, TrendingUp, Wallet } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';
import { Link } from 'react-router-dom';

const SimulatorSection: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="relative w-full border-t border-emerald-900/30 bg-[#050505] overflow-hidden">
        
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20">
          
          {/* Left: Headline & copy */}
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

                {/* CTA buttons */}
                <div className="flex flex-wrap items-center gap-4">
                    <Link to="/simulator" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-black px-6 py-3.5 text-sm font-bold uppercase tracking-wide hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all group">
                        {t.simulator.cta_primary}
                        <ArrowRight size={18} className={`transition-transform duration-300 group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Link>
                    <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all">
                        {t.simulator.cta_secondary}
                        <BrainCircuit size={18} className="text-emerald-400" />
                    </button>
                </div>

                {/* Micro reassurance */}
                <div className="mt-8 flex flex-wrap gap-4 text-xs font-medium text-emerald-300/80">
                    <div className="flex items-center gap-2 bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-900/50">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span>{t.simulator.badge_1}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-900/50">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span>{t.simulator.badge_2}</span>
                    </div>
                </div>
            </FadeIn>
          </div>

          {/* Right: Visual Card (Simulator Demo) */}
          <div className="w-full lg:w-1/2">
             <FadeIn delay={200} direction={dir === 'rtl' ? 'right' : 'left'}>
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#050505] to-[#0A0A0A] overflow-hidden shadow-2xl group hover:border-emerald-500/20 transition-colors duration-500">
                
                {/* Decorative Blobs */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 blur-[80px] group-hover:bg-emerald-500/15 transition-colors duration-700"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/5 blur-[80px]"></div>

                <div className="relative px-6 py-8 sm:px-8 sm:py-10 flex flex-col gap-8">
                    {/* Header Card */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                        <div>
                            <p className="text-xs font-bold tracking-[0.15em] uppercase text-emerald-500 mb-1.5">
                            {t.simulator.card.title}
                            </p>
                            <p className="text-sm text-neutral-400">
                            {t.simulator.card.subtitle}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-7 px-3 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                            {t.simulator.card.tag_1}
                            </span>
                            <span className="inline-flex h-7 px-3 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
                            {t.simulator.card.tag_2}
                            </span>
                        </div>
                    </div>

                    {/* Metrics List */}
                    <div className="space-y-4">
                        {/* Step 1 */}
                        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                                <Search size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-wider uppercase text-neutral-500 mb-1">
                                    {t.simulator.card.step_1_title}
                                </p>
                                <p className="text-lg font-bold text-white mb-1">
                                    {t.simulator.card.step_1_val}
                                </p>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    {t.simulator.card.step_1_desc}
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
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

                        {/* Step 3 */}
                        <div className="flex items-start gap-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-black shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                                <Wallet size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-wider uppercase text-emerald-400 mb-1">
                                    {t.simulator.card.step_3_title}
                                </p>
                                <p className="text-xl font-bold text-white mb-1">
                                    {t.simulator.card.step_3_val}
                                </p>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    {t.simulator.card.step_3_desc}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Card */}
                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-neutral-700 flex items-center justify-center text-[10px] text-white font-bold">JD</div>
                                <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-neutral-600 flex items-center justify-center text-[10px] text-white font-bold">SA</div>
                                <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-emerald-600 flex items-center justify-center text-[10px] text-white font-bold">+140</div>
                            </div>
                            <div className="text-xs text-neutral-400">
                                <span className="text-white font-bold">142</span> {t.simulator.card.footer}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
             </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;