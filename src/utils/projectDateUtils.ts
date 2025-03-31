
import { addDays, format } from 'date-fns';
import { ProjectDates, ProjectPhase, ProjectPhases } from '@/types/project';

// Calculate duration in days based on project work amount and selected phases
export const calculatePhaseDurations = (
  workAmount: string,
  selectedPhases: ProjectPhases
): { [key in ProjectPhase]?: number } => {
  // Base duration calculation factor
  const workAmountNum = parseFloat(workAmount) || 0;
  const baseFactor = workAmountNum < 100000 ? 0.8 : 
                     workAmountNum < 500000 ? 1 : 
                     workAmountNum < 1000000 ? 1.2 : 1.5;
  
  const phaseDurations: { [key in ProjectPhase]?: number } = {};
  
  if (selectedPhases.feasibility) {
    phaseDurations.feasibility = Math.round(15 * baseFactor);
  }
  
  if (selectedPhases.dce) {
    phaseDurations.dce = Math.round(30 * baseFactor);
  }
  
  if (selectedPhases.act) {
    phaseDurations.act = Math.round(20 * baseFactor);
  }
  
  if (selectedPhases.exe) {
    phaseDurations.exe = Math.round(workAmountNum / 10000 * baseFactor);
  }
  
  if (selectedPhases.reception) {
    phaseDurations.reception = Math.round(10 * baseFactor);
  }
  
  if (selectedPhases.delivery) {
    phaseDurations.delivery = Math.round(5 * baseFactor);
  }
  
  return phaseDurations;
};

// Calculate start and end dates for each phase
export const calculatePhaseDates = (
  globalStartDate: string,
  workAmount: string,
  selectedPhases: ProjectPhases
): ProjectDates => {
  if (!globalStartDate) {
    // Default to today if no start date provided
    globalStartDate = format(new Date(), 'yyyy-MM-dd');
  }

  const phaseDurations = calculatePhaseDurations(workAmount, selectedPhases);
  const phases = Object.keys(selectedPhases).filter(phase => selectedPhases[phase]) as ProjectPhase[];
  
  let currentStartDate = new Date(globalStartDate);
  const dates: ProjectDates = { global: { startDate: globalStartDate, endDate: globalStartDate } };
  
  // Calculate dates sequentially for each phase
  phases.forEach(phase => {
    const duration = phaseDurations[phase] || 0;
    
    if (duration > 0) {
      const startDate = format(currentStartDate, 'yyyy-MM-dd');
      const endDate = format(addDays(currentStartDate, duration), 'yyyy-MM-dd');
      
      dates[phase] = { startDate, endDate };
      
      // Set next phase start date to day after this phase ends
      currentStartDate = addDays(new Date(endDate), 1);
    }
  });
  
  // Update global end date to be the end date of the last phase
  const lastPhase = phases[phases.length - 1];
  if (lastPhase && dates[lastPhase]) {
    dates.global.endDate = dates[lastPhase]!.endDate;
  }
  
  return dates;
};
