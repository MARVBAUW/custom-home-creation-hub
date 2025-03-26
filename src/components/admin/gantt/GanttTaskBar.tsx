
import React from 'react';
import { parseISO, format } from 'date-fns';
import { fr } from 'date-fns/locale';
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
    try {
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
      const width = Math.max((duration / totalDays) * 100, 1); // Minimum width of 1%
      
      return {
        left: `${left}%`,
        width: `${width}%`
      };
    } catch (error) {
      console.error(`Error calculating bar style for phase ${phase}:`, error);
      return { display: 'none' };
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd MMM yyyy', { locale: fr });
    } catch (e) {
      return 'Date invalide';
    }
  };

  const barStyle = calculateBarStyle();
  if (barStyle.display === 'none') return null;
  
  const tooltipContent = `${phaseLabels[phase]}: ${formatDate(dates.startDate)} - ${formatDate(dates.endDate)}`;
  
  return (
    <div 
      className={`absolute h-6 rounded-sm ${phaseColors[phase]} flex items-center justify-center text-xs text-white cursor-pointer transition-opacity hover:opacity-90 group z-10`}
      style={{ ...barStyle, top: '15px' }}
      title={tooltipContent}
    >
      <span className="px-1 truncate max-w-full">{phaseLabels[phase]}</span>
      <div className="absolute invisible group-hover:visible bg-gray-900 text-white text-xs rounded p-2 z-20 bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        {tooltipContent}
      </div>
    </div>
  );
};

export default GanttTaskBar;
