import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t, dir } = useLanguage();
  const isRTL = dir === 'rtl';

  return (
    <section className="relative pt-32 pb-24 px-6 z-10 flex flex-col items-center text-center overflow-hidden min-h-[90vh] justify-center">
      
      {/* Background radial gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none opacity-50"></div>

      {/* Increased max-width to allow larger text on desktop without wrapping */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <FadeIn delay={0}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/20 mb-8 hover:border-emerald-400/40 transition-colors cursor-default backdrop-blur-sm group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase group-hover:text-emerald-300 transition-colors">{t.hero.badge}</span>
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={100}>
          <h1 className={`
            font-extrabold text-white tracking-tight mb-8 
            ${isRTL 
                ? 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.4] md:leading-[1.3]' 
                : 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] md:leading-[1.1]'
            }
          `}>
            {t.hero.title_1} <br className="hidden md:block" /> 
            <span className="text-emerald-400">{t.hero.title_2}</span>
          </h1>
        </FadeIn>

        {/* Subheadline - Increased font size */}
        <FadeIn delay={200}>
          <p className="text-xl md:text-2xl text-neutral-300 font-normal max-w-3xl mx-auto mb-12 leading-relaxed">
            {t.hero.subtitle}
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            {/* Primary Button */}
            <a href="#pricing" className="w-full sm:w-auto px-10 py-4 bg-emerald-500 text-neutral-950 rounded-xl text-base font-medium hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
              {t.hero.cta_primary}
              <ArrowRight size={20} strokeWidth={2.5} className={`group-hover:translate-x-1 transition-transform duration-300 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </a>
            
            {/* Secondary Button */}
            <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 rounded-xl text-sm font-medium text-neutral-200 hover:text-white hover:border-white/20 hover:bg-white/[0.03] transition-all flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
              <MessageCircle size={18} strokeWidth={2} className="text-neutral-400 group-hover:text-emerald-400 transition-colors" />
              {t.hero.cta_secondary}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;