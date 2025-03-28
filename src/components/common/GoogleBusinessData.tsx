
import React, { useEffect, useState } from 'react';
import { fetchGoogleBusinessData } from '@/utils/googleBusiness';
import { Clock, MapPin, Phone, Star, Building, CreditCard } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from 'react-helmet';

interface GoogleBusinessDataProps {
  showReviews?: boolean;
  showHours?: boolean;
  showExtraInfo?: boolean;
  className?: string;
}

const GoogleBusinessData: React.FC<GoogleBusinessDataProps> = ({ 
  showReviews = false, 
  showHours = false,
  showExtraInfo = false,
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

  // Fonction pour traduire les jours en français
  const translateDayToFrench = (day: string) => {
    const translations: Record<string, string> = {
      'Monday': 'Lundi',
      'Tuesday': 'Mardi',
      'Wednesday': 'Mercredi',
      'Thursday': 'Jeudi',
      'Friday': 'Vendredi',
      'Saturday': 'Samedi',
      'Sunday': 'Dimanche'
    };
    
    return translations[day] || day;
  };

  // Fonction pour formater les horaires en français
  const formatHoursInFrench = (dayText: string) => {
    if (!dayText) return '';
    
    const [day, hours] = dayText.split(': ');
    const translatedDay = translateDayToFrench(day);
    
    // Convertir les formats AM/PM en format 24h
    const formattedHours = hours.replace(/(\d+):(\d+) (AM|PM) – (\d+):(\d+) (AM|PM)/g, (match, h1, m1, ampm1, h2, m2, ampm2) => {
      const hour1 = parseInt(h1) + (ampm1 === 'PM' && h1 !== '12' ? 12 : 0);
      const hour2 = parseInt(h2) + (ampm2 === 'PM' && h2 !== '12' ? 12 : 0);
      return `${hour1}h${m1 !== '00' ? m1 : ''} - ${hour2}h${m2 !== '00' ? m2 : ''}`;
    });
    
    return `${translatedDay}: ${formattedHours}`;
  };

  // Structured data for rich results
  const structuredData = businessData ? {
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
  } : null;

  if (loading) {
    return (
      <div className={`bg-white rounded-md p-4 space-y-4 ${className}`}>
        <Skeleton className="h-5 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !businessData) {
    return null; // Don't show errors to users, just gracefully hide the component
  }

  return (
    <>
      {structuredData && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>
      )}
      
      <div className={`bg-white rounded-lg shadow-sm border border-stone-200 ${className}`}>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-3">{businessData.name}</h3>
          
          <div className="space-y-2">
            {businessData.formatted_address && (
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-progineer-gold mt-1 mr-2" />
                <span className="text-sm text-stone-700">{businessData.formatted_address}</span>
              </div>
            )}
            
            {businessData.formatted_phone_number && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-progineer-gold mr-2" />
                <a 
                  href={`tel:${businessData.formatted_phone_number.replace(/\s/g, '')}`}
                  className="text-sm text-stone-700 hover:text-progineer-gold"
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

            {showExtraInfo && (
              <>
                {businessData.siret && (
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-progineer-gold mr-2" />
                    <span className="text-sm text-stone-700">SIRET: {businessData.siret}</span>
                  </div>
                )}
                
                {businessData.tva && (
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-progineer-gold mr-2" />
                    <span className="text-sm text-stone-700">TVA: {businessData.tva}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {showHours && businessData.opening_hours && (
          <div className="border-t border-stone-200 p-4">
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 text-progineer-gold mr-2" />
              <h4 className="text-sm font-medium">Horaires d'ouverture</h4>
            </div>
            <ul className="text-xs text-stone-600 space-y-1">
              {businessData.opening_hours.weekday_text.map((day: string, index: number) => (
                <li key={index}>{formatHoursInFrench(day)}</li>
              ))}
            </ul>
          </div>
        )}
        
        {showReviews && businessData.reviews && businessData.reviews.length > 0 && (
          <div className="border-t border-stone-200 p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <Star className="h-4 w-4 text-amber-400 mr-2" />
              Avis clients
            </h4>
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
    </>
  );
};

export default GoogleBusinessData;
