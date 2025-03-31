
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateFrench } from '@/utils/dateUtils';
import GanttTaskBar from '@/components/admin/gantt/GanttTaskBar';
import { ProjectPhase } from '@/types/project';
import { parseISO, addMonths, format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ProjectGanttView = ({ project }: any) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 1);
  const endDate = new Date(today);
  endDate.setMonth(today.getMonth() + 5);
  
  // Generate month headers
  const months: Date[] = [];
  let currentMonth = new Date(startDate);
  currentMonth.setDate(1); // Start from the first day of the month
  
  while (currentMonth <= endDate) {
    months.push(new Date(currentMonth));
    currentMonth = addMonths(currentMonth, 1);
  }
  
  // Default phase dates if no real data
  const phases = [
    {
      name: "Études préliminaires",
      phase: "feasibility" as ProjectPhase,
      dates: {
        startDate: "2023-06-01T00:00:00.000Z",
        endDate: "2023-07-15T00:00:00.000Z"
      },
      status: "completed"
    },
    {
      name: "Conception détaillée",
      phase: "dce" as ProjectPhase,
      dates: {
        startDate: "2023-07-16T00:00:00.000Z",
        endDate: "2023-09-30T00:00:00.000Z"
      },
      status: "in-progress"
    },
    {
      name: "Permis de construire",
      phase: "act" as ProjectPhase,
      dates: {
        startDate: "2023-10-01T00:00:00.000Z",
        endDate: "2023-12-31T00:00:00.000Z"
      },
      status: "upcoming"
    },
    {
      name: "Construction",
      phase: "exe" as ProjectPhase,
      dates: {
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2024-06-30T00:00:00.000Z"
      },
      status: "upcoming"
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planning du projet</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Timeline header with months */}
          <div className="flex border-b border-gray-200">
            <div className="w-[200px] shrink-0 p-2 font-medium">Phase</div>
            <div className="flex-1 flex">
              {months.map((month, index) => (
                <div key={index} className="flex-1 p-2 text-center font-medium border-l border-gray-200">
                  {format(month, 'MMMM yyyy', { locale: fr })}
                </div>
              ))}
            </div>
          </div>
          
          {/* Phase rows with Gantt bars */}
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex">
                <div className="w-[200px] shrink-0 p-3 font-medium">
                  <div className="text-gray-900 dark:text-gray-100">{phase.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDateFrench(phase.dates.startDate, 'dd/MM/yyyy')} - {formatDateFrench(phase.dates.endDate, 'dd/MM/yyyy')}
                  </div>
                </div>
                <div className="flex-1 relative h-[60px]">
                  <GanttTaskBar 
                    phase={phase.phase} 
                    dates={phase.dates} 
                    startDate={startDate} 
                    endDate={endDate} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectGanttView;
