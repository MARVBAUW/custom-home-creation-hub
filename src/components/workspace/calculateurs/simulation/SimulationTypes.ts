
// Types for simulations
import { Json, isJson } from '@/components/estimation/calculator/types/json';

export type SimulationType = 'calculator' | 'simulation' | 'note' | 'rentability' | 'surface' | 'frais-notaire' | 'capacite-emprunt' | 'acoustic' | 'dpe' | 'thermal';

export interface SimulationContent {
  data: any;
  results?: any;
}

export interface Simulation {
  id?: string;
  title: string;
  type: SimulationType;
  content: SimulationContent;
  is_temporary: boolean;
  updated_at?: string;
  created_at?: string;
  user_id?: string;
}

// Convert SimulationContent to Json for database storage
export function simulationContentToJson(content: SimulationContent): Json {
  return {
    data: content.data,
    results: content.results
  };
}

// Convert Json to SimulationContent when retrieving from database
export function jsonToSimulationContent(json: Json): SimulationContent {
  if (typeof json === 'string') {
    try {
      // Try to parse string as JSON
      return JSON.parse(json);
    } catch (e) {
      // If parsing fails, treat string as raw data
      return { data: json };
    }
  }
  
  if (json === null || json === undefined) {
    return { data: {} };
  }
  
  // If json is already properly structured and has data/results properties
  if (typeof json === 'object' && json !== null) {
    if ('data' in json || 'results' in json) {
      return { 
        data: (json as any).data || {},
        results: (json as any).results
      };
    }
    // If it's an object but doesn't follow our structure
    return { data: json };
  }
  
  // Default fallback
  return { data: json };
}

// Helper function to validate and ensure proper content structure
export function normalizeSimulationContent(content: any): SimulationContent {
  if (typeof content === 'string') {
    try {
      // Try to parse string as JSON
      return { data: JSON.parse(content) };
    } catch (e) {
      // If parsing fails, treat string as raw data
      return { data: content };
    }
  }
  
  if (content === null || content === undefined) {
    return { data: {} };
  }
  
  // If content is already an object but doesn't follow our structure
  if (typeof content === 'object' && !content.data && !content.results) {
    return { data: content };
  }
  
  // If content is already properly structured
  if (typeof content === 'object' && (content.data || content.results)) {
    return content as SimulationContent;
  }
  
  // Default fallback
  return { data: content };
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
