
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/hooks/useAuth';
import { useSupabase } from '@/hooks/useSupabase';
import { Simulation, SimulationType, validateSimulationType, normalizeSimulationContent, simulationContentToJson, jsonToSimulationContent } from './SimulationTypes';

export const useSimulationStorage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { supabase } = useSupabase();

  // Load simulations from local storage or Supabase
  const loadSimulations = async (): Promise<Simulation[]> => {
    setLoading(true);
    try {
      if (user) {
        // Load from Supabase
        const { data, error } = await supabase
          .from('simulations')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Convert database records to Simulation objects
        const simulations: Simulation[] = data.map(item => ({
          id: item.id,
          title: item.title,
          type: validateSimulationType(item.type),
          content: jsonToSimulationContent(item.content),
          is_temporary: false,
          created_at: item.created_at,
          updated_at: item.updated_at,
          user_id: item.user_id
        }));
        
        return simulations;
      } else {
        // Load from local storage
        const localStorageKey = 'progineer-simulations';
        const storedSimulations = localStorage.getItem(localStorageKey);
        
        if (storedSimulations) {
          try {
            const parsedSimulations = JSON.parse(storedSimulations);
            return parsedSimulations.map((sim: any) => ({
              ...sim,
              type: validateSimulationType(sim.type),
              content: normalizeSimulationContent(sim.content)
            }));
          } catch (e) {
            console.error('Failed to parse simulations from localStorage', e);
            return [];
          }
        }
        return [];
      }
    } catch (error) {
      console.error('Error loading simulations:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Save simulation to local storage or Supabase
  const saveSimulation = async (simulation: Simulation): Promise<Simulation> => {
    setLoading(true);
    
    // Ensure we have a normalized content
    simulation.content = normalizeSimulationContent(simulation.content);
    
    try {
      if (user) {
        // Save to Supabase
        const now = new Date().toISOString();
        const simulationToSave = {
          id: simulation.id || uuidv4(),
          title: simulation.title,
          type: simulation.type,
          content: simulationContentToJson(simulation.content),
          is_temporary: simulation.is_temporary || false,
          updated_at: now,
          created_at: simulation.created_at || now,
          user_id: user.id
        };
        
        const { data, error } = await supabase
          .from('simulations')
          .upsert(simulationToSave)
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        return {
          id: data.id,
          title: data.title,
          type: validateSimulationType(data.type),
          content: jsonToSimulationContent(data.content),
          is_temporary: data.is_temporary,
          created_at: data.created_at,
          updated_at: data.updated_at,
          user_id: data.user_id
        };
      } else {
        // Save to local storage
        const localStorageKey = 'progineer-simulations';
        const now = new Date().toISOString();
        
        // Generate id if it doesn't exist
        if (!simulation.id) {
          simulation.id = uuidv4();
        }
        
        // Set timestamps
        simulation.updated_at = now;
        simulation.created_at = simulation.created_at || now;
        
        // Get existing simulations
        let simulations = [];
        const storedSimulations = localStorage.getItem(localStorageKey);
        
        if (storedSimulations) {
          try {
            simulations = JSON.parse(storedSimulations);
          } catch (e) {
            console.error('Failed to parse simulations from localStorage', e);
          }
        }
        
        // Find and update existing simulation or add new one
        const index = simulations.findIndex((s: any) => s.id === simulation.id);
        
        if (index !== -1) {
          simulations[index] = simulation;
        } else {
          simulations.push(simulation);
        }
        
        // Save back to localStorage
        localStorage.setItem(localStorageKey, JSON.stringify(simulations));
        
        return simulation;
      }
    } catch (error) {
      console.error('Error saving simulation:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete simulation from local storage or Supabase
  const deleteSimulation = async (id: string): Promise<void> => {
    setLoading(true);
    
    try {
      if (user) {
        // Delete from Supabase
        const { error } = await supabase
          .from('simulations')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
        
        if (error) {
          throw error;
        }
      } else {
        // Delete from localStorage
        const localStorageKey = 'progineer-simulations';
        const storedSimulations = localStorage.getItem(localStorageKey);
        
        if (storedSimulations) {
          try {
            let simulations = JSON.parse(storedSimulations);
            simulations = simulations.filter((s: any) => s.id !== id);
            localStorage.setItem(localStorageKey, JSON.stringify(simulations));
          } catch (e) {
            console.error('Failed to parse simulations from localStorage', e);
          }
        }
      }
    } catch (error) {
      console.error('Error deleting simulation:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get a specific simulation by ID
  const getSimulation = async (id: string): Promise<Simulation | null> => {
    setLoading(true);
    
    try {
      if (user) {
        // Get from Supabase
        const { data, error } = await supabase
          .from('simulations')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data) {
          return null;
        }
        
        return {
          id: data.id,
          title: data.title,
          type: validateSimulationType(data.type),
          content: jsonToSimulationContent(data.content),
          is_temporary: data.is_temporary,
          created_at: data.created_at,
          updated_at: data.updated_at,
          user_id: data.user_id
        };
      } else {
        // Get from localStorage
        const localStorageKey = 'progineer-simulations';
        const storedSimulations = localStorage.getItem(localStorageKey);
        
        if (storedSimulations) {
          try {
            const simulations = JSON.parse(storedSimulations);
            const simulation = simulations.find((s: any) => s.id === id);
            
            if (simulation) {
              return {
                ...simulation,
                type: validateSimulationType(simulation.type),
                content: normalizeSimulationContent(simulation.content)
              };
            }
          } catch (e) {
            console.error('Failed to parse simulations from localStorage', e);
          }
        }
        
        return null;
      }
    } catch (error) {
      console.error('Error getting simulation:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    saveSimulation,
    loadSimulations,
    deleteSimulation,
    getSimulation
  };
};
