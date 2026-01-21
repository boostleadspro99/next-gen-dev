import React from 'react';
import { Check, X, ShieldCheck, AlertTriangle } from 'lucide-react';
import FadeIn from './FadeIn';

const Comparison: React.FC = () => {
  return (
    <section className="py-24 px-6 relative z-10 bg-[#040404]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Mandatory Quote */}
        <div className="text-center mb-16 lg:mb-20">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-8">
              Pourquoi NexGen est différent
            </h2>
            <div className="relative inline-block">
              <span className="absolute -top-6 -left-6 text-6xl text-emerald-500/20 font-serif">"</span>
              <p className="text-xl md:text-2xl text-emerald-100 font-light leading-relaxed max-w-3xl mx-auto italic">
                Vous ne confiez plus votre site à une personne. <br className="hidden md:block" />
                <span className="text-emerald-400 font-normal">Vous confiez votre présence digitale à un système.</span>
              </p>
              <span className="absolute -bottom-10 -right-6 text-6xl text-emerald-500/20 font-serif transform rotate-180">"</span>
            </div>
          </FadeIn>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left: Ailleurs */}
          <FadeIn direction="right" delay={100} className="h-full">
            <div className="h-full border border-white/5 border-dashed rounded-2xl p-8 bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-xl font-medium text-neutral-400">Agence / Freelance classique</h3>
              </div>
              
              <ul className="space-y-6">
                <CompareItem 
                  isPositive={false}
                  title="Relation instable"
                  desc="Le prestataire disparaît souvent une fois le projet livré. Vous êtes seul face aux bugs."
                />
                <CompareItem 
                  isPositive={false}
                  title="Coûts cachés"
                  desc="Devis initial attractif, mais chaque modification ou mise à jour est facturée en supplément."
                />
                <CompareItem 
                  isPositive={false}
                  title="Obsolescence rapide"
                  desc="Le site vieillit mal, la sécurité n'est pas mise à jour, le design se démode en 1 an."
                />
                <CompareItem 
                  isPositive={false}
                  title="Dépendance technique"
                  desc="Hébergement complexe à gérer vous-même ou verrouillé par le prestataire."
                />
              </ul>
            </div>
          </FadeIn>

          {/* Right: NexGen */}
          <FadeIn direction="left" delay={200} className="h-full">
            <div className="relative h-full border border-emerald-500/30 rounded-2xl p-8 bg-gradient-to-b from-emerald-900/10 to-[#050505] shadow-[0_0_50px_-20px_rgba(16,185,129,0.2)]">
              {/* Corner Badge */}
              <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl rounded-tr-xl">
                Le Standard NexGen
              </div>

              <div className="flex items-center gap-3 mb-8 border-b border-emerald-500/20 pb-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <ShieldCheck size={20} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-semibold text-white">L'écosystème NexGen</h3>
              </div>

              <ul className="space-y-6">
                <CompareItem 
                  isPositive={true}
                  title="Partenaire Long Terme"
                  desc="Nous sommes votre équipe technique dédiée. Support disponible 7j/7 via WhatsApp."
                />
                <CompareItem 
                  isPositive={true}
                  title="Transparence Totale"
                  desc="Un abonnement fixe. Tout est inclus : hébergement, modifications, maintenance."
                />
                <CompareItem 
                  isPositive={true}
                  title="Amélioration Continue"
                  desc="Votre site évolue avec votre business. Nous l'optimisons proactivement pour la conversion."
                />
                <CompareItem 
                  isPositive={true}
                  title="Liberté & Performance"
                  desc="Technologie de pointe gérée par nos soins. Vous gardez la propriété de votre contenu."
                />
              </ul>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

const CompareItem = ({ isPositive, title, desc }: { isPositive: boolean, title: string, desc: string }) => (
  <li className="flex gap-4">
    <div className={`mt-1 shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${isPositive ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/5 border-red-500/10 text-red-500/50'}`}>
      {isPositive ? <Check size={14} strokeWidth={3} /> : <X size={14} />}
    </div>
    <div>
      <h4 className={`text-sm font-semibold mb-1 ${isPositive ? 'text-white' : 'text-neutral-500'}`}>
        {title}
      </h4>
      <p className={`text-sm leading-relaxed ${isPositive ? 'text-neutral-300' : 'text-neutral-600'}`}>
        {desc}
      </p>
    </div>
  </li>
);

export default Comparison;