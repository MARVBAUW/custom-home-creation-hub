
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
    feasibility?: DateRange;
    dce?: DateRange;
    act?: DateRange;
    exe?: DateRange;
    reception?: DateRange;
    delivery?: DateRange;
  };
  feasibility?: DateRange;
  dce?: DateRange;
  act?: DateRange;
  exe?: DateRange;
  reception?: DateRange;
  delivery?: DateRange;
}

export interface TeamMembers {
  projectManager?: string;
  technicalDirector?: string;
  draftsman?: string;
  workSupervisor?: string;
  adminAssistant?: string;
  divisionDirector?: string;
}

export type ProjectPhase = 'feasibility' | 'dce' | 'act' | 'exe' | 'reception' | 'delivery';

export interface ProjectPhases {
  feasibility: boolean;
  dce: boolean;
  act: boolean;
  exe: boolean;
  reception: boolean;
  delivery: boolean;
  [key: string]: boolean;
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

export interface ExecutionDetails {
  weeklyVisits?: number;
  projectDistance?: number;
  meetingDay?: string;
  securityCommission?: string;
  controlOffice?: string;
  spsCoordinator?: string;
}

export interface TechnicalOffices {
  [key: string]: boolean;
}

export interface Trades {
  [key: string]: boolean;
}

export interface ProjectDetails {
  id: string;
  projectName: string;
  projectType: string;
  fileNumber?: string;
  projectOwner?: string;
  location?: string;
  workAmount?: string | number;
  dates?: ProjectDates;
  team?: TeamMembers;
  phases: ProjectPhases;
  automaticDates?: boolean;
  adminAuthorization?: string;
  companies: Company[];  // Defined as array not object
  siteReports?: SiteReport[];
  createdAt: string;
  updatedAt: string;
  description?: string;
  clientId?: string;
  status?: string;
  execution?: ExecutionDetails;
  technicalOffices?: TechnicalOffices;
  trades?: Trades;
  permits?: any;  // Added to match usages in code
}

export interface ProjectFormData {
  projectName: string;
  projectType: string;
  fileNumber?: string;
  projectOwner?: string;
  location?: string;
  workAmount?: string | number;
  team?: TeamMembers;
  phases: ProjectPhases;
  automaticDates?: boolean;
  adminAuthorization?: string;
  dates?: ProjectDates;
  description?: string;
  execution?: ExecutionDetails;
  technicalOffices?: TechnicalOffices;
  trades?: Trades;
}
