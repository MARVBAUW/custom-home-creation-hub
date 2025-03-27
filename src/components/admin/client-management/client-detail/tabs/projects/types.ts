
import { ProjectPhase } from '@/types/project';

export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  status: string;
  phases?: { [key in ProjectPhase]?: boolean };
  budget?: string;
  dates?: {
    createdAt?: string;
    startDate?: string;
    endDate?: string;
  };
  progress?: number;
}

export interface BaseProjectsListProps {
  projects: Project[];
}
