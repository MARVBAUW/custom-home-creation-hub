
import React from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { CheckSquare, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectPhase, ProjectPhases as ProjectPhasesType } from '@/types/project';

interface ProjectPhasesProps {
  projectId?: string;
  phases?: ProjectPhasesType;
}

const ProjectPhases = ({ projectId, phases }: ProjectPhasesProps) => {
  const phasesList: { id: ProjectPhase; label: string }[] = [
    { id: 'feasibility', label: 'Faisabilité' },
    { id: 'dce', label: 'DCE' },
    { id: 'act', label: 'ACT' },
    { id: 'exe', label: 'EXE' },
    { id: 'reception', label: 'Réception' },
    { id: 'delivery', label: 'Livraison' },
  ];

  if (!phases) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-wrap md:flex-nowrap">
          {phasesList.map((phase, index) => {
            const isActive = phases[phase.id];
            const isComplete = false; // To implement: actual phase completion status
            const isInProgress = isActive && !isComplete; // To implement: actual phase progress status
            
            return (
              <div 
                key={phase.id}
                className={cn(
                  "flex-1 py-3 px-4 text-center relative",
                  index !== phasesList.length - 1 && "border-r border-gray-200",
                  !isActive && "opacity-50 bg-gray-50",
                  isInProgress && "bg-khaki-50",
                  isComplete && "bg-green-50",
                )}
              >
                <div className="flex justify-center mb-2">
                  {isComplete ? (
                    <CheckSquare className="h-6 w-6 text-green-500" />
                  ) : isInProgress ? (
                    <Clock className="h-6 w-6 text-khaki-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </div>
                <span className={cn(
                  "text-sm font-medium",
                  isComplete ? "text-green-700" : isInProgress ? "text-khaki-800" : "text-gray-500"
                )}>
                  {phase.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectPhases;
