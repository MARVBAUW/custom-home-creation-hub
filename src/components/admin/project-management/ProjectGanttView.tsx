
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectDetails, DateRange } from '@/types/project';
import { formatDateFrench } from '@/utils/dateUtils';

interface ProjectGanttViewProps {
  project: ProjectDetails;
}

const ProjectGanttView: React.FC<ProjectGanttViewProps> = ({ project }) => {
  if (!project.dates || !project.dates.global) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Planning du projet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-gray-500">Aucune donnée de planning disponible pour ce projet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // We need to have at least global dates
  const { global } = project.dates;
  
  // Calculate the project start and end dates
  const projectStart = new Date(global.startDate);
  const projectEnd = new Date(global.endDate);
  
  // Calculate the total duration in days
  const totalDays = Math.max(1, Math.floor((projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Determine phases to display
  const phasesToDisplay: { name: string; dates: DateRange; color: string }[] = [
    { name: 'Global', dates: global, color: 'bg-gray-400' },
  ];
  
  // Add design phase if available
  if (project.dates.design) {
    phasesToDisplay.push({ name: 'Conception', dates: project.dates.design, color: 'bg-blue-400' });
  }
  
  // Add permits phase if available
  if (project.dates.permits) {
    phasesToDisplay.push({ name: 'Autorisations', dates: project.dates.permits, color: 'bg-yellow-400' });
  }
  
  // Add construction phase if available
  if (project.dates.construction) {
    phasesToDisplay.push({ name: 'Construction', dates: project.dates.construction, color: 'bg-green-400' });
  }
  
  // Add specific phases if available
  const phaseColors: Record<string, string> = {
    feasibility: 'bg-indigo-400',
    dce: 'bg-purple-400',
    act: 'bg-pink-400',
    exe: 'bg-red-400',
    reception: 'bg-orange-400',
    delivery: 'bg-teal-400',
  };
  
  Object.entries(project.dates.phases || {}).forEach(([key, dates]) => {
    if (dates) {
      const phaseName = 
        key === 'feasibility' ? 'Faisabilité' :
        key === 'dce' ? 'DCE' :
        key === 'act' ? 'ACT' :
        key === 'exe' ? 'EXE' :
        key === 'reception' ? 'Réception' :
        key === 'delivery' ? 'Livraison' : key;
      
      phasesToDisplay.push({ 
        name: phaseName, 
        dates: {
          startDate: dates.startDate,
          endDate: dates.endDate
        }, 
        color: phaseColors[key] || 'bg-gray-400' 
      });
    }
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planning du projet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Début: {formatDateFrench(projectStart)}</span>
            <span className="text-sm">Fin: {formatDateFrench(projectEnd)}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full">
            <div className="h-full bg-khaki-600 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {phasesToDisplay.map((phase, index) => {
            // Calculate position and width of the phase bar
            const phaseStart = new Date(phase.dates.startDate);
            const phaseEnd = new Date(phase.dates.endDate);
            
            const leftPercentage = Math.max(0, Math.min(100, (phaseStart.getTime() - projectStart.getTime()) / (totalDays * 24 * 60 * 60 * 1000) * 100));
            const widthPercentage = Math.max(0, Math.min(100 - leftPercentage, (phaseEnd.getTime() - phaseStart.getTime()) / (totalDays * 24 * 60 * 60 * 1000) * 100));
            
            return (
              <div key={index} className="relative h-10">
                <div className="absolute left-0 top-0 h-full w-full bg-gray-100 rounded"></div>
                <div 
                  className={`absolute top-0 h-full ${phase.color} rounded`} 
                  style={{ 
                    left: `${leftPercentage}%`, 
                    width: `${widthPercentage}%`,
                  }}
                ></div>
                <div className="absolute left-2 top-0 h-full flex items-center text-sm font-medium">
                  {phase.name}
                </div>
                <div className="absolute right-2 top-0 h-full flex items-center text-sm">
                  {formatDateFrench(phaseStart)} - {formatDateFrench(phaseEnd)}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Ce planning est généré automatiquement à partir des dates renseignées dans le projet.
            Pour un planning détaillé, utilisez l'outil de planning Gantt dans les outils du projet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectGanttView;
