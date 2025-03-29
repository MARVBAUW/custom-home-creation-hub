import { FormData } from '../types';
import { ensureNumber } from '../utils/typeConversions';

/**
 * Calcule une estimation détaillée du projet de construction
 * @param formData Données du formulaire
 * @returns Estimation totale et ventilation par catégorie
 */
export const calculateDetailedEstimation = (formData: FormData) => {
  // Convertir les valeurs en nombres pour les calculs
  const surface = ensureNumber(formData.surface);
  const landPrice = ensureNumber(formData.landPrice);
  const terrainSurface = ensureNumber(formData.terrainSurface);
  
  // Initialiser les coûts par catégorie
  const categories = {
    terrain: 0,
    grosOeuvre: 0,
    charpenteCouverture: 0,
    menuiseriesExt: 0,
    isolation: 0,
    plomberie: 0,
    electricite: 0,
    chauffage: 0,
    platrerieIsolation: 0,
    menuiseriesInt: 0,
    revetementSol: 0,
    peinture: 0,
    amenagementExt: 0,
    fraisAnnexes: 0
  };
  
  // Prix au m² selon le type de construction
  let prixMetre = 0;
  
  if (formData.constructionType === 'traditional') {
    if (ensureNumber(formData.surface) > 150 && ensureNumber(formData.surface) < 200) {
      prixMetre = 1600;
    } else if (ensureNumber(formData.surface) > 200) {
      prixMetre = 1500;
    } else {
      prixMetre = 1800;
    }
  } else if (formData.constructionType === 'contemporary') {
    prixMetre = 2100;
  } else if (formData.constructionType === 'environmentally_friendly') {
    prixMetre = 2300;
  } else {
    prixMetre = 1800; // Valeur par défaut
  }
  
  // Ajuster en fonction du style architectural
  if (formData.constructionStyle === 'luxury') {
    prixMetre *= 1.3;
  } else if (formData.constructionStyle === 'premium') {
    prixMetre *= 1.15;
  } else if (formData.constructionStyle === 'budgetPlus') {
    prixMetre *= 0.9;
  } else if (formData.constructionStyle === 'budget') {
    prixMetre *= 0.8;
  }
  
  // Calculer le coût de terrain si inclus
  if (formData.landPrice && formData.landPrice > 0) {
    categories.terrain = ensureNumber(formData.landPrice);
  }
  
  // Calculer les coûts par corps d'état
  const totalConstructionCost = prixMetre * ensureNumber(formData.surface);
  
  // Répartition des coûts selon les corps d'état (pourcentages standards)
  categories.grosOeuvre = totalConstructionCost * 0.35;
  categories.charpenteCouverture = totalConstructionCost * 0.10;
  categories.menuiseriesExt = totalConstructionCost * 0.10;
  categories.isolation = totalConstructionCost * 0.07;
  categories.plomberie = totalConstructionCost * 0.06;
  categories.electricite = totalConstructionCost * 0.05;
  categories.chauffage = totalConstructionCost * 0.06;
  categories.platrerieIsolation = totalConstructionCost * 0.08;
  categories.menuiseriesInt = totalConstructionCost * 0.04;
  categories.revetementSol = totalConstructionCost * 0.05;
  categories.peinture = totalConstructionCost * 0.03;
  categories.amenagementExt = totalConstructionCost * 0.01;
  
  // Ajuster les coûts en fonction des spécificités
  
  // Niveaux: surcoût pour les étages
  const levels = ensureNumber(formData.levels);
  if (levels > 1) {
    categories.grosOeuvre *= (1 + (levels - 1) * 0.15);
  }
  
  // Sous-sol: surcoût important
  if (formData.basement) {
    categories.grosOeuvre *= 1.25;
  }
  
  // Type de toiture
  if (formData.roofType === 'complex') {
    categories.charpenteCouverture *= 1.3;
  } else if (formData.roofType === 'mansard') {
    categories.charpenteCouverture *= 1.2;
  }
  
  // Type d'isolation
  if (formData.insulationType === 'high_performance') {
    categories.isolation *= 1.3;
  } else if (formData.insulationType === 'ecological') {
    categories.isolation *= 1.4;
  }
  
  // Type de chauffage
  if (formData.heatingType === 'pompe') {
    categories.chauffage *= 1.3;
  } else if (formData.heatingType === 'solaire') {
    categories.chauffage *= 1.5;
  }
  
  // Climatisation
  if (formData.hasAirConditioning) {
    categories.chauffage += 8000;
  }
  
  // Frais annexes (études, assurances, etc.) - environ 10% du coût total
  const constructionTotal = Object.values(categories).reduce((sum, value) => sum + value, 0) - categories.terrain;
  categories.fraisAnnexes = constructionTotal * 0.10;
  
  // Calculer le total général
  const totalEstimation = Object.values(categories).reduce((sum, value) => sum + value, 0);
  
  // Données françaises pour le format de retour
  const niveaux = formData.levels;
  const étages = formData.levels;
  const combles = formData.atticType;
  const sousSOl = formData.basement;
  
  // Pièces
  const chambres = formData.bedrooms;
  const sallesDeBain = formData.bathrooms;
  const cuisine = formData.kitchenType;
  const salon = formData.livingRoomSize;
  const salleManger = formData.livingRoomStyle === 'open';
  const bureau = false; // Non spécifié dans le formulaire
  
  // Caractéristiques techniques
  const fondationType = formData.foundationType;
  const structureMurs = formData.wallType;
  const typeCouverture = formData.roofingType;
  const typeMenuiseries = formData.windowType;
  const typeIsolation = formData.insulationType;
  const typeVentilation = 'VMC double flux'; // Valeur par défaut
  const typeEnergie = formData.heatingType;
  
  // Options
  const domotique = false; // Non spécifié dans le formulaire
  const alarme = false; // Non spécifié dans le formulaire
  const climatisation = formData.hasAirConditioning;
  const aspCentralisée = false; // Non spécifié dans le formulaire
  
  // Extérieur
  const terrasse = formData.terrace;
  const balcon = false; // Non spécifié dans le formulaire
  const piscine = formData.pool;
  const poolHouse = false; // Non spécifié dans le formulaire
  const aménagementPaysager = false; // Non spécifié dans le formulaire
  const clôture = false; // Non spécifié dans le formulaire
  const portail = false; // Non spécifié dans le formulaire
  const carport = false; // Non spécifié dans le formulaire
  
  // Qualité et finitions
  const niveauFinition = formData.finishLevel;
  
  // Contraintes
  const budgetMaxi = formData.budget;
  const délaiSouhaité = '12 mois'; // Valeur par défaut
  const contraintesParticulières = ''; // Non spécifié dans le formulaire
  
  // Formater les catégories pour l'affichage
  const categoriesArray = [
    { category: 'Terrain', amount: Math.round(categories.terrain) },
    { category: 'Gros œuvre', amount: Math.round(categories.grosOeuvre) },
    { category: 'Charpente / Couverture', amount: Math.round(categories.charpenteCouverture) },
    { category: 'Menuiseries extérieures', amount: Math.round(categories.menuiseriesExt) },
    { category: 'Isolation', amount: Math.round(categories.isolation) },
    { category: 'Plomberie', amount: Math.round(categories.plomberie) },
    { category: 'Électricité', amount: Math.round(categories.electricite) },
    { category: 'Chauffage / Climatisation', amount: Math.round(categories.chauffage) },
    { category: 'Plâtrerie / Isolation intérieure', amount: Math.round(categories.platrerieIsolation) },
    { category: 'Menuiseries intérieures', amount: Math.round(categories.menuiseriesInt) },
    { category: 'Revêtement de sol', amount: Math.round(categories.revetementSol) },
    { category: 'Peinture', amount: Math.round(categories.peinture) },
    { category: 'Aménagement extérieur', amount: Math.round(categories.amenagementExt) },
    { category: 'Frais annexes', amount: Math.round(categories.fraisAnnexes) },
  ];
  
  // Calculer les prix par m²
  const prixTerrainM2 = terrainSurface > 0 ? Math.round(ensureNumber(landPrice) / terrainSurface) : 0;
  const prixConstructionM2 = surface > 0 ? Math.round((totalEstimation - ensureNumber(landPrice)) / surface) : 0;
  const ratioTerrainConstruction = totalEstimation > 0 ? (ensureNumber(landPrice) / totalEstimation) * 100 : 0;
  
  // Catégories détaillées pour l'affichage
  let detailedCategories = [
    {
      title: 'Terrain',
      details: [
        { label: 'Prix du terrain', value: `${landPrice ? landPrice.toLocaleString('fr-FR') : 0} €` },
        { label: 'Surface du terrain', value: `${terrainSurface} m²` },
        { label: 'Prix au m²', value: `${prixTerrainM2} €/m²` },
        { label: 'Part du terrain', value: `${Math.round(ratioTerrainConstruction)}%` }
      ]
    },
    {
      title: 'Construction',
      details: [
        { label: 'Surface habitable', value: `${surface} m²` },
        { label: 'Prix construction', value: `${Math.round(totalEstimation - ensureNumber(landPrice)).toLocaleString('fr-FR')} €` },
        { label: 'Prix au m²', value: `${prixConstructionM2} €/m²` },
        { label: 'Type construction', value: formData.constructionType || 'Standard' }
      ]
    },
    {
      title: 'Détails techniques',
      details: [
        { label: 'Niveaux', value: `${niveaux || '1'}` },
        { label: 'Chambres', value: `${chambres || '3'}` },
        { label: 'Salles de bain', value: `${sallesDeBain || '2'}` },
        { label: 'Chauffage', value: typeEnergie || 'Pompe à chaleur' }
      ]
    }
  ];
  
  // Retourner l'estimation complète
  return {
    totalEstimation: Math.round(totalEstimation),
    categories: categoriesArray,
    detailedCategories,
    prixMetre,
    prixTerrainM2,
    prixConstructionM2,
    surface,
    terrainSurface,
    ratioTerrainConstruction: Math.round(ratioTerrainConstruction),
    francaisData: {
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
      fondationType,
      structureMurs,
      typeCouverture,
      typeMenuiseries,
      typeIsolation,
      typeVentilation,
      typeEnergie,
      domotique,
      alarme,
      climatisation,
      aspCentralisée,
      terrasse,
      balcon,
      piscine,
      poolHouse,
      aménagementPaysager,
      clôture,
      portail,
      carport,
      niveauFinition,
      budgetMaxi,
      délaiSouhaité,
      contraintesParticulières
    }
  };
};

/**
 * Function kept for backward compatibility
 * @deprecated Use calculateDetailedEstimation instead
 */
export const calculateEstimation = (formData: FormData): number => {
  // Obtenir l'estimation détaillée
  const detailedEstimation = calculateDetailedEstimation(formData);
  return detailedEstimation.totalEstimation;
};
