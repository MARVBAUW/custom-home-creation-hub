import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Save, Download, Trash2, Loader2, FileText, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Modification du type Simulation pour permettre un type string qui sera validé
interface Simulation {
  id?: string;
  title: string;
  type: 'calculator' | 'simulation' | 'note' | string; // Ajout de string pour la compatibilité
  content: any;
  created_at?: string;
  updated_at?: string;
  is_temporary: boolean;
}

// Fonction pour valider et convertir le type
const validateSimulationType = (type: string): 'calculator' | 'simulation' | 'note' => {
  if (type === 'calculator' || type === 'simulation' || type === 'note') {
    return type as 'calculator' | 'simulation' | 'note';
  }
  // Valeur par défaut si le type n'est pas reconnu
  return 'calculator';
};

const SimulationManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentSimulation, setCurrentSimulation] = useState<Simulation>({
    title: 'Nouvelle simulation',
    type: 'calculator',
    content: { data: {} },
    is_temporary: true
  });
  const [editingTitle, setEditingTitle] = useState(false);

  // Charger les simulations de l'utilisateur
  useEffect(() => {
    if (user) {
      loadSimulations();
    } else {
      // Si pas d'utilisateur, charger depuis localStorage
      const savedSimulations = localStorage.getItem('temporarySimulations');
      if (savedSimulations) {
        setSimulations(JSON.parse(savedSimulations));
      }
    }
  }, [user]);

  const loadSimulations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_simulations')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Validation des types pour assurer la compatibilité
      const validatedData: Simulation[] = data?.map(item => ({
        ...item,
        type: validateSimulationType(item.type)
      })) || [];
      
      setSimulations(validatedData);
      
      // S'il y a des simulations, définir la première comme courante
      if (validatedData.length > 0) {
        setCurrentSimulation(validatedData[0]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des simulations:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger vos simulations.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSimulation = async () => {
    setSaving(true);
    try {
      // Assurer que le type est valide avant sauvegarde
      const simulationToSave = {
        ...currentSimulation,
        // Valider le type pour être sûr qu'il est conforme
        type: validateSimulationType(currentSimulation.type),
        updated_at: new Date().toISOString()
      };
      
      if (user) {
        // Si connecté, sauvegarder dans Supabase
        if (currentSimulation.id) {
          // Mise à jour
          const { error } = await supabase
            .from('user_simulations')
            .update({
              title: simulationToSave.title,
              content: simulationToSave.content,
              is_temporary: simulationToSave.is_temporary,
              updated_at: simulationToSave.updated_at,
              type: simulationToSave.type // Assurer que le type est bien sauvegardé
            })
            .eq('id', currentSimulation.id);
          
          if (error) throw error;
          
          // Mettre à jour la liste locale
          setSimulations(simulations.map(sim => 
            sim.id === currentSimulation.id ? simulationToSave : sim
          ));
        } else {
          // Nouvelle simulation
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
          
          // Ajouter à la liste locale avec l'ID généré
          if (data && data.length > 0) {
            const newSim = {
              ...data[0],
              type: validateSimulationType(data[0].type)
            };
            
            setCurrentSimulation(newSim);
            setSimulations([newSim, ...simulations]);
          }
        }
      } else {
        // Si non connecté, sauvegarder dans localStorage
        const tempId = currentSimulation.id || `temp-${Date.now()}`;
        const newSim = { ...simulationToSave, id: tempId };
        
        // Mettre à jour la simulation actuelle
        setCurrentSimulation(newSim);
        
        // Mettre à jour la liste
        const updatedSimulations = currentSimulation.id 
          ? simulations.map(sim => sim.id === currentSimulation.id ? newSim : sim)
          : [newSim, ...simulations];
        
        setSimulations(updatedSimulations);
        localStorage.setItem('temporarySimulations', JSON.stringify(updatedSimulations));
      }
      
      toast({
        title: 'Sauvegarde réussie',
        description: 'Votre simulation a été enregistrée avec succès.'
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder votre simulation.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const createNewSimulation = (type: 'calculator' | 'simulation' | 'note') => {
    setCurrentSimulation({
      title: `Nouveau ${type === 'calculator' ? 'calculateur' : type === 'simulation' ? 'simulation' : 'note'}`,
      type,
      content: { data: {} },
      is_temporary: true
    });
  };

  const selectSimulation = (sim: Simulation) => {
    setCurrentSimulation(sim);
  };

  const deleteSimulation = async (id: string) => {
    try {
      if (user && id.toString().indexOf('temp-') !== 0) {
        // Supprimer de Supabase
        const { error } = await supabase
          .from('user_simulations')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
      }
      
      // Supprimer localement
      const updatedSimulations = simulations.filter(sim => sim.id !== id);
      setSimulations(updatedSimulations);
      
      // Mettre à jour localStorage si nécessaire
      if (!user) {
        localStorage.setItem('temporarySimulations', JSON.stringify(updatedSimulations));
      }
      
      // Si c'était la simulation courante, en définir une nouvelle
      if (currentSimulation.id === id) {
        if (updatedSimulations.length > 0) {
          setCurrentSimulation(updatedSimulations[0]);
        } else {
          createNewSimulation('calculator');
        }
      }
      
      toast({
        title: 'Suppression réussie',
        description: 'La simulation a été supprimée.'
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer cette simulation.',
        variant: 'destructive',
      });
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Titre
      doc.setFontSize(20);
      doc.text('Progineer - Simulation', 105, 15, { align: 'center' });
      
      // Infos de la simulation
      doc.setFontSize(14);
      doc.text(`Titre: ${currentSimulation.title}`, 14, 30);
      doc.text(`Type: ${
        currentSimulation.type === 'calculator' ? 'Calculateur' : 
        currentSimulation.type === 'simulation' ? 'Simulation' : 'Note'
      }`, 14, 40);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 50);
      
      // Contenu
      doc.setFontSize(12);
      doc.text('Détails:', 14, 65);
      
      // Tableau de données
      const content = currentSimulation.content;
      if (content && typeof content === 'object') {
        const tableData = [];
        
        // Convertir l'objet en tableau pour jspdf-autotable
        for (const [key, value] of Object.entries(content.data || {})) {
          tableData.push([key, value]);
        }
        
        if (tableData.length > 0) {
          doc.autoTable({
            startY: 70,
            head: [['Paramètre', 'Valeur']],
            body: tableData,
          });
        } else {
          doc.text('Aucune donnée disponible.', 14, 75);
        }
      }
      
      // Pied de page
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text('Progineer - www.progineer.fr', 105, 285, { align: 'center' });
        doc.text(`Page ${i} / ${pageCount}`, 195, 285, { align: 'right' });
      }
      
      // Sauvegarder le PDF
      doc.save(`progineer-${currentSimulation.title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      
      toast({
        title: 'Export réussi',
        description: 'Votre simulation a été exportée en PDF.'
      });
    } catch (error) {
      console.error('Erreur lors de l\'export en PDF:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'exporter en PDF.',
        variant: 'destructive',
      });
    }
  };

  const toggleTemporary = async () => {
    if (!user) {
      toast({
        title: 'Connexion requise',
        description: 'Vous devez vous connecter pour enregistrer définitivement une simulation.',
        variant: 'destructive',
      });
      return;
    }
    
    // Basculer entre temporaire et permanent
    const updatedSim = {
      ...currentSimulation,
      is_temporary: !currentSimulation.is_temporary
    };
    
    setCurrentSimulation(updatedSim);
    
    // Sauvegarder immédiatement
    await saveSimulation();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSimulation({
      ...currentSimulation,
      title: e.target.value
    });
  };

  const handleContentChange = (newContent: any) => {
    setCurrentSimulation({
      ...currentSimulation,
      content: {
        ...currentSimulation.content,
        data: newContent
      }
    });
  };

  // Rendu basé sur le type de simulation
  const renderSimulationContent = () => {
    switch (currentSimulation.type) {
      case 'calculator':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parameter1">Paramètre 1</Label>
                <Input 
                  id="parameter1" 
                  type="number"
                  value={currentSimulation.content.data.parameter1 || ''}
                  onChange={(e) => handleContentChange({
                    ...currentSimulation.content.data,
                    parameter1: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="parameter2">Paramètre 2</Label>
                <Input 
                  id="parameter2" 
                  type="number"
                  value={currentSimulation.content.data.parameter2 || ''}
                  onChange={(e) => handleContentChange({
                    ...currentSimulation.content.data,
                    parameter2: e.target.value
                  })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="result">Résultat</Label>
              <Input 
                id="result" 
                readOnly
                value={
                  currentSimulation.content.data.parameter1 && 
                  currentSimulation.content.data.parameter2 
                    ? parseFloat(currentSimulation.content.data.parameter1) * parseFloat(currentSimulation.content.data.parameter2)
                    : ''
                }
              />
            </div>
          </div>
        );
      
      case 'note':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="noteContent">Contenu de la note</Label>
              <textarea
                id="noteContent"
                className="w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-khaki-500"
                value={currentSimulation.content.data.text || ''}
                onChange={(e) => handleContentChange({
                  ...currentSimulation.content.data,
                  text: e.target.value
                })}
                placeholder="Écrivez vos notes ici..."
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <p className="text-gray-500">
              Contenu non disponible pour ce type de simulation.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mes calculs et simulations</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => createNewSimulation('calculator')} 
            variant="outline" 
            size="sm"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Nouveau calcul
          </Button>
          <Button 
            onClick={() => createNewSimulation('note')}
            variant="outline" 
            size="sm"
          >
            <FileText className="h-4 w-4 mr-2" />
            Nouvelle note
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des simulations */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Mes documents</CardTitle>
              <CardDescription>
                {user ? 'Documents enregistrés dans votre compte' : 'Documents temporaires (non connecté)'}
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-khaki-600" />
                </div>
              ) : simulations.length > 0 ? (
                <div className="space-y-2">
                  {simulations.map((sim) => (
                    <div 
                      key={sim.id} 
                      className={`p-3 rounded-md cursor-pointer flex justify-between items-center hover:bg-gray-100 ${
                        currentSimulation.id === sim.id ? 'bg-khaki-100 border border-khaki-200' : 'bg-white border border-gray-200'
                      }`}
                      onClick={() => selectSimulation(sim)}
                    >
                      <div>
                        <div className="font-medium text-gray-900 truncate max-w-[150px]">
                          {sim.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(sim.updated_at || Date.now()).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant={sim.is_temporary ? "outline" : "default"} className="mr-2">
                          {sim.is_temporary ? 'Temp' : 'Sauvé'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSimulation(sim.id!);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  Aucun document. Créez votre premier document en cliquant sur les boutons ci-dessus.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Détails de la simulation */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center mb-2">
                {editingTitle ? (
                  <Input
                    value={currentSimulation.title}
                    onChange={handleTitleChange}
                    className="text-xl font-semibold"
                    onBlur={() => setEditingTitle(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setEditingTitle(false);
                    }}
                    autoFocus
                  />
                ) : (
                  <CardTitle 
                    className="cursor-pointer hover:text-khaki-700"
                    onClick={() => setEditingTitle(true)}
                  >
                    {currentSimulation.title}
                  </CardTitle>
                )}
                <Badge variant={currentSimulation.is_temporary ? "outline" : "default"}>
                  {currentSimulation.is_temporary ? 'Temporaire' : 'Enregistré'}
                </Badge>
              </div>
              <CardDescription>
                {currentSimulation.type === 'calculator' ? 'Calculateur' : 
                 currentSimulation.type === 'simulation' ? 'Simulation' : 'Note'}
                {currentSimulation.updated_at && ` • Mis à jour le ${new Date(currentSimulation.updated_at).toLocaleDateString()}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              {renderSimulationContent()}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div>
                <Button
                  variant="outline"
                  onClick={toggleTemporary}
                  disabled={!user}
                >
                  {currentSimulation.is_temporary ? 'Enregistrer définitivement' : 'Marquer comme temporaire'}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={exportToPDF}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter PDF
                </Button>
                <Button 
                  onClick={saveSimulation} 
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SimulationManager;
