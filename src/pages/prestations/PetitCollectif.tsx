
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const PetitCollectif = () => {
  return (
    <>
      <SEO
        title="Petit collectif résidentiel | Maître d'œuvre PACA - Progineer"
        description="Réalisation de petits collectifs résidentiels sur mesure à Marseille et en région PACA."
        keywords="petit collectif résidentiel, construction, maître d'œuvre Marseille, collectif PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/petit-collectif"
      />
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Petit collectif résidentiel</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <InternalLinkText
                text="Spécialiste du petit collectif résidentiel, Progineer accompagne les promoteurs et investisseurs souhaitant développer un projet sur mesure dans la région PACA. Nous intervenons de l'avant-projet à la livraison, incluant le montage administratif, la construction neuve ou la réhabilitation."
                className="text-lg text-gray-700 mb-4"
                maxOccurrences={2}
              />
              <p className="mb-4">
                Notre expertise dans ce domaine garantit des projets respectant à la fois les contraintes économiques, 
                les réglementations actuelles, et l'intégration harmonieuse dans le tissu urbain.
              </p>
              <p className="mb-4">
                Que vous soyez un petit promoteur ou un investisseur, nous vous proposons une démarche globale incluant :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Étude de faisabilité complète</li>
                <li>Conception architecturale adaptée</li>
                <li>Optimisation des surfaces et des coûts</li>
                <li>Montage administratif et obtention des autorisations</li>
                <li>Pilotage et coordination des travaux</li>
                <li>Suivi financier et qualité de réalisation</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Nos engagements pour votre projet collectif</h2>
              <p className="mb-4">
                Le petit collectif résidentiel représente une solution idéale entre la maison individuelle et le grand ensemble. 
                Il permet de proposer des logements de qualité tout en optimisant l'usage du foncier.
              </p>
              <p className="mb-4">
                Nous accompagnons nos clients avec un soin particulier pour :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Intégrer les nouvelles normes environnementales (RE2020)</li>
                <li>Concevoir des espaces communs qualitatifs</li>
                <li>Assurer la pérennité du bâti et sa facilité d'entretien</li>
                <li>Proposer des logements adaptés aux besoins actuels</li>
                <li>Optimiser les coûts d'exploitation</li>
              </ul>
              <p className="font-medium">
                Contactez Progineer pour étudier votre projet de petit collectif résidentiel dans la région PACA, 
                de l'étude de faisabilité à la livraison clé en main.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default PetitCollectif;
