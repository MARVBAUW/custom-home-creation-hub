
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock } from 'lucide-react';
import { ProjectPhases as ProjectPhasesType } from '@/types/project';

interface ProjectPhasesProps {
  projectId: string;
  phases: ProjectPhasesType;
}

const phaseLabels: Record<string, string> = {
  feasibility: "Faisabilité",
  dce: "DCE",
  act: "ACT",
  exe: "EXE",
  reception: "Réception",
  delivery: "Livraison"
};

const ProjectPhases: React.FC<ProjectPhasesProps> = ({ projectId, phases }) => {
  // Count the number of completed phases
  const completedPhases = Object.values(phases).filter(Boolean).length;
  const totalPhases = Object.keys(phases).length;
  const progress = Math.round((completedPhases / totalPhases) * 100);
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-1">Phases du projet</h3>
            <p className="text-sm text-gray-500">Avancement global: {progress}%</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Check className="h-3 w-3" /> 
              <span>{completedPhases} sur {totalPhases}</span>
            </Badge>
          </div>
        </div>
        
        <div className="relative">
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-khaki-600 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Phase indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(phases).map(([key, completed]) => (
              <div 
                key={key} 
                className={`flex items-center p-3 rounded-lg border ${
                  completed 
                    ? "border-green-200 bg-green-50" 
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    completed 
                      ? "bg-green-100 text-green-600" 
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {completed ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{phaseLabels[key] || key}</p>
                  <p className="text-xs text-gray-500">
                    {completed ? "Terminée" : "À venir"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectPhases;
