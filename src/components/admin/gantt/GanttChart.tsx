
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GanttTimeline from './GanttTimeline';
import GanttProjectList from './GanttProjectList';
import GanttLegend from './GanttLegend';
import { ProjectDetails } from '@/types/project';

interface GanttChartProps {
  projects: ProjectDetails[];
  title?: string;
}

const GanttChart = ({ projects, title = "Planning des projets (Vue à 1 an)" }: GanttChartProps) => {
  // Calculate start and end dates for the chart (1 year view)
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 365);
  
  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            <GanttTimeline startDate={startDate} endDate={endDate} />
            <GanttProjectList projects={projects} startDate={startDate} endDate={endDate} />
            <GanttLegend />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttChart;
