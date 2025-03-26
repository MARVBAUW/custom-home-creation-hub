
import React from 'react';
import TechnicalFormHeader from './technical/TechnicalFormHeader';
import TechnicalOfficesSection from './technical/TechnicalOfficesSection';
import TradesSection from './technical/TradesSection';

const ProjectTechnicalForm = () => {
  return (
    <div className="space-y-6">
      <TechnicalFormHeader />
      
      {/* TECHNICAL OFFICES */}
      <TechnicalOfficesSection />
      
      {/* TRADES */}
      <TradesSection />
    </div>
  );
};

export default ProjectTechnicalForm;
