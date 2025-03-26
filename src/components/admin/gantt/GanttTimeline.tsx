
import React from 'react';
import { format, addMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

interface GanttTimelineProps {
  startDate: Date;
  endDate: Date;
}

const GanttTimeline = ({ startDate, endDate }: GanttTimelineProps) => {
  // Generate month headers
  const months: Date[] = [];
  let currentMonth = new Date(startDate);
  currentMonth.setDate(1); // Start from the first day of the month
  
  while (currentMonth <= endDate) {
    months.push(new Date(currentMonth));
    currentMonth = addMonths(currentMonth, 1);
  }
  
  return (
    <div className="flex border-b border-gray-200">
      <div className="w-[200px] shrink-0 p-2 font-medium">Projet</div>
      <div className="flex-1 flex">
        {months.map((month, index) => (
          <div key={index} className="flex-1 p-2 text-center font-medium border-l border-gray-200">
            {format(month, 'MMMM yyyy', { locale: fr })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttTimeline;
