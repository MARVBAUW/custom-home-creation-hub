
import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Check, ArrowRight, ArrowLeft, Calculator, Send } from "lucide-react";

// Client type schema
const ClientTypeSchema = z.object({
  clientType: z.enum(["professional", "individual"], {
    required_error: "Veuillez sélectionner votre profil",
  }),
});

// Professional project schema
const ProfessionalProjectSchema = z.object({
  activity: z.enum(["offices", "commerce", "hotel", "restaurant", "industry", "realEstate"], {
    required_error: "Veuillez sélectionner votre activité",
  }),
  projectType: z.enum(["construction", "renovation", "extension", "optimization", "division", "design"], {
    required_error: "Veuillez sélectionner le type de projet",
  }),
  startDate: z.string({
    required_error: "Veuillez sélectionner une date de début souhaitée",
  }),
  endDate: z.string({
    required_error: "Veuillez sélectionner une date de fin souhaitée",
  }),
});

// Individual project schema
const IndividualProjectSchema = z.object({
  projectType: z.enum(["construction", "renovation", "extension", "optimization", "division", "design"], {
    required_error: "Veuillez sélectionner le type de projet",
  }),
});

// Estimation type schema
const EstimationTypeSchema = z.object({
  estimationType: z.enum(["quick", "precise"], {
    required_error: "Veuillez sélectionner le type d'estimation",
  }),
  termsAccepted: z.boolean().refine(value => value === true, {
    message: "Vous devez accepter les conditions",
  }),
});

// Construction details schema
const ConstructionDetailsSchema = z.object({
  surface: z.string().min(1, "Veuillez indiquer la surface"),
  levels: z.string().min(1, "Veuillez indiquer le nombre de niveaux"),
  units: z.string().min(1, "Veuillez indiquer le nombre de logements"),
});

// Terrain schema
const TerrainSchema = z.object({
  terrainType: z.array(z.string()).min(1, "Veuillez sélectionner au moins un type de terrain"),
});

// Building type schema
const BuildingTypeSchema = z.object({
  wallType: z.enum(["brick", "concrete", "stone", "cinder", "porotherm", "cellularConcrete"], {
    required_error: "Veuillez sélectionner un type de mur",
  }),
});

// Roof schema
const RoofSchema = z.object({
  roofType: z.enum(["accessibleTerrace", "inaccessibleTerrace", "industrialFrame", "traditionalFrame"], {
    required_error: "Veuillez sélectionner un type de toiture",
  }),
});

// Attic schema
const AtticSchema = z.object({
  atticType: z.enum(["convertible", "lost"], {
    required_error: "Veuillez sélectionner un type de comble",
  }),
});

// Roofing schema
const RoofingSchema = z.object({
  roofingType: z.enum(["flatTile", "roundTile", "slate", "zinc", "thatch", "metalSheet", "bitumen", "vegetated", "gravel"], {
    required_error: "Veuillez sélectionner un type de couverture",
  }),
});

// Insulation schema
const InsulationSchema = z.object({
  insulationType: z.enum(["basic", "performance", "ultraPerformance"], {
    required_error: "Veuillez sélectionner un type d'isolation",
  }),
});

// Facade schema
const FacadeSchema = z.object({
  stonePercentage: z.string().default("0"),
  plasterPercentage: z.string().default("0"),
  brickPercentage: z.string().default("0"),
  metalCladdingPercentage: z.string().default("0"),
  woodCladdingPercentage: z.string().default("0"),
  stoneCladdingPercentage: z.string().default("0"),
});

// Windows schema
const WindowsSchema = z.object({
  windowType: z.enum(["wood", "pvc", "aluminum", "mixedWoodAlu", "coloredPvc"], {
    required_error: "Veuillez sélectionner un type de menuiserie",
  }),
});

// Electrical schema
const ElectricalSchema = z.object({
  electricalType: z.enum(["basic", "advanced", "highEnd", "highEndWithDomotics"], {
    required_error: "Veuillez sélectionner un type d'installation électrique",
  }),
});

// Plumbing schema
const PlumbingSchema = z.object({
  plumbingType: z.enum(["basic", "advanced", "highEnd"], {
    required_error: "Veuillez sélectionner un type de plomberie",
  }),
});

// Heating schema
const HeatingSchema = z.object({
  heatingType: z.enum(["bestValue", "mostEcological", "mostEconomical"], {
    required_error: "Veuillez sélectionner un type de chauffage",
  }),
  hasAirConditioning: z.enum(["yes", "no"], {
    required_error: "Veuillez préciser si vous souhaitez une climatisation",
  }),
});

// Plastering schema
const PlasteringSchema = z.object({
  plasteringType: z.enum(["basic", "specific", "advanced"], {
    required_error: "Veuillez sélectionner un type de plâtrerie",
  }),
});

// Interior doors schema
const InteriorDoorsSchema = z.object({
  doorType: z.enum(["basic", "standard", "highEnd"], {
    required_error: "Veuillez sélectionner un type de portes intérieures",
  }),
  interiorFittings: z.array(z.string()).default([]),
});

// Tiling schema
const TilingSchema = z.object({
  floorTileType: z.enum(["basic", "midRange", "highEnd", "none"], {
    required_error: "Veuillez sélectionner un type de carrelage",
  }),
  wallTileType: z.enum(["basic", "midRange", "highEnd", "none"], {
    required_error: "Veuillez sélectionner un type de faïence",
  }),
  floorTilePercentage: z.string().default("0"),
});

// Parquet schema
const ParquetSchema = z.object({
  parquetType: z.enum(["basic", "midRange", "highEnd", "none"], {
    required_error: "Veuillez sélectionner un type de parquet",
  }),
  parquetPercentage: z.string().default("0"),
  softFloorType: z.enum(["basic", "midRange", "highEnd", "none"], {
    required_error: "Veuillez sélectionner un type de sol souple",
  }),
  softFloorPercentage: z.string().default("0"),
});

// Painting schema
const PaintingSchema = z.object({
  basicPaintPercentage: z.string().default("0"),
  decorativePaintPercentage: z.string().default("0"),
  wallpaperPercentage: z.string().default("0"),
  woodCladPercentage: z.string().default("0"),
  stoneCladPercentage: z.string().default("0"),
});

// Renewable energy schema
const RenewableEnergySchema = z.object({
  energyType: z.enum(["regulatory", "optimized", "semiAutonomous", "autonomous", "none"], {
    required_error: "Veuillez sélectionner un type d'énergie renouvelable",
  }),
});

// Environmental solutions schema
const EnvironmentalSolutionsSchema = z.object({
  solutionType: z.enum(["possibleInBudget", "mediumPriority", "highPriority", "none"], {
    required_error: "Veuillez sélectionner un type de solution environnementale",
  }),
});

// Landscaping schema
const LandscapingSchema = z.object({
  landscapeLevel: z.enum(["little", "much", "passionately", "none"], {
    required_error: "Veuillez sélectionner un niveau d'aménagement paysager",
  }),
  fencingLength: z.string().default("0"),
  gateLength: z.string().default("0"),
  terraceArea: z.string().default("0"),
  landscapeArea: z.string().default("0"),
});

// Options schema
const OptionsSchema = z.object({
  carport: z.enum(["none", "single", "double"]).default("none"),
  pool: z.enum(["none", "polyester", "concrete", "lagoon"]).default("none"),
  poolArea: z.string().default("0"),
  poolHeating: z.enum(["yes", "no"]).default("no"),
  jacuzzi: z.enum(["none", "basic", "plus", "premium"]).default("none"),
  jacuzziArea: z.string().default("0"),
});

// Kitchen schema
const KitchenSchema = z.object({
  kitchenType: z.enum(["none", "kitchenette", "basic", "plus", "premium"], {
    required_error: "Veuillez sélectionner un type de cuisine",
  }),
});

// Bathroom schema
const BathroomSchema = z.object({
  bathroomType: z.enum(["none", "basic", "midRange", "premium"], {
    required_error: "Veuillez sélectionner un type de salle de bain",
  }),
  bathroomCount: z.string().min(1, "Veuillez indiquer le nombre de salles de bain"),
});

// Contact schema
const ContactSchema = z.object({
  firstName: z.string().min(1, "Veuillez indiquer votre prénom"),
  lastName: z.string().min(1, "Veuillez indiquer votre nom"),
  phone: z.string().min(10, "Veuillez indiquer un numéro de téléphone valide"),
  email: z.string().email("Veuillez indiquer un email valide"),
});

type EstimationStep = {
  title: string;
  description?: string;
  skipCondition?: (formData: any) => boolean;
}

const EstimationCalculator = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(23); // Ajusté pour inclure toutes les étapes
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  
  // Store all form data
  const [formData, setFormData] = useState({
    clientType: "",
    activity: "",
    projectType: "",
    startDate: "",
    endDate: "",
    estimationType: "",
    termsAccepted: false,
    surface: "",
    levels: "",
    units: "",
    terrainType: [] as string[],
    wallType: "",
    roofType: "",
    atticType: "",
    roofingType: "",
    insulationType: "",
    stonePercentage: "0",
    plasterPercentage: "0",
    brickPercentage: "0",
    metalCladdingPercentage: "0",
    woodCladdingPercentage: "0",
    stoneCladdingPercentage: "0",
    windowType: "",
    electricalType: "",
    plumbingType: "",
    heatingType: "",
    hasAirConditioning: "",
    plasteringType: "",
    doorType: "",
    interiorFittings: [] as string[],
    floorTileType: "",
    wallTileType: "",
    floorTilePercentage: "0",
    parquetType: "",
    parquetPercentage: "0",
    softFloorType: "",
    softFloorPercentage: "0",
    basicPaintPercentage: "0",
    decorativePaintPercentage: "0",
    wallpaperPercentage: "0",
    woodCladPercentage: "0",
    stoneCladPercentage: "0",
    energyType: "",
    solutionType: "",
    landscapeLevel: "",
    fencingLength: "0",
    gateLength: "0",
    terraceArea: "0",
    landscapeArea: "0",
    carport: "none",
    pool: "none",
    poolArea: "0",
    poolHeating: "no",
    jacuzzi: "none",
    jacuzziArea: "0",
    kitchenType: "",
    bathroomType: "",
    bathroomCount: "0",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // Define all possible steps
  const steps: EstimationStep[] = [
    { title: "Votre profil" },
    { title: "Informations sur votre projet (Professionnel)", skipCondition: (data) => data.clientType !== "professional" },
    { title: "Informations sur votre projet (Particulier)", skipCondition: (data) => data.clientType !== "individual" },
    { title: "Type d'estimation", description: "Choisissez le niveau de précision souhaité pour votre estimation" },
    { title: "Détails de construction", description: "Informations de base sur votre projet" },
    { title: "Type de terrain", description: "Caractéristiques de votre terrain" },
    { title: "Type de bâtiment", description: "Structure et matériaux principaux" },
    { title: "Toiture", description: "Type de toiture envisagée" },
    { title: "Combles", description: "Aménagement des combles" },
    { title: "Couverture / Étanchéité", description: "Matériaux de couverture" },
    { title: "Isolation", description: "Niveau d'isolation thermique" },
    { title: "Façade", description: "Revêtements extérieurs" },
    { title: "Menuiseries ext.", description: "Fenêtres et portes extérieures" },
    { title: "Électricité", description: "Installation électrique" },
    { title: "Plomberie", description: "Installation sanitaire" },
    { title: "Chauffage / Climatisation", description: "Système de chauffage et climatisation" },
    { title: "Plâtrerie", description: "Cloisons et aménagements" },
    { title: "Menuiseries int.", description: "Portes et aménagements intérieurs" },
    { title: "Carrelage / Faïence", description: "Revêtements de sol et murs" },
    { title: "Parquet / Sol souple", description: "Revêtements de sol" },
    { title: "Peinture / Revêtements muraux", description: "Finitions murales" },
    { title: "Cuisine", description: "Aménagement de cuisine" },
    { title: "Salle de bain", description: "Aménagement de salle de bain" },
    { title: "Vos coordonnées", description: "Pour recevoir votre estimation par email" },
  ];

  // Filter steps based on form data
  const visibleSteps = steps.filter(s => !s.skipCondition || !s.skipCondition(formData));
  
  // Update total steps when form data changes
  useEffect(() => {
    setTotalSteps(visibleSteps.length);
  }, [formData.clientType, formData.projectType, formData.estimationType]);

  // Client type form
  const clientTypeForm = useForm<z.infer<typeof ClientTypeSchema>>({
    resolver: zodResolver(ClientTypeSchema),
    defaultValues: {
      clientType: formData.clientType as any || undefined,
    },
  });

  // Professional project form
  const professionalProjectForm = useForm<z.infer<typeof ProfessionalProjectSchema>>({
    resolver: zodResolver(ProfessionalProjectSchema),
    defaultValues: {
      activity: formData.activity as any || undefined,
      projectType: formData.projectType as any || undefined,
      startDate: formData.startDate || "",
      endDate: formData.endDate || "",
    },
  });

  // Individual project form
  const individualProjectForm = useForm<z.infer<typeof IndividualProjectSchema>>({
    resolver: zodResolver(IndividualProjectSchema),
    defaultValues: {
      projectType: formData.projectType as any || undefined,
    },
  });

  // Estimation type form
  const estimationTypeForm = useForm<z.infer<typeof EstimationTypeSchema>>({
    resolver: zodResolver(EstimationTypeSchema),
    defaultValues: {
      estimationType: formData.estimationType as any || undefined,
      termsAccepted: formData.termsAccepted || false,
    },
  });

  // Construction details form
  const constructionDetailsForm = useForm<z.infer<typeof ConstructionDetailsSchema>>({
    resolver: zodResolver(ConstructionDetailsSchema),
    defaultValues: {
      surface: formData.surface || "",
      levels: formData.levels || "",
      units: formData.units || "",
    },
  });

  // Terrain form
  const terrainForm = useForm<z.infer<typeof TerrainSchema>>({
    resolver: zodResolver(TerrainSchema),
    defaultValues: {
      terrainType: formData.terrainType || [],
    },
  });

  // Building type form
  const buildingTypeForm = useForm<z.infer<typeof BuildingTypeSchema>>({
    resolver: zodResolver(BuildingTypeSchema),
    defaultValues: {
      wallType: formData.wallType as any || undefined,
    },
  });

  // Roof form
  const roofForm = useForm<z.infer<typeof RoofSchema>>({
    resolver: zodResolver(RoofSchema),
    defaultValues: {
      roofType: formData.roofType as any || undefined,
    },
  });

  // Attic form
  const atticForm = useForm<z.infer<typeof AtticSchema>>({
    resolver: zodResolver(AtticSchema),
    defaultValues: {
      atticType: formData.atticType as any || undefined,
    },
  });

  // Roofing form
  const roofingForm = useForm<z.infer<typeof RoofingSchema>>({
    resolver: zodResolver(RoofingSchema),
    defaultValues: {
      roofingType: formData.roofingType as any || undefined,
    },
  });

  // Insulation form
  const insulationForm = useForm<z.infer<typeof InsulationSchema>>({
    resolver: zodResolver(InsulationSchema),
    defaultValues: {
      insulationType: formData.insulationType as any || undefined,
    },
  });

  // Facade form
  const facadeForm = useForm<z.infer<typeof FacadeSchema>>({
    resolver: zodResolver(FacadeSchema),
    defaultValues: {
      stonePercentage: formData.stonePercentage || "0",
      plasterPercentage: formData.plasterPercentage || "0",
      brickPercentage: formData.brickPercentage || "0",
      metalCladdingPercentage: formData.metalCladdingPercentage || "0",
      woodCladdingPercentage: formData.woodCladdingPercentage || "0",
      stoneCladdingPercentage: formData.stoneCladdingPercentage || "0",
    },
  });

  // Windows form
  const windowsForm = useForm<z.infer<typeof WindowsSchema>>({
    resolver: zodResolver(WindowsSchema),
    defaultValues: {
      windowType: formData.windowType as any || undefined,
    },
  });

  // Electrical form
  const electricalForm = useForm<z.infer<typeof ElectricalSchema>>({
    resolver: zodResolver(ElectricalSchema),
    defaultValues: {
      electricalType: formData.electricalType as any || undefined,
    },
  });

  // Plumbing form
  const plumbingForm = useForm<z.infer<typeof PlumbingSchema>>({
    resolver: zodResolver(PlumbingSchema),
    defaultValues: {
      plumbingType: formData.plumbingType as any || undefined,
    },
  });

  // Heating form
  const heatingForm = useForm<z.infer<typeof HeatingSchema>>({
    resolver: zodResolver(HeatingSchema),
    defaultValues: {
      heatingType: formData.heatingType as any || undefined,
      hasAirConditioning: formData.hasAirConditioning as any || undefined,
    },
  });

  // Plastering form
  const plasteringForm = useForm<z.infer<typeof PlasteringSchema>>({
    resolver: zodResolver(PlasteringSchema),
    defaultValues: {
      plasteringType: formData.plasteringType as any || undefined,
    },
  });

  // Interior doors form
  const interiorDoorsForm = useForm<z.infer<typeof InteriorDoorsSchema>>({
    resolver: zodResolver(InteriorDoorsSchema),
    defaultValues: {
      doorType: formData.doorType as any || undefined,
      interiorFittings: formData.interiorFittings || [],
    },
  });

  // Tiling form
  const tilingForm = useForm<z.infer<typeof TilingSchema>>({
    resolver: zodResolver(TilingSchema),
    defaultValues: {
      floorTileType: formData.floorTileType as any || undefined,
      wallTileType: formData.wallTileType as any || undefined,
      floorTilePercentage: formData.floorTilePercentage || "0",
    },
  });

  // Parquet form
  const parquetForm = useForm<z.infer<typeof ParquetSchema>>({
    resolver: zodResolver(ParquetSchema),
    defaultValues: {
      parquetType: formData.parquetType as any || undefined,
      parquetPercentage: formData.parquetPercentage || "0",
      softFloorType: formData.softFloorType as any || undefined,
      softFloorPercentage: formData.softFloorPercentage || "0",
    },
  });

  // Painting form
  const paintingForm = useForm<z.infer<typeof PaintingSchema>>({
    resolver: zodResolver(PaintingSchema),
    defaultValues: {
      basicPaintPercentage: formData.basicPaintPercentage || "0",
      decorativePaintPercentage: formData.decorativePaintPercentage || "0",
      wallpaperPercentage: formData.wallpaperPercentage || "0",
      woodCladPercentage: formData.woodCladPercentage || "0",
      stoneCladPercentage: formData.stoneCladPercentage || "0",
    },
  });

  // Kitchen form
  const kitchenForm = useForm<z.infer<typeof KitchenSchema>>({
    resolver: zodResolver(KitchenSchema),
    defaultValues: {
      kitchenType: formData.kitchenType as any || undefined,
    },
  });

  // Bathroom form
  const bathroomForm = useForm<z.infer<typeof BathroomSchema>>({
    resolver: zodResolver(BathroomSchema),
    defaultValues: {
      bathroomType: formData.bathroomType as any || undefined,
      bathroomCount: formData.bathroomCount || "0",
    },
  });

  // Contact form
  const contactForm = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      phone: formData.phone || "",
      email: formData.email || "",
    },
  });

  // Handle client type submission
  const onClientTypeSubmit = (data: z.infer<typeof ClientTypeSchema>) => {
    setFormData({ ...formData, clientType: data.clientType });
    
    // Determine next step based on client type
    if (data.clientType === "professional") {
      setStep(2); // Professional project info
    } else {
      setStep(3); // Individual project info
    }
  };

  // Handle professional project submission
  const onProfessionalProjectSubmit = (data: z.infer<typeof ProfessionalProjectSchema>) => {
    setFormData({ 
      ...formData, 
      activity: data.activity, 
      projectType: data.projectType,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    setStep(4); // Estimation type
  };

  // Handle individual project submission
  const onIndividualProjectSubmit = (data: z.infer<typeof IndividualProjectSchema>) => {
    setFormData({ ...formData, projectType: data.projectType });
    
    // Skip certain steps for optimization or design projects
    if (data.projectType === "optimization" || data.projectType === "design") {
      setStep(1); // Go back to profile selection
      toast({
        title: "Type de projet non disponible",
        description: "L'estimation pour ce type de projet nécessite un contact direct avec nos équipes.",
        duration: 5000,
      });
    } else {
      setStep(4); // Estimation type
    }
  };

  // Handle estimation type submission
  const onEstimationTypeSubmit = (data: z.infer<typeof EstimationTypeSchema>) => {
    setFormData({ 
      ...formData, 
      estimationType: data.estimationType,
      termsAccepted: data.termsAccepted,
    });
    setStep(5); // Construction details
  };

  // Handle construction details submission
  const onConstructionDetailsSubmit = (data: z.infer<typeof ConstructionDetailsSchema>) => {
    setFormData({ 
      ...formData, 
      surface: data.surface,
      levels: data.levels,
      units: data.units,
    });
    setStep(6); // Terrain type
  };

  // Handle terrain submission
  const onTerrainSubmit = (data: z.infer<typeof TerrainSchema>) => {
    setFormData({ ...formData, terrainType: data.terrainType });
    setStep(7); // Building type
  };

  // Handle building type submission
  const onBuildingTypeSubmit = (data: z.infer<typeof BuildingTypeSchema>) => {
    setFormData({ ...formData, wallType: data.wallType });
    setStep(8); // Roof type
  };

  // Handle roof submission
  const onRoofSubmit = (data: z.infer<typeof RoofSchema>) => {
    setFormData({ ...formData, roofType: data.roofType });
    setStep(9); // Attic type
  };

  // Handle attic submission
  const onAtticSubmit = (data: z.infer<typeof AtticSchema>) => {
    setFormData({ ...formData, atticType: data.atticType });
    setStep(10); // Roofing type
  };

  // Handle roofing submission
  const onRoofingSubmit = (data: z.infer<typeof RoofingSchema>) => {
    setFormData({ ...formData, roofingType: data.roofingType });
    setStep(11); // Insulation
  };

  // Handle insulation submission
  const onInsulationSubmit = (data: z.infer<typeof InsulationSchema>) => {
    setFormData({ ...formData, insulationType: data.insulationType });
    setStep(12); // Facade
  };

  // Handle facade submission
  const onFacadeSubmit = (data: z.infer<typeof FacadeSchema>) => {
    setFormData({ 
      ...formData, 
      stonePercentage: data.stonePercentage,
      plasterPercentage: data.plasterPercentage,
      brickPercentage: data.brickPercentage,
      metalCladdingPercentage: data.metalCladdingPercentage,
      woodCladdingPercentage: data.woodCladdingPercentage,
      stoneCladdingPercentage: data.stoneCladdingPercentage,
    });
    setStep(13); // Windows
  };

  // Handle windows submission
  const onWindowsSubmit = (data: z.infer<typeof WindowsSchema>) => {
    setFormData({ ...formData, windowType: data.windowType });
    setStep(14); // Electrical
  };

  // Handle electrical submission
  const onElectricalSubmit = (data: z.infer<typeof ElectricalSchema>) => {
    setFormData({ ...formData, electricalType: data.electricalType });
    setStep(15); // Plumbing
  };

  // Handle plumbing submission
  const onPlumbingSubmit = (data: z.infer<typeof PlumbingSchema>) => {
    setFormData({ ...formData, plumbingType: data.plumbingType });
    setStep(16); // Heating
  };

  // Handle heating submission
  const onHeatingSubmit = (data: z.infer<typeof HeatingSchema>) => {
    setFormData({ 
      ...formData, 
      heatingType: data.heatingType,
      hasAirConditioning: data.hasAirConditioning,
    });
    setStep(17); // Plastering
  };

  // Handle plastering submission
  const onPlasteringSubmit = (data: z.infer<typeof PlasteringSchema>) => {
    setFormData({ ...formData, plasteringType: data.plasteringType });
    setStep(18); // Interior doors
  };

  // Handle interior doors submission
  const onInteriorDoorsSubmit = (data: z.infer<typeof InteriorDoorsSchema>) => {
    setFormData({ 
      ...formData, 
      doorType: data.doorType,
      interiorFittings: data.interiorFittings,
    });
    setStep(19); // Tiling
  };

  // Handle tiling submission
  const onTilingSubmit = (data: z.infer<typeof TilingSchema>) => {
    setFormData({ 
      ...formData, 
      floorTileType: data.floorTileType,
      wallTileType: data.wallTileType,
      floorTilePercentage: data.floorTilePercentage,
    });
    setStep(20); // Parquet
  };

  // Handle parquet submission
  const onParquetSubmit = (data: z.infer<typeof ParquetSchema>) => {
    setFormData({ 
      ...formData, 
      parquetType: data.parquetType,
      parquetPercentage: data.parquetPercentage,
      softFloorType: data.softFloorType,
      softFloorPercentage: data.softFloorPercentage,
    });
    setStep(21); // Painting
  };

  // Handle painting submission
  const onPaintingSubmit = (data: z.infer<typeof PaintingSchema>) => {
    setFormData({ 
      ...formData, 
      basicPaintPercentage: data.basicPaintPercentage,
      decorativePaintPercentage: data.decorativePaintPercentage,
      wallpaperPercentage: data.wallpaperPercentage,
      woodCladPercentage: data.woodCladPercentage,
      stoneCladPercentage: data.stoneCladPercentage,
    });
    setStep(22); // Kitchen
  };

  // Handle kitchen submission
  const onKitchenSubmit = (data: z.infer<typeof KitchenSchema>) => {
    setFormData({ ...formData, kitchenType: data.kitchenType });
    setStep(23); // Bathroom
  };

  // Handle bathroom submission
  const onBathroomSubmit = (data: z.infer<typeof BathroomSchema>) => {
    setFormData({ 
      ...formData, 
      bathroomType: data.bathroomType,
      bathroomCount: data.bathroomCount,
    });
    setStep(24); // Contact
  };

  // Handle contact submission and complete estimation
  const onContactSubmit = (data: z.infer<typeof ContactSchema>) => {
    setFormData({ 
      ...formData, 
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
    });
    
    // Calculate estimation based on all form data
    calculateEstimation();
  };

  // Calculate the cost estimation
  const calculateEstimation = () => {
    // Basic calculation formula
    let basePrice = 0;
    const surface = parseInt(formData.surface) || 0;
    
    // Base price per square meter depending on project type
    switch (formData.projectType) {
      case "construction":
        basePrice = 2000;
        break;
      case "renovation":
        basePrice = 1200;
        break;
      case "extension":
        basePrice = 1800;
        break;
      case "division":
        basePrice = 1500;
        break;
      default:
        basePrice = 1000;
    }
    
    // Apply multipliers based on terrain type
    let terrainMultiplier = 1;
    if (formData.terrainType.includes("rocky")) terrainMultiplier *= 1.2;
    if (formData.terrainType.includes("clayey")) terrainMultiplier *= 1.1;
    if (formData.terrainType.includes("sloped")) terrainMultiplier *= 1.15;

    // Apply multipliers based on wall type
    let wallMultiplier = 1;
    switch (formData.wallType) {
      case "brick":
        wallMultiplier = 1.1;
        break;
      case "concrete":
        wallMultiplier = 1.05;
        break;
      case "stone":
        wallMultiplier = 1.3;
        break;
      case "cinder":
        wallMultiplier = 1;
        break;
      case "porotherm":
        wallMultiplier = 1.2;
        break;
      case "cellularConcrete":
        wallMultiplier = 1.15;
        break;
    }

    // Apply multipliers based on roof type
    let roofMultiplier = 1;
    switch (formData.roofType) {
      case "accessibleTerrace":
        roofMultiplier = 1.2;
        break;
      case "inaccessibleTerrace":
        roofMultiplier = 1.1;
        break;
      case "industrialFrame":
        roofMultiplier = 1;
        break;
      case "traditionalFrame":
        roofMultiplier = 1.15;
        break;
    }

    // Apply multipliers based on insulation type
    let insulationMultiplier = 1;
    switch (formData.insulationType) {
      case "basic":
        insulationMultiplier = 1;
        break;
      case "performance":
        insulationMultiplier = 1.1;
        break;
      case "ultraPerformance":
        insulationMultiplier = 1.2;
        break;
    }

    // Apply multipliers based on electrical type
    let electricalMultiplier = 1;
    switch (formData.electricalType) {
      case "basic":
        electricalMultiplier = 1;
        break;
      case "advanced":
        electricalMultiplier = 1.1;
        break;
      case "highEnd":
        electricalMultiplier = 1.2;
        break;
      case "highEndWithDomotics":
        electricalMultiplier = 1.3;
        break;
    }

    // Calculate final price
    const totalMultiplier = terrainMultiplier * wallMultiplier * roofMultiplier * insulationMultiplier * electricalMultiplier;
    const finalPrice = Math.round(basePrice * surface * totalMultiplier);
    
    // Set estimation result and show dialog
    setEstimationResult(finalPrice);
    setShowResultDialog(true);
    
    // Send data to server (mock)
    console.log("Sending estimation data to server:", formData);
    
    // Show success toast
    toast({
      title: "Estimation terminée",
      description: "Votre estimation a été calculée avec succès.",
      duration: 5000,
    });
  };

  // Render current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Form {...clientTypeForm}>
            <form onSubmit={clientTypeForm.handleSubmit(onClientTypeSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center mb-6">Qui êtes-vous ?</h2>
                
                <FormField
                  control={clientTypeForm.control}
                  name="clientType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                            <FormControl>
                              <RadioGroupItem value="professional" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              <div className="font-medium">Professionnel</div>
                              <p className="text-sm text-muted-foreground">
                                Entreprise, commerce, bureau, industrie
                              </p>
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                            <FormControl>
                              <RadioGroupItem value="individual" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              <div className="font-medium">Particulier</div>
                              <p className="text-sm text-muted-foreground">
                                Maison, appartement, extension
                              </p>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Continuer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        );
        
      case 2:
        return (
          <Form {...professionalProjectForm}>
            <form onSubmit={professionalProjectForm.handleSubmit(onProfessionalProjectSubmit)} className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">Votre projet professionnel</h2>
              
              <FormField
                control={professionalProjectForm.control}
                name="activity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Type d'activité</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-3"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="offices" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Bureaux</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="commerce" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Commerce</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="hotel" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Hôtel</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="restaurant" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Restaurant</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="industry" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Industrie</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="realEstate" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Immobilier</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={professionalProjectForm.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Type de projet</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-3"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="construction" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Construction</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="renovation" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Rénovation</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="extension" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Extension</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="optimization" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Optimisation</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="division" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Division</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="design" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Conception</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={professionalProjectForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de début souhaitée</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={professionalProjectForm.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de fin souhaitée</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                
                <Button type="submit">
                  Continuer <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 3:
        return (
          <Form {...individualProjectForm}>
            <form onSubmit={individualProjectForm.handleSubmit(onIndividualProjectSubmit)} className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">Votre projet particulier</h2>
              
              <FormField
                control={individualProjectForm.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Type de projet</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-3"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="construction" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Construction</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="renovation" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Rénovation</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="extension" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Extension</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="optimization" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Optimisation</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="division" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Division</FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="design" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Conception</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                
                <Button type="submit">
                  Continuer <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 4:
        return (
          <Form {...estimationTypeForm}>
            <form onSubmit={estimationTypeForm.handleSubmit(onEstimationTypeSubmit)} className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">Type d'estimation</h2>
              
              <FormField
                control={estimationTypeForm.control}
                name="estimationType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choisissez le niveau de précision</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="quick" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer flex-1">
                            <div className="font-medium">Estimation rapide</div>
                            <p className="text-sm text-muted-foreground">
                              Une estimation approximative en quelques minutes
                            </p>
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                          <FormControl>
                            <RadioGroupItem value="precise" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer flex-1">
                            <div className="font-medium">Estimation précise</div>
                            <p className="text-sm text-muted-foreground">
                              Une estimation détaillée avec plus de questions
                            </p>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={estimationTypeForm.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        J'accepte que mes informations soient utilisées pour me recontacter
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Vos données restent confidentielles et ne seront jamais revendues.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => formData.clientType === "professional" ? setStep(2) : setStep(3)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                
                <Button type="submit">
                  Continuer <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 5:
        return (
          <Form {...constructionDetailsForm}>
            <form onSubmit={constructionDetailsForm.handleSubmit(onConstructionDetailsSubmit)} className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">Détails de construction</h2>
              
              <FormField
                control={constructionDetailsForm.control}
                name="surface"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surface totale en m²</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="100" {...field} />
                    </FormControl>
                    <FormDescription>
                      La surface totale du projet en mètres carrés
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={constructionDetailsForm.control}
                name="levels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de niveaux</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Inclure le rez-de-chaussée, les étages et le sous-sol si applicable
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={constructionDetailsForm.control}
                name="units"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de logements</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Pour les projets avec plusieurs unités
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(4)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                
                <Button type="submit">
                  Continuer <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
      
      // Contact details step (final step)
      case 24:
        return (
          <Form {...contactForm}>
            <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">Vos coordonnées</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={contactForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contactForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={contactForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="06 12 34 56 78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contactForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-4 space-y-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(step - 1)}
                  className="w-full md:w-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Étape précédente
                </Button>
                
                <Button type="submit" className="w-full">
                  Finaliser et obtenir l'estimation <Calculator className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
      
      // For other steps 6-23, show a placeholder for now
      default:
        return (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">{visibleSteps[step - 1]?.title || "Étape suivante"}</h2>
            <p className="text-muted-foreground">{visibleSteps[step - 1]?.description || ""}</p>
            
            <div className="py-8">
              <p>Cette section est en cours de développement</p>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Étape précédente
              </Button>
              
              <Button onClick={() => step < totalSteps ? setStep(step + 1) : null}>
                {step < totalSteps ? (
                  <>Continuer <ArrowRight className="ml-2 h-4 w-4" /></>
                ) : (
                  <>Finaliser <Check className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Étape {step} sur {totalSteps}</span>
          <span className="text-sm font-medium">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-progineer-gold h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white shadow-sm border rounded-lg p-6">
        {renderStep()}
      </div>
      
      {/* Estimation result dialog */}
      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estimation de votre projet</AlertDialogTitle>
            <AlertDialogDescription>
              Selon les informations que vous avez fournies, le coût estimé de votre projet est de:
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-6 text-center">
            <p className="text-4xl font-bold text-progineer-gold">
              {estimationResult?.toLocaleString('fr-FR')} €
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Cette estimation est indicative et peut varier en fonction des spécificités de votre projet.
            </p>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogAction className="bg-progineer-gold hover:bg-progineer-gold/90">
              J'ai compris
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EstimationCalculator;
