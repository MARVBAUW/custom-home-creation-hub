
// Define the DateRange interface used in various components
export interface DateRange {
  startDate: string;
  endDate: string;
}

// Define basic project details interface
export interface ProjectDetails {
  id: string;
  projectName: string;
  projectType: string;
  fileNumber?: string;
  projectOwner: string;
  location: string;
  workAmount?: number;
  status: string;
  dates: {
    global: DateRange;
    design?: DateRange;
    permits?: DateRange;
    construction?: DateRange;
    phases?: Record<string, DateRange>;
  };
  phases: {
    feasibility: boolean;
    dce: boolean;
    act: boolean;
    exe: boolean;
    reception: boolean;
    delivery: boolean;
    [key: string]: boolean;
  };
  createdAt: string;
  updatedAt: string;
  companies: any[];
  [key: string]: any;
}
