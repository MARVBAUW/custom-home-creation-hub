
import React from 'react';
import { parseISO } from 'date-fns';
import { ProjectPhase } from '@/types/project';
import { phaseLabels, phaseColors } from './ganttUtils';

interface GanttTaskBarProps {
  phase: ProjectPhase;
  dates: {
    startDate: string;
    endDate: string;
  };
  startDate: Date;
  endDate: Date;
}

const GanttTaskBar = ({ phase, dates, startDate, endDate }: GanttTaskBarProps) => {
  // Calculate position and width for phase bars
  const calculateBarStyle = () => {
    const phaseStart = parseISO(dates.startDate);
    const phaseEnd = parseISO(dates.endDate);
    
    // Skip if phase is outside the visible range
    if (phaseEnd < startDate || phaseStart > endDate) {
      return { display: 'none' };
    }
    
    // Adjust start if it's before visible range
    const visibleStart = phaseStart < startDate ? startDate : phaseStart;
    // Adjust end if it's after visible range
    const visibleEnd = phaseEnd > endDate ? endDate : phaseEnd;
    
    // Calculate position as percentage
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const startOffset = (visibleStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const duration = (visibleEnd.getTime() - visibleStart.getTime()) / (1000 * 60 * 60 * 24);
    
    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;
    
    return {
      left: `${left}%`,
      width: `${width}%`
    };
  };

  const barStyle = calculateBarStyle();
  if (barStyle.display === 'none') return null;
  
  return (
    <div 
      className={`absolute h-6 rounded-sm ${phaseColors[phase]} flex items-center justify-center text-xs text-white cursor-pointer transition-opacity hover:opacity-90`}
      style={{ ...barStyle, top: '15px' }}
      title={`${phaseLabels[phase]}: ${dates.startDate} - ${dates.endDate}`}
    >
      {phaseLabels[phase]}
    </div>
  );
};

export default GanttTaskBar;
