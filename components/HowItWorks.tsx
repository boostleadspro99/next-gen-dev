import React from 'react';
import { Package, Settings, Users, Check, TrendingUp, Target, ArrowRight, CheckCircle2, Circle, CircleDot } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const HowItWorks: React.FC = () => {
  const { t, dir } = useLanguage();

  const steps = [
    {
      number: "1",
      icon: <Package size={28} />,
      title: t.howItWorks.steps[0].title,
      desc: t.howItWorks.steps[0].desc,
      color: "group-hover:text-blue-400"
    },
    {
      number: "2",
      icon: <Settings size={28} />,
      title: t.howItWorks.steps[1].title,
      desc: t.howItWorks.steps[1].desc,
      color: "group-hover:text-purple-400"
    },
    {
      number: "3",
      icon: <Users size={28} />,
      title: t.howItWorks.steps[2].title,
      desc: t.howItWorks.steps[2].desc,
      highlight: true,
      color: "text-emerald-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 px-6 relative bg-[#050505] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-24 lg:mb-32">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              {t.howItWorks.title}
            </h2>
            <p className="text-neutral-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">
              {t.howItWorks.subtitle}
            </p>
          </div>
        </FadeIn>
        
        {/* Three-Step Pipeline */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-white/10 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-50"></div>
          </div>
          
          {/* Mobile Connecting Line */}
          <div className={`lg:hidden absolute top-0 ${dir === 'rtl' ? 'right-8' : 'left-8'} h-full w-px bg-gradient-to-b from-white/5 via-emerald-500/30 to-white/5 z-0`}></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <FadeIn key={index} delay={index * 150} className="h-full">
                <div className="relative flex flex-row lg:flex-col gap-6 lg:gap-8 items-start h-full group">
                  
                  {/* Large Background Number */}
                  <div className={`hidden lg:block absolute -top-12 ${dir === 'rtl' ? '-left-4' : '-right-4'} text-[120px] font-black text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-white/[0.04] transition-colors duration-500 z-0`}>
                    <Circle size={120} className="w-full h-full text-current" />
                    <span className="absolute inset-0 flex items-center justify-center text-[48px] font-bold text-white/[0.03]">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon Node */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all duration-500 
                      ${step.highlight 
                        ? 'bg-[#0A0A0A] border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)] scale-110 lg:-translate-y-2' 
                        : 'bg-[#0A0A0A] border-white/10 text-neutral-400 group-hover:border-white/20 group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                      }`}
                    >
                      <div className={`transition-colors duration-300 ${step.highlight ? '' : step.color}`}>
                        {step.icon}
                      </div>
                    </div>
                    
                    {/* Active Dot on Line (Desktop) */}
                    <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? '-left-[calc(50%-2.5rem)]' : '-right-[calc(50%-2.5rem)]'} w-full h-0.5 z-[-1] transition-all duration-500 ${step.highlight ? 'bg-gradient-to-r from-emerald-500 to-transparent' : 'opacity-0'}`}></div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pt-2 lg:pt-4 relative z-10">
                    <div className="mb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="lg:hidden text-xs font-bold uppercase tracking-widest text-emerald-500/80">
                            {dir === 'rtl' ? `خطوة ${step.number}` : `Étape ${step.number}`}
                        </span>
                        {step.highlight && (
                            <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                                <CheckCircle2 size={10} /> Résultats
                            </span>
                        )}
                      </div>
                      <h3 className={`text-xl font-bold text-white transition-colors ${step.highlight ? 'text-emerald-400' : 'group-hover:text-white'}`}>
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-base lg:text-lg text-neutral-400 leading-relaxed font-normal group-hover:text-neutral-300 transition-colors">
                      {step.desc}
                    </p>

                    {/* Mobile Arrow */}
                    {index !== steps.length - 1 && (
                      <div className="lg:hidden mt-6 flex justify-start opacity-20">
                         <ArrowRight size={20} className="text-white rotate-90" />
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Benefits & Audience Sections */}
        <div className="grid lg:grid-cols-2 gap-12 mt-24 lg:mt-32">
          {/* Benefits */}
          <FadeIn delay={300}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 lg:p-10 hover:border-emerald-500/30 transition-all duration-500 hover:translate-y-[-4px]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <TrendingUp size={24} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t.howItWorks.benefits.title}</h3>
              </div>
              <ul className="space-y-5">
                {t.howItWorks.benefits.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-lg text-neutral-300">
                    <Check size={20} className="text-emerald-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Audience */}
          <FadeIn delay={450}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 lg:p-10 hover:border-blue-500/30 transition-all duration-500 hover:translate-y-[-4px]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Target size={24} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t.howItWorks.audience.title}</h3>
              </div>
              <ul className="space-y-5 mb-8">
                {t.howItWorks.audience.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-lg text-neutral-300">
                    <Users size={20} className="text-blue-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-neutral-400 text-lg border-t border-white/5 pt-6">
                {t.howItWorks.audience.footnote}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;