
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash, Calendar, ArrowUpDown, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DatePicker } from "@/components/ui/date-picker";

interface ProjectPhase {
  id?: string;
  project_id: string;
  title: string;
  start_date: string | null;
  end_date: string | null;
  completed: boolean;
  order_index: number;
  color: string;
  notes: string | null;
}

interface ProjectPhasesProps {
  projectId: string;
}

const ProjectPhases: React.FC<ProjectPhasesProps> = ({ projectId }) => {
  const { toast } = useToast();
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadPhases();
    }
  }, [projectId]);

  const loadPhases = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_phases')
        .select('*')
        .eq('project_id', projectId)
        .order('order_index', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setPhases(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des phases:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les phases du projet.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addPhase = () => {
    const newPhase: ProjectPhase = {
      project_id: projectId,
      title: 'Nouvelle phase',
      start_date: null,
      end_date: null,
      completed: false,
      order_index: phases.length,
      color: '#' + Math.floor(Math.random()*16777215).toString(16), // Random color
      notes: null
    };
    
    setPhases([...phases, newPhase]);
  };

  const removePhase = async (index: number) => {
    const phaseToRemove = phases[index];
    
    // Si la phase a un ID (déjà enregistrée en BD)
    if (phaseToRemove.id) {
      try {
        const { error } = await supabase
          .from('project_phases')
          .delete()
          .eq('id', phaseToRemove.id);
        
        if (error) throw error;
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de supprimer cette phase.',
          variant: 'destructive',
        });
        return;
      }
    }
    
    // Supprimer de l'état local
    const updatedPhases = phases.filter((_, i) => i !== index);
    
    // Réindexer les phases
    const reindexedPhases = updatedPhases.map((phase, i) => ({
      ...phase,
      order_index: i
    }));
    
    setPhases(reindexedPhases);
    
    toast({
      title: 'Phase supprimée',
      description: 'La phase a été supprimée avec succès.'
    });
  };

  const movePhase = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === phases.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newPhases = [...phases];
    
    // Échanger les phases
    [newPhases[index], newPhases[newIndex]] = [newPhases[newIndex], newPhases[index]];
    
    // Mettre à jour les indices d'ordre
    const updatedPhases = newPhases.map((phase, i) => ({
      ...phase,
      order_index: i
    }));
    
    setPhases(updatedPhases);
  };

  const updatePhase = (index: number, field: keyof ProjectPhase, value: any) => {
    const updatedPhases = phases.map((phase, i) => {
      if (i === index) {
        return { ...phase, [field]: value };
      }
      return phase;
    });
    
    setPhases(updatedPhases);
  };

  const savePhases = async () => {
    setSaving(true);
    try {
      // Phases à créer (sans ID)
      const phasesToCreate = phases.filter(phase => !phase.id);
      
      // Phases à mettre à jour (avec ID)
      const phasesToUpdate = phases.filter(phase => phase.id);
      
      // Créer les nouvelles phases
      if (phasesToCreate.length > 0) {
        const { error: insertError } = await supabase
          .from('project_phases')
          .insert(phasesToCreate);
        
        if (insertError) throw insertError;
      }
      
      // Mettre à jour les phases existantes
      for (const phase of phasesToUpdate) {
        const { error: updateError } = await supabase
          .from('project_phases')
          .update({
            title: phase.title,
            start_date: phase.start_date,
            end_date: phase.end_date,
            completed: phase.completed,
            order_index: phase.order_index,
            color: phase.color,
            notes: phase.notes
          })
          .eq('id', phase.id);
        
        if (updateError) throw updateError;
      }
      
      toast({
        title: 'Phases enregistrées',
        description: 'Les phases du projet ont été enregistrées avec succès.'
      });
      
      // Recharger les phases pour obtenir les IDs générés
      await loadPhases();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des phases:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'enregistrer les phases du projet.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-khaki-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Phases du projet</CardTitle>
        <Button onClick={addPhase} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une phase
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {phases.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune phase définie pour ce projet. Ajoutez une phase en cliquant sur le bouton ci-dessus.
            </div>
          ) : (
            <>
              {phases.map((phase, index) => (
                <div 
                  key={index}
                  className="border rounded-md p-4 relative"
                  style={{ borderLeftWidth: '4px', borderLeftColor: phase.color }}
                >
                  <div className="absolute right-2 top-2 flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => movePhase(index, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUpDown className="h-4 w-4 rotate-90" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => movePhase(index, 'down')}
                      disabled={index === phases.length - 1}
                    >
                      <ArrowUpDown className="h-4 w-4 -rotate-90" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removePhase(index)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="col-span-1 md:col-span-3">
                      <Label htmlFor={`phase-title-${index}`}>Titre</Label>
                      <Input
                        id={`phase-title-${index}`}
                        value={phase.title}
                        onChange={(e) => updatePhase(index, 'title', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`phase-start-${index}`}>Date de début</Label>
                      <div className="flex items-center">
                        <DatePicker
                          date={phase.start_date ? new Date(phase.start_date) : undefined}
                          setDate={(date) => updatePhase(index, 'start_date', date?.toISOString() || null)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`phase-end-${index}`}>Date de fin</Label>
                      <div className="flex items-center">
                        <DatePicker
                          date={phase.end_date ? new Date(phase.end_date) : undefined}
                          setDate={(date) => updatePhase(index, 'end_date', date?.toISOString() || null)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`phase-color-${index}`}>Couleur</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id={`phase-color-${index}`}
                          type="color"
                          value={phase.color}
                          className="w-12 h-10 p-1"
                          onChange={(e) => updatePhase(index, 'color', e.target.value)}
                        />
                        <div 
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: phase.color }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`phase-notes-${index}`}>Notes</Label>
                    <textarea
                      id={`phase-notes-${index}`}
                      className="w-full h-20 p-2 border rounded-md"
                      value={phase.notes || ''}
                      onChange={(e) => updatePhase(index, 'notes', e.target.value)}
                      placeholder="Notes additionnelles sur cette phase..."
                    />
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    <input
                      type="checkbox"
                      id={`phase-completed-${index}`}
                      checked={phase.completed}
                      onChange={(e) => updatePhase(index, 'completed', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor={`phase-completed-${index}`} className="ml-2">
                      Phase terminée
                    </Label>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end mt-6">
                <Button onClick={savePhases} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer les phases
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectPhases;
