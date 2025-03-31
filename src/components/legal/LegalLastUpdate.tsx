
import React from 'react';
import { formatDateFrench } from '@/utils/dateUtils';

interface LegalLastUpdateProps {
  date: string | Date;
}

const LegalLastUpdate: React.FC<LegalLastUpdateProps> = ({ date }) => {
  return (
    <div className="text-sm text-gray-600 mt-8 mb-16 text-center">
      Dernière mise à jour : {formatDateFrench(date)}
    </div>
  );
};

export default LegalLastUpdate;
