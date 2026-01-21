import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 border-t border-white/5 bg-[#020202] text-center z-10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="flex flex-col items-center justify-center gap-4 mb-8 opacity-90 group inline-flex mx-auto">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
            <BarChart2 size={18} strokeWidth={2} />
          </div>
          <span className="font-semibold text-white text-sm tracking-tight group-hover:text-emerald-400 transition-colors">NexGen Digital</span>
        </Link>
        
        <p className="text-xs text-neutral-500 mb-10 max-w-sm mx-auto leading-relaxed">
          La solution de création de sites web SaaS pour les PME et artisans exigeants. Performance, Design et Conversion sans les tracas techniques.
        </p>

        <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] text-neutral-500 font-medium tracking-wide uppercase">
                <li><Link to="/cgv" className="hover:text-emerald-500 transition-colors duration-300">CGV</Link></li>
                <li><Link to="/legal" className="hover:text-emerald-500 transition-colors duration-300">Mentions Légales</Link></li>
                <li><Link to="/privacy" className="hover:text-emerald-500 transition-colors duration-300">Confidentialité</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-500 transition-colors duration-300">Contact</Link></li>
            </ul>
        </nav>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-[10px] text-neutral-700">
          © {new Date().getFullYear()} NexGen Digital. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;