
import React from 'react';
import { HardHat } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const WorkReceptionSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<HardHat className="h-6 w-6" />} title="Article 9 - Réception des travaux" />}
    >
      <p>
        À l'achèvement des travaux, il sera procédé à une réception contradictoire en présence du Client ou de son 
        représentant et du Prestataire. Cette réception fera l'objet d'un procès-verbal signé par les deux parties.
      </p>
      <p>
        Toute réserve devra être signalée lors de la réception des travaux et mentionnée dans le procès-verbal de réception.
      </p>
    </LegalSection>
  );
};

export default WorkReceptionSection;
