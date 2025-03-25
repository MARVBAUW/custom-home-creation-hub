
import React from 'react';
import { Database } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const PersonalDataSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<Database className="h-6 w-6" />} title="4. Données personnelles" />}
    >
      <p>
        Les informations recueillies sur le site progineer.fr font l'objet d'un traitement informatique destiné à 
        répondre à vos demandes d'information, de devis ou de contact. Les destinataires des données sont les 
        services commerciaux et techniques de Progineer.
      </p>
      <p>
        Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée, et au Règlement Général sur la 
        Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression, de 
        limitation et d'opposition au traitement de vos données personnelles. Vous pouvez exercer ces droits 
        en nous contactant à l'adresse : progineer.moe@gmail.com
      </p>
    </LegalSection>
  );
};

export default PersonalDataSection;
