import React, { useState, useEffect } from 'react';
import { BarChart2, LogIn, Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    
    // Close mobile menu first
    setIsMobileMenuOpen(false);

    if (isHome) {
      // Small timeout to allow menu close animation to start/finish smoothly
      setTimeout(() => {
        const element = document.getElementById(id.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate('/' + id);
    }
  };

  const NavLink = ({ to, children, className, mobile = false }: { to: string, children: React.ReactNode, className?: string, mobile?: boolean }) => {
    return (
      <a 
        href={isHome ? to : `/#/${to}`} 
        onClick={(e) => handleScroll(e, to)}
        className={`cursor-pointer group relative ${
          mobile 
            ? 'text-3xl font-bold text-white py-4 flex items-center justify-between border-b border-white/5' 
            : 'px-3 py-2 rounded-md hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400'
        } ${className}`}
      >
        <span className={mobile ? 'group-hover:text-emerald-400 transition-colors' : ''}>{children}</span>
        {mobile && <ChevronRight className="text-neutral-700 group-hover:text-emerald-500 transition-colors" />}
      </a>
    );
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl transition-all duration-300 supports-[backdrop-filter]:bg-[#050505]/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1 z-50 relative"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:border-emerald-500/40 transition-colors">
              <BarChart2 size={20} strokeWidth={2} />
            </div>
            <span className="font-semibold tracking-tight text-sm group-hover:text-emerald-50 transition-colors">NexGen</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 text-[14px] font-medium text-neutral-300">
            <NavLink to="#solutions" className="hover:text-white transition-colors">Solutions</NavLink>
            <NavLink to="#methodology" className="hover:text-white transition-colors">Méthode</NavLink>
            <NavLink to="#pricing" className="hover:text-white transition-colors">Tarifs</NavLink>
            <NavLink to="#faq" className="hover:text-white transition-colors">FAQ</NavLink>
          </div>

          {/* Desktop CTA */}
          <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[13px] font-semibold text-white transition-all group hover:border-emerald-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
            Espace Client
            <LogIn size={16} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform text-neutral-400 group-hover:text-emerald-400" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 relative p-2 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#050505] z-40 transition-all duration-300 md:hidden flex flex-col pt-24 px-6 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-5 pointer-events-none'
        }`}
      >
        {/* Background Ambient Effect */}
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="flex flex-col h-full overflow-y-auto pb-10">
          <div className="flex flex-col gap-2 mb-8">
            <NavLink to="#solutions" mobile>Solutions</NavLink>
            <NavLink to="#methodology" mobile>Notre Méthode</NavLink>
            <NavLink to="#pricing" mobile>Tarifs</NavLink>
            <NavLink to="#faq" mobile>FAQ & Aide</NavLink>
            
            <div className="py-4 border-b border-white/5">
                <Link 
                    to="/contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold text-white flex items-center justify-between group"
                >
                    <span className="group-hover:text-emerald-400 transition-colors">Contact</span>
                    <ChevronRight className="text-neutral-700 group-hover:text-emerald-500 transition-colors" />
                </Link>
            </div>
          </div>

          <div className="mt-auto">
            <Link 
              to="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-emerald-500 text-neutral-950 rounded-xl text-lg font-bold hover:bg-emerald-400 transition-all active:scale-[0.98]"
            >
              Accéder à l'Espace Client
              <LogIn size={20} strokeWidth={2.5} />
            </Link>
            
            <div className="mt-8 flex justify-center gap-6 text-sm text-neutral-500">
                <Link to="/legal" onClick={() => setIsMobileMenuOpen(false)}>Mentions</Link>
                <Link to="/privacy" onClick={() => setIsMobileMenuOpen(false)}>Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;