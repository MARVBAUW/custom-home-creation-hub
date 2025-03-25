
import React from 'react';
import { formatDateFrench } from '@/utils/dateUtils';

interface LegalLastUpdateProps {
  date?: string | Date;
}

const LegalLastUpdate = ({ date }: LegalLastUpdateProps) => {
  const formattedDate = date ? formatDateFrench(date) : formatDateFrench(new Date());
  
  return (
    <div className="pt-6 mt-6 border-t border-gray-200">
      <p className="text-sm text-gray-500 italic">
        Dernière mise à jour : {formattedDate}
      </p>
    </div>
  );
};

export default LegalLastUpdate;
