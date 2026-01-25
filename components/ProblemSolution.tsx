import React from 'react';
import { Check, CheckCircle2, UserX, Bug, LifeBuoy, SearchX, Lock, AlertCircle } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const ProblemSolution: React.FC = () => {
  const { t, dir } = useLanguage();

  const problemIcons = [
    <UserX size={20} />,
    <Bug size={20} />,
    <LifeBuoy size={20} />,
    <SearchX size={20} />,
    <Lock size={20} />,
    <AlertCircle size={20} />
  ];

  return (
    <section 
      className="py-24 lg:py-32 px-6 relative z-10 overflow-hidden" 
      style={{ backgroundColor: '#030303' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Social Proof Immediate Bar */}
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {t.socialProofImmediate.map((text, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Check size={16} className="text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">{text}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
          
          {/* Decorative vertical line between columns (desktop only) */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          
          {/* Problem Column */}
          <div className="relative pt-4">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-6">
                {t.problemSolution.title_1} <br /><span className="text-red-400">{t.problemSolution.title_2}</span>
              </h2>
              <p 
                className="text-neutral-400 text-xl mb-10 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.problemSolution.desc }}
              ></p>
            </FadeIn>
            
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-10 pb-8">
              {t.problemSolution.problems.map((problem, index) => (
                <ProblemItem 
                  key={index}
                  icon={problemIcons[index]}
                  title={problem.title}
                  desc={problem.desc}
                  delay={100 + (index * 50)}
                />
              ))}
            </div>
          </div>

          {/* Solution Column (NexGen Card) */}
          <div className="lg:sticky lg:top-32 self-start">
            <FadeIn direction={dir === 'rtl' ? 'right' : 'left'} delay={200}>
              <div className={`relative group ${dir === 'rtl' ? 'lg:pr-10' : 'lg:pl-10'}`}>
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-emerald-500/5 to-transparent blur-3xl rounded-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                
                {/* Card */}
                <div className="relative bg-[#080808] border border-white/10 shadow-2xl rounded-3xl p-8 md:p-12 overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:translate-y-[-4px]">
                  
                  {/* Decorative gradients */}
                  <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none`}></div>
                  
                  <div className="flex items-center gap-5 mb-10 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <Check size={28} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">{t.problemSolution.solution.title}</h3>
                      <p className="text-emerald-500 text-base font-medium mt-1">{t.problemSolution.solution.subtitle}</p>
                    </div>
                  </div>

                  <p 
                    className={`text-neutral-300 text-lg md:text-xl leading-relaxed mb-12 border-emerald-500/50 ${dir === 'rtl' ? 'border-r-2 pr-6' : 'border-l-2 pl-6'}`}
                    dangerouslySetInnerHTML={{ __html: t.problemSolution.solution.desc }}
                  ></p>

                  <ul className="space-y-5">
                    {t.problemSolution.solution.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-base md:text-lg text-neutral-200 group/item">
                        <CheckCircle2 size={24} className="text-emerald-500 fill-emerald-500/10 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProblemItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}

const ProblemItem: React.FC<ProblemItemProps> = ({ icon, title, desc, delay }) => (
  <FadeIn delay={delay}>
    <div className="flex gap-4 group p-4 rounded-xl hover:bg-white/[0.03] transition-colors duration-300 border border-transparent hover:border-white/5 h-full">
      <div className="mt-1 w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/10 flex items-center justify-center text-red-400 shrink-0 group-hover:text-red-300 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-white text-lg font-medium mb-1.5 group-hover:text-red-100 transition-colors">{title}</h3>
        <p className="text-neutral-500 text-base leading-relaxed group-hover:text-neutral-400 transition-colors">{desc}</p>
      </div>
    </div>
  </FadeIn>
);

export default ProblemSolution;