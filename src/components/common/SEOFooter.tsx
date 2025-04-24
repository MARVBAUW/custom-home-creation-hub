
import React from 'react';
import Container from '@/components/common/Container';

interface SEOFooterProps {
  text: string;
  additionalKeywords?: string[];
}

const SEOFooter = ({ text, additionalKeywords = [] }: SEOFooterProps) => {
  return (
    <section className="py-12 bg-stone-100 border-t border-stone-200">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-stone-700/80 leading-relaxed">
            <p className="mb-4">
              {text}
            </p>
            
            {additionalKeywords.length > 0 && (
              <div className="mt-6 pt-4 border-t border-stone-200">
                <p className="text-xs text-stone-600/70">
                  {additionalKeywords.join(' • ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SEOFooter;
