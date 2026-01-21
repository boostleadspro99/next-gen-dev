import React from 'react';
import FadeIn from '../components/FadeIn';

const Privacy: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Politique de Confidentialité</h1>
          <p className="text-neutral-500 mb-8">Conformité RGPD - Données personnelles</p>
          <div className="h-1 w-20 bg-emerald-500 rounded-full mb-12"></div>
        </FadeIn>

        <div className="space-y-12 text-neutral-400 font-light leading-relaxed text-sm md:text-base">
          <FadeIn delay={100}>
            <section className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
              <h2 className="text-xl font-semibold text-white mb-4">1. Collecte des données</h2>
              <p className="mb-4">
                Dans le cadre de l'utilisation de nos services, nous sommes amenés à collecter les données suivantes :
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-500">
                <li><strong>Données d'identité :</strong> Nom, Prénom, Société.</li>
                <li><strong>Données de contact :</strong> Email professionnel, Numéro de téléphone.</li>
                <li><strong>Données financières :</strong> Historique de facturation (les données de carte bancaire sont gérées exclusivement par Stripe et ne sont jamais stockées sur nos serveurs).</li>
                <li><strong>Données techniques :</strong> Adresse IP, logs de connexion à l'Espace Client.</li>
              </ul>
            </section>
          </FadeIn>

          <FadeIn delay={200}>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Utilisation des données</h2>
              <p>
                Vos données sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-neutral-500">
                <li>La gestion de votre compte client et de vos abonnements.</li>
                <li>L'exécution des services techniques (maintenance, mises à jour).</li>
                <li>L'envoi de factures et notifications administratives.</li>
                <li>L'amélioration de nos services via des statistiques anonymisées.</li>
              </ul>
              <p className="mt-4 text-emerald-500">
                Nous ne revendons jamais vos données à des tiers publicitaires.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={300}>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Cookies</h2>
              <p>
                Ce site utilise uniquement des cookies techniques strictement nécessaires au fonctionnement du service (authentification espace client, sécurité). Nous n'utilisons pas de traceurs publicitaires tiers intrusifs.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={400}>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Vos droits</h2>
              <p className="mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données.
              </p>
              <p>
                Pour exercer ces droits, contactez notre DPO à l'adresse : <a href="mailto:privacy@nexgen.com" className="text-emerald-500 hover:underline">privacy@nexgen.com</a>.
              </p>
            </section>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Privacy;