import React from 'react';
import { Check, CheckCircle2, UserX, Bug, LifeBuoy, SearchX, Lock, AlertCircle } from 'lucide-react';
import FadeIn from './FadeIn';

const ProblemSolution: React.FC = () => {
  return (
    <section 
      className="py-24 lg:py-32 px-6 relative z-10 overflow-hidden" 
      style={{ backgroundColor: '#030303' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Problem Column */}
          <div className="relative pt-4">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-6">
                Le modèle "Freelance classique" <br /><span className="text-red-400">ne fonctionne plus.</span>
              </h2>
              <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
                Vous avez peut-être déjà vécu ça : un enthousiasme au départ, puis la désillusion. <span className="text-white font-medium">Ce n'est pas votre faute</span>, c'est le système de facturation "au coup par coup" qui crée ces conflits.
              </p>
            </FadeIn>
            
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-8 pb-8">
              <ProblemItem 
                icon={<UserX size={20} />}
                title="Silence Radio"
                desc="Le freelance disparaît une fois le solde payé. Plus de réponse aux emails."
                delay={100}
              />
              <ProblemItem 
                icon={<Bug size={20} />}
                title="Site non terminé"
                desc="Livré à la va-vite, plein de bugs d'affichage ou non compatible mobile."
                delay={150}
              />
              <ProblemItem 
                icon={<LifeBuoy size={20} />}
                title="Aucun Support"
                desc="Une mise à jour plante votre site ? Vous êtes seul pour réparer les dégâts."
                delay={200}
              />
              <ProblemItem 
                icon={<SearchX size={20} />}
                title="SEO de Façade"
                desc="Un site visuellement correct, mais invisible sur Google. Zéro trafic."
                delay={250}
              />
              <ProblemItem 
                icon={<Lock size={20} />}
                title="Accès Bloqués"
                desc="Nom de domaine ou hébergement au nom du prestataire. Vous êtes pris en otage."
                delay={300}
              />
              <ProblemItem 
                icon={<AlertCircle size={20} />}
                title="Promesses non tenues"
                desc="Délais explosés, fonctionnalités manquantes et factures supplémentaires."
                delay={350}
              />
            </div>
          </div>

          {/* Solution Column (NexGen Card) */}
          <div className="lg:sticky lg:top-32 self-start">
            <FadeIn direction="left" delay={200}>
              <div className="relative group lg:pl-10">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-emerald-500/5 to-transparent blur-3xl rounded-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                
                {/* Card */}
                <div className="relative bg-[#080808] border border-white/10 shadow-2xl rounded-3xl p-8 md:p-12 overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:translate-y-[-4px]">
                  
                  {/* Decorative gradients */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
                  
                  <div className="flex items-center gap-5 mb-10 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <Check size={28} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">L'approche NexGen</h3>
                      <p className="text-emerald-500 text-sm font-medium mt-1">L'antidote au modèle classique</p>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-12 border-l-2 border-emerald-500/50 pl-6">
                    Nous ne vendons pas juste un site. Nous devenons votre <span className="text-emerald-400 font-semibold">partenaire de croissance</span> sur le long terme.
                  </p>

                  <ul className="space-y-5">
                    {[
                      "Design conçu pour la conversion (Copywriting inclus)",
                      "Maintenance technique & Sécurité gérées à 100%",
                      "Modifications illimitées sur simple message WhatsApp",
                      "Propriété totale de votre contenu et domaine",
                      "Coût fixe mensuel transparent, zéro surprise"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm md:text-base text-neutral-200 group/item">
                        <CheckCircle2 size={20} className="text-emerald-500 fill-emerald-500/10 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
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

const ProblemItem = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <FadeIn delay={delay}>
    <div className="flex gap-4 group p-4 rounded-xl hover:bg-white/[0.03] transition-colors duration-300 border border-transparent hover:border-white/5 h-full">
      <div className="mt-1 w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/10 flex items-center justify-center text-red-400 shrink-0 group-hover:text-red-300 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-white text-base font-medium mb-1.5 group-hover:text-red-100 transition-colors">{title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors">{desc}</p>
      </div>
    </div>
  </FadeIn>
);

export default ProblemSolution;