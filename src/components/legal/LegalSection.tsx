
import React from 'react';

interface LegalSectionProps {
  children: React.ReactNode;
  heading: React.ReactNode;
}

const LegalSection = ({ children, heading }: LegalSectionProps) => {
  return (
    <section className="space-y-4">
      {heading}
      <div className="space-y-3 text-stone-700">
        {children}
      </div>
    </section>
  );
};

export default LegalSection;
