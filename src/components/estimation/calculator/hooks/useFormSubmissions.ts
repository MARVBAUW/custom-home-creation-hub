import { useToast } from "@/components/ui/use-toast";
import { FormData } from '../types';

export const useFormSubmissions = (
  formData: FormData, 
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void,
  goToNextStep: () => void,
  finalizeEstimation: () => void
) => {
  const { toast } = useToast();

  // Soumission du formulaire de type de client
  const onClientTypeSubmit = (data: { clientType: string }) => {
    updateFormData({ clientType: data.clientType });
    
    // Déterminer l'étape suivante en fonction du type de client
    if (data.clientType === "professional") {
      setStep(2); // Infos projet pro
    } else {
      setStep(3); // Infos projet particulier
    }
  };

  // Soumission du formulaire de projet professionnel
  const onProfessionalProjectSubmit = (data: { 
    activity: string;
    projectType: string;
    startDate: string;
    endDate: string;
  }) => {
    updateFormData({
      activity: data.activity,
      projectType: data.projectType,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    setStep(4); // Type d'estimation
  };

  // Soumission du formulaire de projet particulier
  const onIndividualProjectSubmit = (data: { projectType: string }) => {
    updateFormData({ projectType: data.projectType });
    setStep(4); // Type d'estimation
  };

  // Soumission du formulaire de type d'estimation
  const onEstimationTypeSubmit = (data: { 
    estimationType: string;
    termsAccepted: boolean;
  }) => {
    updateFormData({
      estimationType: data.estimationType,
      termsAccepted: data.termsAccepted,
    });
    setStep(5); // Détails de construction
  };

  // Soumission du formulaire de détails de construction
  const onConstructionDetailsSubmit = (data: {
    surface: string;
    levels: string;
    units: string;
  }) => {
    updateFormData({
      surface: data.surface,
      levels: data.levels,
      units: data.units,
    });
    goToNextStep(); // Passer à l'étape terrain (6)
  };

  // Soumission du formulaire de terrain
  const onTerrainSubmit = (data: {
    terrainType: string;
  }) => {
    updateFormData({
      terrainType: data.terrainType,
    });
    goToNextStep(); // Passer à l'étape gros oeuvre (7)
  };

  // Soumission du formulaire de gros oeuvre
  const onGrosOeuvreSubmit = (data: {
    wallType: string;
  }) => {
    updateFormData({
      wallType: data.wallType,
    });
    goToNextStep(); // Passer à l'étape charpente (8)
  };

  // Soumission du formulaire de charpente
  const onCharpenteSubmit = (data: {
    roofType: string;
  }) => {
    updateFormData({
      roofType: data.roofType,
    });
    goToNextStep(); // Passer à l'étape combles (9)
  };

  // Soumission du formulaire de combles
  const onComblesSubmit = (data: {
    atticType: string;
  }) => {
    updateFormData({
      atticType: data.atticType,
    });
    goToNextStep(); // Passer à l'étape couverture (10)
  };

  // Soumission du formulaire de couverture
  const onCouvertureSubmit = (data: {
    roofingType: string;
  }) => {
    updateFormData({
      roofingType: data.roofingType,
    });
    goToNextStep(); // Passer à l'étape isolation (11)
  };

  // Soumission du formulaire d'isolation
  const onIsolationSubmit = (data: {
    insulationType: string;
  }) => {
    updateFormData({
      insulationType: data.insulationType,
    });
    goToNextStep(); // Passer à l'étape façade (12)
  };

  // Soumission du formulaire de façade
  const onFacadeSubmit = (data: {
    stonePercentage: string;
    plasterPercentage: string;
    brickPercentage: string;
    metalCladdingPercentage: string;
    woodCladdingPercentage: string;
    stoneCladdingPercentage: string;
  }) => {
    updateFormData({
      stonePercentage: data.stonePercentage,
      plasterPercentage: data.plasterPercentage,
      brickPercentage: data.brickPercentage,
      metalCladdingPercentage: data.metalCladdingPercentage,
      woodCladdingPercentage: data.woodCladdingPercentage,
      stoneCladdingPercentage: data.stoneCladdingPercentage,
    });
    goToNextStep(); // Passer à l'étape menuiseries extérieures (13)
  };

  // Soumission du formulaire de menuiseries extérieures
  const onMenuiseriesExtSubmit = (data: {
    windowType: string;
    windowRenovationArea?: string;
    windowNewArea?: string;
  }) => {
    updateFormData({
      windowType: data.windowType,
      windowRenovationArea: data.windowRenovationArea,
      windowNewArea: data.windowNewArea,
    });
    goToNextStep(); // Passer à l'étape électricité (14)
  };

  // Soumission du formulaire d'électricité
  const onElectriciteSubmit = (data: {
    electricalType: string;
  }) => {
    updateFormData({
      electricalType: data.electricalType,
    });
    goToNextStep(); // Passer à l'étape plomberie (15)
  };

  // Soumission du formulaire de plomberie
  const onPlomberieSubmit = (data: {
    plumbingType: string;
  }) => {
    updateFormData({
      plumbingType: data.plumbingType,
    });
    goToNextStep(); // Passer à l'étape chauffage (16)
  };

  // Soumission du formulaire de chauffage
  const onChauffageSubmit = (data: {
    heatingType: string;
    hasAirConditioning: string;
  }) => {
    updateFormData({
      heatingType: data.heatingType,
      hasAirConditioning: data.hasAirConditioning,
    });
    goToNextStep(); // Passer à l'étape plâtrerie (17)
  };

  // Soumission du formulaire de plâtrerie
  const onPlatrerieSubmit = (data: {
    plasteringType: string;
  }) => {
    updateFormData({
      plasteringType: data.plasteringType,
    });
    goToNextStep(); // Passer à l'étape menuiseries intérieures (18)
  };

  // Soumission du formulaire de menuiseries intérieures
  const onMenuiseriesIntSubmit = (data: {
    doorType: string;
    interiorFittings: string[];
  }) => {
    updateFormData({
      doorType: data.doorType,
      interiorFittings: data.interiorFittings,
    });
    goToNextStep(); // Passer à l'étape carrelage (19)
  };

  // Soumission du formulaire de carrelage
  const onCarrelageSubmit = (data: {
    floorTileType: string;
    wallTileType: string;
    floorTilePercentage: string;
  }) => {
    updateFormData({
      floorTileType: data.floorTileType,
      wallTileType: data.wallTileType,
      floorTilePercentage: data.floorTilePercentage,
    });
    goToNextStep(); // Passer à l'étape parquet (20)
  };

  // Soumission du formulaire de parquet
  const onParquetSubmit = (data: {
    parquetType: string;
    parquetPercentage: string;
    softFloorType: string;
    softFloorPercentage: string;
  }) => {
    updateFormData({
      parquetType: data.parquetType,
      parquetPercentage: data.parquetPercentage,
      softFloorType: data.softFloorType,
      softFloorPercentage: data.softFloorPercentage,
    });
    goToNextStep(); // Passer à l'étape peinture (21)
  };

  // Soumission du formulaire de peinture
  const onPeintureSubmit = (data: {
    basicPaintPercentage: string;
    decorativePaintPercentage: string;
    wallpaperPercentage: string;
    woodCladPercentage: string;
    stoneCladPercentage: string;
  }) => {
    updateFormData({
      basicPaintPercentage: data.basicPaintPercentage,
      decorativePaintPercentage: data.decorativePaintPercentage,
      wallpaperPercentage: data.wallpaperPercentage,
      woodCladPercentage: data.woodCladPercentage,
      stoneCladPercentage: data.stoneCladPercentage,
    });
    goToNextStep(); // Passer à l'étape cuisines (22)
  };

  // Soumission du formulaire d'énergies renouvelables
  const onEnergiesRenouvelablesSubmit = (data: {
    energyType: string;
  }) => {
    updateFormData({
      energyType: data.energyType,
    });
    
    // Déterminer l'étape suivante en fonction du projet
    // Si cuisine équipée est sélectionnée
    if (formData.includeCuisine) {
      setStep(27); // Aller à l'étape cuisine
    } 
    // Si salle de bain est sélectionnée
    else if (formData.includeBathroom) {
      setStep(28); // Aller à l'étape salle de bain
    }
    // Sinon, on finalise
    else {
      setStep(36); // Aller à la dernière étape (contact)
    }
  };

  // Soumission du formulaire de solutions environnementales
  const onSolutionsEnvironSubmit = (data: {
    solutionType: string;
  }) => {
    updateFormData({
      solutionType: data.solutionType,
    });
    
    // Logique similaire pour déterminer l'étape suivante
    if (formData.includeCuisine) {
      setStep(27);
    } else if (formData.includeBathroom) {
      setStep(28);
    } else {
      setStep(36);
    }
  };

  // Soumission du formulaire d'aménagements paysagers
  const onAmenagementPaysagerSubmit = (data: {
    landscapeLevel: string;
    fencingLength: string;
    gateLength: string;
    terraceArea: string;
    landscapeArea: string;
  }) => {
    updateFormData({
      landscapeLevel: data.landscapeLevel,
      fencingLength: data.fencingLength,
      gateLength: data.gateLength,
      terraceArea: data.terraceArea,
      landscapeArea: data.landscapeArea,
    });
    
    // Déterminer l'étape suivante
    if (formData.includeOptions) {
      setStep(26); // Aller à l'étape options (piscine, jacuzzi, carport)
    } else if (formData.includeCuisine) {
      setStep(27);
    } else if (formData.includeBathroom) {
      setStep(28);
    } else {
      setStep(36);
    }
  };

  // Soumission du formulaire d'options
  const onOptionsSubmit = (data: {
    carport: string;
    pool: string;
    poolArea: string;
    poolHeating: string;
    jacuzzi: string;
    jacuzziArea: string;
  }) => {
    updateFormData({
      carport: data.carport,
      pool: data.pool,
      poolArea: data.poolArea,
      poolHeating: data.poolHeating,
      jacuzzi: data.jacuzzi,
      jacuzziArea: data.jacuzziArea,
    });
    
    // Déterminer l'étape suivante
    if (formData.includeCuisine) {
      setStep(27);
    } else if (formData.includeBathroom) {
      setStep(28);
    } else {
      setStep(36);
    }
  };

  // Soumission du formulaire de cuisine
  const onCuisineSubmit = (data: {
    kitchenType: string;
  }) => {
    updateFormData({
      kitchenType: data.kitchenType,
    });
    
    // Déterminer l'étape suivante
    if (formData.includeBathroom) {
      setStep(28);
    } else {
      setStep(36);
    }
  };

  // Soumission du formulaire de salle de bain
  const onSalleDeBainSubmit = (data: {
    bathroomType: string;
    bathroomCount: string;
  }) => {
    updateFormData({
      bathroomType: data.bathroomType,
      bathroomCount: data.bathroomCount,
    });
    setStep(36); // Aller à la dernière étape (contact)
  };

  // Pour la rénovation - Soumission demolition
  const onDemolitionSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  // Soumission gros oeuvre renovation
  const onGrosOeuvreRenovSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  // Soumission charpente renovation
  const onCharpenteRenovSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  // Soumission couverture renovation
  const onCouvertureRenovSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  // Soumission façade renovation
  const onFacadeRenovSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  // Soumission du formulaire de coordonnées et calcul de l'estimation
  const onContactSubmit = (data: { 
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }) => {
    updateFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
    });
    
    // Calculer l'estimation
    finalizeEstimation();
  };

  return {
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit,
    onCuisineSubmit,
    onSalleDeBainSubmit,
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit,
    onContactSubmit
  };
};
