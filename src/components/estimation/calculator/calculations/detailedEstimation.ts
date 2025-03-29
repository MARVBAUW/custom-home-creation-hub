import { FormData } from '../../types';
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
    garage, // "yes" | "no"
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
    wall покрытие, // "paint" | "wallpaper" | "tile"

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
  } = formData;

  // Helper function to parse values to numbers
  const parseToNumber = (value: any): number => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

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
  if (solarPanelType) {
    specialFeaturesAdjustment += 0.05; // 5% increase for solar panels
  }
  if (windTurbineType) {
    specialFeaturesAdjustment += 0.05; // 5% increase for wind turbine
  }
  if (rainwaterHarvesting) {
    specialFeaturesAdjustment += 0.02; // 2% increase for rainwater harvesting
  }
  if (greywaterRecycling) {
    specialFeaturesAdjustment += 0.03; // 3% increase for greywater recycling
  }
  if (ecoFriendlyInsulation) {
    specialFeaturesAdjustment += 0.04; // 4% increase for eco-friendly insulation
  }
  if (pool) {
    specialFeaturesAdjustment += 0.06; // 6% increase for pool
  }
   if (outdoorKitchen) {
     specialFeaturesAdjustment += 0.03; // 3% increase for outdoor kitchen
   }
   if (terrace) {
     specialFeaturesAdjustment += 0.02; // 2% increase for terrace
   }

  // Calculate base construction cost
  let constructionCost = baseCostPerSqMeter * surfaceValue * terrainAdjustment * wallTypeAdjustment * roofTypeAdjustment * (1 + specialFeaturesAdjustment);

  // Add basement cost if applicable
  if (basement === 'yes') {
    constructionCost += 500 * surfaceValue; // Additional cost for basement
  }

  // Add garage cost if applicable
  if (garage === 'yes') {
    constructionCost += 300 * surfaceValue; // Additional cost for garage
  }

  let landscapingCost = 0;
   if (landscapingType) {
     landscapingCost = 100 * gardenSurfaceValue; // Cost based on garden surface
   }

  // Calculate total project cost
  let totalCost = constructionCost + landscapingCost;

  // Add land price if land is included
  if (landIncluded === 'yes') {
    totalCost += landPriceValue;
  }

  // Calculate architect fees (10% of construction cost)
  const architectFees = 0.1 * constructionCost;
  totalCost += architectFees;

  // Calculate permit fees (5% of construction cost)
  const permitFees = 0.05 * constructionCost;
  totalCost += permitFees;

  // Calculate VAT (20% of total cost)
  const vat = 0.2 * totalCost;
  totalCost += vat;

  const formatNumber = (value: number) => {
    return Math.round(value).toLocaleString('fr-FR');
  };

  return {
    "Gros oeuvre": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.3)),
      details: [
        `Type de mur: ${wallType || 'Non spécifié'}`,
        `Fondations`,
        `Élévation`
      ]
    },
    "Charpente": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.15)),
      details: [
        `Type de toit: ${roofType || 'Non spécifié'}`,
        `Charpente traditionnelle`
      ]
    },
    "Couverture": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.1)),
      details: [
        `Tuiles céramiques`
      ]
    },
    "Menuiseries Extérieures": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.1)),
      details: [
        `Type de menuiseries: ${windowType || 'Non spécifié'}`,
        `PVC double vitrage`
      ]
    },
    "Second oeuvre": {
      montantHT: parseToNumber(formatNumber(constructionCost * 0.35)),
      details: [
        `Plomberie`,
        `Électricité`,
        `Isolation`,
        `Plâtrerie`,
        `Peinture`
      ]
    },
    "Aménagements extérieurs": {
      montantHT: parseToNumber(formatNumber(landscapingCost)),
      details: [
        `Type d'aménagement paysager: ${landscapingType || 'Non spécifié'}`
      ]
    },
    "Honoraires architecte": {
      montantHT: parseToNumber(formatNumber(architectFees)),
      details: [
        `Honoraires de l'architecte`
      ]
    },
    "Taxes et permis": {
      montantHT: parseToNumber(formatNumber(permitFees)),
      details: [
        `Taxes et permis de construire`
      ]
    },
    "TVA": {
      montantHT: parseToNumber(formatNumber(vat)),
      details: [
        `TVA`
      ]
    },
    totalHT: parseToNumber(formatNumber(constructionCost)),
    totalTTC: parseToNumber(formatNumber(totalCost)),
  };
};
