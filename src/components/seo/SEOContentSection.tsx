
import React from 'react';
import { Card } from '@/components/ui/card';
import { InternalLinkText } from '@/utils/internalLinking';

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOContentSectionProps {
  title: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
  };
  faq?: FAQItem[];
  schemaType: string;
  keywords: string[];
}

const SEOContentSection = ({
  title,
  content,
  faq,
  schemaType,
  keywords
}: SEOContentSectionProps) => {
  // Générer le schema.org FAQ si des questions sont fournies
  const faqSchema = faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Schema.org pour l'article principal
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "headline": title,
    "keywords": keywords.join(", "),
    "articleBody": content.introduction
  };

  return (
    <div className="py-12 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Injection des schemas */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}

        {/* Contenu principal */}
        <h2 className="text-3xl font-semibold mb-8 text-gray-900">{title}</h2>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-700 mb-8">
            <InternalLinkText text={content.introduction} maxOccurrences={3} />
          </p>

          {content.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-2xl font-medium mb-4 text-gray-800">
                {section.title}
              </h3>
              <div className="text-gray-700">
                <InternalLinkText text={section.content} maxOccurrences={3} />
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        {faq && faq.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">Questions fréquentes</h3>
            <div className="space-y-4">
              {faq.map((item, index) => (
                <Card key={index} className="p-6">
                  <h4 className="text-xl font-medium mb-3">{item.question}</h4>
                  <p className="text-gray-700">
                    <InternalLinkText text={item.answer} maxOccurrences={2} />
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SEOContentSection;
