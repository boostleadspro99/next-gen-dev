import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const Contact: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-6 min-h-screen relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto">
            <FadeIn>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight text-center">Contactez NexGen</h1>
                <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-20 font-light text-lg">
                    Un projet ? Une question ? Notre équipe est prête à vous répondre. <br/>
                    <span className="text-emerald-500">Réponse garantie sous 24h ouvrées.</span>
                </p>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                
                {/* Contact Info */}
                <FadeIn direction="right" delay={100} className="h-full">
                    <div className="space-y-8">
                        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="text-xl font-semibold text-white mb-6">Nos Coordonnées</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-neutral-500 mb-1">Email</div>
                                        <a href="mailto:contact@nexgen.com" className="text-white hover:text-emerald-400 transition-colors">contact@nexgen.com</a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-neutral-500 mb-1">Téléphone</div>
                                        <a href="tel:+33100000000" className="text-white hover:text-emerald-400 transition-colors">+33 1 00 00 00 00</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-neutral-500 mb-1">Bureaux</div>
                                        <span className="text-white">12 Avenue de l'Innovation<br/>75001 Paris, France</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/10 to-transparent border border-emerald-500/20">
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <MessageSquare size={18} className="text-emerald-500" />
                                Support Client
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                                Déjà client NexGen ? Pour un traitement prioritaire, connectez-vous directement à votre Espace Client pour ouvrir un ticket.
                            </p>
                            <a href="/login" className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-500 hover:text-emerald-400 border-b border-emerald-500/30 hover:border-emerald-400 pb-0.5 transition-all">
                                Accéder à l'Espace Client &rarr;
                            </a>
                        </div>
                    </div>
                </FadeIn>

                {/* Contact Form */}
                <FadeIn direction="left" delay={200}>
                    <form className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group" onSubmit={(e) => e.preventDefault()}>
                        {/* Top Shine */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
                        
                        <div className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wide">Nom</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-700" placeholder="Votre nom" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wide">Email</label>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-700" placeholder="email@exemple.com" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wide">Sujet</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer">
                                    <option className="bg-neutral-900">Je suis intéressé par une offre</option>
                                    <option className="bg-neutral-900">Question technique</option>
                                    <option className="bg-neutral-900">Partenariat</option>
                                    <option className="bg-neutral-900">Autre demande</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wide">Message</label>
                                <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-700 resize-none" placeholder="Dites-nous en plus sur votre projet..."></textarea>
                            </div>

                            <button className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl text-sm uppercase tracking-wide hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 group/btn">
                                <span>Envoyer le message</span>
                                <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>

                            <p className="text-center text-[10px] text-neutral-600">
                                En envoyant ce formulaire, vous acceptez notre <a href="/privacy" className="underline hover:text-emerald-500">politique de confidentialité</a>.
                            </p>
                        </div>
                    </form>
                </FadeIn>
            </div>
        </div>
    </section>
  );
};

export default Contact;