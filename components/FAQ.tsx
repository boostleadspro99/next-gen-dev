import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import FadeIn from './FadeIn';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Suis-je engagé sur la durée ?",
      answer: "Absolument pas. Nos offres sont sans engagement de durée. Vous pouvez résilier votre abonnement à tout moment simplement par email. Le service s'arrêtera à la fin du mois en cours. Nous misons sur votre satisfaction pour vous garder, pas sur un contrat verrouillé."
    },
    {
      question: "À qui appartient le site ?",
      answer: "C'est un point crucial : Votre nom de domaine (ex: votrentreprise.com) et tout votre contenu (vos textes, vos images, votre logo) vous appartiennent à 100%. La structure technique et le code sont mis à disposition par NexGen tant que l'abonnement est actif (modèle SaaS/Location), ce qui nous permet de garantir la maintenance."
    },
    {
      question: "Que se passe-t-il une fois le site en ligne ?",
      answer: "Contrairement à une agence classique qui vous livre et part, c'est là que notre travail de fond commence. Nous surveillons la sécurité, effectuons les mises à jour techniques et restons disponibles pour vos modifications. Votre site ne devient jamais obsolète."
    },
    {
      question: "Pourquoi choisir NexGen plutôt qu'un freelance ?",
      answer: "Pour la tranquillité d'esprit. Un freelance vend un 'produit fini' et passe au client suivant. S'il y a un bug 6 mois plus tard, vous êtes seul ou devez repayer. NexGen est un partenaire continu : nous sommes votre équipe technique externalisée, toujours là, sans surcoût."
    },
    {
      question: "Garantissez-vous des résultats (ventes/appels) ?",
      answer: "Soyons honnêtes : personne ne peut garantir des ventes à 100% car cela dépend aussi de votre offre et de votre marché. Ce que nous garantissons, c'est de vous fournir la meilleure 'machine' possible pour convertir : un site ultra-rapide, optimisé pour le SEO et pensé pour la persuasion. Nous vous donnons la meilleure voiture, à vous de la piloter."
    },
    {
      question: "Comment fonctionne le support et les modifications ?",
      answer: "Besoin de changer un prix ? Une photo ? Une phrase ? Ouvrez un ticket dans votre Espace Client ou envoyez un message WhatsApp. C'est inclus dans l'abonnement. Nous traitons la plupart des demandes simples en moins de 24h ouvrées."
    }
  ];

  return (
    <section id="faq" className="py-24 px-6 relative z-10 bg-[#030303]">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 text-emerald-500 mb-6 border border-white/10">
                <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-neutral-400 font-light">
              Tout ce que vous devez savoir avant de lancer votre machine à vendre.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 50}>
              <div className={`border rounded-xl bg-white/[0.02] overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-emerald-500/30 bg-emerald-900/5' : 'border-white/5 hover:border-white/10'}`}>
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left text-sm md:text-base font-medium text-white hover:bg-white/5 transition-colors focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <span className={openIndex === index ? 'text-emerald-400' : 'text-neutral-200'}>{faq.question}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-neutral-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-emerald-500' : ''}`} 
                  />
                </button>
                <div 
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-sm text-neutral-400 font-light leading-relaxed border-t border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;