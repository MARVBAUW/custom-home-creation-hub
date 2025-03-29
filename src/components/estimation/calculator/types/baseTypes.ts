
// Types de base pour le formulaire d'estimation
export interface BaseFormData {
  clientType?: string;
  projectType?: string;
  estimationType?: string;
  surface?: number;
  levels?: number;
  constructionType?: string;
  constructionMode?: string;
  finishLevel?: string;
  city?: string;
  terrainSurface?: number;
  landPrice?: number;
  terrainType?: string;
  terrainAccess?: string;
  waterConnection?: boolean;
  electricityConnection?: boolean;
  gasConnection?: boolean;
  sewerConnection?: boolean;
  fiberConnection?: boolean;
  needsSepticTank?: boolean;
  floodRisk?: boolean;
  claySoil?: boolean;
  rockySoil?: boolean;
  wetlandZone?: boolean;
  heritageZone?: boolean;
  foundationType?: string;
  soilType?: string;
  wallType?: string;
  wallThickness?: number;
  hasBasement?: boolean;
  basementType?: string;
  floorType?: string;
  slopedLand?: boolean;
  difficultAccess?: boolean;
  needsDemolition?: boolean;
  needsWaterManagement?: boolean;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  message?: string;
  agreeTerms?: boolean;
  newsletter?: boolean;
}
