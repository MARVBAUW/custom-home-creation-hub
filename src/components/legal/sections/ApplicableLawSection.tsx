
import React from 'react';
import { Calendar } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const ApplicableLawSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<Calendar className="h-6 w-6" />} title="Article 13 - Droit applicable et juridiction compétente" />}
    >
      <p>
        Les présentes CGV sont soumises au droit français. Tous les litiges auxquels les opérations d'achat et de 
        vente conclues en application des présentes CGV pourraient donner lieu, concernant tant leur validité, leur 
        interprétation, leur exécution, leur résiliation, leurs conséquences et leurs suites et qui n'auraient pu 
        être résolus entre le Prestataire et le Client seront soumis aux tribunaux compétents dans les conditions de droit commun.
      </p>
    </LegalSection>
  );
};

export default ApplicableLawSection;
