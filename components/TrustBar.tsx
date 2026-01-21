import React from 'react';
import { Unlock, Headphones, Activity, Award, TrendingUp, LayoutDashboard } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const TrustBar: React.FC = () => {
  const { t } = useLanguage();

  const signals = [
    { 
      icon: <Unlock size={20} className="text-emerald-500" />, 
      text: t.trustbar.no_commitment
    },
    { 
      icon: <Headphones size={20} className="text-emerald-500" />, 
      text: t.trustbar.support 
    },
    { 
      icon: <Activity size={20} className="text-emerald-500" />, 
      text: t.trustbar.updates 
    },
    { 
      icon: <Award size={20} className="text-emerald-500" />, 
      text: t.trustbar.methodology 
    },
    { 
      icon: <TrendingUp size={20} className="text-emerald-500" />, 
      text: t.trustbar.results 
    },
    { 
      icon: <LayoutDashboard size={20} className="text-emerald-500" />, 
      text: t.trustbar.dashboard 
    },
  ];

  return (
    <section className="border-y border-white/5 bg-[#050505] relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4">
          {signals.map((signal, index) => (
            <FadeIn key={index} delay={index * 50} direction="none">
              <div className="flex flex-col items-center justify-center text-center gap-3 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-300">
                  {signal.icon}
                </div>
                <span className="text-xs md:text-sm font-medium text-neutral-400 group-hover:text-white transition-colors leading-tight max-w-[120px]">
                  {signal.text}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;