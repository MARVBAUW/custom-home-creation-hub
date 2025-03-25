
import React from 'react';
import { UserCheck } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const ClientObligationsSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<UserCheck className="h-6 w-6" />} title="Article 8 - Obligations du Client" />}
    >
      <p>
        Le Client s'engage à collaborer activement avec le Prestataire en lui fournissant dans les meilleurs délais 
        toutes les informations et documents nécessaires à la bonne exécution des prestations.
      </p>
      <p>
        Le Client est responsable de la véracité et de l'exactitude des informations qu'il communique au Prestataire.
      </p>
    </LegalSection>
  );
};

export default ClientObligationsSection;
