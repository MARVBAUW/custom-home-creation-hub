
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GuideDocument } from './types';
import { GuideCard } from './GuideCard';

interface FeaturedGuidesProps {
  featuredGuides: GuideDocument[];
  handleDocumentClick: (document: GuideDocument) => void;
}

export const FeaturedGuides: React.FC<FeaturedGuidesProps> = ({ 
  featuredGuides, 
  handleDocumentClick 
}) => {
  if (featuredGuides.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium">Guides populaires</h3>
        <button className="text-khaki-600 hover:text-khaki-800 flex items-center text-sm font-medium">
          Voir tous <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
