
// Type principal pour les données du formulaire d'estimation
export interface FormData {
  // Type de client
  clientType?: string;
  
  // Type de projet
  projectType?: string;
  
  // Type d'estimation
  estimationType?: 'Rapide 5 mins (Précision à + ou - 10%)' | 'Précise 15 mins (précision à + ou- 5%)' | string;
  termsAccepted?: boolean;
  
  // Détails de construction
  constructionType?: string;
  surface?: number | string;
  levels?: number | string;
  units?: number | string;
  
  // Terrain
  terrainType?: string;
  terrainSurface?: number | string;
  terrainAccess?: string;
  landPrice?: number | string;
  
  // Démolition
  demolitionType?: string;
  existingSurface?: number | string;
  
  // Gros œuvre
  wallType?: string;
  
  // Charpente
  roofType?: string;
  
  // Combles
  atticType?: string;
  
  // Données pour les professionnels
  activity?: string;
  startDate?: string;
  endDate?: string;
  
  // Coordonnées de contact
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
}
