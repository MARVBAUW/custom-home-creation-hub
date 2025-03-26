
import React from 'react';
import { phaseLabels, phaseColors } from './ganttUtils';

const GanttLegend = () => {
  return (
    <div className="flex mt-6 flex-wrap gap-2">
      {Object.entries(phaseLabels).map(([phase, label]) => (
        <div key={phase} className="flex items-center space-x-1">
          <div className={`w-3 h-3 ${phaseColors[phase]} rounded-sm`}></div>
          <span className="text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default GanttLegend;
