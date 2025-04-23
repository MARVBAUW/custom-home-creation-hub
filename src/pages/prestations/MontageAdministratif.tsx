
import React from 'react';
import Container from '@/components/common/Container';
import SEO from '@/components/common/SEO';
import { InternalLinkText } from '@/utils/internalLinking';

const MontageAdministratif = () => {
  return (
    <>
      <SEO 
        title="Montage administratif | Maître d'œuvre PACA - Progineer"
        description="Accompagnement complet dans le montage administratif de votre projet immobilier en région PACA."
        keywords="montage administratif, permis de construire, dossier administratif, maître d'œuvre PACA"
        canonicalUrl="https://progineer.fr/prestations-maitre-oeuvre/montage-administratif"
      />
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Montage administratif</h1>
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
              <p className="font-medium">
                Simplifiez vos démarches administratives en confiant votre projet à Progineer, 
                expert en montage administratif en région PACA.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default MontageAdministratif;
