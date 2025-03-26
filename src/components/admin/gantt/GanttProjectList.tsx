
import React from 'react';
import { parseISO } from 'date-fns';
import GanttTaskBar from './GanttTaskBar';
import { ProjectDetails, ProjectPhase } from '@/types/project';

interface GanttProjectListProps {
  projects: ProjectDetails[];
  startDate: Date;
  endDate: Date;
}

const GanttProjectList = ({ projects, startDate, endDate }: GanttProjectListProps) => {
  return (
    <>
      {projects.map((project, projectIndex) => (
        <div key={projectIndex} className="border-b border-gray-100">
          <div className="flex">
            <div className="w-[200px] shrink-0 p-3 font-medium">
              {project.projectName}
              <div className="text-xs text-gray-500">{project.fileNumber}</div>
            </div>
            <div className="flex-1 relative h-[60px]">
              {Object.entries(project.phases)
                .filter(([_, isActive]) => isActive)
                .map(([phaseKey, _]) => {
                  const phase = phaseKey as ProjectPhase;
                  if (!project.dates[phase]) return null;
                  
                  return (
                    <GanttTaskBar 
                      key={phase} 
                      phase={phase} 
                      dates={project.dates[phase]!} 
                      startDate={startDate} 
                      endDate={endDate} 
                    />
                  );
                })}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GanttProjectList;
