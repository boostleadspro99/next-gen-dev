import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import FadeIn from './FadeIn';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 px-6 text-center border-t border-white/5 bg-[#030303] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
            Arrêtez de perdre des clients. <br/>
            <span className="text-emerald-500">Passez au niveau supérieur.</span>
          </h2>
          
          <p className="text-neutral-400 text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Rejoignez NexGen aujourd'hui. On s'occupe de la technique, du design et de la conversion. 
            Vous vous concentrez sur votre métier. Simple.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="#pricing" 
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-black rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] hover:scale-105 flex items-center justify-center gap-2"
            >
              Lancer ma machine à vendre
              <ArrowRight size={18} />
            </a>
            <a 
              href="https://wa.me/212600000000" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto px-8 py-4 bg-white/[0.05] border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center"
            >
              En discuter d'abord
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-neutral-500">
             <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Sans engagement de durée</span>
             </div>
             <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Propriété totale des contenus</span>
             </div>
             <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Mise en ligne rapide</span>
             </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FinalCTA;