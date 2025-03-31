
import { FormData, EstimationResponseData } from '../types';
import { formatCurrency } from '@/utils/formatters';

// Generate a standardized estimation report for PDF and email
export const generateEstimationReport = (formData: FormData, estimation: EstimationResponseData) => {
  // Format basic info
  const projectInfo = [
    ['Caractéristique', 'Valeur'],
    ['Type de projet', formData.projectType || 'Non spécifié'],
    ['Surface', `${formData.surface || 0} m²`],
    ['Ville', formData.city || 'Non spécifiée'],
    ['Type de terrain', formData.terrainType || 'Non spécifié'],
    ['Complexité', formData.complexity || 'Standard'],
    ['Standard de qualité', formData.qualityStandard || 'Standard']
  ];

  // Format costs
  const costBreakdown = [
    ['Poste de dépense', 'Montant estimé (€)'],
    ['Gros œuvre', formatCurrency(estimation.constructionCosts.structuralWork)],
    ['Second œuvre', formatCurrency(estimation.constructionCosts.finishingWork)],
    ['Lots techniques', formatCurrency(estimation.constructionCosts.technicalLots)],
    ['Aménagements extérieurs', formatCurrency(estimation.constructionCosts.externalWorks)],
    ['Honoraires et études', formatCurrency(estimation.fees.total)],
    ['Autres frais', formatCurrency(estimation.otherCosts.total)]
  ];

  // Format timeline
  const timelineData = [
    ['Phase', 'Durée estimée'],
    ['Conception et études', `${estimation.timeline.design} mois`],
    ['Autorisations administratives', `${estimation.timeline.permits} mois`],
    ['Consultation des entreprises', `${estimation.timeline.bidding} mois`],
    ['Travaux', `${estimation.timeline.construction} mois`]
  ];

  return {
    projectInfo,
    costBreakdown,
    totalAmount: estimation.totalAmount,
    timelineData,
    totalDuration: estimation.timeline.total
  };
};
