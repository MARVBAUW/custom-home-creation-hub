
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import GanttTimeline from './GanttTimeline';
import GanttProjectList from './GanttProjectList';
import GanttLegend from './GanttLegend';
import { ProjectDetails } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Filter } from 'lucide-react';

interface GanttChartProps {
  projects: ProjectDetails[];
  title?: string;
  description?: string;
}

const GanttChart = ({ 
  projects, 
  title = "Planning des projets", 
  description = "Vue à 12 mois"
}: GanttChartProps) => {
  // Calculate start and end dates for the chart (1 year view)
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 365);
  
  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && (
              <CardDescription className="text-gray-500 dark:text-gray-400">{description}</CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs h-8 bg-white dark:bg-gray-800">
              <Filter className="h-3 w-3 mr-1" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8 bg-white dark:bg-gray-800">
              <Download className="h-3 w-3 mr-1" />
              Exporter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative bg-white dark:bg-gray-900">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <GanttTimeline startDate={startDate} endDate={endDate} />
            <GanttProjectList projects={projects} startDate={startDate} endDate={endDate} />
            <GanttLegend />
          </div>
        </div>
      </CardContent>
      <CardFooter className="py-3 px-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-2 text-khaki-600 dark:text-khaki-400" />
          <span>Planification de {projects.length || 5} projets du {startDate.toLocaleDateString()} au {endDate.toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GanttChart;
