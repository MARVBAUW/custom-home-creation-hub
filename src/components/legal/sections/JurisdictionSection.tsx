
import React from 'react';
import { Info } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const JurisdictionSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<Info className="h-6 w-6" />} title="8. Droit applicable et juridiction compétente" />}
    >
      <p>
        Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français 
        seront seuls compétents.
      </p>
    </LegalSection>
  );
};

export default JurisdictionSection;
