
import React from 'react';
import { FileText } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const CompanyInfoSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<FileText className="h-6 w-6" />} title="1. Informations légales" />}
    >
      <p>
        Le site web progineer.fr est édité par la société Progineer, SARL au capital de 1 000 euros, 
        immatriculée au Registre du Commerce et des Sociétés de Marseille sous le numéro SIRET 951 045 509 00015, 
        dont le siège social est situé à Marseille, France.
      </p>
      <p className="flex items-center gap-2">
        <span className="font-medium">N° TVA intracommunautaire :</span> FR 24 951045509
      </p>
      <p className="flex items-center gap-2">
        <span className="font-medium">Directeur de la publication :</span> Marvin Bauwens
      </p>
      <p className="flex items-center gap-2">
        <span className="font-medium">Contact :</span> progineer.moe@gmail.com | +33 7 83 76 21 56
      </p>
    </LegalSection>
  );
};

export default CompanyInfoSection;
