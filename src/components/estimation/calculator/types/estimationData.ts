
// Données complètes pour le formulaire d'estimation
export const estimationFormData = {
  // Catégories générales
  categories: [
    { id: "client", name: "Informations client" },
    { id: "project", name: "Détails du projet" },
    { id: "construction", name: "Construction" },
    { id: "interior", name: "Intérieur" },
    { id: "exterior", name: "Extérieur" },
    { id: "technical", name: "Technique" },
    { id: "finishes", name: "Finitions" },
  ],
  
  // Types de client
  clientTypes: [
    { value: "individual", label: "Particulier" },
    { value: "professional", label: "Professionnel" },
    { value: "investor", label: "Investisseur" },
  ],
  
  // Types de projets
  projectTypes: [
    { value: "construction", label: "Construction neuve" },
    { value: "renovation", label: "Rénovation" },
    { value: "extension", label: "Extension" },
    { value: "conversion", label: "Changement d'affectation" },
  ],
  
  // Types d'estimation
  estimationTypes: [
    { value: "basic", label: "Estimation rapide" },
    { value: "detailed", label: "Estimation détaillée" },
    { value: "professional", label: "Devis professionnel" },
  ],
  
  // Types de construction
  constructionTypes: [
    { value: "traditional", label: "Traditionnelle" },
    { value: "prefabricated", label: "Préfabriquée" },
    { value: "wooden", label: "Ossature bois" },
    { value: "mixed", label: "Mixte" },
  ],
  
  // Modes de construction
  constructionModes: [
    { value: "contractor", label: "Entreprise générale" },
    { value: "selfBuild", label: "Auto-construction" },
    { value: "managed", label: "Maîtrise d'œuvre" },
  ],
  
  // Types de terrain
  terrainTypes: [
    { value: "flat", label: "Plat" },
    { value: "sloped", label: "En pente" },
    { value: "uneven", label: "Accidenté" },
  ],
  
  // Accès au terrain
  terrainAccess: [
    { value: "easy", label: "Facile" },
    { value: "medium", label: "Moyen" },
    { value: "difficult", label: "Difficile" },
  ],
  
  // Types de murs
  wallTypes: [
    { value: "brick", label: "Briques" },
    { value: "concrete", label: "Béton" },
    { value: "stone", label: "Pierre" },
    { value: "wood", label: "Bois" },
    { value: "mixed", label: "Mixte" },
  ],
  
  // Types de toiture
  roofTypes: [
    { value: "flat", label: "Toit plat" },
    { value: "sloped", label: "Toit en pente" },
    { value: "mansard", label: "Mansardé" },
    { value: "mixed", label: "Mixte" },
  ],
  
  // Types de combles
  atticTypes: [
    { value: "lost", label: "Perdus" },
    { value: "convertible", label: "Aménageables" },
    { value: "converted", label: "Aménagés" },
  ],
  
  // Types de couverture
  roofingTypes: [
    { value: "tiles", label: "Tuiles" },
    { value: "slate", label: "Ardoises" },
    { value: "zinc", label: "Zinc" },
    { value: "membrane", label: "Membrane" },
    { value: "green", label: "Toiture végétalisée" },
  ],
  
  // Types d'isolation
  insulationTypes: [
    { value: "conventional", label: "Conventionnelle" },
    { value: "highPerformance", label: "Haute performance" },
    { value: "eco", label: "Écologique" },
  ],
  
  // Types d'installation électrique
  electricalTypes: [
    { value: "basic", label: "Basique" },
    { value: "standard", label: "Standard" },
    { value: "advanced", label: "Avancée" },
    { value: "smart", label: "Domotique" },
  ],
  
  // Types de plomberie
  plumbingTypes: [
    { value: "basic", label: "Basique" },
    { value: "standard", label: "Standard" },
    { value: "highEnd", label: "Haut de gamme" },
  ],
  
  // Types de chauffage
  heatingTypes: [
    { value: "electric", label: "Électrique" },
    { value: "gas", label: "Gaz" },
    { value: "oil", label: "Fioul" },
    { value: "heatPump", label: "Pompe à chaleur" },
    { value: "woodStove", label: "Poêle à bois" },
    { value: "solar", label: "Solaire" },
    { value: "geothermal", label: "Géothermie" },
  ],
  
  // Types de plâtrerie
  plasteringTypes: [
    { value: "drywall", label: "Plaques de plâtre" },
    { value: "traditional", label: "Plâtre traditionnel" },
    { value: "mixed", label: "Mixte" },
  ],
  
  // Types de portes intérieures
  doorTypes: [
    { value: "hollow", label: "Creuses" },
    { value: "solid", label: "Pleines" },
    { value: "glass", label: "Vitrées" },
    { value: "sliding", label: "Coulissantes" },
  ],
  
  // Aménagements intérieurs
  interiorFittings: [
    { value: "closets", label: "Placards" },
    { value: "shelving", label: "Étagères" },
    { value: "customFurniture", label: "Mobilier sur mesure" },
  ],
  
  // Types de carrelage
  tileTypes: [
    { value: "ceramic", label: "Céramique" },
    { value: "porcelain", label: "Porcelaine" },
    { value: "natural", label: "Pierre naturelle" },
    { value: "mosaic", label: "Mosaïque" },
  ],
  
  // Types de parquet
  parquetTypes: [
    { value: "solid", label: "Massif" },
    { value: "engineered", label: "Contrecollé" },
    { value: "laminate", label: "Stratifié" },
  ],
  
  // Types de sol souple
  softFloorTypes: [
    { value: "vinyl", label: "Vinyle" },
    { value: "linoleum", label: "Linoléum" },
    { value: "carpet", label: "Moquette" },
  ],
  
  // Services complémentaires
  additionalServices: [
    { value: "architecturalPlans", label: "Plans d'architecte" },
    { value: "permits", label: "Demandes de permis" },
    { value: "interiorDesign", label: "Décoration intérieure" },
    { value: "landscaping", label: "Aménagement paysager" },
    { value: "siteSurvey", label: "Relevé de terrain" },
    { value: "demolition", label: "Démolition" },
    { value: "maintenance", label: "Contrat d'entretien" },
  ],
  
  // Types d'activité professionnelle
  professionalActivities: [
    { value: "offices", label: "Bureaux" },
    { value: "retail", label: "Commerce" },
    { value: "hospitality", label: "Hôtellerie" },
    { value: "restaurant", label: "Restauration" },
    { value: "industrial", label: "Industrie" },
    { value: "warehouse", label: "Entrepôt" },
    { value: "health", label: "Santé" },
    { value: "education", label: "Éducation" },
  ],
  
  // Types d'équipements de cuisine
  kitchenEquipment: [
    { value: "basic", label: "Basique" },
    { value: "standard", label: "Standard" },
    { value: "highEnd", label: "Haut de gamme" },
    { value: "custom", label: "Sur mesure" },
  ],
  
  // Types d'équipements de salle de bain
  bathroomEquipment: [
    { value: "basic", label: "Basique" },
    { value: "standard", label: "Standard" },
    { value: "highEnd", label: "Haut de gamme" },
    { value: "custom", label: "Sur mesure" },
  ],
  
  // Aménagements extérieurs
  exteriorFeatures: [
    { value: "terrace", label: "Terrasse" },
    { value: "balcony", label: "Balcon" },
    { value: "garden", label: "Jardin" },
    { value: "pool", label: "Piscine" },
    { value: "garage", label: "Garage" },
    { value: "carport", label: "Carport" },
    { value: "fence", label: "Clôture" },
    { value: "gate", label: "Portail" },
  ],
  
  // Niveaux de finition
  finishLevels: [
    { value: "basic", label: "Basique" },
    { value: "standard", label: "Standard" },
    { value: "luxury", label: "Luxe" },
    { value: "custom", label: "Personnalisé" },
  ],
  
  // Coûts moyens par m² par type de construction (en euros)
  averageCosts: {
    construction: {
      "traditional": { min: 1200, avg: 1500, max: 2000 },
      "prefabricated": { min: 1000, avg: 1300, max: 1800 },
      "wooden": { min: 1300, avg: 1600, max: 2200 },
      "mixed": { min: 1200, avg: 1550, max: 2100 }
    },
    renovation: {
      "light": { min: 250, avg: 500, max: 750 },
      "medium": { min: 750, avg: 1000, max: 1500 },
      "heavy": { min: 1200, avg: 1600, max: 2200 }
    },
    extension: {
      "basic": { min: 1100, avg: 1400, max: 1900 },
      "standard": { min: 1400, avg: 1800, max: 2300 },
      "luxury": { min: 2000, avg: 2500, max: 3500 }
    }
  },
  
  // Coefficients multiplicateurs par zone géographique
  regionalCoefficients: {
    "paris": 1.4,
    "ile-de-france": 1.25,
    "paca": 1.15,
    "rhone-alpes": 1.1,
    "grand-est": 0.95,
    "hauts-de-france": 0.9,
    "bretagne": 1.0,
    "normandie": 0.95,
    "centre": 0.9,
    "default": 1.0
  },
  
  // Coefficients pour les niveaux de finition
  finishCoefficients: {
    "basic": 0.85,
    "standard": 1.0,
    "luxury": 1.3,
    "custom": 1.5
  }
};
