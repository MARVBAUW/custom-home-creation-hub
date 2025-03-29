
import React from 'react';
import { FormData } from './types';
import DetailedEstimationReport from './DetailedEstimationReport';

interface CategoryAmount {
  category: string;
  amount: number;
  details?: string;
}

interface EstimationSummaryReportProps {
  formData: FormData;
  estimationResult: number | null;
  categoriesAmounts: CategoryAmount[];
}

const EstimationSummaryReport: React.FC<EstimationSummaryReportProps> = ({
  formData,
  estimationResult,
  categoriesAmounts
}) => {
  // Helper function to parse values to numbers
  const parseToNumber = (value: any): number => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Parse landPrice to number
  const landPriceValue = parseToNumber(formData.landPrice);
  
  // Transform data to match DetailedEstimationReport props
  const estimationData = {
    totalHT: estimationResult || 0,
    totalTTC: (estimationResult || 0) * 1.2, // Assuming 20% VAT
    terrassement: categoriesAmounts.find(cat => cat.category === 'Terrassement')?.amount || 0,
    fondations: categoriesAmounts.find(cat => cat.category === 'Fondations')?.amount || 0,
    elevationMurs: categoriesAmounts.find(cat => cat.category === 'Élévation des murs')?.amount || 0,
    charpente: categoriesAmounts.find(cat => cat.category === 'Charpente')?.amount || 0,
    couverture: categoriesAmounts.find(cat => cat.category === 'Couverture')?.amount || 0,
    menuiseriesExterieures: categoriesAmounts.find(cat => cat.category === 'Menuiseries extérieures')?.amount || 0,
    isolation: categoriesAmounts.find(cat => cat.category === 'Isolation')?.amount || 0,
    plomberie: categoriesAmounts.find(cat => cat.category === 'Plomberie')?.amount || 0,
    electricite: categoriesAmounts.find(cat => cat.category === 'Électricité')?.amount || 0,
    chauffage: categoriesAmounts.find(cat => cat.category === 'Chauffage')?.amount || 0,
    revetementSol: categoriesAmounts.find(cat => cat.category === 'Revêtements de sol')?.amount || 0,
    revetementMural: categoriesAmounts.find(cat => cat.category === 'Revêtements muraux')?.amount || 0,
    peinture: categoriesAmounts.find(cat => cat.category === 'Peinture')?.amount || 0,
    amenagementsExterieurs: categoriesAmounts.find(cat => cat.category === 'Aménagements extérieurs')?.amount || 0,
    fraisAnnexes: categoriesAmounts.find(cat => cat.category === 'Frais annexes')?.amount || 0,
    honorairesArchitecte: categoriesAmounts.find(cat => cat.category === 'Honoraires architecte')?.amount || 0,
    taxeAmenagement: categoriesAmounts.find(cat => cat.category === 'Taxe aménagement')?.amount || 0,
    etudesGeotechniques: categoriesAmounts.find(cat => cat.category === 'Études géotechniques')?.amount || 0,
    etudeThermique: categoriesAmounts.find(cat => cat.category === 'Étude thermique')?.amount || 0,
    garantieDecennale: categoriesAmounts.find(cat => cat.category === 'Garantie décennale')?.amount || 0,
    fraisNotaire: landPriceValue ? landPriceValue * 0.08 : 0,
    coutTotalAvecTerrain: (estimationResult || 0) * 1.2 + landPriceValue + (landPriceValue ? landPriceValue * 0.08 : 0)
  };

  return (
    <DetailedEstimationReport
      formData={formData}
      estimation={estimationData}
      includeTerrainPrice={!!landPriceValue}
    />
  );
};

export default EstimationSummaryReport;
