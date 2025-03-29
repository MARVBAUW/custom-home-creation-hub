
// Coefficients de base pour les estimations
export const BASE_PRICES = {
  construction: 1500, // Prix au m² pour la construction
  renovation: 950,    // Prix au m² pour la rénovation
  extension: 1200,    // Prix au m² pour l'extension
  optimization: 600,  // Prix au m² pour l'optimisation
  division: 800,      // Prix au m² pour la division
  design: 400,        // Prix au m² pour le design
  surelevation: 1350, // Prix au m² pour la surélévation
};

// Multiplicateurs par type de client
export const CLIENT_MULTIPLIERS = {
  professional: 1.2,   // Plus complexe pour les professionnels
  individual: 1.0,     // Base pour les particuliers
};

// Multiplicateurs par activité professionnelle
export const ACTIVITY_MULTIPLIERS = {
  offices: 1.1,        // Bureaux (installations spécifiques)
  commerce: 1.15,      // Commerce (vitrines, sécurité, etc.)
  hotel: 1.25,         // Hôtel (normes spécifiques)
  restaurant: 1.2,     // Restaurant (cuisine professionnelle)
  industry: 1.3,       // Industrie (installations techniques)
  realEstate: 1.05,    // Immobilier (résidentiel)
};

// Multiplicateurs par type d'estimation
export const ESTIMATION_TYPE_MULTIPLIERS = {
  quick: 1.0,          // Estimation rapide (base)
  precise: 1.05,       // Estimation précise (léger supplément pour plus de détail)
};

// Prix par type de terrain
export const TERRAIN_PRICES = {
  base: 260,           // Prix de base pour les terrassements/viabilisation par m²
  viabilise: 120,      // Prix supplémentaire pour un terrain viabilisé par m²
};

// Prix par type de gros œuvre
export const GROS_OEUVRE_PRICES = {
  brique: 590,         // Prix au m² pour construction en briques
  parpaing: 580,       // Prix au m² pour construction en parpaings
  porotherme: 430,     // Prix au m² pour construction en porotherme
  pierre: 730,         // Prix au m² pour construction en pierre
  beton: 500,          // Prix au m² pour construction en béton
  betonCellulaire: 433 // Prix au m² pour construction en béton cellulaire
};

// Prix par type de charpente
export const CHARPENTE_PRICES = {
  toitureAccessible: 150,    // Prix au m² pour toiture terrasse accessible
  toitureInaccessible: 130,  // Prix au m² pour toiture terrasse inaccessible
  charpenteIndustrielle: 110, // Prix au m² pour charpente industrielle
  charpenteTraditionnelle: 1, // Prix au m² pour charpente traditionnelle
};

// Prix par type de comble
export const COMBLE_PRICES = {
  amenageable: 70,      // Prix au m² pour combles aménageables
};

// Prix par type de couverture
export const COUVERTURE_PRICES = {
  tuilePlate: 130,      // Prix au m² pour tuile plate
  tuileRonde: 137,      // Prix au m² pour tuile ronde
  ardoise: 210,         // Prix au m² pour ardoise
  zinc: 160,            // Prix au m² pour zinc
  chaume: 200,          // Prix au m² pour chaume
  bacAcier: 65,         // Prix au m² pour bac acier
  bitume: 75,           // Prix au m² pour étanchéité bitume
  vegetalisee: 146,     // Prix au m² pour toiture végétalisée
  gravillonnee: 105,    // Prix au m² pour toiture gravillonnée
};

// Prix par type d'isolation
export const ISOLATION_PRICES = {
  base: 80,             // Prix au m² pour isolation réglementaire
  performance: 100,     // Prix au m² pour isolation performante
  ultraPerformance: 120, // Prix au m² pour isolation ultra performante
};

// Prix par type de façade
export const FACADE_PRICES = {
  enduit: 0.7,           // Multiplicateur pour enduit
  brique: 0.9,           // Multiplicateur pour brique
  bardageMetal: 3.0,     // Multiplicateur pour bardage métallique
  bardageBois: 2.1,      // Multiplicateur pour bardage bois
  bardagePierre: 3.1,    // Multiplicateur pour bardage pierre
};

// Prix par type de menuiserie extérieure
export const MENUISERIE_EXT_PRICES = {
  bois: 650,             // Prix au m² pour menuiseries en bois
  pvc: 390,              // Prix au m² pour menuiseries en PVC
  alu: 620,              // Prix au m² pour menuiseries en aluminium
  mixte: 690,            // Prix au m² pour menuiseries mixtes bois/alu
  pvcColore: 410,        // Prix au m² pour menuiseries en PVC coloré
};

// Prix par type d'électricité
export const ELECTRICITE_PRICES = {
  base: 100,             // Prix au m² pour électricité de base
  avancee: 125,          // Prix au m² pour électricité avancée
  hautDeGamme: 155,      // Prix au m² pour électricité haut de gamme
  domotique: 190,        // Prix au m² pour électricité avec domotique
};

// Prix par type de plomberie
export const PLOMBERIE_PRICES = {
  base: 80,              // Prix au m² pour plomberie de base
  avancee: 100,          // Prix au m² pour plomberie avancée
  hautDeGamme: 125,      // Prix au m² pour plomberie haut de gamme
};

// Prix par type de chauffage
export const CHAUFFAGE_PRICES = {
  qualitePrix: 60,       // Prix au m² pour chauffage meilleur rapport qualité/prix
  ecologique: 120,       // Prix au m² pour chauffage écologique
  economique: 45,        // Prix au m² pour chauffage économique
  climatisation: 65,     // Prix supplémentaire au m² pour climatisation
};

// Prix par type de cuisine
export const CUISINE_PRICES = {
  kitchenette: 2700,     // Prix fixe pour kitchenette
  base: 8500,            // Prix fixe pour cuisine de base
  plus: 13500,           // Prix fixe pour cuisine plus
  premium: 19000,        // Prix fixe pour cuisine premium
};

// Prix par type de salle de bain
export const SALLE_DE_BAIN_PRICES = {
  base: 2000,            // Prix fixe pour salle de bain de base
  milieuDeGamme: 3150,   // Prix fixe pour salle de bain milieu de gamme
  premium: 4200,         // Prix fixe pour salle de bain premium
};

// Facteur d'inflation annuel (pour les dates de projet futures)
export const ANNUAL_INFLATION = 0.025; // 2.5% par an

// Taux de TVA
export const TVA_RATE = 0.20; // 20%

// Taux pour la taxe d'aménagement
export const DEFAULT_TAXE_AMENAGEMENT = 0.05; // 5%
