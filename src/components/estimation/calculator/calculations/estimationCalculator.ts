
import { EstimationFormData, EstimationResponseData } from '../types/estimationFormData';
import { calculateConstructionCosts } from './structuralCosts';
import { calculateDetailedFeeCosts } from './feeCosts';
import { calculateOtherCosts } from './externalCosts';

/**
 * Generate a complete estimation result based on form data
 */
export function generateEstimationResult(formData: EstimationFormData): EstimationResponseData {
  // Extract basic project data
  const surface = formData.surface || 0;
  const bedrooms = formData.bedrooms || 0;
  const bathrooms = formData.bathrooms || 0;
  const constructionType = formData.constructionType || 'standard';
  const location = formData.location || 'urban';
  
  // Calculate construction costs
  const constructionCosts = calculateConstructionCosts(formData);
  
  // Calculate fees
  const fees = calculateDetailedFeeCosts(constructionCosts.total);
  
  // Calculate other costs
  const otherCosts = calculateOtherCosts(formData);
  
  // Calculate total amount
  const totalAmount = constructionCosts.total + fees.total + otherCosts.total;
  
  // Calculate timeline (rough estimates)
  const designMonths = Math.max(2, Math.ceil(surface / 200));
  const permitMonths = 3;
  const constructionMonths = Math.max(6, Math.ceil(surface / 50));
  const totalMonths = designMonths + permitMonths + constructionMonths;
  
  // Generate categories for charts/breakdown
  const categories = [
    { name: 'Structural Work', cost: constructionCosts.structuralWork, percentage: (constructionCosts.structuralWork / totalAmount) * 100 },
    { name: 'Finishing Work', cost: constructionCosts.finishingWork, percentage: (constructionCosts.finishingWork / totalAmount) * 100 },
    { name: 'Technical Lots', cost: constructionCosts.technicalLots, percentage: (constructionCosts.technicalLots / totalAmount) * 100 },
    { name: 'External Works', cost: constructionCosts.externalWorks, percentage: (constructionCosts.externalWorks / totalAmount) * 100 },
    { name: 'Fees', cost: fees.total, percentage: (fees.total / totalAmount) * 100 },
    { name: 'Other Costs', cost: otherCosts.total, percentage: (otherCosts.total / totalAmount) * 100 }
  ];
  
  // Generate the response
  return {
    projectType: formData.projectType || 'construction',
    projectDetails: {
      surface,
      location,
      constructionType,
      bedrooms,
      bathrooms
    },
    estimatedCost: totalAmount,
    constructionCosts,
    fees,
    otherCosts,
    totalAmount,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    timeline: {
      design: designMonths,
      permits: permitMonths,
      construction: constructionMonths,
      totalMonths
    },
    categories
  };
}
