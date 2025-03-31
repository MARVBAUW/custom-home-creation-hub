import React from 'react';
import { parseISO, addMonths, formatISO, addDays } from 'date-fns';
import GanttTaskBar from './GanttTaskBar';
import type { ProjectDetails, ProjectPhase } from '@/types/project';

interface GanttProjectListProps {
  projects: ProjectDetails[];
  startDate: Date;
  endDate: Date;
}

// Create demo data if no projects with dates are provided
const createDemoData = (startDate: Date, endDate: Date) => {
  const demoProjects: ProjectDetails[] = [];
  const now = new Date();
  
  // Create 5 projects with different phases
  for (let i = 0; i < 5; i++) {
    const projectStartDate = addDays(now, -30 + i * 15); // Stagger start dates
    
    const projectName = `Projet ${i + 1}`;
    const fileNumber = `P${2023}${i + 100}`;
    
    const demoProject: ProjectDetails = {
      id: `demo-project-${i}`,
      projectName,
      fileNumber,
      workAmount: `${(150000 + i * 20000).toLocaleString('fr-FR')} €`,
      projectOwner: `Client ${i + 1}`,
      projectType: i % 2 === 0 ? "residential" : "commercial",
      adminAuthorization: "building_permit",
      automaticDates: true,
      dates: {
        global: {
          startDate: formatISO(projectStartDate),
          endDate: formatISO(addMonths(projectStartDate, 6 + i))
        }
      },
      phases: {
        feasibility: true,
        dce: true,
        act: true,
        exe: true,
        reception: i < 3, // Only first 3 projects have reception phase
        delivery: i < 2  // Only first 2 projects have delivery phase
      },
      team: {},
      execution: {},
      technicalOffices: {},
      trades: {},
      createdAt: formatISO(addDays(now, -60)),
      updatedAt: formatISO(now),
      description: ""
    };
    
    // Add dates for each phase
    if (demoProject.phases.feasibility) {
      if (!demoProject.dates.phases) {
        demoProject.dates.phases = {};
      }
      demoProject.dates.phases.feasibility = {
        startDate: formatISO(projectStartDate),
        endDate: formatISO(addDays(projectStartDate, 30))
      };
    }
    
    if (demoProject.phases.dce) {
      if (!demoProject.dates.phases) {
        demoProject.dates.phases = {};
      }
      const dceStart = addDays(projectStartDate, 35);
      demoProject.dates.phases.dce = {
        startDate: formatISO(dceStart),
        endDate: formatISO(addDays(dceStart, 45))
      };
    }
    
    if (demoProject.phases.act) {
      if (!demoProject.dates.phases) {
        demoProject.dates.phases = {};
      }
      const actStart = addDays(projectStartDate, 85);
      demoProject.dates.phases.act = {
        startDate: formatISO(actStart),
        endDate: formatISO(addDays(actStart, 30))
      };
    }
    
    if (demoProject.phases.exe) {
      if (!demoProject.dates.phases) {
        demoProject.dates.phases = {};
      }
      const exeStart = addDays(projectStartDate, 120);
      demoProject.dates.phases.exe = {
        startDate: formatISO(exeStart),
        endDate: formatISO(addDays(exeStart, 60 + i * 10))
      };
    }
    
    if (demoProject.phases.reception) {
      if (!demoProject.dates.phases) {
        demoProject.dates.phases = {};
      }
      const receptionStart = addDays(projectStartDate, 185 + i * 10);
      demoProject.dates.phases.reception = {
        startDate: formatISO(receptionStart),
        endDate: formatISO(addDays(receptionStart, 15))
      };
    }
    
    if (demoProject.phases.delivery) {
      if (!demoProject.dates.phases) {
        demoProject.dates.phases = {};
      }
      const deliveryStart = addDays(projectStartDate, 205 + i * 10);
      demoProject.dates.phases.delivery = {
        startDate: formatISO(deliveryStart),
        endDate: formatISO(addDays(deliveryStart, 5))
      };
    }
    
    demoProjects.push(demoProject);
  }
  
  return demoProjects;
};

const GanttProjectList = ({ projects = [], startDate, endDate }: GanttProjectListProps) => {
  // Use demo data if no projects with dates are provided
  const displayProjects = projects.length > 0 && projects.some(p => 
    p.dates && Object.keys(p.dates).length > 1
  ) ? projects : createDemoData(startDate, endDate);
  
  return (
    <>
      {displayProjects.map((project, projectIndex) => (
        <div key={projectIndex} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <div className="flex">
            <div className="w-[200px] shrink-0 p-3 font-medium">
              <div className="text-gray-900 dark:text-gray-100">{project.projectName}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{project.fileNumber}</div>
              <div className="text-xs text-khaki-600 dark:text-khaki-400 mt-1">{project.workAmount}</div>
            </div>
            <div className="flex-1 relative h-[60px]">
              {Object.entries(project.phases)
                .filter(([_, isActive]) => isActive)
                .map(([phaseKey, _]) => {
                  const phase = phaseKey as ProjectPhase;
                  if (!project.dates.phases || !project.dates.phases[phase]) return null;
                  
                  return (
                    <GanttTaskBar 
                      key={phase} 
                      phase={phase} 
                      dates={project.dates.phases[phase]!} 
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
