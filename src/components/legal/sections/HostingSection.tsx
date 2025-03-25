
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
        Le site progineer.fr est hébergé par la société OVH, SAS au capital de 10 069 020 euros,
        immatriculée au Registre du Commerce et des Sociétés de Lille Métropole sous le numéro 424 761 419,
        dont le siège social est situé au 2 rue Kellermann, 59100 Roubaix, France.
      </p>
    </LegalSection>
  );
};

export default HostingSection;
