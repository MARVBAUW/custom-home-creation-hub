
// Detailed estimation calculation function that takes in the form data and returns a detailed estimate
import { FormData } from "../types";

export interface DetailedEstimation {
  totalHT: number;
  totalTTC: number;
  vat: number;
  coutGlobalHT: number;
  coutGlobalTTC: number;
  honorairesHT: number;
  taxeAmenagement: number;
  garantieDecennale: number;
  etudesGeotechniques: number;
  etudeThermique: number;
  corpsEtat: {
    [key: string]: {
      montantHT: number;
      details: string[];
    };
  };
}

export const calculateDetailedEstimation = (formData: FormData): DetailedEstimation => {
  console.log("Calculating detailed estimation with formData:", formData);
  
  // Default values if not provided
  const livingArea = formData.livingArea || 100; // m²
  const basePricePerSqm = 1200; // €/m²
  
  // Price modifiers
  const coefficients = {
    clientType: formData.clientType === 'professional' ? 1.2 : 1,
    projectType: formData.projectType === 'renovation' ? 0.9 : 1.1,
    size: livingArea > 150 ? 0.95 : livingArea < 80 ? 1.1 : 1,
    landSurface: formData.landSurface && formData.landSurface > 1000 ? 1.1 : 1,
    quality: 1.0, // Standard by default
  };
  
  // Quality adjustment based on finishing level
  if (formData.finishingLevel === 'premium') {
    coefficients.quality = 1.3;
  } else if (formData.finishingLevel === 'economic') {
    coefficients.quality = 0.85;
  }
  
  // Specific building components
  const hasBasement = formData.basement || false;
  const hasGarage = formData.garage || false;
  const floorsCount = formData.floorCount || 1;
  
  // Calculate base price with all coefficients
  let basePrice = basePricePerSqm * livingArea;
  
  Object.values(coefficients).forEach(coeff => {
    basePrice *= coeff;
  });
  
  // Add extras for specific building components
  if (hasBasement) {
    basePrice += 15000;
  }
  
  if (hasGarage) {
    basePrice += 10000;
  }
  
  if (floorsCount > 1) {
    basePrice += (floorsCount - 1) * 8000; // Additional cost per floor
  }
  
  // Create a detailed breakdown by "Corps d'État" (trade)
  const corpsEtat: DetailedEstimation['corpsEtat'] = {
    terrasse: { montantHT: 0, details: [] },
    vrd: { montantHT: 0, details: [] },
    grosOeuvre: { montantHT: 0, details: [] },
    charpente: { montantHT: 0, details: [] },
    couverture: { montantHT: 0, details: [] },
    menuiseriesExt: { montantHT: 0, details: [] },
    cloisons: { montantHT: 0, details: [] },
    menuiseriesInt: { montantHT: 0, details: [] },
    electricite: { montantHT: 0, details: [] },
    plomberie: { montantHT: 0, details: [] },
    chauffage: { montantHT: 0, details: [] },
    facade: { montantHT: 0, details: [] },
    peinture: { montantHT: 0, details: [] },
    revetements: { montantHT: 0, details: [] },
    amenagements: { montantHT: 0, details: [] },
  };
  
  // Apply specific adjustments based on form data choices
  // Wall type adjustments
  if (formData.wallType === 'brick') {
    corpsEtat.grosOeuvre.montantHT += livingArea * 180;
    corpsEtat.grosOeuvre.details.push('Murs en briques');
  } else if (formData.wallType === 'wood') {
    corpsEtat.grosOeuvre.montantHT += livingArea * 160;
    corpsEtat.grosOeuvre.details.push('Ossature bois');
  } else if (formData.wallType === 'concrete') {
    corpsEtat.grosOeuvre.montantHT += livingArea * 170;
    corpsEtat.grosOeuvre.details.push('Murs en béton');
  } else {
    corpsEtat.grosOeuvre.montantHT += livingArea * 150;
    corpsEtat.grosOeuvre.details.push('Murs standard');
  }
  
  // Base VRD costs
  corpsEtat.vrd.montantHT += livingArea * 80;
  corpsEtat.vrd.details.push('Voirie et Réseaux Divers');
  
  // Additional costs based on form data
  if (formData.wallCovering === 'stone') {
    corpsEtat.facade.montantHT += livingArea * 120;
    corpsEtat.facade.details.push('Façade en pierre');
  } else {
    corpsEtat.facade.montantHT += livingArea * 60;
    corpsEtat.facade.details.push('Enduit de façade');
  }
  
  // Regional coefficient based on zip code (if available)
  let regionalCoefficient = 1.0;
  if (formData.zipCode) {
    const region = formData.zipCode.substring(0, 2);
    if (['75', '77', '78', '91', '92', '93', '94', '95'].includes(region)) {
      regionalCoefficient = 1.3; // Paris region
    } else if (['06', '13', '83', '84'].includes(region)) {
      regionalCoefficient = 1.15; // PACA region
    }
  }
  
  // Timeline adjustment
  let timelineCoefficient = 1.0;
  if (formData.timeline === 'urgent') {
    timelineCoefficient = 1.2;
  } else if (formData.timeline === 'flexible') {
    timelineCoefficient = 0.95;
  }
  
  // Additional features
  if (formData.additionalDetails?.includes('custom')) {
    basePrice *= 1.15;
  }
  
  // Calculate additional corps d'état based on form data
  const calculateCorpsEtat = () => {
    // Structure and levels
    const niveaux = formData.niveaux || 1;
    const etages = formData.étages || 0;
    const combles = formData.combles || 0;
    const sousSol = formData.sousSOl || false;
    
    // Rooms
    const chambres = formData.chambres || 2;
    const sallesDeBain = formData.sallesDeBain || 1;
    const cuisine = formData.cuisine || 'standard';
    const salon = formData.salon || true;
    const salleManger = formData.salleManger || false;
    const bureau = formData.bureau || false;
    
    // Technical systems
    const fondationType = formData.fondationType || 'standard';
    const structureMurs = formData.structureMurs || 'parpaings';
    const typeCouverture = formData.typeCouverture || 'tuiles';
    const typeMenuiseries = formData.typeMenuiseries || 'pvc';
    const typeIsolation = formData.typeIsolation || 'standard';
    const typeVentilation = formData.typeVentilation || 'simple_flux';
    const typeEnergie = formData.typeEnergie || 'gaz';
    
    // Special equipment
    const domotique = formData.domotique || false;
    const alarme = formData.alarme || false;
    const climatisation = formData.climatisation || false;
    const aspCentralisée = formData.aspCentralisée || false;
    
    // Exterior features
    const terrasse = formData.terrasse || false;
    const balcon = formData.balcon || false;
    const piscine = formData.piscine || false;
    const poolHouse = formData.poolHouse || false;
    const amenagementPaysager = formData.aménagementPaysager || false;
    const cloture = formData.clôture || false;
    const portail = formData.portail || false;
    const carport = formData.carport || false;
    
    // Finish level
    const niveauFinition = formData.niveauFinition || 'standard';
    
    // Client preferences
    const budgetMaxi = formData.budgetMaxi || 0;
    const delaiSouhaite = formData.délaiSouhaité || 'normal';
    const contraintesParticulieres = formData.contraintesParticulières || '';
    
    // Calculate gros œuvre based on the structure
    corpsEtat.grosOeuvre.montantHT += livingArea * (niveaux * 250 + (sousSol ? 300 : 0));
    corpsEtat.grosOeuvre.details.push(`${niveaux} niveau(x)${sousSol ? ' avec sous-sol' : ''}`);
    
    // Calculate roof based on type and size
    const surfaceToiture = livingArea * 1.2;  // Approximation
    if (formData.roofType === 'flat') {
      corpsEtat.couverture.montantHT += surfaceToiture * 180;
      corpsEtat.couverture.details.push('Toit terrasse');
    } else {
      corpsEtat.couverture.montantHT += surfaceToiture * 150;
      corpsEtat.couverture.details.push('Toit en pente');
    }
    
    // Calculate electrical system based on type
    if (formData.electricalType === 'premium') {
      corpsEtat.electricite.montantHT += livingArea * 110;
      corpsEtat.electricite.details.push('Installation électrique premium');
    } else if (formData.electricalType === 'standard') {
      corpsEtat.electricite.montantHT += livingArea * 80;
      corpsEtat.electricite.details.push('Installation électrique standard');
    } else {
      corpsEtat.electricite.montantHT += livingArea * 60;
      corpsEtat.electricite.details.push('Installation électrique basique');
    }
    
    // Calculate plumbing system based on type
    if (formData.plumbingType === 'premium') {
      corpsEtat.plomberie.montantHT += livingArea * 100 + sallesDeBain * 3000;
      corpsEtat.plomberie.details.push('Plomberie premium');
    } else if (formData.plumbingType === 'standard') {
      corpsEtat.plomberie.montantHT += livingArea * 70 + sallesDeBain * 2000;
      corpsEtat.plomberie.details.push('Plomberie standard');
    } else {
      corpsEtat.plomberie.montantHT += livingArea * 50 + sallesDeBain * 1500;
      corpsEtat.plomberie.details.push('Plomberie basique');
    }
    
    // Calculate exterior features
    if (terrasse) {
      corpsEtat.terrasse.montantHT += livingArea * 0.3 * 200;  // Assuming terrace is 30% of living area
      corpsEtat.terrasse.details.push('Terrasse');
    }
    
    if (piscine) {
      corpsEtat.amenagements.montantHT += 20000;  // Base pool cost
      corpsEtat.amenagements.details.push('Piscine');
    }
    
    // Calculate windows (menuiseries extérieures)
    let windowCoef = 1.0;
    if (formData.windowType === 'aluminum') {
      windowCoef = 1.5;
    } else if (formData.windowType === 'wood') {
      windowCoef = 1.3;
    }
    
    // Calculate window area or use a default approximation
    const windowArea = formData.windowNewArea || (livingArea * 0.15);
    corpsEtat.menuiseriesExt.montantHT += windowArea * 600 * windowCoef;
    corpsEtat.menuiseriesExt.details.push(`Fenêtres ${formData.windowType || 'standard'}`);
    
    // Calculate flooring (revêtements de sol)
    const tileSurface = formData.tileSurface || (livingArea * 0.3);
    const parquetSurface = formData.parquetSurface || (livingArea * 0.5);
    const otherSurface = livingArea - tileSurface - parquetSurface;
    
    corpsEtat.revetements.montantHT += tileSurface * 100 + parquetSurface * 120 + otherSurface * 60;
    corpsEtat.revetements.details.push(`${tileSurface}m² de carrelage, ${parquetSurface}m² de parquet`);
    
    // Calculate painting (peinture)
    const paintSurface = formData.paintSurface || (livingArea * 2.7);  // Wall height approximation
    corpsEtat.peinture.montantHT += paintSurface * 30;
    corpsEtat.peinture.details.push(`${paintSurface}m² de peinture`);
    
    // Calculate interior doors (menuiseries intérieures)
    const doorCount = chambres + sallesDeBain + 2;  // Approximate door count
    let doorUnitPrice = 400;  // Standard door
    
    if (formData.doorType === 'premium') {
      doorUnitPrice = 700;
    } else if (formData.doorType === 'custom') {
      doorUnitPrice = 1000;
    }
    
    corpsEtat.menuiseriesInt.montantHT += doorCount * doorUnitPrice;
    corpsEtat.menuiseriesInt.details.push(`${doorCount} portes intérieures ${formData.doorType || 'standard'}`);
    
    // Calculate partitions (cloisons)
    corpsEtat.cloisons.montantHT += livingArea * 70;
    corpsEtat.cloisons.details.push('Cloisons et isolation intérieure');
    
    // Calculate heating system (chauffage)
    let heatingCost = livingArea * 80;  // Base heating cost
    
    if (formData.heatingType === 'heat_pump') {
      heatingCost = livingArea * 150;
      corpsEtat.chauffage.details.push('Pompe à chaleur');
    } else if (formData.heatingType === 'solar') {
      heatingCost = livingArea * 180;
      corpsEtat.chauffage.details.push('Chauffage solaire');
    } else if (formData.heatingType === 'gas') {
      heatingCost = livingArea * 100;
      corpsEtat.chauffage.details.push('Chauffage au gaz');
    } else if (formData.heatingType === 'electric') {
      heatingCost = livingArea * 80;
      corpsEtat.chauffage.details.push('Chauffage électrique');
    } else {
      corpsEtat.chauffage.details.push('Système de chauffage standard');
    }
    
    corpsEtat.chauffage.montantHT += heatingCost;
  };
  
  // Execute the detailed corps d'état calculation
  calculateCorpsEtat();
  
  // Calculate any missing corps d'état based on a percentage of base price
  let totalCorpsEtatHT = 0;
  
  for (const category in corpsEtat) {
    if (corpsEtat[category].montantHT === 0) {
      // If not specifically calculated, use a default percentage
      const defaultPercentages: { [key: string]: number } = {
        terrasse: 0.04,
        vrd: 0.06,
        grosOeuvre: 0.25,
        charpente: 0.08,
        couverture: 0.07,
        menuiseriesExt: 0.08,
        cloisons: 0.06,
        menuiseriesInt: 0.05,
        electricite: 0.06,
        plomberie: 0.06,
        chauffage: 0.05,
        facade: 0.04,
        peinture: 0.03,
        revetements: 0.05,
        amenagements: 0.02,
      };
      
      corpsEtat[category].montantHT = basePrice * (defaultPercentages[category] || 0.05);
      corpsEtat[category].details.push(`Estimation forfaitaire`);
    }
    
    // Apply regional and timeline coefficients
    corpsEtat[category].montantHT *= regionalCoefficient * timelineCoefficient;
    
    // Round to nearest 100
    corpsEtat[category].montantHT = Math.round(corpsEtat[category].montantHT / 100) * 100;
    
    totalCorpsEtatHT += corpsEtat[category].montantHT;
  }
  
  // Fees and additional costs
  const honorairesHT = totalCorpsEtatHT * 0.1; // 10% of construction cost
  const taxeAmenagement = totalCorpsEtatHT * 0.03; // 3% of construction cost
  const garantieDecennale = totalCorpsEtatHT * 0.02; // 2% of construction cost
  const etudesGeotechniques = 2500;
  const etudeThermique = 1500;
  
  // VAT
  const vat = totalCorpsEtatHT * 0.2; // 20% VAT
  
  // Total costs
  const totalHT = totalCorpsEtatHT;
  const totalTTC = totalHT + vat;
  
  // Global cost including fees and studies
  const coutGlobalHT = totalHT + honorairesHT + taxeAmenagement + garantieDecennale + etudesGeotechniques + etudeThermique;
  const coutGlobalTTC = coutGlobalHT * 1.2; // Add 20% VAT
  
  return {
    totalHT,
    totalTTC,
    vat,
    coutGlobalHT,
    coutGlobalTTC,
    honorairesHT,
    taxeAmenagement,
    garantieDecennale,
    etudesGeotechniques,
    etudeThermique,
    corpsEtat,
  };
};
