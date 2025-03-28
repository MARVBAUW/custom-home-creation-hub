
import React from 'react';
import { MapPin, Phone, Star, Building, CreditCard } from 'lucide-react';

interface BusinessBasicInfoProps {
  businessData: any;
  showExtraInfo?: boolean;
}

const BusinessBasicInfo: React.FC<BusinessBasicInfoProps> = ({ 
  businessData, 
  showExtraInfo = false 
}) => {
  if (!businessData) return null;

  return (
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
  );
};

export default BusinessBasicInfo;
