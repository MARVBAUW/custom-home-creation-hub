
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { useSimulationStorage } from '@/components/workspace/calculateurs/simulation/useSimulationStorage';
import { Simulation, SimulationType } from '@/components/workspace/calculateurs/simulation/SimulationTypes';
import { useToast } from './use-toast';
import { generateStandardPDF } from '@/utils/pdfUtils';
import { PDFExportOptions } from '@/components/common/PDFExporter';
import { useAuth } from './useAuth';

interface UseSimulationExportProps {
  type: SimulationType;
  title: string;
  data: any;
  results: any;
}

export const useSimulationExport = ({ type, title, data, results }: UseSimulationExportProps) => {
  const { saveSimulation } = useSimulationStorage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSaveSimulation = async () => {
    setSaving(true);
    try {
      const simulation: Simulation = {
        title,
        type,
        content: {
          data,
          results
        },
        is_temporary: !user
      };

      await saveSimulation(simulation);
      
      toast({
        title: 'Sauvegarde réussie',
        description: user 
          ? 'Votre simulation a été sauvegardée dans votre compte.' 
          : 'Votre simulation a été sauvegardée localement. Créez un compte pour la sauvegarder définitivement.'
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

  const generatePDF = (options: PDFExportOptions = {}) => {
    return generateStandardPDF(
      title,
      data,
      results,
      options
    );
  };
  
  const downloadPDF = (options: PDFExportOptions = {}) => {
    const pdf = generatePDF(options);
    pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  };

  return {
    saveSimulation: handleSaveSimulation,
    generatePDF,
    downloadPDF,
    saving
  };
};
