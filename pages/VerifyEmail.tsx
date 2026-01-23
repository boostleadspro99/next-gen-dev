import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { Mail, ArrowRight, LogOut, CheckCircle2, RefreshCw } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const VerifyEmail: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleResend = async () => {
    if (!currentUser) return;
    setSending(true);
    try {
      await sendEmailVerification(currentUser);
      setMessage({ type: 'success', text: t.auth.messages.verification_resent });
    } catch (error: any) {
      if (error.code === 'auth/too-many-requests') {
          setMessage({ type: 'error', text: t.auth.errors.too_many_requests });
      } else {
          setMessage({ type: 'error', text: t.auth.errors.generic });
      }
    } finally {
      setSending(false);
    }
  };

  const handleReload = () => {
      window.location.reload();
  };

  return (
    <section className="min-h-screen pt-32 pb-12 px-6 flex items-center justify-center bg-[#030303]">
      <div className="w-full max-w-md">
        <FadeIn>
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
            
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                <Mail size={32} className="text-emerald-500" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">{t.auth.titles.verify}</h1>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              {t.auth.messages.verification_sent} <br/>
              <span className="text-white font-medium">{currentUser?.email}</span>.
            </p>

            <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 text-sm text-neutral-300 border border-white/5">
                    {t.auth.messages.verification_instructions}
                </div>

                {message && (
                    <div className={`p-3 rounded-lg text-sm flex items-center gap-2 justify-center ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {message.type === 'success' ? <CheckCircle2 size={16} /> : null}
                        {message.text}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handleReload}
                        className="w-full py-3 bg-white text-neutral-950 font-bold rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={18} />
                        {t.auth.buttons.verify_done}
                    </button>
                    
                    <button 
                        onClick={handleResend}
                        disabled={sending}
                        className="w-full py-3 bg-emerald-500/10 text-emerald-400 font-bold rounded-xl hover:bg-emerald-500/20 transition-colors border border-emerald-500/20 disabled:opacity-50"
                    >
                        {sending ? t.auth.buttons.sending : t.auth.buttons.resend}
                    </button>
                </div>
            </div>

            <button 
                onClick={() => logout()}
                className="mt-8 text-neutral-500 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors w-full"
            >
                <LogOut size={14} />
                {t.auth.buttons.logout}
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default VerifyEmail;
