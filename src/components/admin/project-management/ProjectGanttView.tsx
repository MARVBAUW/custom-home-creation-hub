
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectDetails } from '@/types/project';
import { formatDateFrench } from '@/utils/dateUtils';

interface ProjectGanttViewProps {
  project: ProjectDetails;
}

const ProjectGanttView = ({ project }: ProjectGanttViewProps) => {
  // Check if the project has dates defined
  const hasDates = project.dates && project.dates.global && 
                  project.dates.global.startDate && project.dates.global.endDate;
  
  if (!hasDates) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Planning du projet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune date n'est définie pour ce projet.</p>
            <p className="text-gray-500 mt-2">
              Veuillez définir les dates globales du projet dans les paramètres.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // For simplicity, I'll just render a basic representation of the timeline
  // A more complex Gantt chart implementation would be needed for a real application
  const startDate = new Date(project.dates.global.startDate);
  const endDate = new Date(project.dates.global.endDate);
  
  // Calculate total project duration in days
  const totalDurationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Get phase dates or calculate them based on overall timeline if they don't exist
  const phaseDates = {
    feasibility: project.dates.phases?.feasibility || calculatePhaseDates('feasibility', 0, totalDurationDays / 4),
    dce: project.dates.phases?.dce || calculatePhaseDates('dce', totalDurationDays / 4, totalDurationDays / 3),
    act: project.dates.phases?.act || calculatePhaseDates('act', totalDurationDays / 3, totalDurationDays / 2),
    exe: project.dates.phases?.exe || calculatePhaseDates('exe', totalDurationDays / 2, totalDurationDays * 0.8),
    reception: project.dates.phases?.reception || calculatePhaseDates('reception', totalDurationDays * 0.8, totalDurationDays * 0.9),
    delivery: project.dates.phases?.delivery || calculatePhaseDates('delivery', totalDurationDays * 0.9, totalDurationDays)
  };
  
  // Helper function to calculate phase dates based on percentage of total duration
  function calculatePhaseDates(phase: string, startPercent: number, endPercent: number) {
    const startOffset = Math.ceil(startPercent);
    const endOffset = Math.ceil(endPercent);
    
    const phaseStartDate = new Date(startDate);
    phaseStartDate.setDate(phaseStartDate.getDate() + startOffset);
    
    const phaseEndDate = new Date(startDate);
    phaseEndDate.setDate(phaseEndDate.getDate() + endOffset);
    
    return {
      startDate: phaseStartDate.toISOString(),
      endDate: phaseEndDate.toISOString()
    };
  }
  
  // Define phase names in French
  const phaseNames = {
    feasibility: 'Faisabilité',
    dce: 'DCE',
    act: 'ACT',
    exe: 'EXE',
    reception: 'Réception',
    delivery: 'Livraison'
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planning du projet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Date de début globale:</span>
            <span className="font-medium">{formatDateFrench(startDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Date de fin globale:</span>
            <span className="font-medium">{formatDateFrench(endDate)}</span>
          </div>
        </div>
        
        <div className="relative mt-8 mb-4">
          {/* Timeline header */}
          <div className="flex mb-2">
            <div className="w-1/4 text-sm font-medium">Phase</div>
            <div className="w-1/4 text-sm font-medium text-center">Dates</div>
            <div className="w-1/2 text-sm font-medium text-center">Timeline</div>
          </div>
          
          {/* Timeline rows for each phase */}
          <div className="space-y-4">
            {Object.entries(phaseDates).map(([phase, dates], index) => {
              if (!project.phases[phase as keyof typeof project.phases]) {
                return null; // Skip inactive phases
              }
              
              const phaseStart = new Date(dates.startDate);
              const phaseEnd = new Date(dates.endDate);
              
              // Calculate position percentage for the phase bar
              const startOffset = ((phaseStart.getTime() - startDate.getTime()) / 
                                  (endDate.getTime() - startDate.getTime())) * 100;
              const width = ((phaseEnd.getTime() - phaseStart.getTime()) / 
                            (endDate.getTime() - startDate.getTime())) * 100;
              
              return (
                <div key={phase} className="flex items-center">
                  <div className="w-1/4 text-sm">
                    {phaseNames[phase as keyof typeof phaseNames]}
                  </div>
                  <div className="w-1/4 text-xs text-center">
                    {formatDateFrench(phaseStart, 'dd/MM/yyyy')} - {formatDateFrench(phaseEnd, 'dd/MM/yyyy')}
                  </div>
                  <div className="w-1/2 relative h-8">
                    <div className="absolute inset-y-0 bg-gray-100 w-full rounded"></div>
                    <div 
                      className="absolute inset-y-0 bg-khaki-600 rounded"
                      style={{ 
                        left: `${startOffset}%`, 
                        width: `${width}%`,
                        minWidth: '20px' // To ensure very short phases are still visible
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Timeline legend */}
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span>{formatDateFrench(startDate, 'MMM yyyy')}</span>
            <span>{formatDateFrench(
              new Date(startDate.getTime() + (endDate.getTime() - startDate.getTime()) / 3), 
              'MMM yyyy'
            )}</span>
            <span>{formatDateFrench(
              new Date(startDate.getTime() + (endDate.getTime() - startDate.getTime()) * 2 / 3), 
              'MMM yyyy'
            )}</span>
            <span>{formatDateFrench(endDate, 'MMM yyyy')}</span>
          </div>
        </div>
        
        <div className="text-sm text-center mt-8 text-gray-500">
          <p>Pour éditer le planning, veuillez accéder aux paramètres du projet.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectGanttView;
