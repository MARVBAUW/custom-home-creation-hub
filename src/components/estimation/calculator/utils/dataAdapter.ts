
import { FormData } from '../types';
import { EstimationResponseData, ProjectDetails } from '../types/estimationTypes';
import { ensureNumber, ensureString } from './typeConversions';

/**
 * Creates a function that updates form data while ensuring proper type conversion
 */
export const createTypeAdaptingUpdater = (updateFormData: (data: Partial<FormData>) => void) => {
  return (data: Partial<FormData>) => {
    // Process numeric fields to ensure they're numbers
    const processed: Partial<FormData> = {};
    
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        // Fields that should be numeric
        const numericFields = [
          'surface', 'bedrooms', 'bathrooms', 'estimatedCost',
          'structuralWork', 'finishingWork', 'technicalLots', 'externalWorks'
        ];
        
        if (numericFields.includes(key)) {
          // @ts-ignore - dynamic key access
          processed[key] = ensureNumber(data[key], 0);
        } else {
          // @ts-ignore - dynamic key access
          processed[key] = data[key];
        }
      }
    }
    
    updateFormData(processed);
  };
};

/**
 * Adapt form data to estimation response data format
 */
export const adaptToEstimationResponseData = (formData: FormData): EstimationResponseData => {
  // Extract project details
  const projectDetails: ProjectDetails = {
    projectType: ensureString(formData.projectType),
    surface: ensureNumber(formData.surface),
    location: ensureString(formData.location),
    constructionType: ensureString(formData.constructionType),
    bedrooms: ensureNumber(formData.bedrooms),
    bathrooms: ensureNumber(formData.bathrooms),
  };

  if (formData.city) {
    projectDetails.city = ensureString(formData.city);
  }

  // Default to minimum structured data
  return {
    projectType: ensureString(formData.projectType),
    projectDetails,
    estimatedCost: ensureNumber(formData.estimatedCost),
    constructionCosts: {
      structuralWork: ensureNumber(formData.structuralWork),
      finishingWork: ensureNumber(formData.finishingWork),
      technicalLots: ensureNumber(formData.technicalLots),
      externalWorks: ensureNumber(formData.externalWorks),
      total: ensureNumber(formData.structuralWork) + 
             ensureNumber(formData.finishingWork) + 
             ensureNumber(formData.technicalLots) + 
             ensureNumber(formData.externalWorks)
    },
    fees: {
      architect: ensureNumber(formData.architectFees),
      engineeringFees: ensureNumber(formData.engineeringFees),
      architectFees: ensureNumber(formData.architectFees),
      projectManagement: ensureNumber(formData.projectManagement),
      officialFees: ensureNumber(formData.officialFees),
      inspectionFees: ensureNumber(formData.inspectionFees),
      technicalStudies: ensureNumber(formData.technicalStudies),
      permits: ensureNumber(formData.permits),
      insurance: ensureNumber(formData.insurance),
      contingency: ensureNumber(formData.contingency),
      taxes: ensureNumber(formData.taxes),
      other: ensureNumber(formData.other),
      total: 0 // Will be calculated below
    },
    otherCosts: {
      land: ensureNumber(formData.land),
      demolition: ensureNumber(formData.demolition),
      siteDevelopment: ensureNumber(formData.siteDevelopment),
      insurance: ensureNumber(formData.insurance),
      contingency: ensureNumber(formData.contingency),
      taxes: ensureNumber(formData.taxes),
      miscellaneous: ensureNumber(formData.miscellaneous),
      total: 0 // Will be calculated below
    },
    totalAmount: ensureNumber(formData.estimatedCost),
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    timeline: {
      design: ensureNumber(formData.designTime),
      permits: ensureNumber(formData.permitsTime),
      bidding: ensureNumber(formData.biddingTime),
      construction: ensureNumber(formData.constructionTime),
      totalMonths: ensureNumber(formData.totalTimeMonths)
    },
    categories: [
      {
        cost: ensureNumber(formData.structuralWork),
        percentage: ensureNumber(formData.structuralWork) / ensureNumber(formData.estimatedCost) * 100,
        name: 'Structural Work',
        category: 'construction'
      },
      {
        cost: ensureNumber(formData.finishingWork),
        percentage: ensureNumber(formData.finishingWork) / ensureNumber(formData.estimatedCost) * 100,
        name: 'Finishing Work',
        category: 'construction'
      },
      {
        cost: ensureNumber(formData.technicalLots),
        percentage: ensureNumber(formData.technicalLots) / ensureNumber(formData.estimatedCost) * 100,
        name: 'Technical Installations',
        category: 'technical'
      },
      {
        cost: ensureNumber(formData.externalWorks),
        percentage: ensureNumber(formData.externalWorks) / ensureNumber(formData.estimatedCost) * 100,
        name: 'External Works',
        category: 'landscape'
      }
    ]
  };
};

/**
 * Adapt estimation form data to standard form data
 */
export const adaptToFormData = (estimationData: any): FormData => {
  return {
    clientType: estimationData.clientType || 'individual',
    projectType: estimationData.projectType || 'construction',
    surface: ensureNumber(estimationData.surface),
    city: ensureString(estimationData.city),
    location: ensureString(estimationData.location),
    bedrooms: ensureNumber(estimationData.bedrooms),
    bathrooms: ensureNumber(estimationData.bathrooms),
    constructionType: ensureString(estimationData.constructionType),
    estimatedCost: ensureNumber(estimationData.estimatedCost),
    structuralWork: ensureNumber(estimationData.structuralWork),
    finishingWork: ensureNumber(estimationData.finishingWork),
    technicalLots: ensureNumber(estimationData.technicalLots),
    externalWorks: ensureNumber(estimationData.externalWorks),
    // Ensure all required properties
    architectFees: ensureNumber(estimationData.architectFees),
    engineeringFees: ensureNumber(estimationData.engineeringFees),
    projectManagement: ensureNumber(estimationData.projectManagement),
    officialFees: ensureNumber(estimationData.officialFees),
    inspectionFees: ensureNumber(estimationData.inspectionFees),
    technicalStudies: ensureNumber(estimationData.technicalStudies),
    permits: ensureNumber(estimationData.permits),
    insurance: ensureNumber(estimationData.insurance),
    contingency: ensureNumber(estimationData.contingency),
    taxes: ensureNumber(estimationData.taxes),
    other: ensureNumber(estimationData.other),
    land: ensureNumber(estimationData.land),
    demolition: ensureNumber(estimationData.demolition),
    siteDevelopment: ensureNumber(estimationData.siteDevelopment),
    miscellaneous: ensureNumber(estimationData.miscellaneous),
    designTime: ensureNumber(estimationData.designTime),
    permitsTime: ensureNumber(estimationData.permitsTime),
    biddingTime: ensureNumber(estimationData.biddingTime), 
    constructionTime: ensureNumber(estimationData.constructionTime),
    totalTimeMonths: ensureNumber(estimationData.totalTimeMonths)
  };
};

/**
 * Create structured data for the estimation result (for SEO)
 */
export const createEstimationSEOData = (estimationData: EstimationResponseData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Estimation de projet de ${estimationData.projectType} en PACA`,
    description: `Estimation détaillée d'un projet de ${estimationData.projectType} de ${estimationData.projectDetails.surface}m² à ${estimationData.projectDetails.city || estimationData.projectDetails.location}`,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Progineer',
      url: 'https://progineer.fr',
      areaServed: ['Marseille', 'Nice', 'Toulon', 'PACA']
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: estimationData.estimatedCost
    }
  };
};

/**
 * Generate default values for empty form data
 */
export const generateDefaultFormData = (): FormData => {
  return {
    clientType: 'individual',
    projectType: 'construction',
    surface: 0,
    city: '',
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    constructionType: '',
    estimatedCost: 0,
    structuralWork: 0,
    finishingWork: 0,
    technicalLots: 0,
    externalWorks: 0,
    architectFees: 0,
    engineeringFees: 0,
    projectManagement: 0,
    officialFees: 0,
    inspectionFees: 0,
    technicalStudies: 0,
    permits: 0,
    insurance: 0,
    contingency: 0,
    taxes: 0,
    other: 0,
    land: 0,
    demolition: 0,
    siteDevelopment: 0,
    miscellaneous: 0,
    designTime: 0,
    permitsTime: 0,
    biddingTime: 0,
    constructionTime: 0,
    totalTimeMonths: 0
  };
};
