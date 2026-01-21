import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, Eye, EyeOff, ShieldCheck, ChevronRight, Sparkles, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if it's the admin email for demo purposes
    const target = email === 'admin@nexgen.com' ? '/admin' : '/dashboard';

    // Simulation of API call and redirection
    setTimeout(() => {
        setIsLoading(false);
        navigate(target);
    }, 1500);
  };

  const fillDemoCredentials = () => {
    setEmail('alexandre@nexgen.com');
    setPassword('demo123');
  };

  const fillAdminCredentials = () => {
    setEmail('admin@nexgen.com');
    setPassword('admin123');
  };

  return (
    <section className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center relative overflow-hidden bg-[#030303]">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#050505] to-[#050505] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[420px] relative z-10">
        <FadeIn>
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg px-2 py-1 -ml-2">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Retour au site
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-emerald-500 shadow-xl">
                    <ShieldCheck size={24} strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Espace Client</h1>
                    <p className="text-neutral-400 text-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Connexion sécurisée SSL
                    </p>
                </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-bold text-neutral-400 uppercase tracking-wide ml-1">
                  Email professionnel
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    id="email"
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                    placeholder="nom@entreprise.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label htmlFor="password" className="block text-xs font-bold text-neutral-400 uppercase tracking-wide">
                    Mot de passe
                  </label>
                  <a href="#" className="text-xs text-neutral-500 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    id="password"
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-12 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-white transition-colors focus:outline-none"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-emerald-500 text-neutral-950 font-bold py-4 rounded-xl text-sm uppercase tracking-wide hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Connexion</span>
                    <ChevronRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
            {/* Demo Buttons */}
            <div className="mt-6 flex flex-col gap-3">
                <button 
                type="button"
                onClick={fillDemoCredentials}
                className="w-full py-2 border border-dashed border-white/10 rounded-lg text-xs text-neutral-500 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2 group"
                >
                <Sparkles size={14} className="group-hover:text-emerald-500 transition-colors" />
                Démo Client (Test)
                </button>
                
                <button 
                type="button"
                onClick={fillAdminCredentials}
                className="w-full py-2 border border-dashed border-white/10 rounded-lg text-xs text-neutral-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all flex items-center justify-center gap-2 group"
                >
                <LayoutDashboard size={14} className="group-hover:text-red-500 transition-colors" />
                Démo Admin (Back-office)
                </button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex gap-4 justify-center">
                 <div className="text-[10px] text-neutral-600 font-medium uppercase tracking-wider">Support 24/7</div>
                 <div className="text-[10px] text-neutral-600 font-medium uppercase tracking-wider">Données chiffrées</div>
              </div>
            </div>
          </div>
          
          {/* Not a client redirect */}
          <div className="text-center mt-8">
            <p className="text-sm text-neutral-500">
              Vous n'êtes pas encore client NexGen ? <br/>
              <Link to="/#pricing" className="text-white hover:text-emerald-400 font-medium transition-colors inline-flex items-center gap-1 mt-1 focus:outline-none focus-visible:underline">
                Découvrir nos offres d'abonnement
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Login;