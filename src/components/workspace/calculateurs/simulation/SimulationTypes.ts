
import { Json, isJson } from '@/components/estimation/calculator/types/json';

export type SimulationType = 'calculator' | 'simulation' | 'note' | 'rentability' | 'surface' | 'frais-notaire' | 'capacite-emprunt' | 'acoustic' | 'dpe' | 'thermal';

export interface SimulationContent {
  data: any;
  results?: any;
  [key: string]: any; // Add index signature for Json compatibility
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
  if (typeof content === 'string') {
    return content;
  }
  return {
    data: content.data,
    results: content.results,
  } as Json;
}

// Convert Json to SimulationContent when retrieving from database
export function jsonToSimulationContent(json: Json): SimulationContent {
  if (typeof json === 'string') {
    try {
      return JSON.parse(json) as SimulationContent;
    } catch (e) {
      return { data: json };
    }
  }
  
  if (!json || typeof json !== 'object') {
    return { data: {} };
  }
  
  if ('data' in json || 'results' in json) {
    return {
      data: (json as any).data || {},
      results: (json as any).results
    };
  }
  
  return { data: json };
}

// Helper function to validate and ensure proper content structure
export function normalizeSimulationContent(content: any): SimulationContent {
  if (typeof content === 'string') {
    try {
      return { data: JSON.parse(content) };
    } catch (e) {
      return { data: content };
    }
  }
  
  if (!content || typeof content !== 'object') {
    return { data: {} };
  }
  
  if (!content.data && !content.results) {
    return { data: content };
  }
  
  return content as SimulationContent;
}

export function validateSimulationType(type: string): SimulationType {
  const validTypes: SimulationType[] = [
    'calculator',
    'simulation',
    'note',
    'rentability',
    'surface',
    'frais-notaire',
    'capacite-emprunt',
    'acoustic',
    'dpe',
    'thermal'
  ];
  
  if (validTypes.includes(type as SimulationType)) {
    return type as SimulationType;
  }
  
  return 'calculator';
}

export interface SimulationStorage {
  saveSimulation: (simulation: Simulation) => Promise<Simulation>;
  loadSimulations: () => Promise<Simulation[]>;
  deleteSimulation: (id: string) => Promise<void>;
  getSimulation: (id: string) => Promise<Simulation | null>;
}
