
import React from 'react';
import { CheckCircle } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const ClientAcceptanceSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<CheckCircle className="h-6 w-6" />} title="Article 14 - Acceptation du Client" />}
    >
      <p>
        Les présentes CGV sont expressément agréées et acceptées par le Client, qui déclare et reconnaît en avoir 
        une parfaite connaissance, et renonce, de ce fait, à se prévaloir de tout document contradictoire.
      </p>
    </LegalSection>
  );
};

export default ClientAcceptanceSection;
