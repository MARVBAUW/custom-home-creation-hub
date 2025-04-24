
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
}

export const RatingStars = ({ rating }: RatingStarsProps) => {
  return (
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star 
          key={i} 
          className="h-5 w-5 text-yellow-400 fill-yellow-400" 
        />
      ))}
    </div>
  );
};
