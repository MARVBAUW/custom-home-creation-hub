
import { FormData } from '../types/formTypes';
import { 
  EstimationResponseData, 
  ProjectDetails,
  ConstructionCosts,
  FeeCosts,
  OtherCosts,
  EstimationTimeline,
  CategoryCost
} from '../types/estimationTypes';
import { ensureNumber } from '../utils/typeConversions';

export const calculateEstimation = (formData: FormData): EstimationResponseData => {
  // Extract basic project details
  const projectType = formData.projectType || 'renovation';
  const surface = ensureNumber(formData.surface);
  const location = formData.location || '';
  const constructionType = formData.constructionType || 'renovation';
  const bedrooms = ensureNumber(formData.bedrooms);
  const bathrooms = ensureNumber(formData.bathrooms);
  const city = formData.city || '';
  
  // Create project details object
  const projectDetails: ProjectDetails = {
    projectType,
    surface,
    location,
    constructionType,
    bedrooms,
    bathrooms,
    city
  };
  
  // Calculate base cost estimates
  const baseRate = constructionType === 'neuf' ? 1500 : 1200;
  let estimatedCost = surface * baseRate;
  
  // Adjust based on location
  if (location === 'urban') {
    estimatedCost *= 1.15; // 15% increase for urban areas
  } else if (location === 'rural') {
    estimatedCost *= 0.9; // 10% decrease for rural areas
  }
  
  // Adjust based on luxury features
  if (formData.kitchenType === 'luxury') {
    estimatedCost += 15000;
  } else if (formData.kitchenType === 'premium') {
    estimatedCost += 8000;
  }
  
  // Calculate construction costs
  const structuralWork = estimatedCost * 0.4;
  const finishingWork = estimatedCost * 0.3;
  const technicalLots = estimatedCost * 0.2;
  const externalWorks = estimatedCost * 0.1;
  const constructionCosts: ConstructionCosts = {
    structuralWork,
    finishingWork,
    technicalLots,
    externalWorks,
    total: structuralWork + finishingWork + technicalLots + externalWorks
  };
  
  // Calculate fees
  const architectPercentage = 0.08;
  const architectFees = estimatedCost * architectPercentage;
  const engineeringFees = estimatedCost * 0.05;
  const projectManagement = estimatedCost * 0.04;
  const officialFees = estimatedCost * 0.02;
  const inspectionFees = estimatedCost * 0.01;
  const technicalStudies = estimatedCost * 0.015;
  const permits = estimatedCost * 0.02;
  const insurance = estimatedCost * 0.02;
  const contingency = estimatedCost * 0.05;
  const taxes = estimatedCost * 0.03;
  const other = estimatedCost * 0.01;
  const feesTotal = architectFees + engineeringFees + projectManagement + officialFees + 
                  inspectionFees + technicalStudies + permits + insurance + 
                  contingency + taxes + other;
  const fees: FeeCosts = {
    architect: architectFees,
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
  
  // Calculate categories of costs
  const categories: CategoryCost[] = [
    {
      name: "Gros œuvre",
      cost: structuralWork,
      percentage: (structuralWork / estimatedCost) * 100,
      category: "construction",
      amount: structuralWork
    },
    {
      name: "Second œuvre",
      cost: finishingWork,
      percentage: (finishingWork / estimatedCost) * 100,
      category: "construction",
      amount: finishingWork
    },
    {
      name: "Lots techniques",
      cost: technicalLots,
      percentage: (technicalLots / estimatedCost) * 100,
      category: "construction",
      amount: technicalLots
    },
    {
      name: "Aménagements extérieurs",
      cost: externalWorks,
      percentage: (externalWorks / estimatedCost) * 100,
      category: "construction",
      amount: externalWorks
    },
    {
      name: "Honoraires",
      cost: feesTotal,
      percentage: (feesTotal / estimatedCost) * 100,
      category: "fees",
      amount: feesTotal
    }
  ];
  
  // Calculate other costs
  const otherCosts: OtherCosts = {
    land: ensureNumber(formData.landCost),
    demolition: ensureNumber(formData.demolitionCost),
    siteDevelopment: ensureNumber(formData.siteDevelopmentCost),
    insurance: estimatedCost * 0.01,
    contingency: estimatedCost * 0.03,
    taxes: estimatedCost * 0.02,
    miscellaneous: estimatedCost * 0.005,
    total: ensureNumber(formData.landCost) + 
           ensureNumber(formData.demolitionCost) + 
           ensureNumber(formData.siteDevelopmentCost) + 
           (estimatedCost * 0.065)
  };
  
  // Calculate timeline
  const designMonths = 2;
  const permitsMonths = 3;
  const biddingMonths = 1;
  const constructionMonths = Math.max(6, Math.ceil(surface / 100));
  const totalMonths = designMonths + permitsMonths + biddingMonths + constructionMonths;
  const timeline: EstimationTimeline = {
    design: designMonths,
    permits: permitsMonths,
    bidding: biddingMonths,
    construction: constructionMonths,
    total: totalMonths,
    totalMonths
  };
  
  // Calculate total amount
  const totalAmount = constructionCosts.total + fees.total + otherCosts.total;
  
  // Return the complete estimation data
  return {
    projectType,
    projectDetails,
    estimatedCost: {
      total: estimatedCost,
      perSquareMeter: estimatedCost / surface,
      breakdown: {
        materials: estimatedCost * 0.5,
        labor: estimatedCost * 0.4,
        fees: estimatedCost * 0.1
      }
    },
    constructionCosts,
    fees,
    otherCosts,
    totalAmount,
    dateGenerated: new Date().toISOString(),
    isComplete: true,
    timeline,
    categories
  };
};
