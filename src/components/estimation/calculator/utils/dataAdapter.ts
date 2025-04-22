
import { FormData } from '../types';
import { EstimationResponseData, ProjectDetails, ConstructionCosts, FeeCosts, OtherCosts, EstimationTimeline, CategoryCost } from '../types/estimationTypes';
import { getDefaultFormData } from './montantUtils';

/**
 * Adapts FormData to EstimationFormData
 */
export const adaptToEstimationFormData = (formData: FormData): any => {
  return {
    projectType: formData.projectType || 'construction',
    surface: formData.surface || 0,
    city: formData.city || '',
    location: formData.location || '',
    constructionType: formData.constructionType || 'standard',
    bedrooms: formData.bedrooms || 0,
    bathrooms: formData.bathrooms || 0,
    // Add other fields as needed
  };
};

/**
 * Adapts EstimationFormData back to FormData
 */
export const adaptToFormData = (estimationData: any): FormData => {
  const defaultData = getDefaultFormData();
  
  return {
    ...defaultData,
    projectType: estimationData.projectType || defaultData.projectType,
    surface: estimationData.surface || defaultData.surface,
    city: estimationData.city || defaultData.city,
    location: estimationData.location || defaultData.location,
    constructionType: estimationData.constructionType || defaultData.constructionType,
    bedrooms: estimationData.bedrooms || defaultData.bedrooms,
    bathrooms: estimationData.bathrooms || defaultData.bathrooms,
    // Add other fields as needed
  };
};

/**
 * Adapts FormData to EstimationResponseData
 */
export const adaptToEstimationResponseData = (formData: FormData): EstimationResponseData => {
  // Create project details
  const projectDetails: ProjectDetails = {
    projectType: formData.projectType,
    surface: formData.surface,
    location: formData.location,
    constructionType: formData.constructionType,
    bedrooms: formData.bedrooms,
    bathrooms: formData.bathrooms,
    city: formData.city
  };

  // Create construction costs
  const constructionCosts: ConstructionCosts = {
    structuralWork: formData.structuralWork || 0,
    finishingWork: formData.finishingWork || 0,
    technicalLots: formData.technicalLots || 0,
    externalWorks: formData.externalWorks || 0,
    total: (formData.structuralWork || 0) + 
           (formData.finishingWork || 0) + 
           (formData.technicalLots || 0) + 
           (formData.externalWorks || 0)
  };

  // Create fee costs
  const feeCosts: FeeCosts = {
    architectFees: formData.architectFees || 0,
    engineeringFees: formData.engineeringFees || 0,
    projectManagement: formData.projectManagement || 0,
    officialFees: formData.officialFees || 0,
    inspectionFees: formData.inspectionFees || 0,
    technicalStudies: formData.technicalStudies || 0,
    permits: formData.permits || 0,
    insurance: formData.insurance || 0,
    contingency: formData.contingency || 0,
    taxes: formData.taxes || 0,
    other: formData.other || 0,
    total: (formData.architectFees || 0) + 
           (formData.engineeringFees || 0) + 
           (formData.projectManagement || 0) +
           (formData.officialFees || 0) +
           (formData.inspectionFees || 0) +
           (formData.technicalStudies || 0) +
           (formData.permits || 0) +
           (formData.insurance || 0) +
           (formData.contingency || 0) +
           (formData.taxes || 0) +
           (formData.other || 0)
  };

  // Create other costs
  const otherCosts: OtherCosts = {
    land: formData.land || 0,
    demolition: formData.demolition || 0,
    siteDevelopment: formData.siteDevelopment || 0,
    insurance: formData.insurance || 0,
    contingency: formData.contingency || 0,
    taxes: formData.taxes || 0,
    miscellaneous: formData.miscellaneous || 0,
    total: (formData.land || 0) +
           (formData.demolition || 0) +
           (formData.siteDevelopment || 0) +
           (formData.insurance || 0) +
           (formData.contingency || 0) +
           (formData.taxes || 0) +
           (formData.miscellaneous || 0)
  };

  // Create timeline
  const timeline: EstimationTimeline = {
    design: formData.designTime || 0,
    permits: formData.permitsTime || 0,
    bidding: formData.biddingTime || 0,
    construction: formData.constructionTime || 0,
    total: (formData.designTime || 0) + 
           (formData.permitsTime || 0) + 
           (formData.biddingTime || 0) + 
           (formData.constructionTime || 0),
    totalMonths: formData.totalTimeMonths || 0
  };

  // Create categories
  const categories: CategoryCost[] = [
    {
      name: 'Construction',
      cost: constructionCosts.total,
      percentage: 0, // Will be calculated
      category: 'construction'
    },
    {
      name: 'Fees',
      cost: feeCosts.total,
      percentage: 0, // Will be calculated
      category: 'fees'
    },
    {
      name: 'Other',
      cost: otherCosts.total,
      percentage: 0, // Will be calculated
      category: 'other'
    }
  ];

  // Calculate total amount
  const totalAmount = constructionCosts.total + feeCosts.total + otherCosts.total;

  // Calculate percentages
  categories.forEach(category => {
    category.percentage = totalAmount > 0 ? (category.cost / totalAmount) * 100 : 0;
  });

  // Create the response
  return {
    projectType: formData.projectType,
    projectDetails,
    estimatedCost: formData.estimatedCost || 0,
    constructionCosts,
    fees: feeCosts,
    otherCosts,
    totalAmount,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    timeline,
    categories
  };
};
