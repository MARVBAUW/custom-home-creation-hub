
import React from 'react';
import BusinessStructuredData from './business/BusinessStructuredData';
import BusinessLoadingState from './business/BusinessLoadingState';
import BusinessBasicInfo from './business/BusinessBasicInfo';
import BusinessHours from './business/BusinessHours';
import BusinessReviews from './business/BusinessReviews';
import { useBusinessData } from './business/useBusinessData';

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
  const { businessData, loading, error } = useBusinessData();

  if (loading) {
    return <BusinessLoadingState className={className} />;
  }

  if (error || !businessData) {
    return null; // Don't show errors to users, just gracefully hide the component
  }

  return (
    <>
      <BusinessStructuredData businessData={businessData} />
      
      <div className={`bg-white rounded-lg shadow-sm border border-stone-200 ${className}`}>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-3">{businessData.name}</h3>
          <BusinessBasicInfo businessData={businessData} showExtraInfo={showExtraInfo} />
        </div>
        
        {showHours && businessData.opening_hours && (
          <BusinessHours openingHours={businessData.opening_hours} />
        )}
        
        {showReviews && businessData.reviews && (
          <BusinessReviews reviews={businessData.reviews} />
        )}
      </div>
    </>
  );
};

export default GoogleBusinessData;
