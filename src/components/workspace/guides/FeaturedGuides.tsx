
import React from 'react';
import { GuideDocument } from './types';
import { GuideCard } from './GuideCard';
import { Card, CardContent } from "@/components/ui/card";

interface FeaturedGuidesProps {
  featuredGuides: GuideDocument[];
  handleDocumentClick: (document: GuideDocument) => void;
}

export const FeaturedGuides: React.FC<FeaturedGuidesProps> = ({ 
  featuredGuides, 
  handleDocumentClick 
}) => {
  if (featuredGuides.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-medium mb-4">Guides recommandés</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredGuides.map(guide => (
          <GuideCard 
            key={guide.id} 
            document={guide} 
            onClick={handleDocumentClick} 
          />
        ))}
      </div>
    </div>
  );
};
