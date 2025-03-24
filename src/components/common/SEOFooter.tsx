
import React from 'react';
import Container from '@/components/common/Container';

interface SEOFooterProps {
  text: string;
}

const SEOFooter = ({ text }: SEOFooterProps) => {
  return (
    <section className="py-8 bg-stone-50 border-t border-stone-200">
      <Container>
        <div className="text-sm text-stone-500">
          <p>{text}</p>
        </div>
      </Container>
    </section>
  );
};

export default SEOFooter;
