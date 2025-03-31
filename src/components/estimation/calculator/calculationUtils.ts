
import { FormData, EstimationResponseData } from './types';

/**
 * Calculate estimation based on form data
 */
export const calculateEstimation = (formData: FormData): EstimationResponseData => {
  // Default values if missing
  const surface = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface) 
    : (formData.surface || 100);
  
  const projectType = formData.projectType || 'construction';
  const qualityStandard = formData.qualityStandard || 'standard';
  const complexity = formData.complexity || 'standard';
  
  // Base cost per square meter depending on project type
  let baseCostPerSqm = 0;
  
  switch (projectType) {
    case 'construction':
      baseCostPerSqm = 1500;
      break;
    case 'renovation':
      baseCostPerSqm = 1100;
      break;
    case 'extension':
      baseCostPerSqm = 1300;
      break;
    case 'division':
      baseCostPerSqm = 900;
      break;
    default:
      baseCostPerSqm = 1200;
  }
  
  // Apply quality standard multiplier
  let qualityMultiplier = 1.0;
  
  switch (qualityStandard) {
    case 'economic':
      qualityMultiplier = 0.8;
      break;
    case 'standard':
      qualityMultiplier = 1.0;
      break;
    case 'premium':
      qualityMultiplier = 1.3;
      break;
    case 'luxury':
      qualityMultiplier = 1.6;
      break;
    default:
      qualityMultiplier = 1.0;
  }
  
  // Apply complexity multiplier
  let complexityMultiplier = 1.0;
  
  switch (complexity) {
    case 'simple':
      complexityMultiplier = 0.9;
      break;
    case 'standard':
      complexityMultiplier = 1.0;
      break;
    case 'complex':
      complexityMultiplier = 1.2;
      break;
    case 'very-complex':
      complexityMultiplier = 1.4;
      break;
    default:
      complexityMultiplier = 1.0;
  }
  
  // Calculate basic construction cost
  const rawConstructionCost = surface * baseCostPerSqm * qualityMultiplier * complexityMultiplier;
  
  // Distribution of costs for different parts of construction
  let structuralWorkPercentage = 0.40;
  let finishingWorkPercentage = 0.30;
  let technicalLotsPercentage = 0.20;
  let externalWorksPercentage = 0.10;
  
  if (projectType === 'renovation') {
    // Renovations typically have less structural work and more finishing work
    structuralWorkPercentage = 0.25;
    finishingWorkPercentage = 0.45;
    technicalLotsPercentage = 0.25;
    externalWorksPercentage = 0.05;
  } else if (projectType === 'extension') {
    // Extensions need more structural work to tie into existing building
    structuralWorkPercentage = 0.45;
    finishingWorkPercentage = 0.25;
    technicalLotsPercentage = 0.20;
    externalWorksPercentage = 0.10;
  }
  
  // Calculate cost components
  const structuralWork = rawConstructionCost * structuralWorkPercentage;
  const finishingWork = rawConstructionCost * finishingWorkPercentage;
  const technicalLots = rawConstructionCost * technicalLotsPercentage;
  const externalWorks = rawConstructionCost * externalWorksPercentage;
  const constructionTotal = structuralWork + finishingWork + technicalLots + externalWorks;
  
  // Calculate professional fees
  const feePercentage = surface < 100 ? 0.12 : surface < 200 ? 0.10 : 0.08;
  const architectFees = constructionTotal * feePercentage * 0.6;
  const engineeringFees = constructionTotal * feePercentage * 0.25;
  const officialFees = constructionTotal * 0.02;
  const inspectionFees = constructionTotal * 0.015;
  const feesTotal = architectFees + engineeringFees + officialFees + inspectionFees;
  
  // Calculate other costs
  const insurance = constructionTotal * 0.03;
  const contingency = constructionTotal * 0.05;
  const taxes = constructionTotal * 0.02;
  const miscellaneous = constructionTotal * 0.01;
  const otherCostsTotal = insurance + contingency + taxes + miscellaneous;
  
  // Calculate total cost with VAT
  const totalBeforeVAT = constructionTotal + feesTotal + otherCostsTotal;
  const totalAmount = totalBeforeVAT * 1.2; // Add 20% VAT
  
  // Calculate timeline
  let designTime = 2;
  let permitsTime = 3;
  let biddingTime = 1;
  let constructionTime = Math.max(6, Math.ceil(surface / 50));
  
  if (projectType === 'renovation') {
    designTime = 1;
    permitsTime = 2;
    constructionTime = Math.max(3, Math.ceil(surface / 80));
  } else if (projectType === 'extension') {
    designTime = 1;
    permitsTime = 3;
    constructionTime = Math.max(4, Math.ceil(surface / 60));
  }
  
  // Adjust for complexity
  if (complexity === 'complex' || complexity === 'very-complex') {
    designTime += 1;
    permitsTime += 1;
    constructionTime = Math.ceil(constructionTime * 1.2);
  }
  
  const timelineTotal = designTime + permitsTime + biddingTime + constructionTime;
  
  // Return formatted estimation result
  return {
    constructionCosts: {
      structuralWork,
      finishingWork,
      technicalLots,
      externalWorks,
      total: constructionTotal
    },
    fees: {
      architectFees,
      engineeringFees,
      officialFees,
      inspectionFees,
      total: feesTotal
    },
    otherCosts: {
      insurance,
      contingency,
      taxes,
      miscellaneous,
      total: otherCostsTotal
    },
    totalAmount,
    timeline: {
      design: designTime,
      permits: permitsTime,
      bidding: biddingTime,
      construction: constructionTime,
      total: timelineTotal
    }
  };
};

/**
 * Generate a human-readable report from estimation data
 */
export const generateEstimationReport = (formData: FormData, estimation: EstimationResponseData): string => {
  let report = `ESTIMATION DE PROJET PROGINEER\n\n`;
  
  // Project details
  report += `DÉTAILS DU PROJET\n`;
  report += `Type de projet: ${formData.projectType || 'Non spécifié'}\n`;
  report += `Surface: ${formData.surface || 0} m²\n`;
  report += `Ville: ${formData.city || 'Non spécifiée'}\n`;
  report += `Complexité: ${formData.complexity || 'Standard'}\n\n`;
  
  // Cost breakdown
  report += `ESTIMATION DES COÛTS\n`;
  report += `Gros œuvre: ${estimation.constructionCosts.structuralWork.toLocaleString('fr-FR')} €\n`;
  report += `Second œuvre: ${estimation.constructionCosts.finishingWork.toLocaleString('fr-FR')} €\n`;
  report += `Lots techniques: ${estimation.constructionCosts.technicalLots.toLocaleString('fr-FR')} €\n`;
  report += `Aménagements extérieurs: ${estimation.constructionCosts.externalWorks.toLocaleString('fr-FR')} €\n`;
  report += `Honoraires et études: ${estimation.fees.total.toLocaleString('fr-FR')} €\n`;
  report += `Autres frais: ${estimation.otherCosts.total.toLocaleString('fr-FR')} €\n\n`;
  
  report += `TOTAL GLOBAL: ${estimation.totalAmount.toLocaleString('fr-FR')} € TTC\n\n`;
  
  // Timeline
  report += `DÉLAIS PRÉVISIONNELS\n`;
  report += `Conception et études: ${estimation.timeline.design} mois\n`;
  report += `Autorisations administratives: ${estimation.timeline.permits} mois\n`;
  report += `Consultation des entreprises: ${estimation.timeline.bidding} mois\n`;
  report += `Travaux: ${estimation.timeline.construction} mois\n\n`;
  
  report += `DURÉE TOTALE: ${estimation.timeline.total} mois\n\n`;
  
  // Disclaimer
  report += `Note: Cette estimation est fournie à titre indicatif et peut varier selon les spécificités du projet.\n`;
  report += `Pour obtenir une estimation personnalisée, contactez nos experts Progineer au 04 XX XX XX XX.\n`;
  
  return report;
};
