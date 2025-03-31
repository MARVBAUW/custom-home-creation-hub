
import { FormData, EstimationResponseData } from './types';

/**
 * Generate an estimation report text for email or other text-based formats
 */
export const generateEstimationReport = (formData: FormData, estimation: EstimationResponseData): string => {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(num);
  };
  
  let report = `ESTIMATION DE PROJET - PROGINEER\n`;
  report += `Date: ${new Date().toLocaleDateString('fr-FR')}\n`;
  report += `Référence: EST-${Date.now().toString().slice(-6)}\n\n`;
  
  report += `DÉTAILS DU PROJET\n`;
  report += `Type de projet: ${formData.projectType || 'Non spécifié'}\n`;
  report += `Surface: ${formData.surface || 0} m²\n`;
  report += `Ville: ${formData.city || 'Non spécifié'}\n`;
  report += `Type de terrain: ${formData.landType || 'Non spécifié'}\n`;
  report += `Complexité: ${formData.complexity || 'Standard'}\n`;
  report += `Standard de qualité: ${formData.qualityStandard || 'Standard'}\n\n`;
  
  report += `ESTIMATION DES COÛTS\n`;
  report += `Gros œuvre: ${formatNumber(estimation.constructionCosts.structuralWork)}\n`;
  report += `Second œuvre: ${formatNumber(estimation.constructionCosts.finishingWork)}\n`;
  report += `Lots techniques: ${formatNumber(estimation.constructionCosts.technicalLots)}\n`;
  report += `Aménagements extérieurs: ${formatNumber(estimation.constructionCosts.externalWorks)}\n`;
  report += `Honoraires et études: ${formatNumber(estimation.fees.total)}\n`;
  report += `Autres frais: ${formatNumber(estimation.otherCosts.total)}\n`;
  report += `TOTAL GLOBAL: ${formatNumber(estimation.totalAmount)}\n\n`;
  
  report += `CALENDRIER PRÉVISIONNEL\n`;
  report += `Conception et études: ${estimation.timeline.design} mois\n`;
  report += `Autorisations administratives: ${estimation.timeline.permits} mois\n`;
  report += `Consultation des entreprises: ${estimation.timeline.bidding} mois\n`;
  report += `Travaux: ${estimation.timeline.construction} mois\n`;
  report += `DURÉE TOTALE: ${estimation.timeline.total} mois\n\n`;
  
  report += `Cette estimation est fournie à titre indicatif et peut varier selon les spécificités du projet.\n`;
  report += `Pour plus d'informations, n'hésitez pas à contacter Progineer au 04.XX.XX.XX.XX ou contact@progineer.fr\n`;
  
  return report;
};

/**
 * Calculate a sample estimation based on form data
 * This is a simplified version that creates sample data for testing
 */
export const calculateEstimation = (formData: FormData): EstimationResponseData => {
  // Base surface area cost in euros per square meter
  const baseCostPerSqm = formData.projectType === 'construction' ? 1500 :
                          formData.projectType === 'renovation' ? 1000 :
                          formData.projectType === 'extension' ? 1300 : 1200;
                          
  const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 100);
  
  // Complexity multiplier
  const complexityMultiplier = formData.complexity === 'simple' ? 0.9 :
                              formData.complexity === 'complex' ? 1.2 : 1.0;
                              
  // Quality standard multiplier
  const qualityMultiplier = formData.qualityStandard === 'economic' ? 0.85 :
                            formData.qualityStandard === 'premium' ? 1.3 : 1.0;
  
  // Calculate total construction cost
  const totalConstructionCost = surface * baseCostPerSqm * complexityMultiplier * qualityMultiplier;
  
  // Calculate cost breakdown for construction
  const structuralWork = totalConstructionCost * 0.4;
  const finishingWork = totalConstructionCost * 0.3;
  const technicalLots = totalConstructionCost * 0.2;
  const externalWorks = totalConstructionCost * 0.1;
  
  // Calculate professional fees
  const architectFee = totalConstructionCost * 0.08;
  const technicalStudies = totalConstructionCost * 0.03;
  const otherFees = totalConstructionCost * 0.02;
  
  // Calculate other costs
  const insurance = totalConstructionCost * 0.02;
  const taxes = totalConstructionCost * 0.03;
  const contingency = totalConstructionCost * 0.05;
  
  // Calculate project timeline in months
  const designMonths = Math.max(2, Math.ceil(surface / 100));
  const permitsMonths = formData.projectType === 'renovation' ? 2 : 4;
  const biddingMonths = 2;
  const constructionMonths = Math.max(3, Math.ceil(totalConstructionCost / 100000));
  
  // Create and return the estimation result
  return {
    constructionCosts: {
      structuralWork,
      finishingWork,
      technicalLots,
      externalWorks,
      total: structuralWork + finishingWork + technicalLots + externalWorks
    },
    fees: {
      architect: architectFee,
      technicalStudies,
      other: otherFees,
      total: architectFee + technicalStudies + otherFees
    },
    otherCosts: {
      insurance,
      taxes,
      contingency,
      total: insurance + taxes + contingency
    },
    totalAmount: totalConstructionCost + architectFee + technicalStudies + otherFees + insurance + taxes + contingency,
    timeline: {
      design: designMonths,
      permits: permitsMonths,
      bidding: biddingMonths,
      construction: constructionMonths,
      total: designMonths + permitsMonths + biddingMonths + constructionMonths
    }
  };
};
