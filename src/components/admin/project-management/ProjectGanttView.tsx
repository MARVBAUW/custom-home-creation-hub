
import React from 'react';
import GanttChart from '../gantt/GanttChart';
import { ProjectDetails } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDateFrench } from '@/utils/dateUtils';

interface ProjectGanttViewProps {
  project: ProjectDetails;
}

const ProjectGanttView = ({ project }: ProjectGanttViewProps) => {
  // Calculate start and end dates for the chart (6 months view)
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 1); // Start from 1 month ago
  const endDate = new Date(today);
  endDate.setMonth(today.getMonth() + 5); // Show 6 months total
  
  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <CardTitle>Planning du projet</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Aujourd'hui</span>
          </Button>
          <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700 text-white flex items-center">
            <Save className="h-4 w-4 mr-2" />
            <span>Enregistrer</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Passer le projet comme tableau d'un seul élément au GanttChart */}
        <GanttChart 
          projects={[project]} 
          title="" 
          description={`Du ${formatDateFrench(startDate)} au ${formatDateFrench(endDate)}`}
          startDate={startDate} 
          endDate={endDate} 
        />
      </CardContent>
    </Card>
  );
};

export default ProjectGanttView;
