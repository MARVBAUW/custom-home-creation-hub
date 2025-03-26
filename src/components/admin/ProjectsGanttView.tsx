
import React from 'react';
import { format, parseISO, isWithinInterval, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectDetails, ProjectPhase } from '@/types/project';

// Mock data for demonstration
const projects: ProjectDetails[] = [
  {
    projectName: "Centre commercial Marseille",
    fileNumber: "PRG-2023-001",
    workAmount: "1200000",
    projectOwner: "SCI Méditerranée",
    projectType: "commercial",
    adminAuthorization: "building_permit",
    automaticDates: true,
    dates: {
      global: {
        startDate: "2023-10-01",
        endDate: "2024-07-15"
      },
      feasibility: {
        startDate: "2023-10-01",
        endDate: "2023-10-30"
      },
      dce: {
        startDate: "2023-11-01",
        endDate: "2023-12-15"
      },
      act: {
        startDate: "2023-12-16",
        endDate: "2024-01-20"
      },
      exe: {
        startDate: "2024-01-21",
        endDate: "2024-06-30"
      },
      reception: {
        startDate: "2024-07-01",
        endDate: "2024-07-10"
      },
      delivery: {
        startDate: "2024-07-11",
        endDate: "2024-07-15"
      }
    },
    phases: {
      feasibility: true,
      dce: true,
      act: true,
      exe: true,
      reception: true,
      delivery: true
    },
    team: {},
    execution: {},
    technicalOffices: {},
    trades: {}
  },
  {
    projectName: "Immeuble résidentiel Lyon",
    fileNumber: "PRG-2023-002",
    workAmount: "850000",
    projectOwner: "Groupe Immobilier Rhône",
    projectType: "residential",
    adminAuthorization: "building_permit",
    automaticDates: true,
    dates: {
      global: {
        startDate: "2023-11-15",
        endDate: "2024-08-30"
      },
      feasibility: {
        startDate: "2023-11-15",
        endDate: "2023-12-15"
      },
      dce: {
        startDate: "2023-12-16",
        endDate: "2024-01-31"
      },
      act: {
        startDate: "2024-02-01",
        endDate: "2024-02-29"
      },
      exe: {
        startDate: "2024-03-01",
        endDate: "2024-08-15"
      },
      reception: {
        startDate: "2024-08-16",
        endDate: "2024-08-25"
      },
      delivery: {
        startDate: "2024-08-26",
        endDate: "2024-08-30"
      }
    },
    phases: {
      feasibility: true,
      dce: true,
      act: true,
      exe: true,
      reception: true,
      delivery: true
    },
    team: {},
    execution: {},
    technicalOffices: {},
    trades: {}
  }
];

const phaseColors: Record<ProjectPhase, string> = {
  feasibility: "bg-blue-400",
  dce: "bg-green-400",
  act: "bg-yellow-400",
  exe: "bg-purple-400",
  reception: "bg-pink-400",
  delivery: "bg-red-400"
};

const phaseLabels: Record<ProjectPhase, string> = {
  feasibility: "Faisabilité",
  dce: "DCE",
  act: "ACT",
  exe: "EXE",
  reception: "Réception",
  delivery: "Livraison"
};

const ProjectsGanttView = () => {
  // Calculate start and end dates for the chart (1 year view)
  const today = new Date();
  const startDate = new Date(today);
  const endDate = addDays(today, 365);
  
  // Generate month headers
  const months: Date[] = [];
  let currentMonth = new Date(startDate);
  currentMonth.setDate(1); // Start from the first day of the month
  
  while (currentMonth <= endDate) {
    months.push(new Date(currentMonth));
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }
  
  // Function to calculate position and width for phase bars
  const calculateBarStyle = (phase: { startDate: string, endDate: string }) => {
    const phaseStart = parseISO(phase.startDate);
    const phaseEnd = parseISO(phase.endDate);
    
    // Skip if phase is outside the visible range
    if (phaseEnd < startDate || phaseStart > endDate) {
      return { display: 'none' };
    }
    
    // Adjust start if it's before visible range
    const visibleStart = phaseStart < startDate ? startDate : phaseStart;
    // Adjust end if it's after visible range
    const visibleEnd = phaseEnd > endDate ? endDate : phaseEnd;
    
    // Calculate position as percentage
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const startOffset = (visibleStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const duration = (visibleEnd.getTime() - visibleStart.getTime()) / (1000 * 60 * 60 * 24);
    
    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;
    
    return {
      left: `${left}%`,
      width: `${width}%`
    };
  };
  
  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Planning des projets (Vue à 1 an)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Month headers */}
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
            
            {/* Projects */}
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
                        
                        const barStyle = calculateBarStyle(project.dates[phase]!);
                        if (barStyle.display === 'none') return null;
                        
                        return (
                          <div 
                            key={phase}
                            className={`absolute h-6 rounded-sm ${phaseColors[phase]} flex items-center justify-center text-xs text-white cursor-pointer transition-opacity hover:opacity-90`}
                            style={{ ...barStyle, top: '15px' }}
                            title={`${phaseLabels[phase]}: ${project.dates[phase]?.startDate} - ${project.dates[phase]?.endDate}`}
                          >
                            {phaseLabels[phase]}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Legend */}
            <div className="flex mt-6 flex-wrap gap-2">
              {Object.entries(phaseLabels).map(([phase, label]) => (
                <div key={phase} className="flex items-center space-x-1">
                  <div className={`w-3 h-3 ${phaseColors[phase as ProjectPhase]} rounded-sm`}></div>
                  <span className="text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsGanttView;
