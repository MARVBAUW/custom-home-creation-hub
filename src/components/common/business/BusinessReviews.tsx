
import React from 'react';
import { Star } from 'lucide-react';

interface BusinessReviewsProps {
  reviews: any[];
}

const BusinessReviews: React.FC<BusinessReviewsProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="border-t border-stone-200 p-4">
      <h4 className="text-sm font-medium mb-3 flex items-center">
        <Star className="h-4 w-4 text-amber-400 mr-2" />
        Avis clients
      </h4>
      <div className="space-y-4">
        {reviews.slice(0, 3).map((review: any, index: number) => (
          <div key={index} className="text-xs">
            <div className="flex items-center mb-1">
              <span className="font-medium">{review.author_name}</span>
              <div className="flex items-center ml-2">
                <Star className="h-3 w-3 text-amber-400" />
                <span className="ml-1">{review.rating}</span>
              </div>
            </div>
            <p className="text-stone-600">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessReviews;
