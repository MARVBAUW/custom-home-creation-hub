
import React from 'react';
import { FileX } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const TerminationSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<FileX className="h-6 w-6" />} title="Article 11 - Résiliation" />}
    >
      <p>
        En cas de manquement par l'une des parties à l'une quelconque de ses obligations, l'autre partie pourra 
        résilier le contrat après mise en demeure adressée par lettre recommandée avec accusé de réception 
        demeurée infructueuse pendant un délai de quinze (15) jours.
      </p>
    </LegalSection>
  );
};

export default TerminationSection;
