
import { useState, useEffect } from 'react';
import { Simulation, SimulationStorage } from './SimulationTypes';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useSimulationStorage = (): SimulationStorage & { 
  loading: boolean;
  simulations: Simulation[];
} => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(false);

  // Load simulations on component mount
  useEffect(() => {
    loadSimulations();
  }, [user]);

  // Load simulations for the current user
  const loadSimulations = async (): Promise<Simulation[]> => {
    setLoading(true);
    try {
      let loadedSimulations: Simulation[] = [];
      
      if (user) {
        // If user is logged in, load from Supabase
        const { data, error } = await supabase
          .from('user_simulations')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        loadedSimulations = data || [];
      } else {
        // If user is not logged in, try to load from localStorage
        const savedSimulations = localStorage.getItem('temporarySimulations');
        if (savedSimulations) {
          loadedSimulations = JSON.parse(savedSimulations);
        }
      }
      
      setSimulations(loadedSimulations);
      return loadedSimulations;
    } catch (error) {
      console.error('Error loading simulations:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger vos simulations.',
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Save a simulation
  const saveSimulation = async (simulation: Simulation): Promise<Simulation> => {
    try {
      const simulationToSave = {
        ...simulation,
        updated_at: new Date().toISOString()
      };
      
      if (user) {
        // If user is logged in, save to Supabase
        if (simulation.id && !simulation.id.toString().startsWith('temp-')) {
          // Update existing simulation
          const { error } = await supabase
            .from('user_simulations')
            .update({
              title: simulationToSave.title,
              content: simulationToSave.content,
              is_temporary: simulationToSave.is_temporary,
              updated_at: simulationToSave.updated_at,
              type: simulationToSave.type
            })
            .eq('id', simulation.id);
          
          if (error) throw error;
        } else {
          // Create new simulation
          const { data, error } = await supabase
            .from('user_simulations')
            .insert({
              title: simulationToSave.title,
              type: simulationToSave.type,
              content: simulationToSave.content,
              user_id: user.id,
              is_temporary: simulationToSave.is_temporary
            })
            .select();
          
          if (error) throw error;
          
          if (data && data.length > 0) {
            simulationToSave.id = data[0].id;
          }
        }
      } else {
        // If user is not logged in, save to localStorage
        const tempId = simulation.id || `temp-${Date.now()}`;
        simulationToSave.id = tempId;
        
        let localSimulations: Simulation[] = [];
        const savedSimulations = localStorage.getItem('temporarySimulations');
        
        if (savedSimulations) {
          localSimulations = JSON.parse(savedSimulations);
          
          // Update or add simulation
          const index = localSimulations.findIndex(s => s.id === tempId);
          if (index >= 0) {
            localSimulations[index] = simulationToSave;
          } else {
            localSimulations.push(simulationToSave);
          }
        } else {
          localSimulations = [simulationToSave];
        }
        
        localStorage.setItem('temporarySimulations', JSON.stringify(localSimulations));
      }
      
      // Reload simulations to update the state
      await loadSimulations();
      
      return simulationToSave;
    } catch (error) {
      console.error('Error saving simulation:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder votre simulation.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Delete a simulation
  const deleteSimulation = async (id: string): Promise<void> => {
    try {
      if (user && !id.toString().startsWith('temp-')) {
        // If user is logged in and it's not a temporary simulation, delete from Supabase
        const { error } = await supabase
          .from('user_simulations')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
      } else {
        // If user is not logged in or it's a temporary simulation, delete from localStorage
        const savedSimulations = localStorage.getItem('temporarySimulations');
        if (savedSimulations) {
          const localSimulations = JSON.parse(savedSimulations);
          const filteredSimulations = localSimulations.filter((s: Simulation) => s.id !== id);
          localStorage.setItem('temporarySimulations', JSON.stringify(filteredSimulations));
        }
      }
      
      // Update state
      setSimulations(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting simulation:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer cette simulation.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Get a specific simulation
  const getSimulation = async (id: string): Promise<Simulation | null> => {
    try {
      if (user && !id.toString().startsWith('temp-')) {
        // If user is logged in and it's not a temporary simulation, get from Supabase
        const { data, error } = await supabase
          .from('user_simulations')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // If user is not logged in or it's a temporary simulation, get from localStorage
        const savedSimulations = localStorage.getItem('temporarySimulations');
        if (savedSimulations) {
          const localSimulations = JSON.parse(savedSimulations);
          return localSimulations.find((s: Simulation) => s.id === id) || null;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error getting simulation:', error);
      return null;
    }
  };

  return {
    saveSimulation,
    loadSimulations,
    deleteSimulation,
    getSimulation,
    loading,
    simulations
  };
};
