
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  className?: string;
}

export const RatingStars = ({ rating, className = '' }: RatingStarsProps) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[...Array(rating)].map((_, i) => (
        <Star 
          key={i} 
          className="h-5 w-5 text-yellow-400 fill-yellow-400" 
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{rating} étoiles sur 5</span>
    </div>
  );
};
