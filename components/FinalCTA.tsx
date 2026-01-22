import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const FinalCTA: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="py-32 px-6 text-center border-t border-white/5 bg-[#030303] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
            {t.finalCTA.title_1} <br/>
            <span className="text-emerald-500">{t.finalCTA.title_2}</span>
          </h2>
          
          <p className="text-neutral-400 text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.finalCTA.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="#pricing" 
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-black rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] hover:scale-105 flex items-center justify-center gap-2 group"
            >
              {t.finalCTA.cta_primary}
              <ArrowRight size={18} className={`transition-transform duration-300 group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </a>
            <a 
              href="https://wa.me/212600000000" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto px-8 py-4 bg-white/[0.05] border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center"
            >
              {t.finalCTA.cta_secondary}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-base text-neutral-500">
             {t.finalCTA.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span>{feature}</span>
                </div>
             ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FinalCTA;