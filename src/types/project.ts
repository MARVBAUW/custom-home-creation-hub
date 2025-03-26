
export type ProjectPhase = 'feasibility' | 'dce' | 'act' | 'exe' | 'reception' | 'delivery';

export type PhaseDates = {
  startDate: string;
  endDate: string;
};

export type ProjectDates = {
  [phase in ProjectPhase]?: PhaseDates;
} & {
  global: PhaseDates;
};

export type TradeType = 
  | 'go' | 'vrd' | 'framework' | 'cladding' | 'roofing' | 'joinery' 
  | 'locksmithing' | 'flooring' | 'isothermal' | 'plastering' 
  | 'painting' | 'demolition' | 'plumbing' | 'foodCold' | 'cvc' 
  | 'arrangement' | 'sprinklage' | 'ria' | 'ssi' | 'electricity' 
  | 'interiorJoinery' | 'sectionalDoor' | 'levelingDock' | 'fastDoor' 
  | 'specialFoundations' | 'automaticDoor' | 'flexibleFloor' | 'tiling'
  | 'metalwork' | 'railings' | 'elevator' | 'acoustics' | 'facades'
  | 'greenSpaces' | 'security' | 'signage' | 'movableFurniture' | 'kitchenEquipment'
  | 'audioVisual' | 'industrialEquipment' | 'cleaningEquipment' | 'wasteManagement'
  | 'waterTreatment' | 'telecommunications';

export interface ProjectDetails {
  projectName: string;
  fileNumber: string;
  workAmount: string;
  projectOwner: string;
  projectType: string;
  adminAuthorization: string;
  automaticDates: boolean;
  dates: ProjectDates;
  phases: {[key in ProjectPhase]: boolean};
  team: {
    projectManager?: string;
    technicalDirector?: string;
    draftsman?: string;
    workSupervisor?: string;
    adminAssistant?: string;
    divisionDirector?: string;
  };
  execution: {
    weeklyVisits?: number;
    projectDistance?: number;
    meetingDay?: string;
    securityCommission?: string;
    controlOffice?: string;
    spsCoordinator?: string;
  };
  technicalOffices: {[key: string]: boolean};
  trades: {[key: string]: boolean};
}
