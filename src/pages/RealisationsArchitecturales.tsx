
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const RealisationsArchitecturales = () => {
  return (
    <>
      <SEO
        title="Réalisations architecturales | Maître d'œuvre PACA - Progineer"
        description="Portfolio de réalisations architecturales à Marseille, Aix, Toulon et dans toute la région PACA."
        keywords="réalisations architecturales, portfolio, maître d'œuvre, projets immobiliers, PACA"
        canonicalUrl="https://progineer.fr/realisations-architecturales"
      />
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Réalisations architecturales</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <InternalLinkText
                text="Découvrez une sélection de nos réalisations architecturales : maisons individuelles, petits collectifs résidentiels, extensions, réhabilitations et rénovations d'appartements en région PACA. Notre équipe de maître d'œuvre intervient pour tout projet sur mesure : construction, extension, optimisation ou design d'intérieur."
                className="text-lg text-gray-700 mb-4"
                maxOccurrences={2}
              />
              <p className="mb-4">
                Notre portfolio vous présente la diversité de notre savoir-faire et notre capacité à répondre 
                à des demandes variées, du projet contemporain à la rénovation patrimoniale.
              </p>
              <h2 className="text-xl font-semibold mb-4">Maisons individuelles</h2>
              <p className="mb-4">
                Découvrez nos réalisations de maisons contemporaines, villas méditerranéennes, 
                et constructions écologiques sur mesure dans toute la région PACA.
              </p>
              <h2 className="text-xl font-semibold mb-4">Extensions et surélévations</h2>
              <p className="mb-4">
                Nos projets d'agrandissement témoignent de notre expertise dans l'intégration harmonieuse 
                de nouvelles surfaces au bâti existant, en maximisant l'espace et la lumière.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Réhabilitations</h2>
              <p className="mb-4">
                De la rénovation d'appartements anciens à la transformation complète d'immeubles, 
                notre savoir-faire valorise le patrimoine tout en apportant confort et modernité.
              </p>
              <h2 className="text-xl font-semibold mb-4">Petits collectifs</h2>
              <p className="mb-4">
                Nos réalisations de petits immeubles résidentiels montrent notre capacité à créer 
                des espaces de vie collectifs de qualité, intégrés dans leur environnement.
              </p>
              <h2 className="text-xl font-semibold mb-4">Design d'intérieur</h2>
              <p className="mb-4">
                Découvrez nos projets d'aménagement intérieur, où fonctionnalité et esthétique 
                se conjuguent pour créer des espaces uniques et personnalisés.
              </p>
              <p className="font-medium mt-4">
                Chaque projet est une histoire unique, fruit d'une collaboration étroite avec nos clients. 
                Consultez nos réalisations pour vous inspirer et imaginer votre futur projet avec Progineer.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default RealisationsArchitecturales;
