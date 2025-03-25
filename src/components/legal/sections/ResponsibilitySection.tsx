
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const ResponsibilitySection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<AlertTriangle className="h-6 w-6" />} title="6. Responsabilité" />}
    >
      <p>
        Progineer s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations 
        diffusées sur son site. Toutefois, Progineer ne peut garantir l'exactitude, la précision ou l'exhaustivité 
        des informations mises à disposition sur le site.
      </p>
      <p>
        Progineer décline toute responsabilité concernant les éventuels virus pouvant infecter le matériel 
        informatique de l'utilisateur après utilisation ou consultation du site.
      </p>
    </LegalSection>
  );
};

export default ResponsibilitySection;
