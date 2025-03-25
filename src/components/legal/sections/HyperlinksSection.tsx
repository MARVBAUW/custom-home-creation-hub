
import React from 'react';
import { Globe } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const HyperlinksSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<Globe className="h-6 w-6" />} title="7. Liens hypertextes" />}
    >
      <p>
        Le site progineer.fr peut contenir des liens hypertextes vers d'autres sites internet. Progineer n'exerce 
        aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
      </p>
    </LegalSection>
  );
};

export default HyperlinksSection;
