
import React from 'react';
import { Server } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const HostingSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<Server className="h-6 w-6" />} title="2. Hébergement" />}
    >
      <p>
        Le site progineer.fr est hébergé par la société Hostinger, UAB, immatriculée sous le numéro 
        302994952, dont le siège social est situé au Kaunas, Jonavos g. 60C, LT-44192, Lituanie.
      </p>
      <p className="mt-2">
        Numéro de TVA intracommunautaire : FR80935185785
      </p>
    </LegalSection>
  );
};

export default HostingSection;
