
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';

const Rehabilitation = () => {
  return (
    <>
      <SEO
        title="Réhabilitation complète de bâtiments anciens PACA | Progineer"
        description="Experts en réhabilitation de bâtiments anciens ou patrimoniaux en PACA. Redonner vie et fonctionnalité à votre bien tout en préservant son caractère."
        keywords="réhabilitation bâtiment, réhabilitation patrimoine, transformation immeuble, rénovation lourde, PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/rehabilitation"
      />
      
      {/* Ajout de la navigation secondaire pour les pages de prestation */}
      <PrestationsSubNav activeService="rehabilitation" />
      
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Réhabilitation complète de bâtiments anciens</h1>
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
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Défis spécifiques de la réhabilitation</h3>
              <p className="mb-4">
                Réhabiliter un bâtiment ancien représente plusieurs défis que notre expertise permet de relever :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <strong>Contraintes techniques</strong>
                  <p className="text-sm text-gray-600 mt-1">Gestion des structures existantes, parfois fragilisées par le temps</p>
                </li>
                <li>
                  <strong>Contraintes réglementaires</strong>
                  <p className="text-sm text-gray-600 mt-1">Mise aux normes tout en préservant le caractère du bâtiment</p>
                </li>
                <li>
                  <strong>Contraintes patrimoniales</strong>
                  <p className="text-sm text-gray-600 mt-1">Respect des éléments historiques et architecturaux</p>
                </li>
                <li>
                  <strong>Contraintes énergétiques</strong>
                  <p className="text-sm text-gray-600 mt-1">Amélioration significative des performances sans dénaturer</p>
                </li>
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
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Notre méthodologie de réhabilitation</h3>
              <ol className="list-decimal pl-6 mb-6 space-y-3">
                <li>
                  <strong>Étude patrimoniale et historique</strong>
                  <p className="text-sm text-gray-600 mt-1">Comprendre l'âme et les spécificités du bâtiment</p>
                </li>
                <li>
                  <strong>Diagnostic technique approfondi</strong>
                  <p className="text-sm text-gray-600 mt-1">Évaluation des structures, matériaux et réseaux existants</p>
                </li>
                <li>
                  <strong>Conception respectueuse</strong>
                  <p className="text-sm text-gray-600 mt-1">Design intégrant modernité et respect du patrimoine</p>
                </li>
                <li>
                  <strong>Sélection d'entreprises spécialisées</strong>
                  <p className="text-sm text-gray-600 mt-1">Collaboration avec des artisans experts en bâti ancien</p>
                </li>
                <li>
                  <strong>Suivi renforcé du chantier</strong>
                  <p className="text-sm text-gray-600 mt-1">Présence accrue pour gérer les imprévus inhérents à l'ancien</p>
                </li>
              </ol>
              
              <p className="font-medium">
                Confiez votre projet de réhabilitation à Progineer pour bénéficier d'un accompagnement 
                sur mesure et d'une expertise reconnue dans la région PACA.
              </p>
            </div>
          </div>
        </Container>
      </section>
      
      <SEOFooter 
        text="Réhabilitation de bâtiments anciens en PACA par Progineer, maître d'œuvre spécialisé dans la transformation et la valorisation du patrimoine bâti. Notre expertise technique et notre sensibilité architecturale nous permettent de mener à bien vos projets de réhabilitation à Marseille, Nice, Toulon et dans toute la région PACA."
        additionalKeywords={[
          "réhabilitation immeuble ancien", 
          "transformation bâtiment Marseille", 
          "mise aux normes bâti ancien", 
          "rénovation lourde patrimoine", 
          "reconversion bâtiment PACA"
        ]}
      />
    </>
  );
};
export default Rehabilitation;
