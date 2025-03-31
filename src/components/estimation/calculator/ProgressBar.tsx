
import React from 'react';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div 
        className="h-2 bg-blue-500 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
