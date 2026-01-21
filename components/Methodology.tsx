import React from 'react';
import { ScanSearch, PenTool, Rocket, Infinity, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

const Methodology: React.FC = () => {
  const steps = [
    {
      icon: <ScanSearch size={24} />,
      title: "Audit & Stratégie",
      desc: "Analyse de votre marché et définition de vos objectifs de conversion (leads, ventes) avant la moindre ligne de code.",
      badge: "Étape 1"
    },
    {
      icon: <PenTool size={24} />,
      title: "Design & Copywriting",
      desc: "Création d'une identité visuelle premium et rédaction de textes persuasifs conçus pour guider le visiteur.",
      badge: "Étape 2"
    },
    {
      icon: <Rocket size={24} />,
      title: "Lancement Boost",
      desc: "Mise en ligne sur serveurs haute performance, sécurisation SSL et indexation immédiate sur Google.",
      badge: "Étape 3",
      highlight: true
    },
    {
      icon: <Infinity size={24} />,
      title: "Suivi Continu",
      desc: "On ne vous lâche pas. Mises à jour techniques, sécurité et modifications illimitées incluses à vie.",
      badge: "Partenariat"
    }
  ];

  return (
    <section id="methodology" className="py-24 lg:py-32 px-6 relative bg-[#050505] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-20 lg:mb-28">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              De l'idée aux <span className="text-emerald-400">résultats</span>.
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-light">
              Notre processus est rodé pour éliminer les frictions et livrer une machine à vendre en moins de 14 jours.
            </p>
          </div>
        </FadeIn>
        
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] w-[80%] h-px bg-gradient-to-r from-white/5 via-emerald-500/30 to-white/5 z-0"></div>
          
          {/* Connecting Line (Mobile) */}
          <div className="lg:hidden absolute top-0 left-8 h-full w-px bg-gradient-to-b from-white/5 via-emerald-500/30 to-white/5 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <FadeIn key={index} delay={index * 150} className="h-full">
                <div className="relative flex flex-row lg:flex-col gap-6 lg:gap-8 items-start h-full group">
                  
                  {/* Icon Node */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-2xl
                      ${step.highlight 
                        ? 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110' 
                        : 'bg-[#0A0A0A] border-white/10 text-white group-hover:border-emerald-500/30 group-hover:text-emerald-400 bg-gradient-to-b from-white/5 to-transparent'
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pt-2 lg:pt-0 lg:text-center">
                    <div className="mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/80 mb-2 block">
                        {step.badge}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-50 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-neutral-400 leading-relaxed font-normal group-hover:text-neutral-300 transition-colors">
                      {step.desc}
                    </p>

                    {/* Mobile Arrow (Visual Guide) */}
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