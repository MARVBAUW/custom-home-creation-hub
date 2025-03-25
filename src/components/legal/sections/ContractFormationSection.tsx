
import React from 'react';
import { FileCheck } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const ContractFormationSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<FileCheck className="h-6 w-6" />} title="Article 3 - Formation du contrat" />}
    >
      <p>
        Les devis établis par le Prestataire sont valables pendant une durée de trois (3) mois à compter de leur date d'émission.
      </p>
      <p>
        Le contrat est formé lors de l'acceptation, sans réserve, du devis par le Client. L'acceptation peut prendre 
        la forme d'une signature du devis avec la mention "Bon pour accord", d'un acompte ou de toute autre forme écrite.
      </p>
    </LegalSection>
  );
};

export default ContractFormationSection;
