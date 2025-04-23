
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';
import SEOFooter from '@/components/common/SEOFooter';
import PrestationsSubNav from '@/components/prestations/PrestationsSubNav';

const MontageAdministratif = () => {
  return (
    <>
      <SEO 
        title="Montage administratif & Permis de construire | Maître d'œuvre PACA"
        description="Expert en montage administratif et permis de construire en région PACA. Accompagnement personnalisé pour tous vos dossiers d'urbanisme à Marseille, Nice et Toulon."
        keywords="montage administratif, permis de construire, dossier urbanisme, maître d'œuvre PACA, autorisation travaux"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/montage-administratif"
      />
      
      {/* Ajout de la navigation secondaire pour les pages de prestation */}
      <PrestationsSubNav activeService="montage-administratif" />
      
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Montage administratif et permis de construire</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <InternalLinkText
                text="Progineer vous accompagne dans toutes vos démarches de montage administratif : dépôt de permis de construire, déclaration préalable, autorisations et gestion des formalités auprès des collectivités. Notre équipe de maître d'œuvre à Marseille, Nice ou Toulon optimise votre projet de construction, rénovation, extension ou réhabilitation."
                maxOccurrences={2}
                className="text-lg text-gray-700 mb-4"
              />
              <p className="mb-4">
                La complexité administrative peut rapidement devenir un frein dans votre projet immobilier. 
                Notre expertise vous permet de vous concentrer sur l'essentiel pendant que nous prenons en charge 
                toutes les démarches nécessaires.
              </p>
              <p className="mb-4">
                Nos services de montage administratif comprennent :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Analyse des règlements d'urbanisme applicables</li>
                <li>Constitution des dossiers administratifs</li>
                <li>Montage et dépôt des demandes d'autorisation</li>
                <li>Suivi des demandes auprès des services instructeurs</li>
                <li>Gestion des modifications éventuelles</li>
                <li>Obtention des attestations réglementaires</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Pourquoi confier votre montage administratif à un professionnel ?</h3>
              <p className="mb-4">
                Les démarches administratives liées à un projet de construction ou de rénovation peuvent être 
                complexes et chronophages. Faire appel à un expert comme Progineer vous assure :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Un gain de temps considérable</li>
                <li>Une minimisation des risques de refus</li>
                <li>Une optimisation de votre projet selon les contraintes locales</li>
                <li>Un suivi personnalisé auprès des services instructeurs</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Expertise règlementaire en PACA</h2>
              <p className="mb-4">
                Notre connaissance approfondie des règlements d'urbanisme de la région PACA nous permet 
                d'optimiser votre projet tout en respectant les contraintes locales.
              </p>
              <p className="mb-4">
                Nous vous assistons pour tous types de dossiers :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Permis de construire pour construction neuve</li>
                <li>Permis de construire pour travaux sur existant</li>
                <li>Déclaration préalable de travaux</li>
                <li>Permis d'aménager</li>
                <li>Dossiers spécifiques (ERP, accessibilité, etc.)</li>
                <li>Obtention des certificats d'urbanisme</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Notre méthodologie pour votre dossier</h3>
              <ol className="list-decimal pl-6 mb-6 space-y-3">
                <li>
                  <strong>Analyse préalable</strong>
                  <p className="text-sm text-gray-600 mt-1">Étude du PLU, des servitudes et des contraintes particulières</p>
                </li>
                <li>
                  <strong>Conception adaptée</strong>
                  <p className="text-sm text-gray-600 mt-1">Ajustement du projet pour optimiser les chances d'acceptation</p>
                </li>
                <li>
                  <strong>Constitution du dossier</strong>
                  <p className="text-sm text-gray-600 mt-1">Préparation des pièces graphiques et documents administratifs</p>
                </li>
                <li>
                  <strong>Dépôt et suivi</strong>
                  <p className="text-sm text-gray-600 mt-1">Accompagnement jusqu'à l'obtention de l'autorisation</p>
                </li>
              </ol>
              
              <p className="font-medium">
                Simplifiez vos démarches administratives en confiant votre projet à Progineer, 
                expert en montage administratif en région PACA.
              </p>
            </div>
          </div>
        </Container>
      </section>
      
      <SEOFooter 
        text="Montage administratif et permis de construire en région PACA par Progineer, maître d'œuvre spécialisé dans les démarches d'urbanisme. Notre expertise vous garantit une gestion optimale de vos dossiers administratifs à Marseille, Nice, Toulon et dans toute la région Provence-Alpes-Côte d'Azur."
        additionalKeywords={[
          "permis de construire PACA", 
          "déclaration préalable Marseille", 
          "dossier urbanisme Nice", 
          "autorisation travaux Toulon", 
          "montage administratif construction"
        ]}
      />
    </>
  );
};
export default MontageAdministratif;
