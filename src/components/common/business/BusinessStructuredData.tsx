
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BusinessStructuredDataProps {
  businessData: any;
}

const BusinessStructuredData: React.FC<BusinessStructuredDataProps> = ({ businessData }) => {
  if (!businessData) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessData.name,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marseille",
      "addressRegion": "PACA",
      "addressCountry": "FR"
    },
    "telephone": businessData.formatted_phone_number,
    "url": businessData.website,
    "openingHoursSpecification": businessData.opening_hours?.weekday_text?.map((day: string) => {
      const [dayName, hours] = day.split(': ');
      const [opens, closes] = hours.split(' – ');
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": dayName,
        "opens": opens,
        "closes": closes
      };
    }),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": businessData.rating,
      "ratingCount": businessData.reviews?.length || 0
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default BusinessStructuredData;
