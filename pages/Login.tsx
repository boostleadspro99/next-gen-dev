import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, Eye, EyeOff, ShieldCheck, ChevronRight, User, Building2, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail,
    sendEmailVerification,
    getIdTokenResult
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import FadeIn from '../components/FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

type Mode = 'login' | 'register' | 'forgot';

const Login: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      fullName: '',
      company: '',
      city: '',
      country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
      setError(null); // Clear error on typing
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
        if (mode === 'login') {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            
            // Check for Super Admin role in Custom Claims immediately
            const tokenResult = await getIdTokenResult(userCredential.user, true);
            const isSuperAdmin = tokenResult.claims.role === 'super_admin';

            if (isSuperAdmin) {
                navigate('/admin', { replace: true });
            } else {
                navigate(from, { replace: true });
            }

        } else if (mode === 'register') {
            // 1. Create User
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // 2. Create Firestore Profile
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: formData.email,
                displayName: formData.fullName,
                company: formData.company,
                city: formData.city,
                country: formData.country,
                role: 'client', // Default role
                status: 'active',
                createdAt: serverTimestamp()
            });

            // 3. Send Verification Email
            await sendEmailVerification(user);

            // 4. Navigate to verify page
            navigate('/verify-email');

        } else if (mode === 'forgot') {
            await sendPasswordResetEmail(auth, formData.email);
            setSuccessMsg(t.auth.messages.reset_sent);
            setIsLoading(false); // Stop loading, stay on page to show message
            return;
        }

    } catch (err: any) {
        console.error(err);
        let msg = t.auth.errors.generic;
        if (err.code === 'auth/invalid-email') msg = t.auth.errors.invalid_email;
        if (err.code === 'auth/user-disabled') msg = t.auth.errors.user_disabled;
        if (err.code === 'auth/user-not-found') msg = t.auth.errors.user_not_found;
        if (err.code === 'auth/wrong-password') msg = t.auth.errors.wrong_password;
        if (err.code === 'auth/email-already-in-use') msg = t.auth.errors.email_in_use;
        if (err.code === 'auth/weak-password') msg = t.auth.errors.weak_password;
        setError(msg);
        setIsLoading(false);
    }
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
              <ArrowLeft size={16} className={`group-hover:-translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
              {t.auth.buttons.back}
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-emerald-500 shadow-xl">
                    <ShieldCheck size={24} strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {mode === 'login' && t.auth.titles.login}
                        {mode === 'register' && t.auth.titles.register}
                        {mode === 'forgot' && t.auth.titles.forgot}
                    </h1>
                    <p className="text-neutral-400 text-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {t.auth.messages.secure}
                    </p>
                </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            
            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 text-xs font-medium">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    {error}
                </div>
            )}

            {successMsg && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-3 text-emerald-400 text-xs font-medium">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    {successMsg}
                </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              
              {/* Registration Extra Fields */}
              {mode === 'register' && (
                  <>
                    <div className="space-y-1.5">
                        <label htmlFor="fullName" className="block text-xs font-bold text-neutral-400 uppercase tracking-wide ml-1">{t.auth.labels.fullname}</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                                <User size={18} />
                            </div>
                            <input 
                                id="fullName"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all hover:bg-white/[0.05]"
                                placeholder={t.auth.placeholders.fullname}
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="company" className="block text-xs font-bold text-neutral-400 uppercase tracking-wide ml-1">{t.auth.labels.company}</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                                <Building2 size={18} />
                            </div>
                            <input 
                                id="company"
                                type="text"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all hover:bg-white/[0.05]"
                                placeholder={t.auth.placeholders.company}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1.5">
                            <label htmlFor="city" className="block text-xs font-bold text-neutral-400 uppercase tracking-wide ml-1">{t.auth.labels.city}</label>
                            <input 
                                id="city"
                                type="text"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                placeholder={t.auth.placeholders.city}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="country" className="block text-xs font-bold text-neutral-400 uppercase tracking-wide ml-1">{t.auth.labels.country}</label>
                            <input 
                                id="country"
                                type="text"
                                required
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                placeholder={t.auth.placeholders.country}
                            />
                        </div>
                    </div>
                  </>
              )}

              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-bold text-neutral-400 uppercase tracking-wide ml-1">
                  {t.auth.labels.email}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    id="email"
                    type="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                    placeholder={t.auth.placeholders.email}
                  />
                </div>
              </div>

              {/* Password Input (Hidden for Forgot Password flow if you prefer, but usually needed for registration/login) */}
              {mode !== 'forgot' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                      <label htmlFor="password" className="block text-xs font-bold text-neutral-400 uppercase tracking-wide">
                        {t.auth.labels.password}
                      </label>
                      {mode === 'login' && (
                          <button type="button" onClick={() => setMode('forgot')} className="text-xs text-neutral-500 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:underline">
                            {t.auth.links.forgot_password}
                          </button>
                      )}
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
                        <Lock size={18} />
                      </div>
                      <input 
                        id="password"
                        type={showPassword ? "text" : "password"} 
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-12 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                        placeholder={t.auth.placeholders.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-white transition-colors focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-emerald-500 text-neutral-950 font-bold py-4 rounded-xl text-sm uppercase tracking-wide hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>
                        {mode === 'login' && t.auth.buttons.login}
                        {mode === 'register' && t.auth.buttons.register}
                        {mode === 'forgot' && t.auth.buttons.forgot}
                    </span>
                    <ChevronRight size={18} strokeWidth={2.5} className={`group-hover:translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </>
                )}
              </button>
            </form>
            
            {/* Toggle Modes */}
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
                {mode === 'login' ? (
                    <p className="text-sm text-neutral-500">
                        {t.auth.links.new_user}{' '}
                        <button onClick={() => setMode('register')} className="text-white hover:text-emerald-400 font-medium transition-colors">
                            {t.auth.links.create_account}
                        </button>
                    </p>
                ) : (
                    <p className="text-sm text-neutral-500">
                        {t.auth.links.existing_user}{' '}
                        <button onClick={() => setMode('login')} className="text-white hover:text-emerald-400 font-medium transition-colors">
                            {t.auth.links.login_here}
                        </button>
                    </p>
                )}
            </div>

            <div className="mt-6 flex gap-4 justify-center">
                 <div className="text-[10px] text-neutral-600 font-medium uppercase tracking-wider">Support 24/7</div>
                 <div className="text-[10px] text-neutral-600 font-medium uppercase tracking-wider">Données chiffrées</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Login;
