
import React from 'react';
import { UserCheck } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const ProviderObligationsSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<UserCheck className="h-6 w-6" />} title="Article 7 - Obligations du Prestataire" />}
    >
      <p>
        Le Prestataire est tenu à une obligation de moyens dans l'exécution de ses prestations. Il s'engage à 
        mettre en œuvre tous les moyens nécessaires à la bonne exécution des prestations qui lui sont confiées.
      </p>
      <p>
        Le Prestataire est tenu au respect du secret professionnel et s'engage à ne divulguer aucune information 
        dont il aurait connaissance dans le cadre de l'exécution de ses prestations.
      </p>
    </LegalSection>
  );
};

export default ProviderObligationsSection;
