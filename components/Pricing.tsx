import React from 'react';
import { CheckCircle2, Zap, Check, Star } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const Pricing: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 lg:py-32 px-6 relative bg-white/[0.005]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 lg:mb-28">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              {t.pricing.title_1} <span className="text-emerald-400">{t.pricing.title_2}</span>.
            </h2>
            <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
              {t.pricing.subtitle}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-start max-w-7xl mx-auto">
          
          {/* Pack Présence */}
          <FadeIn delay={0} className="h-full">
            <PricingCard 
              title={t.pricing.packs.presence.title} 
              subtitle={t.pricing.packs.presence.subtitle}
              price={t.pricing.packs.presence.price} 
              setup={t.pricing.packs.presence.setup}
              setupLabel={t.pricing.setup_label}
              cta={t.pricing.packs.presence.cta}
              features={t.pricing.packs.presence.features}
            />
          </FadeIn>

          {/* Pack BOOST */}
          <div className="relative h-full transform md:-translate-y-6 z-10">
            <FadeIn delay={150} className="h-full">
               {/* Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none -z-10 animate-pulse-glow"></div>

              <div className="relative p-0.5 bg-gradient-to-b from-emerald-400 to-emerald-900 rounded-2xl shadow-2xl h-full flex flex-col">
                <div className="bg-[#0A0A0A] rounded-[14px] p-8 lg:p-10 h-full flex flex-col relative overflow-hidden">
                    
                    {/* Top shine */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50"></div>
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-emerald-500 text-neutral-950 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-b shadow-[0_4px_10px_rgba(16,185,129,0.3)] flex items-center gap-1 w-max">
                     <Star size={12} fill="currentColor" strokeWidth={3} /> {t.pricing.most_popular}
                    </div>

                    <div className="mb-8 mt-6">
                        <div className="text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
                             <Zap size={18} className="fill-emerald-400 text-emerald-400" /> {t.pricing.packs.boost.title}
                        </div>
                        <p className="text-neutral-300 text-base mb-6 font-normal">{t.pricing.packs.boost.subtitle}</p>
                        
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight">{t.pricing.packs.boost.price}</span>
                            <span className="text-lg text-neutral-400 font-medium">/mois</span>
                        </div>
                        <div className="text-[13px] text-emerald-200 mt-4 font-medium px-3 py-2 bg-emerald-900/30 rounded-lg inline-block border border-emerald-500/30">
                            + {t.pricing.packs.boost.setup} {t.pricing.setup_label}
                        </div>
                    </div>
                    
                    <a href="#contact" className="block w-full py-4 bg-emerald-500 text-neutral-950 rounded-xl text-center text-sm font-bold uppercase tracking-wide hover:bg-emerald-400 transition-all mb-10 shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                    {t.pricing.packs.boost.cta}
                    </a>

                    <ul className="space-y-4 flex-grow">
                    {t.pricing.packs.boost.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-neutral-200">
                        <CheckCircle2 size={22} className="text-emerald-500 fill-emerald-500/10 shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{item}</span>
                        </li>
                    ))}
                    </ul>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Pack Business */}
          <FadeIn delay={300} className="h-full">
            <PricingCard 
              title={t.pricing.packs.business.title} 
              subtitle={t.pricing.packs.business.subtitle}
              price={t.pricing.packs.business.price} 
              setup={t.pricing.packs.business.setup} 
              setupLabel={t.pricing.setup_label}
              cta={t.pricing.packs.business.cta}
              features={t.pricing.packs.business.features}
              isBusiness
            />
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
    title: string;
    subtitle: string;
    price: string;
    setup: string;
    setupLabel: string;
    cta: string;
    features: string[];
    isBusiness?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, subtitle, price, setup, setupLabel, cta, features, isBusiness }) => (
  <div className="bg-white/[0.02] backdrop-blur-xl p-8 lg:p-10 rounded-2xl border border-white/10 hover:border-white/20 transition-colors relative h-full flex flex-col hover:bg-white/[0.04] group">
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">{title}</h3>
      <p className="text-neutral-400 text-base mb-6 mt-1 font-normal">{subtitle}</p>
      
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{price}</span>
        <span className="text-base text-neutral-500 font-medium">/mois</span>
      </div>
      <div className="text-[13px] text-neutral-400 mt-4 font-medium bg-white/5 px-3 py-2 rounded-lg inline-block border border-white/10">
        {setup !== "Sur devis" && setup !== "حسب الطلب" ? `+ ${setup} ${setupLabel}` : `+ ${setup}`}
      </div>
    </div>
    
    <a href="#contact" className="block w-full py-4 bg-white/5 border border-white/10 rounded-xl text-center text-sm font-semibold text-white hover:bg-white/10 transition-colors mb-10 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
      {cta}
    </a>
    
    <ul className="space-y-4 flex-grow">
      {features.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-base text-neutral-300">
          <Check size={20} strokeWidth={2.5} className="mt-0.5 text-neutral-600 shrink-0 group-hover:text-emerald-500 transition-colors" />
          <span className="leading-relaxed font-normal">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Pricing;