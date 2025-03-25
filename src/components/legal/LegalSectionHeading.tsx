
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface LegalSectionHeadingProps {
  icon: React.ReactNode;
  title: string;
}

const LegalSectionHeading = ({ icon, title }: LegalSectionHeadingProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-progineer-gold">
        {icon}
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <Separator className="my-4" />
    </div>
  );
};

export default LegalSectionHeading;
