
import React from 'react';
import CompanyInfoSection from './sections/CompanyInfoSection';
import HostingSection from './sections/HostingSection';
import IntellectualPropertySection from './sections/IntellectualPropertySection';
import PersonalDataSection from './sections/PersonalDataSection';
import CookiesSection from './sections/CookiesSection';
import ResponsibilitySection from './sections/ResponsibilitySection';
import HyperlinksSection from './sections/HyperlinksSection';
import JurisdictionSection from './sections/JurisdictionSection';
import LegalLastUpdate from './LegalLastUpdate';

const LegalSections = () => {
  return (
    <div className="space-y-10">
      <CompanyInfoSection />
      <HostingSection />
      <IntellectualPropertySection />
      <PersonalDataSection />
      <CookiesSection />
      <ResponsibilitySection />
      <HyperlinksSection />
      <JurisdictionSection />
      <LegalLastUpdate date="28 janvier 2025" />
    </div>
  );
};

export default LegalSections;
