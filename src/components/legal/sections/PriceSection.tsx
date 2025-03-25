
import React from 'react';
import { CreditCard } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const PriceSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<CreditCard className="h-6 w-6" />} title="Article 4 - Prix" />}
    >
      <p>
        Les prix des services sont ceux en vigueur au jour de la passation de la commande. Ils sont libellés en euros 
        et calculés hors taxes. Par voie de conséquence, ils seront majorés du taux de TVA et des frais de transport 
        applicables au jour de la commande.
      </p>
      <p>
        Le Prestataire se réserve le droit de modifier ses prix à tout moment. Cependant, il s'engage à facturer les 
        prestations commandées aux prix indiqués lors de l'enregistrement de la commande.
      </p>
    </LegalSection>
  );
};

export default PriceSection;
