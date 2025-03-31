
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateFrench } from '@/utils/dateUtils';

interface ProjectGanttViewProps {
  project: any;
}

const ProjectGanttView: React.FC<ProjectGanttViewProps> = ({ project }) => {
  if (!project || !project.startDate || !project.endDate) {
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
  
  // Calculate the project start and end dates
  const projectStart = new Date(project.startDate);
  const projectEnd = new Date(project.endDate);
  
  // Calculate the total duration in days
  const totalDays = Math.max(1, Math.floor((projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Create sample phases for the demo visualization
  const today = new Date();
  const phasesToDisplay = [
    { 
      name: 'Études préliminaires', 
      startDate: projectStart,
      endDate: new Date(projectStart.getTime() + (totalDays * 0.2 * 24 * 60 * 60 * 1000)),
      color: 'bg-blue-400',
      completed: today > new Date(projectStart.getTime() + (totalDays * 0.2 * 24 * 60 * 60 * 1000))
    },
    { 
      name: 'Conception détaillée', 
      startDate: new Date(projectStart.getTime() + (totalDays * 0.2 * 24 * 60 * 60 * 1000)),
      endDate: new Date(projectStart.getTime() + (totalDays * 0.4 * 24 * 60 * 60 * 1000)),
      color: 'bg-indigo-400',
      completed: today > new Date(projectStart.getTime() + (totalDays * 0.4 * 24 * 60 * 60 * 1000))
    },
    { 
      name: 'Autorisations', 
      startDate: new Date(projectStart.getTime() + (totalDays * 0.35 * 24 * 60 * 60 * 1000)),
      endDate: new Date(projectStart.getTime() + (totalDays * 0.55 * 24 * 60 * 60 * 1000)),
      color: 'bg-yellow-400',
      completed: today > new Date(projectStart.getTime() + (totalDays * 0.55 * 24 * 60 * 60 * 1000))
    },
    { 
      name: 'Appel d\'offres', 
      startDate: new Date(projectStart.getTime() + (totalDays * 0.55 * 24 * 60 * 60 * 1000)),
      endDate: new Date(projectStart.getTime() + (totalDays * 0.65 * 24 * 60 * 60 * 1000)),
      color: 'bg-orange-400',
      completed: today > new Date(projectStart.getTime() + (totalDays * 0.65 * 24 * 60 * 60 * 1000))
    },
    { 
      name: 'Construction', 
      startDate: new Date(projectStart.getTime() + (totalDays * 0.65 * 24 * 60 * 60 * 1000)),
      endDate: new Date(projectStart.getTime() + (totalDays * 0.95 * 24 * 60 * 60 * 1000)),
      color: 'bg-green-400',
      completed: false
    },
    { 
      name: 'Livraison', 
      startDate: new Date(projectStart.getTime() + (totalDays * 0.95 * 24 * 60 * 60 * 1000)),
      endDate: projectEnd,
      color: 'bg-teal-400',
      completed: false
    },
  ];
  
  // Calculate progress
  const now = new Date();
  let progress = 0;
  
  if (now >= projectEnd) {
    progress = 100;
  } else if (now <= projectStart) {
    progress = 0;
  } else {
    progress = Math.min(100, Math.round(((now.getTime() - projectStart.getTime()) / (projectEnd.getTime() - projectStart.getTime())) * 100));
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planning du projet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Début: {formatDateFrench(projectStart)}</span>
            <span className="text-sm">Avancement: {progress}%</span>
            <span className="text-sm">Fin: {formatDateFrench(projectEnd)}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full">
            <div 
              className="h-full bg-khaki-600 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {phasesToDisplay.map((phase, index) => {
            // Calculate position and width of the phase bar
            const leftPercentage = Math.max(0, Math.min(100, (phase.startDate.getTime() - projectStart.getTime()) / (totalDays * 24 * 60 * 60 * 1000) * 100));
            const widthPercentage = Math.max(0, Math.min(100 - leftPercentage, (phase.endDate.getTime() - phase.startDate.getTime()) / (totalDays * 24 * 60 * 60 * 1000) * 100));
            
            return (
              <div key={index} className="relative h-10">
                <div className="absolute left-0 top-0 h-full w-full bg-gray-100 rounded"></div>
                <div 
                  className={`absolute top-0 h-full ${phase.color} rounded ${phase.completed ? 'opacity-70' : ''}`}
                  style={{ 
                    left: `${leftPercentage}%`, 
                    width: `${widthPercentage}%`,
                  }}
                ></div>
                <div className="absolute left-2 top-0 h-full flex items-center text-sm font-medium">
                  {phase.name} {phase.completed && '✓'}
                </div>
                <div className="absolute right-2 top-0 h-full flex items-center text-sm">
                  {formatDateFrench(phase.startDate)} - {formatDateFrench(phase.endDate)}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Le planning ci-dessus est indicatif et peut évoluer en fonction de l'avancement du projet.</p>
          <p>Dernière mise à jour: {formatDateFrench(new Date())}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectGanttView;
