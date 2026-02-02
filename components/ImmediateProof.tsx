
import React from 'react';
import { CheckCircle, Clock, Globe, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const ImmediateProof: React.FC = () => {
  const { t } = useLanguage();

  const proofs = [
    { text: t.socialProofImmediate[0], icon: <Clock size={16} /> },
    { text: t.socialProofImmediate[1], icon: <Globe size={16} /> },
    { text: t.socialProofImmediate[2], icon: <CheckCircle size={16} /> },
    { text: t.socialProofImmediate[3], icon: <ShieldCheck size={16} /> }
  ];

  return (
    <div className="bg-[#050505] py-12 sm:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {proofs.map((proof, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center gap-3 p-4 border border-white/10 bg-white/[0.02] rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/5"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_farthest-side_at_50%_50%,_theme(colors.emerald.500/0.08),_transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon */}
                <div className="relative flex-shrink-0 text-emerald-500 group-hover:text-emerald-400 transition-colors duration-300">
                  {proof.icon}
                </div>

                {/* Text */}
                <p className="relative text-xs sm:text-sm font-medium text-neutral-300 group-hover:text-white transition-colors duration-300 leading-tight text-left">
                  {proof.text}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ImmediateProof;
