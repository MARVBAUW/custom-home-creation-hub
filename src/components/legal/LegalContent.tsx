
import React from 'react';
import Container from '@/components/common/Container';
import { cn } from '@/lib/utils';

interface LegalContentProps {
  children: React.ReactNode;
  className?: string;
}

const LegalContent = ({ children, className }: LegalContentProps) => {
  return (
    <Container size="md">
      <div className={cn("prose prose-stone max-w-none py-12", className)}>
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 md:p-8 lg:p-10">
          {children}
        </div>
      </div>
    </Container>
  );
};

export default LegalContent;
