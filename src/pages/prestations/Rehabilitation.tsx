
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const Rehabilitation = () => {
  return (
    <>
      <SEO
        title="Réhabilitation de bâtiments | Maître d'œuvre PACA - Progineer"
        description="Réhabilitation complète de bâtiments anciens à Marseille, Nice, Toulon et dans toute la région PACA."
        keywords="réhabilitation, maître d'œuvre, patrimoine, rénovation lourde, PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/rehabilitation"
      />
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Réhabilitation</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <InternalLinkText
                text="La réhabilitation de bâtiments anciens nécessite un savoir-faire spécifique. Progineer assure la réussite de vos projets de réhabilitation en respectant le patrimoine architectural, l'efficacité énergétique et les normes en vigueur. Contactez notre équipe pour une étude personnalisée."
                className="text-lg text-gray-700 mb-4"
                maxOccurrences={2}
              />
              <p className="mb-4">
                Basés en région PACA, nous intervenons sur tous types de bâtiments : immeubles de caractère, 
                résidences anciennes, locaux commerciaux ou bâtiments industriels à reconvertir.
              </p>
              <p className="mb-4">
                Notre approche de la réhabilitation comprend :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Diagnostic complet de l'existant et analyse structurelle</li>
                <li>Valorisation des éléments patrimoniaux</li>
                <li>Mise aux normes (sécurité, accessibilité, incendie)</li>
                <li>Rénovation énergétique et phonique</li>
                <li>Reconfiguration des espaces selon les besoins actuels</li>
                <li>Suivi et coordination des corps de métier spécialisés</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Spécialiste de la réhabilitation en PACA</h2>
              <p className="mb-4">
                La réhabilitation représente bien plus qu'une simple rénovation. Elle implique la renaissance d'un 
                bâtiment tout en préservant son identité et son caractère.
              </p>
              <p className="mb-4">
                Notre expertise s'étend à plusieurs typologies de projets :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Réhabilitation d'immeubles en centre-ville</li>
                <li>Reconversion de bâtiments industriels</li>
                <li>Revalorisation d'espaces commerciaux</li>
                <li>Restructuration d'espaces professionnels</li>
                <li>Rénovation d'appartements et maisons anciennes</li>
              </ul>
              <p className="font-medium">
                Confiez votre projet de réhabilitation à Progineer pour bénéficier d'un accompagnement 
                sur mesure et d'une expertise reconnue dans la région PACA.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default Rehabilitation;
