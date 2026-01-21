import React from 'react';
import { ScanSearch, PenTool, Rocket, Infinity, ArrowRight, CheckCircle2 } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const Methodology: React.FC = () => {
  const { t, dir } = useLanguage();

  const steps = [
    {
      id: "01",
      icon: <ScanSearch size={28} />,
      title: t.methodology.steps[1].title,
      desc: t.methodology.steps[1].desc,
      color: "group-hover:text-blue-400"
    },
    {
      id: "02",
      icon: <PenTool size={28} />,
      title: t.methodology.steps[2].title,
      desc: t.methodology.steps[2].desc,
      color: "group-hover:text-purple-400"
    },
    {
      id: "03",
      icon: <Rocket size={28} />,
      title: t.methodology.steps[3].title,
      desc: t.methodology.steps[3].desc,
      highlight: true,
      color: "text-emerald-400"
    },
    {
      id: "04",
      icon: <Infinity size={28} />,
      title: t.methodology.steps[4].title,
      desc: t.methodology.steps[4].desc,
      color: "group-hover:text-orange-400"
    }
  ];

  return (
    <section id="methodology" className="py-24 lg:py-32 px-6 relative bg-[#050505] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-24 lg:mb-32">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              {t.methodology.title_1} <span className="text-emerald-400">{t.methodology.title_2}</span>.
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              {t.methodology.subtitle}
            </p>
          </div>
        </FadeIn>
        
        <div className="relative">
          {/* Desktop Connecting Line (The "Pipeline") */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-white/10 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-50"></div>
          </div>
          
          {/* Mobile Connecting Line */}
          <div className={`lg:hidden absolute top-0 ${dir === 'rtl' ? 'right-8' : 'left-8'} h-full w-px bg-gradient-to-b from-white/5 via-emerald-500/30 to-white/5 z-0`}></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <FadeIn key={index} delay={index * 150} className="h-full">
                <div className="relative flex flex-row lg:flex-col gap-6 lg:gap-8 items-start h-full group">
                  
                  {/* Large Background Number (Desktop Aesthetic) */}
                  <span className={`hidden lg:block absolute -top-12 ${dir === 'rtl' ? '-left-4' : '-right-4'} text-[120px] font-black text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-white/[0.04] transition-colors duration-500 z-0`}>
                    {step.id}
                  </span>

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
                            {dir === 'rtl' ? `خطوة ${step.id}` : `Étape ${step.id}`}
                        </span>
                        {step.highlight && (
                            <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                                <CheckCircle2 size={10} /> Live
                            </span>
                        )}
                      </div>
                      <h3 className={`text-xl font-bold text-white transition-colors ${step.highlight ? 'text-emerald-400' : 'group-hover:text-white'}`}>
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm lg:text-base text-neutral-400 leading-relaxed font-normal group-hover:text-neutral-300 transition-colors">
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
      </div>
    </section>
  );
};

export default Methodology;