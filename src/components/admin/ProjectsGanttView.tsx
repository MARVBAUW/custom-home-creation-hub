
import React from 'react';
import GanttChart from './gantt/GanttChart';
import { mockProjects } from './gantt/ganttUtils';

const ProjectsGanttView = () => {
  // We're using the mock projects from ganttUtils
  const projects = mockProjects;
  
  return <GanttChart projects={projects} />;
};

export default ProjectsGanttView;
