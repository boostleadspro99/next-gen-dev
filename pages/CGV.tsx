import React from 'react';
import FadeIn from '../components/FadeIn';

const CGV: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Conditions Générales de Vente</h1>
          <p className="text-neutral-500 mb-8">Dernière mise à jour : 01 Octobre 2025</p>
          <div className="h-1 w-20 bg-emerald-500 rounded-full mb-12"></div>
        </FadeIn>

        <div className="space-y-12 text-neutral-400 font-light leading-relaxed text-sm md:text-base">
          <FadeIn delay={100}>
            <section className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">1. Objet</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la société NexGen SAS et toute personne (le « Client ») souscrivant à l'un des abonnements de création et maintenance de site web proposés sur le site nexgen.com.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={200}>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">2. Services et Abonnements</h2>
              <p className="mb-4">
                NexGen propose des services de création, d'hébergement et de maintenance de sites internet sous forme d'abonnement mensuel (SaaS).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-500">
                <li><strong>Offre Présence (49€/mois) :</strong> Site One-page.</li>
                <li><strong>Offre Boost (99€/mois) :</strong> Site Multi-pages optimisé conversion.</li>
                <li><strong>Offre Business (199€/mois) :</strong> Site E-commerce ou complexe.</li>
              </ul>
            </section>
          </FadeIn>

          <FadeIn delay={300}>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">3. Durée et Résiliation</h2>
              <p className="mb-4">
                Tous nos abonnements sont <strong>sans engagement de durée</strong>.
              </p>
              <p className="mb-4">
                Le Client peut résilier son abonnement à tout moment :
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-500">
                <li>Via son Espace Client.</li>
                <li>Par email à support@nexgen.com avec un préavis de 7 jours avant la date de renouvellement.</li>
              </ul>
              <p className="mt-4">
                Tout mois commencé est dû. À la résiliation, le site est mis hors ligne à la fin de la période payée. Le Client conserve la propriété de son nom de domaine et peut récupérer ses contenus textes et images sur demande.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={400}>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">4. Paiement</h2>
              <p>
                Le paiement s'effectue par prélèvement automatique mensuel via notre partenaire sécurisé Stripe. En cas d'échec de paiement, une nouvelle tentative sera effectuée sous 3 jours. Au-delà de 3 échecs, l'accès au site pourra être suspendu temporairement.
              </p>
            </section>
          </FadeIn>

           <FadeIn delay={500}>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">5. Responsabilité</h2>
              <p>
                NexGen est soumis à une obligation de moyens concernant la disponibilité et la sécurité des sites hébergés. Nous mettons en œuvre des sauvegardes quotidiennes et des protections anti-DDoS. Cependant, NexGen ne saurait être tenu responsable des pertes d'exploitation directes ou indirectes subies par le Client en cas d'indisponibilité temporaire du service indépendante de notre volonté.
              </p>
            </section>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CGV;