
import React from 'react';
import Container from '@/components/common/Container';

interface LegalContentProps {
  children: React.ReactNode;
}

const LegalContent = ({ children }: LegalContentProps) => {
  return (
    <Container size="md">
      <div className="prose prose-stone max-w-none">
        {children}
      </div>
    </Container>
  );
};

export default LegalContent;
