
import React from 'react';

interface LegalLastUpdateProps {
  date: string;
}

const LegalLastUpdate = ({ date }: LegalLastUpdateProps) => {
  return (
    <div className="pt-6 mt-6 border-t border-gray-200">
      <p className="text-sm text-gray-500 italic">
        Dernière mise à jour : {date}
      </p>
    </div>
  );
};

export default LegalLastUpdate;
