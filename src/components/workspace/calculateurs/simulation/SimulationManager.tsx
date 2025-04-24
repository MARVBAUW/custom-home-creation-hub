
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Plus, Download, Save, Trash, FileText } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useSimulationStorage } from './useSimulationStorage';
import { Simulation, SimulationType, simulationContentToJson, normalizeSimulationContent } from './SimulationTypes';
import { generateStandardPDF } from '@/utils/pdfUtils';

const SimulationManager = () => {
  const { toast } = useToast();
  const { loading, loadSimulations, saveSimulation, deleteSimulation } = useSimulationStorage();
  const [activeTab, setActiveTab] = useState("all");
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newSimulationTitle, setNewSimulationTitle] = useState("");
  const [newSimulationType, setNewSimulationType] = useState<SimulationType>("calculator");
  const [newSimulationData, setNewSimulationData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSimulations = async () => {
      const loadedSimulations = await loadSimulations();
      setSimulations(loadedSimulations);
    };

    fetchSimulations();
  }, []);

  const handleSaveSimulation = async () => {
    if (!newSimulationTitle.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer un titre pour cette simulation',
        variant: 'destructive',
      });
      return;
    }

    try {
      let parsedData = {};
      try {
        parsedData = JSON.parse(newSimulationData);
      } catch (e) {
        parsedData = newSimulationData;
      }

      const newSimulation: Simulation = {
        title: newSimulationTitle,
        type: newSimulationType,
        content: normalizeSimulationContent(parsedData),
        is_temporary: false
      };

      const savedSimulation = await saveSimulation(newSimulation);
      setSimulations([savedSimulation, ...simulations]);
      setShowSaveDialog(false);
      setNewSimulationTitle("");
      setNewSimulationData("");

      toast({
        title: 'Simulation enregistrée',
        description: 'Votre simulation a été sauvegardée avec succès',
      });
    } catch (error) {
      console.error('Error saving simulation:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la sauvegarde',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSimulation = async (id: string) => {
    try {
      await deleteSimulation(id);
      setSimulations(simulations.filter(sim => sim.id !== id));
      toast({
        title: 'Simulation supprimée',
        description: 'Votre simulation a été supprimée avec succès',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la suppression',
        variant: 'destructive',
      });
    }
  };

  const handleExportPDF = (simulation: Simulation) => {
    try {
      const { data, results } = simulation.content;
      
      const pdf = generateStandardPDF(
        simulation.title,
        data || {},
        results || {},
        {
          includeDetails: true,
          includeBreakdown: true,
          includeLogo: true,
          includeContactInfo: true
        }
      );

      // Save the PDF with a meaningful name derived from the simulation title
      const fileName = `simulation-${simulation.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      pdf.save(fileName);

      toast({
        title: 'Export réussi',
        description: `Votre simulation a été exportée au format PDF`,
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: 'Erreur d\'export',
        description: 'Une erreur est survenue lors de l\'export PDF',
        variant: 'destructive',
      });
    }
  };

  const getSimulationTypeLabel = (type: SimulationType) => {
    const typeLabels: Record<SimulationType, string> = {
      calculator: 'Calculateur',
      simulation: 'Simulation',
      note: 'Note',
      rentability: 'Rentabilité',
      surface: 'Surface',
      'frais-notaire': 'Frais de notaire',
      'capacite-emprunt': 'Capacité d\'emprunt',
      acoustic: 'Acoustique',
      dpe: 'DPE',
      thermal: 'Thermique'
    };
    
    return typeLabels[type] || type;
  };

  const filteredSimulations = simulations.filter(sim => {
    const matchesSearch = searchTerm === '' || sim.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeTab === 'all' || sim.type === activeTab;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Mes simulations sauvegardées
          </h3>
          <p className="text-sm text-gray-500">
            Retrouvez et gérez vos simulations et calculs précédemment effectués
          </p>
        </div>
        <Button onClick={() => setShowSaveDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle simulation
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow">
          <Input
            placeholder="Rechercher une simulation..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full md:w-auto"
        >
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="frais-notaire">Notaire</TabsTrigger>
            <TabsTrigger value="surface">Surface</TabsTrigger>
            <TabsTrigger value="capacite-emprunt">Emprunt</TabsTrigger>
            <TabsTrigger value="rentability">Rentabilité</TabsTrigger>
            <TabsTrigger value="dpe">DPE</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin h-8 w-8 rounded-full border-t-2 border-khaki-600"></div>
        </div>
      ) : filteredSimulations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSimulations.map((simulation) => (
            <Card key={simulation.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-md truncate pr-4">{simulation.title}</CardTitle>
                  <div className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                    {getSimulationTypeLabel(simulation.type)}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {simulation.updated_at && formatDistanceToNow(new Date(simulation.updated_at), {
                    addSuffix: true,
                    locale: fr
                  })}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportPDF(simulation)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteSimulation(simulation.id!)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
          <FileText className="h-12 w-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-lg font-medium mb-1">Aucune simulation</h3>
          <p className="text-sm text-gray-500 mb-4">
            {searchTerm ? 
              "Aucune simulation ne correspond à votre recherche." : 
              "Vous n'avez pas encore de simulations sauvegardées."}
          </p>
          <Button onClick={() => setShowSaveDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une simulation
          </Button>
        </div>
      )}

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle simulation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input 
                id="title" 
                value={newSimulationTitle} 
                onChange={(e) => setNewSimulationTitle(e.target.value)} 
                placeholder="Titre de la simulation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select 
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={newSimulationType}
                onChange={(e) => setNewSimulationType(e.target.value as SimulationType)}
              >
                <option value="calculator">Calculateur</option>
                <option value="simulation">Simulation</option>
                <option value="note">Note</option>
                <option value="rentability">Rentabilité</option>
                <option value="surface">Surface</option>
                <option value="frais-notaire">Frais de notaire</option>
                <option value="capacite-emprunt">Capacité d'emprunt</option>
                <option value="acoustic">Acoustique</option>
                <option value="dpe">DPE</option>
                <option value="thermal">Thermique</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="data">Données (JSON)</Label>
              <textarea 
                id="data"
                value={newSimulationData}
                onChange={(e) => setNewSimulationData(e.target.value)}
                rows={5}
                placeholder="{ ... }"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveSimulation}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SimulationManager;
