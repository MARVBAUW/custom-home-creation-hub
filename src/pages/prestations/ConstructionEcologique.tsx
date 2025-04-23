
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';

const ConstructionEcologique = () => {
  return (
    <>
      <SEO
        title="Construction écologique et bioclimatique | Maître d'œuvre PACA"
        description="Construction écologique en région PACA : maisons bois, matériaux biosourcés, conception bioclimatique et bâtiments passifs par Progineer, maître d'œuvre éco-responsable."
        keywords="construction écologique, maison bois, matériaux biosourcés, bioclimatique, passif, RE2020, PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/construction-ecologique"
      />
      
      {/* Ajout de la navigation secondaire pour les pages de prestation */}
      <PrestationsSubNav activeService="construction-ecologique" />
      
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Construction écologique et habitat durable</h1>
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
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Les piliers de notre approche écologique</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">1. La conception bioclimatique</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Orientation optimisée, protection solaire, ventilation naturelle et inertie thermique pour 
                    minimiser les besoins énergétiques de votre habitation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">2. Les matériaux sains et durables</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Sélection de matériaux à faible impact environnemental : bois PEFC/FSC, isolants naturels,
                    peintures et enduits écologiques, etc.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">3. L'efficacité énergétique</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Conception ultra-performante dépassant les exigences de la RE2020, avec objectif 
                    bâtiment passif ou à énergie positive.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">4. Le confort et la santé</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Qualité de l'air intérieur, confort thermique été comme hiver, acoustique soignée 
                    et luminosité naturelle optimisée.
                  </p>
                </div>
              </div>
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
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Solutions adaptées au climat méditerranéen</h3>
              <p className="mb-4">
                La région PACA présente des spécificités climatiques qui nécessitent des réponses adaptées :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <strong>Protection contre la chaleur estivale</strong>
                  <p className="text-sm text-gray-600 mt-1">Brise-soleil, casquettes, pergolas bioclimatiques, végétalisation</p>
                </li>
                <li>
                  <strong>Gestion de l'eau</strong>
                  <p className="text-sm text-gray-600 mt-1">Récupération des eaux pluviales, jardins secs, plantations adaptées</p>
                </li>
                <li>
                  <strong>Ventilation naturelle</strong>
                  <p className="text-sm text-gray-600 mt-1">Conception favorisant les courants d'air et le rafraîchissement naturel</p>
                </li>
                <li>
                  <strong>Isolation renforcée</strong>
                  <p className="text-sm text-gray-600 mt-1">Protection contre la chaleur et conservation de la fraîcheur</p>
                </li>
              </ul>
              
              <p className="font-medium">
                Faites confiance à Progineer pour concevoir et réaliser votre projet de construction 
                écologique en région PACA, alliant performance environnementale, confort et esthétique.
              </p>
            </div>
          </div>
        </Container>
      </section>
      
      <SEOFooter 
        text="Construction écologique en région PACA par Progineer, maître d'œuvre spécialisé en habitat durable et éco-construction. Nos solutions innovantes en ossature bois, conception bioclimatique et matériaux biosourcés répondent aux défis environnementaux actuels tout en s'adaptant parfaitement au climat méditerranéen de Marseille, Nice, Toulon et toute la région PACA."
        additionalKeywords={[
          "maison écologique PACA", 
          "construction bois Marseille", 
          "habitat bioclimatique", 
          "matériaux biosourcés méditerranée", 
          "bâtiment basse consommation"
        ]}
      />
    </>
  );
};
export default ConstructionEcologique;
