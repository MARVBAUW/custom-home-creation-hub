import { FormData } from '../types/formTypes';
import { calculateStructuralCosts } from './structuralCosts';
import { calculateFinishingCosts } from './finishingCosts';
import { calculateTechnicalCosts } from './technicalCosts';
import { calculateExternalCosts } from './externalCosts';
import { calculateFees } from './feeCosts';
import { ensureNumber } from '../utils/typeConversions';

export interface FeeCosts {
  architect: number;
  engineeringFees: number;
  architectFees: number;
  projectManagement: number;
  permits: number;
  insurance: number;
  contingency: number;
  taxes: number;
  total: number;
}

export interface EstimationTimeline {
  planning: { duration: string; startOffset: number };
  permits: { duration: string; startOffset: number };
  foundation: { duration: string; startOffset: number };
  structure: { duration: string; startOffset: number };
  envelope: { duration: string; startOffset: number };
  interiors: { duration: string; startOffset: number };
  finishing: { duration: string; startOffset: number };
  total: string;
}

export function generateEstimationResult(formData: FormData) {
  const surface = ensureNumber(formData.surface);
  const budget = ensureNumber(formData.budget);
  
  // Calculate base cost (either from budget or surface * average price)
  const baseCost = budget > 0 ? budget : surface * 1500;
  
  // Calculate component costs
  const structuralCosts = calculateStructuralCosts(formData, baseCost);
  const finishingCosts = calculateFinishingCosts(formData, baseCost);
  const technicalCosts = calculateTechnicalCosts(formData, baseCost);
  const externalCosts = calculateExternalCosts(formData, baseCost);
  
  // Total construction costs
  const totalConstructionCosts = structuralCosts + finishingCosts + technicalCosts + externalCosts;
  
  // Calculate fees
  const fees = calculateFees(totalConstructionCosts);
  
  // Other costs
  const otherCosts = {
    insurance: totalConstructionCosts * 0.02,
    contingency: totalConstructionCosts * 0.05,
    taxes: totalConstructionCosts * 0.03,
    miscellaneous: totalConstructionCosts * 0.02,
    total: totalConstructionCosts * 0.12
  };
  
  // Total amount
  const totalAmount = totalConstructionCosts + fees.total + otherCosts.total;
  
  // Timeline estimation
  const timeline: EstimationTimeline = {
    planning: { duration: '2 mois', startOffset: 0 },
    permits: { duration: '3 mois', startOffset: 2 },
    foundation: { duration: '1 mois', startOffset: 5 },
    structure: { duration: '2 mois', startOffset: 6 },
    envelope: { duration: '1.5 mois', startOffset: 8 },
    interiors: { duration: '3 mois', startOffset: 9.5 },
    finishing: { duration: '1.5 mois', startOffset: 12.5 },
    total: '14 mois'
  };
  
  // Categories for reporting
  const categories = [
    { name: 'Gros œuvre', amount: structuralCosts },
    { name: 'Second œuvre', amount: finishingCosts },
    { name: 'Lots techniques', amount: technicalCosts },
    { name: 'Extérieurs', amount: externalCosts }
  ];
  
  // Generate additional data needed for EstimationReport
  const projectDetails = {
    surface: ensureNumber(formData.surface) || 0,
    bedrooms: ensureNumber(formData.bedrooms) || 0,
    bathrooms: ensureNumber(formData.bathrooms) || 0,
    city: formData.city || '',
    constructionType: formData.constructionType || 'traditional',
    clientType: formData.clientType || 'individual'
  };
  
  // Return the complete estimation data
  return {
    projectType: formData.projectType || 'construction',
    projectDetails,
    estimatedCost: totalAmount,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    constructionCosts: {
      structuralWork: structuralCosts,
      finishingWork: finishingCosts,
      technicalLots: technicalCosts,
      externalWorks: externalCosts,
      total: totalConstructionCosts
    },
    fees,
    otherCosts,
    totalAmount,
    timeline,
    categories,
    
    // Additional data for EstimationReport
    totalHT: totalConstructionCosts,
    totalTTC: totalConstructionCosts * 1.2,
    vat: totalConstructionCosts * 0.2,
    corpsEtat: {
      "Gros oeuvre": { montantHT: structuralCosts * 0.6, details: ['Fondations', 'Élévation'] },
      "Charpente": { montantHT: structuralCosts * 0.2, details: ['Charpente traditionnelle'] },
      "Couverture": { montantHT: structuralCosts * 0.2, details: ['Tuiles céramiques'] },
      "Menuiseries Extérieures": { montantHT: finishingCosts * 0.3, details: ['PVC double vitrage'] },
      "Second oeuvre": { montantHT: finishingCosts * 0.7, details: ['Plomberie', 'Électricité', 'Isolation', 'Plâtrerie', 'Peinture'] }
    },
    honorairesHT: fees.total,
    coutGlobalHT: totalConstructionCosts + fees.total,
    coutGlobalTTC: (totalConstructionCosts + fees.total) * 1.2,
    taxeAmenagement: totalConstructionCosts * 0.05,
    garantieDecennale: totalConstructionCosts * 0.01,
    etudesGeotechniques: totalConstructionCosts * 0.005,
    etudeThermique: totalConstructionCosts * 0.005
  };
}
