
// Types for simulations
export type SimulationType = 'calculator' | 'simulation' | 'note' | 'rentability' | 'surface' | 'frais-notaire' | 'capacite-emprunt' | 'acoustic' | 'dpe' | 'thermal';

export interface Simulation {
  id?: string;
  title: string;
  type: SimulationType;
  content: {
    data: any;
    results?: any;
  };
  is_temporary: boolean;
  updated_at?: string;
  created_at?: string;
  user_id?: string;
}

export function validateSimulationType(type: string): SimulationType {
  const validTypes: SimulationType[] = ['calculator', 'simulation', 'note', 'rentability', 'surface', 'frais-notaire', 'capacite-emprunt', 'acoustic', 'dpe', 'thermal'];
  
  if (validTypes.includes(type as SimulationType)) {
    return type as SimulationType;
  }
  
  // Default to calculator if not valid
  return 'calculator';
}

export interface SimulationStorage {
  saveSimulation: (simulation: Simulation) => Promise<Simulation>;
  loadSimulations: () => Promise<Simulation[]>;
  deleteSimulation: (id: string) => Promise<void>;
  getSimulation: (id: string) => Promise<Simulation | null>;
}
