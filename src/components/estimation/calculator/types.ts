
import { z } from 'zod';

export interface FormData {
  clientType?: string;
  projectType?: string;
  estimationType?: string;
  companyName?: string;
  companyType?: string;
  projectSize?: string;
  projectBudget?: string;
  projectLocation?: string;
  surface?: number | string;
  terrainType?: string;
  wallType?: string;
  roofType?: string;
  atticType?: string;
  roofingType?: string;
  insulationType?: string;
  electricalType?: string;
  plumbingType?: string;
  existingSurface?: number | string;
  buildingCondition?: string;
  renovationScope?: string;
  terassementsViabilisation?: boolean;
  
  // Facade percentages
  stonePercentage?: string;
  plasterPercentage?: string;
  brickPercentage?: string;
  metalCladdingPercentage?: string;
  woodCladdingPercentage?: string;
  stoneCladdingPercentage?: string;
  
  // Windows
  windowType?: string;
  windowRenovationArea?: string;
  windowNewArea?: string;
  
  // Skip navigation flag
  skipToContact?: boolean;
  
  // Montant total (total cost) used in many components
  montantT?: number;
  
  // Contact information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface EstimationResponseData {
  totalAmount: number;
  categories: Array<{ name: string; amount: number }>;
}

// Add other types that might be needed in the application
