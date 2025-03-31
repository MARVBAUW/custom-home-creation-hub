
import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface Phase {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'current' | 'upcoming';
  progress: number;
}

interface ProjectPhaseTimelineProps {
  phases: Phase[];
}

const ProjectPhaseTimeline = ({ phases }: ProjectPhaseTimelineProps) => {
  return (
    <div className="space-y-6 py-2">
      {phases.map((phase, index) => (
        <div key={phase.id} className="relative">
          {/* Connector line between phases */}
          {index < phases.length - 1 && (
            <div 
              className={`absolute left-[15px] top-[30px] w-[2px] h-[calc(100%-10px)] 
              ${phase.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          )}
          
          <div className="flex">
            <div className="mr-4 pt-1">
              {phase.status === 'completed' ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : phase.status === 'current' ? (
                <Clock className="h-8 w-8 text-blue-500" />
              ) : (
                <Circle className="h-8 w-8 text-gray-300" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="bg-gray-50 border rounded-lg p-4">
                <h3 className="font-medium mb-2">{phase.title}</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    {new Date(phase.startDate).toLocaleDateString('fr-FR')} - {new Date(phase.endDate).toLocaleDateString('fr-FR')}
                  </span>
                  <span className={`font-medium 
                    ${phase.status === 'completed' ? 'text-green-600' : 
                    phase.status === 'current' ? 'text-blue-600' : 'text-gray-600'}`}>
                    {phase.status === 'completed' ? 'Terminé' : 
                     phase.status === 'current' ? 'En cours' : 'À venir'}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full 
                    ${phase.status === 'completed' ? 'bg-green-500' : 
                      phase.status === 'current' ? 'bg-blue-500' : 'bg-gray-400'}`} 
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectPhaseTimeline;
