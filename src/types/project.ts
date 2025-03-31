
export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface ProjectDates {
  global: DateRange;
  design?: DateRange;
  permits?: DateRange;
  construction?: DateRange;
  phases?: {
    [key: string]: DateRange;
  };
}

export interface TeamMembers {
  projectManager?: string;
  technicalDirector?: string;
  draftsman?: string;
  workSupervisor?: string;
  adminAssistant?: string;
  divisionDirector?: string;
}

export interface ProjectPhases {
  feasibility: boolean;
  dce: boolean;
  act: boolean;
  exe: boolean;
  reception: boolean;
  delivery: boolean;
}

export interface Company {
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
  tasks?: string[];
}

export interface SiteReport {
  id: string;
  date: string;
  title: string;
  content: string;
  author: string;
  companies: string[];
  photos?: string[];
  createdAt: string;
}

export interface ProjectDetails {
  id: string;
  projectName: string;
  projectType: string;
  fileNumber?: string;
  projectOwner?: string;
  location?: string;
  workAmount?: number;
  dates?: ProjectDates;
  team?: TeamMembers;
  phases: ProjectPhases;
  automaticDates?: boolean;
  adminAuthorization?: string;
  companies?: Company[];
  siteReports?: SiteReport[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  projectName: string;
  projectType: string;
  fileNumber?: string;
  projectOwner?: string;
  location?: string;
  workAmount?: number;
  team?: TeamMembers;
  phases: ProjectPhases;
  automaticDates?: boolean;
  adminAuthorization?: string;
  dates?: ProjectDates;
}
