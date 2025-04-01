
import { FormData } from './formTypes';

export interface EstimationFormData extends FormData {
  // Additional fields specific to estimation form
  projectType: string;
  surface: number;
  location: string;
  constructionType?: string;
  bedrooms?: number;
  bathrooms?: number;
  budget?: number;
  city?: string;
  // Facade-related properties
  stonePercentage?: number;
  plasterPercentage?: number;
  brickPercentage?: number;
  metalCladdingPercentage?: number;
  woodCladdingPercentage?: number;
  stoneCladdingPercentage?: number;
  montantT?: number;
}

export interface EstimationResponseData {
  projectType: string;
  projectDetails: {
    surface: number;
    location: string;
    constructionType: string;
    bedrooms: number;
    bathrooms: number;
  };
  estimatedCost: number;
  constructionCosts: {
    structuralWork: number;
    finishingWork: number;
    technicalLots: number;
    externalWorks: number;
    total: number;
  };
  fees: {
    architect: number;
    engineeringFees: number;
    architectFees: number;
    projectManagement: number;
    officialFees: number;
    inspectionFees: number;
    technicalStudies: number;
    permits: number;
    insurance: number;
    contingency: number;
    taxes: number;
    other: number;
    total: number;
  };
  otherCosts: {
    land: number;
    demolition: number;
    siteDevelopment: number;
    total: number;
  };
  totalAmount: number;
  dateGenerated: string;
  isComplete: boolean;
  timeline: EstimationTimeline;
  categories: CategoryCost[];
}

export interface EstimationTimeline {
  design: number;
  permits: number;
  construction: number;
  totalMonths: number;
}

export interface CategoryCost {
  name: string;
  cost: number;
  percentage: number;
}
