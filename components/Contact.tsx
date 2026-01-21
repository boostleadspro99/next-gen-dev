import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import FadeIn from './FadeIn';

const Contact: React.FC = () => {
  return (
    <section className="pt-32 pb-24 px-6 min-h-screen relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto">
            <FadeIn>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight text-center">Contactez NexGen</h1>
                <p className="text-neutral-300 text-center max-w-2xl mx-auto mb-20 font-normal text-lg leading-relaxed">
                    Un projet ? Une question ? Notre équipe est prête à vous répondre. <br/>
                    <span className="text-emerald-400 font-medium">Réponse garantie sous 24h ouvrées.</span>
                </p>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                
                {/* Contact Info */}
                <FadeIn direction="right" delay={100} className="h-full">
                    <div className="space-y-8">
                        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-6">Nos Coordonnées</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-neutral-950 transition-colors border border-emerald-500/10">
                                        <Mail size={20} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-neutral-400 mb-1">Email</div>
                                        <a href="mailto:contact@nexgen.com" className="text-base text-white hover:text-emerald-400 transition-colors">contact@nexgen.com</a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-neutral-950 transition-colors border border-emerald-500/10">
                                        <Phone size={20} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-neutral-400 mb-1">Téléphone</div>
                                        <a href="tel:+33100000000" className="text-base text-white hover:text-emerald-400 transition-colors">+33 1 00 00 00 00</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-neutral-950 transition-colors border border-emerald-500/10">
                                        <MapPin size={20} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-neutral-400 mb-1">Bureaux</div>
                                        <span className="text-base text-white">12 Avenue de l'Innovation<br/>75001 Paris, France</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-transparent border border-emerald-500/20">
                            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <MessageSquare size={20} className="text-emerald-400" />
                                Support Client
                            </h3>
                            <p className="text-sm text-neutral-300 leading-relaxed mb-4 font-normal">
                                Déjà client NexGen ? Pour un traitement prioritaire, connectez-vous directement à votre Espace Client pour ouvrir un ticket.
                            </p>
                            <a href="/login" className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 border-b border-emerald-500/30 hover:border-emerald-400 pb-0.5 transition-all">
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
                                    <label className="block text-xs font-bold text-neutral-400 mb-2 uppercase tracking-wide">Nom</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-neutral-600 hover:border-white/20" placeholder="Votre nom" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-400 mb-2 uppercase tracking-wide">Email</label>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-neutral-600 hover:border-white/20" placeholder="email@exemple.com" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-400 mb-2 uppercase tracking-wide">Sujet</label>
                                <div className="relative">
                                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none cursor-pointer hover:border-white/20">
                                        <option className="bg-neutral-900 text-neutral-300">Je suis intéressé par une offre</option>
                                        <option className="bg-neutral-900 text-neutral-300">Question technique</option>
                                        <option className="bg-neutral-900 text-neutral-300">Partenariat</option>
                                        <option className="bg-neutral-900 text-neutral-300">Autre demande</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-neutral-500">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-400 mb-2 uppercase tracking-wide">Message</label>
                                <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-neutral-600 resize-none hover:border-white/20" placeholder="Dites-nous en plus sur votre projet..."></textarea>
                            </div>

                            <button className="w-full bg-emerald-500 text-neutral-950 font-bold py-4 rounded-xl text-sm uppercase tracking-wide hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                                <span>Envoyer le message</span>
                                <Send size={18} strokeWidth={2.5} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>

                            <p className="text-center text-[10px] text-neutral-500 mt-2">
                                En envoyant ce formulaire, vous acceptez notre <a href="/privacy" className="underline hover:text-emerald-400 transition-colors">politique de confidentialité</a>.
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