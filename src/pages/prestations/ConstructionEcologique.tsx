
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const ConstructionEcologique = () => {
  return (
    <>
      <SEO
        title="Construction écologique | Maître d'œuvre PACA - Progineer"
        description="Solutions de construction écologique à Marseille et dans toute la région PACA, pour un habitat respectueux de l'environnement."
        keywords="construction écologique, maison bois, matériaux biosourcés, passif, maître d'œuvre PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/construction-ecologique"
      />
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Construction écologique</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <InternalLinkText
                text="Progineer conçoit et réalise des projets de construction écologique, avec une démarche responsable et innovante. Découvrez nos solutions en maison à ossature bois, rénovation énergétique, conception bioclimatique et optimisation d'espace."
                className="text-lg text-gray-700 mb-4"
                maxOccurrences={2}
              />
              <p className="mb-4">
                Dans un contexte où les enjeux environnementaux deviennent primordiaux, nous vous proposons 
                des solutions constructives innovantes et durables pour votre habitat ou votre entreprise.
              </p>
              <p className="mb-4">
                Notre expertise en construction écologique comprend :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Construction bois et ossature bois</li>
                <li>Utilisation de matériaux biosourcés et géosourcés</li>
                <li>Conception bioclimatique et passive</li>
                <li>Intégration des énergies renouvelables</li>
                <li>Récupération et gestion des eaux</li>
                <li>Solutions d'isolation performantes et naturelles</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Bâtir durablement en région PACA</h2>
              <p className="mb-4">
                La construction écologique n'est pas une simple tendance, mais une nécessité pour répondre 
                aux défis climatiques actuels tout en offrant un confort optimal aux occupants.
              </p>
              <p className="mb-4">
                Nos engagements pour votre projet écologique :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Respect de la RE2020 et anticipation des futures normes</li>
                <li>Analyse du cycle de vie des matériaux</li>
                <li>Optimisation de l'empreinte carbone</li>
                <li>Adaptabilité aux conditions climatiques méditerranéennes</li>
                <li>Chantiers à faible impact environnemental</li>
                <li>Formation des occupants aux bonnes pratiques</li>
              </ul>
              <p className="font-medium">
                Faites confiance à Progineer pour concevoir et réaliser votre projet de construction 
                écologique en région PACA, alliant performance environnementale, confort et esthétique.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default ConstructionEcologique;
