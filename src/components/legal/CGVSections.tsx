
import React from 'react';
import LegalSectionHeading from './LegalSectionHeading';
import LegalSection from './LegalSection';
import LegalLastUpdate from './LegalLastUpdate';
import cgvSections from '@/data/cgvSections';

const CGVSections = () => {
  return (
    <div className="space-y-10">
      {cgvSections.map((section) => (
        <LegalSection
          key={section.id}
          heading={
            <LegalSectionHeading 
              icon={<section.icon className="h-6 w-6" />} 
              title={section.title} 
            />
          }
        >
          {section.content.map((paragraph, index) => (
            <p key={`${section.id}-p-${index}`}>{paragraph}</p>
          ))}
          
          {section.list && (
            <ul className="list-disc pl-6 space-y-1">
              {section.list.map((item, index) => (
                <li key={`${section.id}-li-${index}`}>{item}</li>
              ))}
            </ul>
          )}
        </LegalSection>
      ))}
      <LegalLastUpdate date="28 janvier 2025" />
    </div>
  );
};

export default CGVSections;
