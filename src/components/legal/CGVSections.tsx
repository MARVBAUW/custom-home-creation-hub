
import React from 'react';
import GeneralConditionsSection from './sections/GeneralConditionsSection';
import ServicesSection from './sections/ServicesSection';
import ContractFormationSection from './sections/ContractFormationSection';
import PriceSection from './sections/PriceSection';
import PaymentTermsSection from './sections/PaymentTermsSection';
import ExecutionTimeSection from './sections/ExecutionTimeSection';
import ProviderObligationsSection from './sections/ProviderObligationsSection';
import ClientObligationsSection from './sections/ClientObligationsSection';
import WorkReceptionSection from './sections/WorkReceptionSection';
import GuaranteesSection from './sections/GuaranteesSection';
import TerminationSection from './sections/TerminationSection';
import ForceMajeureSection from './sections/ForceMajeureSection';
import ApplicableLawSection from './sections/ApplicableLawSection';
import ClientAcceptanceSection from './sections/ClientAcceptanceSection';
import LegalLastUpdate from './LegalLastUpdate';

const CGVSections = () => {
  return (
    <div className="space-y-10">
      <GeneralConditionsSection />
      <ServicesSection />
      <ContractFormationSection />
      <PriceSection />
      <PaymentTermsSection />
      <ExecutionTimeSection />
      <ProviderObligationsSection />
      <ClientObligationsSection />
      <WorkReceptionSection />
      <GuaranteesSection />
      <TerminationSection />
      <ForceMajeureSection />
      <ApplicableLawSection />
      <ClientAcceptanceSection />
      <LegalLastUpdate date="28 janvier 2025" />
    </div>
  );
};

export default CGVSections;
