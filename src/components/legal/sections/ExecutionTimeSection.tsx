
import React from 'react';
import { Clock } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const ExecutionTimeSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<Clock className="h-6 w-6" />} title="Article 6 - Délais d'exécution" />}
    >
      <p>
        Les délais d'exécution des prestations sont donnés à titre indicatif et ne constituent pas un engagement 
        du Prestataire. Tout retard raisonnable dans l'exécution des prestations ne pourra donner lieu au profit 
        du Client à une indemnisation, à l'annulation de la commande ou à l'application de pénalités de retard.
      </p>
    </LegalSection>
  );
};

export default ExecutionTimeSection;
