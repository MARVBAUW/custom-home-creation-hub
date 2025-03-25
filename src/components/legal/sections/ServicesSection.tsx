
import React from 'react';
import { Hammer } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const ServicesSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<Hammer className="h-6 w-6" />} title="Article 2 - Prestations de services" />}
    >
      <p>
        Les prestations de services proposées par le Prestataire sont les suivantes :
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Maîtrise d'œuvre</li>
        <li>Conception architecturale</li>
        <li>Suivi de chantier</li>
        <li>Construction sur mesure</li>
        <li>Rénovation énergétique</li>
        <li>Extension & agrandissement</li>
        <li>Optimisation d'espace</li>
        <li>Design d'espace</li>
        <li>Montage administratif & réglementaire</li>
      </ul>
    </LegalSection>
  );
};

export default ServicesSection;
