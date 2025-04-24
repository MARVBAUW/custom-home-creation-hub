
import React from 'react';
import { Button } from "@/components/ui/button";
import EstimationReport from './EstimationReport';
import { EstimationFormData, FormData } from './types/formTypes';

interface ResultsSummaryProps {
  showSummary: boolean;
  estimationResult: number;
  formData: EstimationFormData | FormData;
  onBackClick: () => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ 
  showSummary, 
  estimationResult, 
  formData, 
  onBackClick 
}) => {
  if (!showSummary) return null;

  return (
    <div className="mt-8">
      <EstimationReport
        estimation={{
          totalHT: estimationResult,
          totalTTC: estimationResult * 1.2,
          vat: estimationResult * 0.2,
          corpsEtat: {
            "Gros oeuvre": { montantHT: estimationResult * 0.3, details: ['Fondations', 'Élévation'] },
            "Charpente": { montantHT: estimationResult * 0.15, details: ['Charpente traditionnelle'] },
            "Couverture": { montantHT: estimationResult * 0.1, details: ['Tuiles céramiques'] },
            "Menuiseries Extérieures": { montantHT: estimationResult * 0.1, details: ['PVC double vitrage'] },
            "Second oeuvre": { montantHT: estimationResult * 0.35, details: ['Plomberie', 'Électricité', 'Isolation', 'Plâtrerie', 'Peinture'] }
          },
          honorairesHT: estimationResult * 0.12,
          coutGlobalHT: estimationResult * 1.12,
          coutGlobalTTC: estimationResult * 1.12 * 1.2,
          taxeAmenagement: estimationResult * 0.05,
          garantieDecennale: estimationResult * 0.01,
          etudesGeotechniques: estimationResult * 0.005,
          etudeThermique: estimationResult * 0.005
        }}
        formData={formData}
      />
      <div className="flex justify-center mt-6">
        <Button onClick={onBackClick}>
          Retour à l'estimation
        </Button>
      </div>
    </div>
  );
};

export default ResultsSummary;
