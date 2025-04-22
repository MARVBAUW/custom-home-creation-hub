import { 
  EstimationResponseData, 
  ProjectDetails,
  ConstructionCosts,
  FeeCosts,
  OtherCosts,
  EstimationTimeline,
  CategoryCost
} from './types/estimationTypes';
import { ensureNumber } from './utils/typeConversions';

export const calculateEstimationData = (projectData: any): EstimationResponseData => {
  // Extract base data
  const surface = ensureNumber(projectData.surface);
  const constructionType = projectData.constructionType || 'renovation';
  const bedrooms = ensureNumber(projectData.bedrooms);
  const bathrooms = ensureNumber(projectData.bathrooms);
  const location = projectData.location || '';
  const projectType = projectData.projectType || 'renovation';
  const city = projectData.city || '';
  
  // Calculate base estimation
  const baseRate = constructionType === 'neuf' ? 1500 : 1200;
  const baseEstimation = surface * baseRate;
  
  // Project details
  const projectDetails: ProjectDetails = {
    projectType,
    surface,
    location,
    constructionType,
    bedrooms,
    bathrooms,
    city
  };
  
  // Construction costs
  const structuralWork = baseEstimation * 0.4;
  const finishingWork = baseEstimation * 0.3;
  const technicalLots = baseEstimation * 0.2;
  const externalWorks = baseEstimation * 0.1;
  const constructionCosts: ConstructionCosts = {
    structuralWork,
    finishingWork,
    technicalLots,
    externalWorks,
    total: structuralWork + finishingWork + technicalLots + externalWorks
  };
  
  // Fees
  const architect = baseEstimation * 0.08;
  const architectFees = baseEstimation * 0.08;
  const engineeringFees = baseEstimation * 0.05;
  const projectManagement = baseEstimation * 0.04;
  const officialFees = baseEstimation * 0.02;
  const inspectionFees = baseEstimation * 0.01;
  const technicalStudies = baseEstimation * 0.015;
  const permits = baseEstimation * 0.02;
  const insurance = baseEstimation * 0.02;
  const contingency = baseEstimation * 0.05;
  const taxes = baseEstimation * 0.03;
  const other = baseEstimation * 0.01;
  const feesTotal = architect + engineeringFees + projectManagement + officialFees + 
                   inspectionFees + technicalStudies + permits + insurance + 
                   contingency + taxes + other;
  const fees: FeeCosts = {
    architect,
    architectFees,
    engineeringFees,
    projectManagement,
    officialFees,
    inspectionFees,
    technicalStudies,
    permits,
    insurance,
    contingency,
    taxes,
    other,
    total: feesTotal
  };
  
  // Other costs
  const otherCosts: OtherCosts = {
    land: 0,
    demolition: 0,
    siteDevelopment: 0,
    insurance: baseEstimation * 0.01,
    contingency: baseEstimation * 0.02,
    taxes: baseEstimation * 0.01,
    miscellaneous: baseEstimation * 0.005,
    total: baseEstimation * 0.045
  };
  
  // Estimated cost with breakdown
  const estimatedCost = {
    total: baseEstimation,
    perSquareMeter: baseEstimation / surface,
    breakdown: {
      materials: baseEstimation * 0.5,
      labor: baseEstimation * 0.4,
      fees: baseEstimation * 0.1
    }
  };
  
  // Timeline
  const timeline: EstimationTimeline = {
    design: 2,
    permits: 3,
    bidding: 1,
    construction: Math.max(6, Math.ceil(surface / 100)),
    total: 6 + Math.max(6, Math.ceil(surface / 100)),
    totalMonths: 6 + Math.max(6, Math.ceil(surface / 100))
  };
  
  // Categories
  const categories: CategoryCost[] = [
    {
      name: "Gros œuvre",
      cost: structuralWork,
      percentage: (structuralWork / baseEstimation) * 100,
      category: "construction",
      amount: structuralWork
    },
    {
      name: "Second œuvre",
      cost: finishingWork,
      percentage: (finishingWork / baseEstimation) * 100,
      category: "construction",
      amount: finishingWork
    },
    {
      name: "Lots techniques",
      cost: technicalLots,
      percentage: (technicalLots / baseEstimation) * 100,
      category: "construction",
      amount: technicalLots
    },
    {
      name: "Aménagements extérieurs",
      cost: externalWorks,
      percentage: (externalWorks / baseEstimation) * 100,
      category: "construction",
      amount: externalWorks
    },
    {
      name: "Honoraires",
      cost: feesTotal,
      percentage: (feesTotal / baseEstimation) * 100,
      category: "fees",
      amount: feesTotal
    }
  ];
  
  // Return the complete estimation data
  return {
    projectType,
    projectDetails,
    estimatedCost,
    constructionCosts,
    fees,
    otherCosts,
    totalAmount: constructionCosts.total + fees.total + otherCosts.total,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    timeline,
    categories
  };
};
