import React, { useState } from 'react';
import { X, MessageCircle, User, Smartphone, CheckCircle2 } from 'lucide-react';
import { trackLeadCaptured } from '../utils/analytics';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDemo?: {
    id: string;
    title: string;
  };
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ 
  isOpen, 
  onClose,
  selectedDemo 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Track lead capture
    trackLeadCaptured({
      name: formData.name,
      whatsapp: formData.whatsapp,
      demoId: selectedDemo?.id,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setFormData({ name: '', whatsapp: '' });
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#0A0A0A] to-[#050505] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 z-10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <MessageCircle size={20} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {selectedDemo ? `Personnaliser "${selectedDemo.title}"` : 'Personnaliser votre style'}
              </h3>
              <p className="text-sm text-neutral-400">
                Un expert vous contactera sur WhatsApp pour discuter de votre projet
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-emerald-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Merci !</h4>
              <p className="text-neutral-400">
                Nous vous contacterons sur WhatsApp dans les 24h pour personnaliser votre design.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <p className="text-sm text-emerald-300">
                  <span className="font-bold">Offre spéciale :</span> Personnalisation complète de votre design en 7 jours ouvrables.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                    <User size={14} />
                    Votre nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                    <Smartphone size={14} />
                    Numéro WhatsApp
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                      +212
                    </div>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="6 12 34 56 78"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-16 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      required
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    Format marocain : 6 12 34 56 78 (sans le 0)
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name.trim() || !formData.whatsapp.trim()}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle size={16} />
                        <span>Recevoir l'offre sur WhatsApp</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-300">
                      <span className="font-bold">Sans engagement :</span> Discutez avec notre équipe avant de prendre une décision.
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Nous ne partagerons jamais vos informations avec des tiers.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;