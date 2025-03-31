
import React from 'react';
import { formatDateFrench } from '@/utils/dateUtils';

interface LegalLastUpdateProps {
  date: string | Date;
}

const LegalLastUpdate: React.FC<LegalLastUpdateProps> = ({ date }) => {
  // Convert string date to Date object if needed before passing to formatDateFrench
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  
  return (
    <div className="text-sm text-gray-600 mt-8 mb-16 text-center">
      Dernière mise à jour : {formatDateFrench(dateObject)}
    </div>
  );
};

export default LegalLastUpdate;
