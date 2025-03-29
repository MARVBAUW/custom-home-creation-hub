
import { FormData } from '../types';
import { parseToNumber } from '../utils/typeConversions';

interface EstimationDetails {
  terrainSurface?: number;
  constructionSurface?: number;
  wallType?: string;
  roofType?: string;
  insulationType?: string;
  heatingType?: string;
  windowType?: string;
  landscapingType?: string;
  exteriorFeatures?: string;
  solarPanelType?: string;
  windTurbineType?: string;
  rainwaterHarvesting?: boolean;
  greywaterRecycling?: boolean;
  ecoFriendlyInsulation?: boolean;
  terrace?: boolean;
  pool?: boolean;
  outdoorKitchen?: boolean;
  // Include other relevant form fields
}

export const calculateDetailedEstimation = (formData: FormData): any => {
  const {
    // Client Type
    clientType, // "individual" | "professional"

    // Project Type
    projectType, // "construction" | "renovation" | "extension"

    // Terrain
    landIncluded, // "yes" | "no"
    landSurface,
    terrainType, // "flat" | "sloping" | "wooded"
    landPrice,

    // Construction Details
    constructionType, // "house" | "apartment"
    constructionStyle, // "modern" | "traditional" | "contemporary"
    surface,
    wallType, // "concrete" | "brick" | "wood"
    roofType, // "tile" | "slate" | "metal"
    basement, // "yes" | "no"
    garage: hasGarage, // "yes" | "no" - renamed to avoid redeclaration
    floorCount,

    // Special Features
    solarPanelType,
    solarPanelSurface,
    windTurbineType,
    rainwaterHarvesting,
    greywaterRecycling,
    ecoFriendlyInsulation,
    landscapingType,
    gardenSurface,
    pool,
    outdoorKitchen,
    terrace,
    exteriorFeatures,

    // Interior
    roomCount,
    bathroomCount,
    kitchenType, // "open" | "closed" | "island"
    flooringType, // "parquet" | "tile" | "concrete"
    wallCovering, // "paint" | "wallpaper" | "tile"

    // Location
    city,
    zipCode,

    // Contact Information
    firstName,
    lastName,
    email,
    phone,

    // Budget & Timeline
    budget,
    timeline,

    // Additional Details
    additionalDetails,

    // Additional form fields - étages et pièces
    niveaux,
    étages,
    combles,
    sousSOl,
    chambres,
    sallesDeBain,
    cuisine,
    salon,
    salleManger,
    bureau,
    
    // Caractéristiques techniques
    fondationType,
    structureMurs,
    typeCouverture,
    typeMenuiseries,
    typeIsolation,
    typeVentilation,
    typeEnergie,
    
    // Options spéciales
    domotique,
    alarme,
    climatisation,
    aspCentralisée,
    
    // Extérieur
    terrasse,
    balcon,
    piscine,
    poolHouse,
    aménagementPaysager,
    clôture,
    portail,
    carport,
    
    // Qualité de finition
    niveauFinition, // "standard" | "premium" | "luxe"
    
    // Budget et contraintes
    budgetMaxi,
    délaiSouhaité,
    contraintesParticulières,
  } = formData;

  // Parse surface and landPrice to numbers
  const surfaceValue = parseToNumber(surface);
  const landPriceValue = parseToNumber(landPrice);
  const gardenSurfaceValue = parseToNumber(gardenSurface);
  const floorCountValue = parseToNumber(floorCount);
  const roomCountValue = parseToNumber(roomCount);
  const bathroomCountValue = parseToNumber(bathroomCount);
  const budgetValue = parseToNumber(budget);
  const timelineValue = parseToNumber(timeline);
  const landSurfaceValue = parseToNumber(landSurface);
  const budgetMaxValue = parseToNumber(budgetMaxi);

  // Base costs
  let baseCostPerSqMeter = 1500; // Average cost per square meter
  if (projectType === 'renovation') {
    baseCostPerSqMeter = 1200; // Lower cost for renovations
  } else if (projectType === 'extension') {
    baseCostPerSqMeter = 1800; // Higher cost for extensions
  }

  // Adjustments based on construction style
  if (constructionStyle === 'modern') {
    baseCostPerSqMeter *= 1.1; // 10% increase for modern style
  } else if (constructionStyle === 'traditional') {
    baseCostPerSqMeter *= 0.9; // 10% decrease for traditional style
  } else if (constructionStyle === 'contemporary') {
    baseCostPerSqMeter *= 1.05; // 5% increase for contemporary style
  }

  // Adjustments based on finish quality
  if (niveauFinition === 'premium') {
    baseCostPerSqMeter *= 1.2; // 20% increase for premium finishes
  } else if (niveauFinition === 'luxe') {
    baseCostPerSqMeter *= 1.4; // 40% increase for luxury finishes
  }

  // Adjustments based on terrain type
  let terrainAdjustment = 1;
  if (terrainType === 'sloping') {
    terrainAdjustment = 1.1; // 10% increase for sloping terrain
  } else if (terrainType === 'wooded') {
    terrainAdjustment = 1.15; // 15% increase for wooded terrain
  }

  // Adjustments based on wall type
  let wallTypeAdjustment = 1;
  if (wallType === 'brick') {
    wallTypeAdjustment = 1.05; // 5% increase for brick walls
  } else if (wallType === 'wood') {
    wallTypeAdjustment = 0.95; // 5% decrease for wood walls
  }

  // Adjustments based on roof type
  let roofTypeAdjustment = 1;
  if (roofType === 'slate') {
    roofTypeAdjustment = 1.1; // 10% increase for slate roofs
  } else if (roofType === 'metal') {
    roofTypeAdjustment = 0.9; // 10% decrease for metal roofs
  }

  // Adjustments based on special features
  let specialFeaturesAdjustment = 0;
  if (solarPanelType) specialFeaturesAdjustment += 0.05;
  if (windTurbineType) specialFeaturesAdjustment += 0.05;
  if (rainwaterHarvesting) specialFeaturesAdjustment += 0.02;
  if (greywaterRecycling) specialFeaturesAdjustment += 0.03;
  if (ecoFriendlyInsulation) specialFeaturesAdjustment += 0.04;
  if (pool) specialFeaturesAdjustment += 0.06;
  if (outdoorKitchen) specialFeaturesAdjustment += 0.03;
  if (terrace) specialFeaturesAdjustment += 0.02;
  if (domotique) specialFeaturesAdjustment += 0.04;
  if (alarme) specialFeaturesAdjustment += 0.02;
  if (climatisation) specialFeaturesAdjustment += 0.03;
  if (aspCentralisée) specialFeaturesAdjustment += 0.01;
  if (piscine) specialFeaturesAdjustment += 0.08;
  if (poolHouse) specialFeaturesAdjustment += 0.04;

  // Calculate base construction cost
  let constructionCost = baseCostPerSqMeter * surfaceValue * terrainAdjustment * wallTypeAdjustment * roofTypeAdjustment * (1 + specialFeaturesAdjustment);

  // Add costs for additional rooms and levels
  const étagesValue = parseToNumber(étages);
  const chambresValue = parseToNumber(chambres);
  const sallesDeBainValue = parseToNumber(sallesDeBain);
  
  if (étagesValue > 1) {
    constructionCost *= (1 + ((étagesValue - 1) * 0.1)); // 10% increase per additional floor
  }
  
  if (sousSOl === 'yes' || basement === 'yes') {
    constructionCost += 500 * surfaceValue * 0.7; // 70% of main surface for basement
  }
  
  if (combles === 'aménagés') {
    constructionCost += 400 * surfaceValue * 0.5; // 50% of main surface for finished attic
  }

  if (hasGarage === 'yes') {
    constructionCost += 300 * (surfaceValue * 0.2); // 20% of main surface for garage
  }
  
  if (carport === 'yes') {
    constructionCost += 150 * (surfaceValue * 0.15); // 15% of main surface for carport
  }

  // Landscaping costs
  let landscapingCost = 0;
  if (landscapingType || aménagementPaysager) {
    landscapingCost = 100 * gardenSurfaceValue;
    
    if (clôture) landscapingCost += 50 * Math.sqrt(gardenSurfaceValue) * 4; // Approximate perimeter
    if (portail) landscapingCost += 2000; // Fixed cost for gate
    if (terrasse) landscapingCost += 200 * (surfaceValue * 0.2); // 20% of main surface for terrace
    if (balcon) landscapingCost += 300 * (surfaceValue * 0.1); // 10% of main surface for balcony
  }

  // Calculate total project cost
  let totalCost = constructionCost + landscapingCost;

  // Add land price if land is included
  if (landIncluded === 'yes') {
    totalCost += landPriceValue;
  }

  // Calculate fees
  const architectFees = 0.1 * constructionCost;
  const permitFees = 0.05 * constructionCost;
  const vat = 0.2 * totalCost;
  
  // Add fees to total
  totalCost += architectFees + permitFees + vat;

  // Format numbers for display
  const formatNumber = (value: number) => {
    return Math.round(value).toLocaleString('fr-FR');
  };

  // Calculate detailed breakdown by trade
  return {
    "Gros oeuvre": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.3)),
      details: [
        `Type de mur: ${wallType || 'Non spécifié'}`,
        `Fondations: ${fondationType || 'Standard'}`,
        `Élévation: ${structureMurs || 'Standard'}`
      ]
    },
    "Charpente": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.15)),
      details: [
        `Type de toit: ${roofType || 'Non spécifié'}`,
        `Charpente: ${typeCouverture ? 'Spéciale' : 'Traditionnelle'}`
      ]
    },
    "Couverture": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.1)),
      details: [
        `Type de couverture: ${typeCouverture || 'Tuiles céramiques'}`
      ]
    },
    "Menuiseries Extérieures": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.1)),
      details: [
        `Type de menuiseries: ${typeMenuiseries || formData.windowType || 'PVC double vitrage'}`
      ]
    },
    "Isolation/Étanchéité": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.08)),
      details: [
        `Type d'isolation: ${typeIsolation || 'Standard'}`,
        `Ventilation: ${typeVentilation || 'VMC simple flux'}`
      ]
    },
    "Électricité": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.07)),
      details: [
        `Type d'installation: ${domotique ? 'Avec domotique' : 'Standard'}`,
        `Alarme: ${alarme ? 'Incluse' : 'Non incluse'}`
      ]
    },
    "Plomberie/Sanitaires": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.08)),
      details: [
        `Salles de bain: ${sallesDeBainValue}`,
        `Type d'équipements: ${niveauFinition === 'luxe' ? 'Haut de gamme' : niveauFinition === 'premium' ? 'Qualité supérieure' : 'Standard'}`
      ]
    },
    "Chauffage/Climatisation": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.06)),
      details: [
        `Type d'énergie: ${typeEnergie || 'Gaz'}`,
        `Climatisation: ${climatisation ? 'Incluse' : 'Non incluse'}`
      ]
    },
    "Plâtrerie": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.05)),
      details: [
        `Cloisons et plafonds`,
        `Isolation intérieure`
      ]
    },
    "Menuiseries Intérieures": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.04)),
      details: [
        `Portes intérieures`,
        `Placards et rangements`,
        `Escalier: ${étagesValue > 1 ? 'Inclus' : 'Non applicable'}`
      ]
    },
    "Revêtements sols": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.05)),
      details: [
        `Type de sol: ${flooringType || 'Standard'}`
      ]
    },
    "Revêtements murs": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.03)),
      details: [
        `Type de revêtement: ${wallCovering || 'Peinture'}`
      ]
    },
    "Équipements cuisine": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.04)),
      details: [
        `Type de cuisine: ${kitchenType || 'Standard'}`,
        `Niveau d'équipement: ${niveauFinition === 'luxe' ? 'Haut de gamme' : niveauFinition === 'premium' ? 'Qualité supérieure' : 'Standard'}`
      ]
    },
    "Aménagements extérieurs": {
      montantHT: parseToNumber(formatNumber(landscapingCost)),
      details: [
        `Type d'aménagement: ${landscapingType || aménagementPaysager || 'Non spécifié'}`,
        `Terrasse: ${terrasse ? 'Incluse' : 'Non incluse'}`,
        `Piscine: ${piscine || pool ? 'Incluse' : 'Non incluse'}`
      ]
    },
    "Honoraires architecte": {
      montantHT: parseToNumber(formatNumber(architectFees)),
      details: [
        `Honoraires de l'architecte (10% du coût de construction)`
      ]
    },
    "Taxes et permis": {
      montantHT: parseToNumber(formatNumber(permitFees)),
      details: [
        `Taxes et permis de construire (5% du coût de construction)`
      ]
    },
    "TVA": {
      montantHT: parseToNumber(formatNumber(vat)),
      details: [
        `TVA (20%)`
      ]
    },
    totalHT: parseToNumber(formatNumber(totalCost - vat)),
    totalTTC: parseToNumber(formatNumber(totalCost)),
  };
};
