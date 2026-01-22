import React from 'react';
import { Check, X, ShieldCheck, AlertTriangle } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const Comparison: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="py-24 px-6 relative z-10 bg-[#040404]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Mandatory Quote */}
        <div className="text-center mb-16 lg:mb-20">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-8">
              {t.comparison.title}
            </h2>
            <div className="relative inline-block">
              <span className={`absolute -top-6 text-6xl text-emerald-500/20 font-serif ${dir === 'rtl' ? '-right-6' : '-left-6'}`}>"</span>
              <p className="text-2xl md:text-3xl text-emerald-100 font-light leading-relaxed max-w-3xl mx-auto italic">
                {t.comparison.quote_part1} <br className="hidden md:block" />
                <span className="text-emerald-400 font-normal">{t.comparison.quote_part2}</span>
              </p>
              <span className={`absolute -bottom-10 text-6xl text-emerald-500/20 font-serif transform rotate-180 ${dir === 'rtl' ? '-left-6' : '-right-6'}`}>"</span>
            </div>
          </FadeIn>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left: Competitors (Swaps direction based on RTL) */}
          <FadeIn direction={dir === 'rtl' ? 'left' : 'right'} delay={100} className="h-full">
            {/* STYLE AVERTISSEMENT : Bordure rouge, fond teinté rouge sombre */}
            <div className="h-full border-2 border-red-500/20 border-dashed rounded-2xl p-8 bg-gradient-to-b from-red-900/10 via-red-900/5 to-transparent relative group hover:border-red-500/30 transition-colors">
              <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
              
              <div className="flex items-center gap-3 mb-8 border-b border-red-500/20 pb-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-xl font-bold text-red-200">{t.comparison.competitors.title}</h3>
              </div>
              
              <ul className="space-y-6 relative z-10">
                {t.comparison.competitors.items.map((item, index) => (
                    <CompareItem 
                        key={index}
                        isPositive={false}
                        title={item.title}
                        desc={item.desc}
                    />
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Right: NexGen (Swaps direction based on RTL) */}
          <FadeIn direction={dir === 'rtl' ? 'right' : 'left'} delay={200} className="h-full">
            <div className="relative h-full border border-emerald-500/30 rounded-2xl p-8 bg-gradient-to-b from-emerald-900/10 to-[#050505] shadow-[0_0_50px_-20px_rgba(16,185,129,0.2)]">
              {/* Corner Badge */}
              <div className={`absolute top-0 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 ${dir === 'rtl' ? 'left-0 rounded-br-xl rounded-tl-xl' : 'right-0 rounded-bl-xl rounded-tr-xl'}`}>
                {t.comparison.nexgen.badge}
              </div>

              <div className="flex items-center gap-3 mb-8 border-b border-emerald-500/20 pb-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <ShieldCheck size={20} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-semibold text-white">{t.comparison.nexgen.title}</h3>
              </div>

              <ul className="space-y-6">
                {t.comparison.nexgen.items.map((item, index) => (
                    <CompareItem 
                        key={index}
                        isPositive={true}
                        title={item.title}
                        desc={item.desc}
                    />
                ))}
              </ul>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

interface CompareItemProps {
  isPositive: boolean;
  title: string;
  desc: string;
}

const CompareItem: React.FC<CompareItemProps> = ({ isPositive, title, desc }) => (
  <li className="flex gap-4">
    <div className={`mt-1 shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${
        isPositive 
        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
        : 'bg-red-500/10 border-red-500/30 text-red-500'
    }`}>
      {isPositive ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
    </div>
    <div>
      <h4 className={`text-base font-semibold mb-1 ${isPositive ? 'text-white' : 'text-red-200/90'}`}>
        {title}
      </h4>
      <p className={`text-base leading-relaxed ${isPositive ? 'text-neutral-300' : 'text-neutral-500'}`}>
        {desc}
      </p>
    </div>
  </li>
);

export default Comparison;