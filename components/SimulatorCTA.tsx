import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import FadeIn from './FadeIn';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useLanguage } from '../contexts/LanguageContext';

const SimulatorCTA: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="relative w-full border-t border-emerald-900/30 bg-gradient-to-b from-[#050505] to-[#0a0a0a] overflow-hidden py-20 lg:py-28">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Sparkles size={16} className="text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400 tracking-wider uppercase">
                Simulation Gratuite - Offre Limitée
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Avant de voir les tarifs,<br className="hidden sm:block" />
              <span className="text-emerald-400"> découvrez votre potentiel de revenus</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Ne laissez pas passer cette opportunité. En moins de 30 secondes, obtenez une estimation personnalisée 
              de ce que votre site web pourrait vous rapporter chaque année.
            </p>

            {/* Social Proof Counter */}
            <div className="flex items-center justify-center gap-6 mb-10 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-emerald-400 tabular-nums">
                  <CountUp start={200} end={247} duration={2} suffix="+" />
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  Entrepreneurs ont simulé cette semaine
                </p>
              </div>
              <div className="hidden sm:block h-16 w-px bg-emerald-500/20"></div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                  <CountUp start={0} end={98} duration={2} decimals={1} suffix="%" />
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  Taux de satisfaction
                </p>
              </div>
              <div className="hidden sm:block h-16 w-px bg-emerald-500/20"></div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                  <CountUp start={0} end={30} duration={1.5} suffix="s" />
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  Temps de réponse
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/simulator" 
                className="w-full sm:w-auto px-10 py-5 bg-emerald-500 text-neutral-950 rounded-xl text-lg font-bold uppercase tracking-wide hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] hover:-translate-y-1"
              >
                <TrendingUp size={22} />
                Simuler mon potentiel maintenant
                <ArrowRight size={22} className={`transition-transform duration-300 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Link>
              
              <a 
                href="#pricing" 
                className="w-full sm:w-auto px-8 py-5 bg-transparent border border-white/10 rounded-xl text-lg font-medium text-white hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                Voir les tarifs directement
              </a>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span>Résultats instantanés</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span>Analysé par IA Gemini</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default SimulatorCTA;