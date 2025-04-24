import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Calculator, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import SimulationList from './SimulationList';
import SimulationDetail from './SimulationDetail';
import { Simulation, validateSimulationType, normalizeSimulationContent } from './SimulationTypes';

const SimulationManager: React.FC = () => {
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

  // Charger les simulations de l'utilisateur
  useEffect(() => {
    if (user) {
      loadSimulations();
    } else {
      // Si pas d'utilisateur, charger depuis localStorage
      const savedSimulations = localStorage.getItem('temporarySimulations');
      if (savedSimulations) {
        try {
          const parsed = JSON.parse(savedSimulations);
          const normalized = parsed.map((item: any) => ({
            ...item,
            type: validateSimulationType(item.type),
            content: normalizeSimulationContent(item.content)
          }));
          setSimulations(normalized);
        } catch (e) {
          console.error('Error parsing simulations from localStorage:', e);
        }
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
        type: validateSimulationType(item.type),
        content: normalizeSimulationContent(item.content)
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
              type: simulationToSave.type
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
            const newSim: Simulation = {
              ...data[0],
              type: validateSimulationType(data[0].type),
              content: normalizeSimulationContent(data[0].content)
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

  const handleTitleChange = (title: string) => {
    setCurrentSimulation({
      ...currentSimulation,
      title
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
          <SimulationList 
            simulations={simulations}
            loading={loading}
            currentSimulationId={currentSimulation.id}
            onSimulationSelect={selectSimulation}
            onSimulationDelete={deleteSimulation}
          />
        </div>

        {/* Détails de la simulation */}
        <div className="lg:col-span-2">
          <SimulationDetail 
            simulation={currentSimulation}
            saving={saving}
            isUserLoggedIn={!!user}
            onTitleChange={handleTitleChange}
            onContentChange={handleContentChange}
            onSave={saveSimulation}
            onExportPDF={exportToPDF}
            onToggleTemporary={toggleTemporary}
          />
        </div>
      </div>
    </div>
  );
};

export default SimulationManager;
