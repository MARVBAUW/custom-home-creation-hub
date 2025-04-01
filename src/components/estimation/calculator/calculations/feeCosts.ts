
import { EstimationFormData } from '../types/estimationFormData';
import { ensureNumber } from '../utils/typeConversions';

export interface FeeCosts {
  architect: number;
  architectFees: number;
  engineeringFees: number;
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
}

export function calculateFeeCosts(constructionTotal: number, formData: EstimationFormData): FeeCosts {
  // Base percentages for different fee types
  const architectPct = 0.08;
  const engineeringPct = 0.04;
  const projectManagementPct = 0.05;
  const officialFeesPct = 0.01;
  const inspectionFeesPct = 0.02;
  const permitsPct = 0.02;
  const insurancePct = 0.01;
  const contingencyPct = 0.05;
  const taxesPct = 0.20; // VAT at 20%
  const technicalStudiesPct = 0.02;
  const otherFeesPct = 0.01;
  
  // Calculate individual fees
  const architect = constructionTotal * architectPct;
  const engineeringFees = constructionTotal * engineeringPct;
  const projectManagement = constructionTotal * projectManagementPct;
  const officialFees = constructionTotal * officialFeesPct;
  const inspectionFees = constructionTotal * inspectionFeesPct;
  const permits = constructionTotal * permitsPct;
  const insurance = constructionTotal * insurancePct;
  const contingency = constructionTotal * contingencyPct;
  const taxes = constructionTotal * taxesPct;
  const technicalStudies = constructionTotal * technicalStudiesPct;
  const other = constructionTotal * otherFeesPct;
  
  // Calculate total fees
  const total = architect + engineeringFees + projectManagement + officialFees + 
                inspectionFees + permits + insurance + contingency + taxes + 
                technicalStudies + other;
  
  return {
    architect,
    architectFees: architect, // Duplicated field for compatibility
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
    total
  };
}

// For compatibility with older code
export const calculateDetailedFeeCosts = calculateFeeCosts;
