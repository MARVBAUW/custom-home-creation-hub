
import React, { useEffect, useState } from 'react';
import { fetchGoogleBusinessData } from '@/utils/googleBusiness';
import { Clock, MapPin, Phone, Star } from 'lucide-react';

interface GoogleBusinessDataProps {
  showReviews?: boolean;
  showHours?: boolean;
  className?: string;
}

const GoogleBusinessData: React.FC<GoogleBusinessDataProps> = ({ 
  showReviews = false, 
  showHours = false,
  className = ''
}) => {
  const [businessData, setBusinessData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBusinessData = async () => {
      try {
        setLoading(true);
        const data = await fetchGoogleBusinessData();
        setBusinessData(data);
      } catch (err) {
        setError('Unable to load Google Business data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBusinessData();
  }, []);

  if (loading) {
    return <div className="animate-pulse bg-stone-100 rounded-md p-4">Loading Google Business data...</div>;
  }

  if (error || !businessData) {
    return null; // Don't show errors to users, just gracefully hide the component
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-stone-200 ${className}`}>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-3">{businessData.name}</h3>
        
        <div className="space-y-2">
          {businessData.formatted_address && (
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-khaki-600 mt-1 mr-2" />
              <span className="text-sm text-stone-700">{businessData.formatted_address}</span>
            </div>
          )}
          
          {businessData.formatted_phone_number && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-khaki-600 mr-2" />
              <a 
                href={`tel:${businessData.formatted_phone_number.replace(/\s/g, '')}`}
                className="text-sm text-stone-700 hover:text-khaki-700"
              >
                {businessData.formatted_phone_number}
              </a>
            </div>
          )}
          
          {businessData.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-400 mr-2" />
              <span className="text-sm text-stone-700">{businessData.rating} / 5</span>
            </div>
          )}
        </div>
      </div>
      
      {showHours && businessData.opening_hours && (
        <div className="border-t border-stone-200 p-4">
          <div className="flex items-center mb-2">
            <Clock className="h-4 w-4 text-khaki-600 mr-2" />
            <h4 className="text-sm font-medium">Horaires d'ouverture</h4>
          </div>
          <ul className="text-xs text-stone-600 space-y-1">
            {businessData.opening_hours.weekday_text.map((day: string, index: number) => (
              <li key={index}>{day}</li>
            ))}
          </ul>
        </div>
      )}
      
      {showReviews && businessData.reviews && businessData.reviews.length > 0 && (
        <div className="border-t border-stone-200 p-4">
          <h4 className="text-sm font-medium mb-3">Avis client</h4>
          <div className="space-y-4">
            {businessData.reviews.slice(0, 3).map((review: any, index: number) => (
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
      )}
    </div>
  );
};

export default GoogleBusinessData;
