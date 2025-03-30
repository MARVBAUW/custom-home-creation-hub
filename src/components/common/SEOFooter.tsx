
import React from 'react';
import Container from '@/components/common/Container';

interface SEOFooterProps {
  text: string;
}

const SEOFooter = ({ text }: SEOFooterProps) => {
  return (
    <section className="py-10 bg-stone-50 dark:bg-gray-900 border-t border-stone-200 dark:border-gray-800 w-full">
      <Container size="full">
        <div className="max-w-4xl mx-auto text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          <p>{text}</p>
        </div>
      </Container>
    </section>
  );
};

export default SEOFooter;
