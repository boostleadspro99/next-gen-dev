import React, { lazy, Suspense } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';
import { useDeferredMount } from '../hooks/useDeferredMount';
import { useIsDesktop } from '../hooks/useIsDesktop';

// Dynamic import for code splitting - LaserFlow will load in a separate chunk
const LaserFlow = lazy(() => import('./LaserFlow'));

const Hero: React.FC = () => {
  const { t, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  const isDesktop = useIsDesktop();
  const shouldMountLaserFlow = useDeferredMount(1500);

  return (
    <section className="relative pt-32 pb-24 px-6 z-10 flex flex-col items-center text-center overflow-hidden min-h-[90vh] justify-center bg-[#050505]">
      
      {/* Premium Static Fallback Background - Shows instantly */}
      <div className="absolute inset-0 z-0 pointer-events-none static-fallback" />
      
      {/* LaserFlow Animated Background - Loads only on desktop after idle */}
      {isDesktop && shouldMountLaserFlow && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <LaserFlow 
              color="#10b981" 
              flowSpeed={0.2} 
              wispSpeed={15} 
              wispDensity={1.5}
              fogIntensity={0.6}
              horizontalSizing={0.5}
              verticalSizing={2}
              horizontalBeamOffset={0}
              verticalBeamOffset={-0.35}
              mode="auto"
            />
          </Suspense>
        </div>
      )}
      
      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none"></div>

      {/* Increased max-width to allow larger text on desktop without wrapping */}
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
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
                ? 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.5] md:leading-[1.4]' // Increased size & leading for Arabic
                : 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] md:leading-[1.1]'
            }
          `}>
            {t.hero.title_1} <br className="hidden md:block" /> 
            <span className="text-emerald-400">{t.hero.title_2}</span>
          </h1>
        </FadeIn>

        {/* Subheadline - Increased font size */}
        <FadeIn delay={200}>
          <p className={`
            text-neutral-300 font-normal max-w-3xl mx-auto mb-12 leading-relaxed
            ${isRTL ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} 
          `}>
            {t.hero.subtitle}
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            {/* Primary Button - Points to Simulator */}
            <Link to="/simulator" className="w-full sm:w-auto px-10 py-4 bg-emerald-500 text-neutral-950 rounded-xl text-base font-medium hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
              {t.hero.cta_primary}
              <ArrowRight size={20} strokeWidth={2.5} className={`group-hover:translate-x-1 transition-transform duration-300 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
            
            {/* Secondary Button - Points to Pricing */}
            <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 rounded-xl text-sm font-medium text-neutral-200 hover:text-white hover:border-white/20 hover:bg-white/[0.03] transition-all flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
              <ArrowRight size={18} strokeWidth={2} className="text-neutral-400 group-hover:text-emerald-400 transition-colors" />
              {t.hero.cta_secondary}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;