
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';

const PetitCollectif = () => {
  return (
    <>
      <SEO
        title="Construction de petit collectif résidentiel PACA | Progineer"
        description="Maître d'œuvre spécialiste des petits collectifs résidentiels en PACA. De l'optimisation foncière à la livraison, nous concevons des immeubles de qualité."
        keywords="petit collectif résidentiel, construction immeuble, maître d'œuvre Marseille, R+2, R+3, PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/petit-collectif"
      />
      
      {/* Ajout de la navigation secondaire pour les pages de prestation */}
      <PrestationsSubNav activeService="petit-collectif" />
      
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Conception et construction de petits collectifs résidentiels</h1>
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
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Types de projets réalisés</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <strong>Immeubles R+1 à R+3</strong>
                  <p className="text-sm text-gray-600 mt-1">Immeubles de taille humaine parfaitement intégrés au tissu urbain existant</p>
                </li>
                <li>
                  <strong>Résidences de standing</strong>
                  <p className="text-sm text-gray-600 mt-1">Petits collectifs haut de gamme avec prestations soignées</p>
                </li>
                <li>
                  <strong>Réhabilitations d'immeubles</strong>
                  <p className="text-sm text-gray-600 mt-1">Transformation de bâtiments existants en petits collectifs</p>
                </li>
                <li>
                  <strong>Résidences services</strong>
                  <p className="text-sm text-gray-600 mt-1">Petits collectifs adaptés à des publics spécifiques</p>
                </li>
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
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Un interlocuteur unique pour votre projet</h3>
              <p className="mb-4">
                En tant que maître d'œuvre spécialisé, nous assumons la responsabilité complète du projet,
                de sa conception à sa livraison. Cela vous permet de :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Simplifier la chaîne de décision</li>
                <li>Gagner en réactivité</li>
                <li>Bénéficier d'une vision globale et cohérente</li>
                <li>Optimiser les coûts à chaque étape</li>
                <li>Garantir la qualité d'exécution</li>
              </ul>
              
              <p className="font-medium">
                Contactez Progineer pour étudier votre projet de petit collectif résidentiel dans la région PACA, 
                de l'étude de faisabilité à la livraison clé en main.
              </p>
            </div>
          </div>
        </Container>
      </section>
      
      <SEOFooter 
        text="Construction de petits collectifs résidentiels en PACA par Progineer, maître d'œuvre expert en promotion immobilière à taille humaine. De la conception à la réalisation, nous vous accompagnons dans tous vos projets immobiliers à Marseille, Nice, Toulon et dans toute la région PACA."
        additionalKeywords={[
          "immeubles résidentiels PACA", 
          "petit collectif Marseille", 
          "construction R+2 Nice", 
          "promotion immobilière Toulon", 
          "résidence petit collectif"
        ]}
      />
    </>
  );
};
export default PetitCollectif;
