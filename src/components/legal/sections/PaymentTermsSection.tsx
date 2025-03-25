
import React from 'react';
import { CheckCircle } from 'lucide-react';
import LegalSectionHeading from '../LegalSectionHeading';
import LegalSection from '../LegalSection';

const PaymentTermsSection = () => {
  return (
    <LegalSection
      heading={<LegalSectionHeading icon={<CheckCircle className="h-6 w-6" />} title="Article 5 - Modalités de paiement" />}
    >
      <p>
        Un acompte de 30% du montant total TTC est exigé lors de la passation de la commande. Le solde est payable 
        selon l'échéancier défini dans le contrat ou dans le devis.
      </p>
      <p>
        Les paiements peuvent être effectués par chèque, virement bancaire ou tout autre moyen convenu entre les parties.
      </p>
      <p>
        En cas de retard de paiement, des pénalités correspondant à trois fois le taux d'intérêt légal en vigueur 
        seront appliquées. Ces pénalités sont exigibles de plein droit, sans qu'un rappel soit nécessaire.
      </p>
    </LegalSection>
  );
};

export default PaymentTermsSection;
