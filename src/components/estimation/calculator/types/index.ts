
// Types de base pour le formulaire d'estimation
export interface FormData {
  clientType?: string;
  projectType?: string;
  estimationType?: string;
  surfaceArea?: number;
  floors?: number;
  terrainType?: string;
  wallType?: string;
  roofType?: string;
  atticType?: string;
  roofingType?: string;
  insulationType?: string;
  facadeMaterial?: string;
  windowType?: string;
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  plasteringType?: string;
  interiorDoorsType?: string;
  flooringType?: string;
  tileType?: string;
  paintType?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  [key: string]: any;
}

// Exporter tous les autres types depuis les fichiers individuels
export * from './baseTypes';
export * from './clientTypes';
export * from './constructionTypes';
export * from './envelopeTypes';
export * from './interiorTypes';
export * from './renovationTypes';
export * from './roomsTypes';
export * from './specialFeaturesTypes';
