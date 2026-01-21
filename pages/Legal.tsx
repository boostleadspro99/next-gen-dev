import React from 'react';
import FadeIn from '../components/FadeIn';

const Legal: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Mentions Légales</h1>
          <div className="h-1 w-20 bg-emerald-500 rounded-full mb-12"></div>
        </FadeIn>

        <div className="space-y-12 text-neutral-400 font-light leading-relaxed text-sm md:text-base">
          <FadeIn delay={100}>
            <section className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                1. Éditeur du site
              </h2>
              <p className="mb-4">
                Le site NexGen Digital est édité par la société <strong>NexGen SAS</strong>, société par actions simplifiée au capital de 10 000 euros.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-500">
                <li><strong>Siège social :</strong> 12 Avenue de l'Innovation, 75001 Paris, France</li>
                <li><strong>RCS :</strong> Paris B 123 456 789</li>
                <li><strong>SIRET :</strong> 123 456 789 00012</li>
                <li><strong>TVA Intracommunautaire :</strong> FR 12 123456789</li>
                <li><strong>Email :</strong> contact@nexgen.com</li>
                <li><strong>Directeur de la publication :</strong> M. Alex NexGen</li>
              </ul>
            </section>
          </FadeIn>

          <FadeIn delay={200}>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                2. Hébergement
              </h2>
              <p>
                L'infrastructure NexGen est hébergée sur les serveurs de <strong>Vercel Inc.</strong> (USA) et <strong>AWS Europe</strong> (Irlande/Francfort) pour garantir une haute disponibilité et une vitesse optimale. Les données clients sont stockées en conformité avec le RGPD sur le territoire européen.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={300}>
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                 <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                3. Propriété Intellectuelle
              </h2>
              <p className="mb-4">
                La structure générale du site NexGen, ainsi que les textes, graphiques, images, sons et vidéos la composant, sont la propriété de l'éditeur ou de ses partenaires. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale des contenus et services proposés par le site, par quelque procédé que ce soit, sans l'autorisation préalable et par écrit de NexGen est strictement interdite et serait susceptible de constituer une contrefaçon au sens des articles L 335-2 et suivants du Code de la propriété intellectuelle.
              </p>
              <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-lg text-emerald-100/80 text-sm">
                <strong>Note pour les clients :</strong> Vos contenus (textes, images) et votre nom de domaine restent votre entière propriété exclusive.
              </div>
            </section>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Legal;