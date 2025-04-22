
import { 
  ProjectDetails, 
  ConstructionCosts, 
  FeeCosts, 
  OtherCosts, 
  EstimationTimeline 
} from '../types/estimationTypes';

export const createProjectDetails = (data: any): ProjectDetails => {
  return {
    surface: data.surface,
    location: data.location,
    projectType: data.projectType,
    city: data.city,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    constructionType: data.constructionType
  };
};

export const createConstructionCosts = (data: any): ConstructionCosts => {
  return {
    structuralWork: data.structuralWork,
    finishingWork: data.finishingWork,
    technicalLots: data.technicalLots,
    externalWorks: data.externalWorks,
    total: data.total
  };
};

export const createOtherCosts = (data: any): OtherCosts => {
  return {
    land: data.land || 0,
    demolition: data.demolition || 0,
    siteDevelopment: data.siteDevelopment || 0,
    insurance: data.insurance,
    contingency: data.contingency,
    taxes: data.taxes,
    miscellaneous: data.miscellaneous,
    total: data.total
  };
};

export const createEstimationTimeline = (data: any): EstimationTimeline => {
  return {
    design: data.design,
    permits: data.permits,
    bidding: data.bidding,
    construction: data.construction,
    total: data.total,
    totalMonths: data.totalMonths || data.total
  };
};
