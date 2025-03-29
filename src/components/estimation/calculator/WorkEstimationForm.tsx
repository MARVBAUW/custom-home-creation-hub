
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Building, 
  Home, 
  ArrowRight, 
  ArrowLeft, 
  Construction, 
  Layers, 
  Thermometer, 
  Grid, 
  Droplet, 
  Hammer, 
  Leaf, 
  PencilRuler, 
  Calculator, 
  Mail, 
  Phone,
  User,
  Euro,
  Check
} from 'lucide-react';

// Schéma de validation Zod pour le formulaire
const formSchema = z.object({
  clientType: z.enum(["particulier", "professionnel"]),
  projectType: z.enum(["construction", "renovation"]),
  surface: z.string().min(1, "Veuillez indiquer la surface"),
  levels: z.string().min(1, "Veuillez indiquer le nombre de niveaux"),
  units: z.string().optional(),
  terrainType: z.enum(["plat", "pente", "avec_denivelation"]).optional(),
  wallType: z.enum(["parpaings", "briques", "pierres", "béton", "bois"]).optional(),
  roofType: z.enum(["toitureAccessible", "toitureInaccessible", "charpenteIndustrielle", "charpenteTraditionnelle"]).optional(),
  atticType: z.enum(["amenageable", "perdu"]).optional(),
  roofingType: z.enum(["tuilePlate", "tuileRonde", "ardoise", "zinc", "chaume", "bacAcier", "bitume", "vegetalisee", "gravillonnee"]).optional(),
  insulationType: z.enum(["interieure", "exterieure", "mixte"]).optional(),
  windowType: z.enum(["pvc", "bois", "aluminium"]).optional(),
  electricalType: z.enum(["standard", "domotique", "smart"]).optional(),
  plumbingType: z.enum(["standard", "premium"]).optional(),
  heatingType: z.enum(["gaz", "pompe-chaleur", "electrique", "geothermie"]).optional(),
  hasAirConditioning: z.enum(["yes", "no"]).optional(),
  plasteringType: z.enum(["standard", "decoratif"]).optional(),
  doorType: z.enum(["standard", "premium"]).optional(),
  floorTileType: z.enum(["standard", "premium"]).optional(),
  wallTileType: z.enum(["standard", "premium"]).optional(),
  floorTilePercentage: z.string().optional(),
  parquetType: z.enum(["stratifie", "contrecolle", "massif"]).optional(),
  parquetPercentage: z.string().optional(),
  kitchenType: z.enum(["standard", "equipee", "surmesure"]).optional(),
  bathroomType: z.enum(["standard", "premium"]).optional(),
  bathroomCount: z.string().optional(),
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide").min(1, "Email requis"),
  phone: z.string().min(1, "Téléphone requis"),
  details: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const WorkEstimationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(20);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientType: "particulier",
      projectType: "construction",
      surface: "",
      levels: "1",
      units: "1",
      floorTilePercentage: "0",
      parquetPercentage: "0",
      bathroomCount: "1"
    }
  });
  
  const watchClientType = form.watch("clientType");
  const watchProjectType = form.watch("projectType");
  
  const totalSteps = 5;

  const goToNextStep = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
      setProgress((step + 1) * (100 / totalSteps));
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      setProgress((step - 1) * (100 / totalSteps));
    }
  };

  const calculateEstimation = (data: FormValues): number => {
    // Base des coûts (en euros par m²)
    const baseCostPerSqm = {
      construction: {
        standard: 1500,
        premium: 2200
      },
      renovation: {
        standard: 800,
        premium: 1400
      }
    };

    // Facteurs multiplicateurs pour différentes options
    const factors = {
      // Types de murs
      wallType: {
        parpaings: 1.0,
        briques: 1.15,
        pierres: 1.3,
        béton: 1.1,
        bois: 1.2
      },
      // Types de toiture
      roofType: {
        toitureAccessible: 1.15,
        toitureInaccessible: 1.0,
        charpenteIndustrielle: 1.05,
        charpenteTraditionnelle: 1.2
      },
      // Types de combles
      atticType: {
        amenageable: 1.15,
        perdu: 1.0
      },
      // Types de menuiseries
      windowType: {
        pvc: 1.0,
        bois: 1.2,
        aluminium: 1.3
      },
      // Types de chauffage
      heatingType: {
        gaz: 1.0,
        "pompe-chaleur": 1.25,
        electrique: 0.9,
        geothermie: 1.4
      },
      // Climatisation
      hasAirConditioning: {
        yes: 1.15,
        no: 1.0
      },
      // Types de parquet
      parquetType: {
        stratifie: 1.0,
        contrecolle: 1.2,
        massif: 1.5
      },
      // Types de cuisine
      kitchenType: {
        standard: 1.0,
        equipee: 1.2,
        surmesure: 1.4
      }
    };

    // Déterminer si premium ou standard
    const category = data.bathroomType === "premium" || data.doorType === "premium" ? "premium" : "standard";
    
    // Base de calcul
    let baseCalculation: number;
    
    if (data.projectType === "construction") {
      baseCalculation = parseInt(data.surface) * baseCostPerSqm.construction[category];
    } else {
      baseCalculation = parseInt(data.surface) * baseCostPerSqm.renovation[category];
    }
    
    // Appliquer les facteurs
    let finalEstimation = baseCalculation;
    
    if (data.wallType) {
      finalEstimation *= factors.wallType[data.wallType];
    }
    
    if (data.roofType) {
      finalEstimation *= factors.roofType[data.roofType];
    }
    
    if (data.atticType) {
      finalEstimation *= factors.atticType[data.atticType];
    }
    
    if (data.windowType) {
      finalEstimation *= factors.windowType[data.windowType];
    }
    
    if (data.heatingType) {
      finalEstimation *= factors.heatingType[data.heatingType];
    }
    
    if (data.hasAirConditioning) {
      finalEstimation *= factors.hasAirConditioning[data.hasAirConditioning];
    }
    
    if (data.parquetType) {
      finalEstimation *= 1 + ((factors.parquetType[data.parquetType] - 1) * (parseInt(data.parquetPercentage || "0") / 100));
    }
    
    if (data.kitchenType) {
      finalEstimation *= factors.kitchenType[data.kitchenType];
    }
    
    // Ajouts pour les niveaux supplémentaires
    if (parseInt(data.levels) > 1) {
      finalEstimation *= (1 + (parseInt(data.levels) - 1) * 0.2);
    }
    
    // Ajout pour chaque salle de bain supplémentaire
    if (parseInt(data.bathroomCount || "1") > 1) {
      finalEstimation += (parseInt(data.bathroomCount || "1") - 1) * 8000;
    }
    
    return Math.round(finalEstimation);
  };

  const onSubmit = (data: FormValues) => {
    if (step < totalSteps) {
      goToNextStep();
    } else {
      // Calculer l'estimation
      const estimation = calculateEstimation(data);
      setEstimationResult(estimation);
      setShowResult(true);
      
      toast({
        title: "Estimation générée avec succès !",
        description: `Votre estimation de projet s'élève à environ ${estimation.toLocaleString('fr-FR')} €`,
      });
      
      // Ici, vous pourriez aussi envoyer les données du formulaire à votre backend
      console.log("Données du formulaire:", data);
    }
  };
  
  const getButtonText = () => {
    return step === totalSteps ? "Obtenir mon estimation" : "Continuer";
  };

  return (
    <div className="space-y-6">
      {/* Progression */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Étape {step} sur {totalSteps}</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Étape 1: Informations générales */}
        {step === 1 && (
          <div className="space-y-6 transition-opacity duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
                <User className="h-6 w-6 text-progineer-gold" />
                Informations générales
              </h2>
              <p className="text-muted-foreground">Définissez votre projet</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Type de client</Label>
                <RadioGroup 
                  defaultValue={form.getValues("clientType")}
                  onValueChange={(value) => form.setValue("clientType", value as "particulier" | "professionnel")}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className={`flex flex-col items-center space-y-2 rounded-md border p-4 hover:bg-accent cursor-pointer ${form.watch("clientType") === "particulier" ? "bg-accent/50 border-primary" : ""}`}>
                    <RadioGroupItem value="particulier" id="particulier" className="sr-only" />
                    <Label htmlFor="particulier" className="cursor-pointer flex flex-col items-center gap-2">
                      <Home className="h-8 w-8 text-progineer-gold" />
                      <span className="font-medium">Particulier</span>
                    </Label>
                  </div>
                  
                  <div className={`flex flex-col items-center space-y-2 rounded-md border p-4 hover:bg-accent cursor-pointer ${form.watch("clientType") === "professionnel" ? "bg-accent/50 border-primary" : ""}`}>
                    <RadioGroupItem value="professionnel" id="professionnel" className="sr-only" />
                    <Label htmlFor="professionnel" className="cursor-pointer flex flex-col items-center gap-2">
                      <Building className="h-8 w-8 text-progineer-gold" />
                      <span className="font-medium">Professionnel</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Type de projet</Label>
                <RadioGroup 
                  defaultValue={form.getValues("projectType")}
                  onValueChange={(value) => form.setValue("projectType", value as "construction" | "renovation")}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className={`flex flex-col items-center space-y-2 rounded-md border p-4 hover:bg-accent cursor-pointer ${form.watch("projectType") === "construction" ? "bg-accent/50 border-primary" : ""}`}>
                    <RadioGroupItem value="construction" id="construction" className="sr-only" />
                    <Label htmlFor="construction" className="cursor-pointer flex flex-col items-center gap-2">
                      <Building className="h-8 w-8 text-progineer-gold" />
                      <span className="font-medium">Construction neuve</span>
                    </Label>
                  </div>
                  
                  <div className={`flex flex-col items-center space-y-2 rounded-md border p-4 hover:bg-accent cursor-pointer ${form.watch("projectType") === "renovation" ? "bg-accent/50 border-primary" : ""}`}>
                    <RadioGroupItem value="renovation" id="renovation" className="sr-only" />
                    <Label htmlFor="renovation" className="cursor-pointer flex flex-col items-center gap-2">
                      <Hammer className="h-8 w-8 text-progineer-gold" />
                      <span className="font-medium">Rénovation</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="surface">Surface (m²)</Label>
                  <Input
                    id="surface"
                    placeholder="Ex: 120"
                    type="number"
                    {...form.register("surface")}
                  />
                  {form.formState.errors.surface && (
                    <p className="text-sm text-red-500">{form.formState.errors.surface.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="levels">Nombre de niveaux</Label>
                  <Select
                    onValueChange={(value) => form.setValue("levels", value)}
                    defaultValue={form.getValues("levels")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 niveau</SelectItem>
                      <SelectItem value="2">2 niveaux</SelectItem>
                      <SelectItem value="3">3 niveaux</SelectItem>
                      <SelectItem value="4">4 niveaux ou plus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="units">Nombre de logements</Label>
                  <Input
                    id="units"
                    placeholder="Ex: 1"
                    type="number"
                    {...form.register("units")}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Étape 2: Structure */}
        {step === 2 && (
          <div className="space-y-6 transition-opacity duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
                <Construction className="h-6 w-6 text-progineer-gold" />
                Structure et enveloppe
              </h2>
              <p className="text-muted-foreground">Définissez les éléments structurels</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="terrainType">Type de terrain</Label>
                <Select
                  onValueChange={(value) => form.setValue("terrainType", value as any)}
                  defaultValue={form.getValues("terrainType")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plat">Terrain plat</SelectItem>
                    <SelectItem value="pente">Terrain en pente</SelectItem>
                    <SelectItem value="avec_denivelation">Terrain avec dénivellation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="wallType">Type de murs</Label>
                <Select
                  onValueChange={(value) => form.setValue("wallType", value as any)}
                  defaultValue={form.getValues("wallType")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parpaings">Parpaings</SelectItem>
                    <SelectItem value="briques">Briques</SelectItem>
                    <SelectItem value="pierres">Pierres</SelectItem>
                    <SelectItem value="béton">Béton</SelectItem>
                    <SelectItem value="bois">Ossature bois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="roofType">Type de toiture</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("roofType", value as any)}
                  defaultValue={form.getValues("roofType")}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="toitureAccessible" id="toitureAccessible" className="sr-only" />
                    <Label htmlFor="toitureAccessible" className="cursor-pointer">
                      <span className="font-medium">Toiture terrasse accessible</span>
                      <p className="text-sm text-muted-foreground">Terrasse accessible sur le toit</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="toitureInaccessible" id="toitureInaccessible" className="sr-only" />
                    <Label htmlFor="toitureInaccessible" className="cursor-pointer">
                      <span className="font-medium">Toiture terrasse inaccessible</span>
                      <p className="text-sm text-muted-foreground">Toiture plate non accessible</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="charpenteIndustrielle" id="charpenteIndustrielle" className="sr-only" />
                    <Label htmlFor="charpenteIndustrielle" className="cursor-pointer">
                      <span className="font-medium">Charpente industrielle</span>
                      <p className="text-sm text-muted-foreground">Charpente à fermettes</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="charpenteTraditionnelle" id="charpenteTraditionnelle" className="sr-only" />
                    <Label htmlFor="charpenteTraditionnelle" className="cursor-pointer">
                      <span className="font-medium">Charpente traditionnelle</span>
                      <p className="text-sm text-muted-foreground">Charpente artisanale en bois</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="atticType">Type de combles</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("atticType", value as any)}
                  defaultValue={form.getValues("atticType")}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="amenageable" id="amenageable" className="sr-only" />
                    <Label htmlFor="amenageable" className="cursor-pointer">
                      <span className="font-medium">Combles aménageables</span>
                      <p className="text-sm text-muted-foreground">Combles qui peuvent être transformés en espace habitable</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="perdu" id="perdu" className="sr-only" />
                    <Label htmlFor="perdu" className="cursor-pointer">
                      <span className="font-medium">Combles perdus</span>
                      <p className="text-sm text-muted-foreground">Combles non aménageables</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="insulationType">Type d'isolation</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("insulationType", value as any)}
                  defaultValue={form.getValues("insulationType")}
                  className="grid grid-cols-3 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="interieure" id="interieure" className="sr-only" />
                    <Label htmlFor="interieure" className="cursor-pointer">
                      <span className="font-medium">Isolation intérieure</span>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="exterieure" id="exterieure" className="sr-only" />
                    <Label htmlFor="exterieure" className="cursor-pointer">
                      <span className="font-medium">Isolation extérieure</span>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="mixte" id="mixte" className="sr-only" />
                    <Label htmlFor="mixte" className="cursor-pointer">
                      <span className="font-medium">Isolation mixte</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="windowType">Type de menuiseries</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("windowType", value as any)}
                  defaultValue={form.getValues("windowType")}
                  className="grid grid-cols-3 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="pvc" id="pvc" className="sr-only" />
                    <Label htmlFor="pvc" className="cursor-pointer">
                      <span className="font-medium">PVC</span>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="bois" id="bois" className="sr-only" />
                    <Label htmlFor="bois" className="cursor-pointer">
                      <span className="font-medium">Bois</span>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="aluminium" id="aluminium" className="sr-only" />
                    <Label htmlFor="aluminium" className="cursor-pointer">
                      <span className="font-medium">Aluminium</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}
        
        {/* Étape 3: Second oeuvre */}
        {step === 3 && (
          <div className="space-y-6 transition-opacity duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
                <Layers className="h-6 w-6 text-progineer-gold" />
                Second Œuvre
              </h2>
              <p className="text-muted-foreground">Définissez les finitions intérieures</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="plasteringType">Type de plâtrerie</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("plasteringType", value as any)}
                  defaultValue={form.getValues("plasteringType")}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="standard" id="plasteringStandard" className="sr-only" />
                    <Label htmlFor="plasteringStandard" className="cursor-pointer">
                      <span className="font-medium">Standard</span>
                      <p className="text-sm text-muted-foreground">Plaques de plâtre standards</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="decoratif" id="plasteringDecoratif" className="sr-only" />
                    <Label htmlFor="plasteringDecoratif" className="cursor-pointer">
                      <span className="font-medium">Décoratif</span>
                      <p className="text-sm text-muted-foreground">Finitions décoratives en plâtre</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="doorType">Type de portes intérieures</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("doorType", value as any)}
                  defaultValue={form.getValues("doorType")}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="standard" id="doorStandard" className="sr-only" />
                    <Label htmlFor="doorStandard" className="cursor-pointer">
                      <span className="font-medium">Standard</span>
                      <p className="text-sm text-muted-foreground">Portes alvéolaires</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="premium" id="doorPremium" className="sr-only" />
                    <Label htmlFor="doorPremium" className="cursor-pointer">
                      <span className="font-medium">Premium</span>
                      <p className="text-sm text-muted-foreground">Portes postformées ou acoustiques</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Revêtements de sol</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="floorTileType">Carrelage</Label>
                      <span className="text-sm text-muted-foreground">{form.watch("floorTilePercentage") || "0"}%</span>
                    </div>
                    <Select
                      onValueChange={(value) => form.setValue("floorTileType", value as any)}
                      defaultValue={form.getValues("floorTileType")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type de carrelage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                    <Slider
                      defaultValue={[parseInt(form.getValues("floorTilePercentage") || "0")]}
                      max={100}
                      step={10}
                      onValueChange={(value) => form.setValue("floorTilePercentage", value[0].toString())}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="parquetType">Parquet</Label>
                      <span className="text-sm text-muted-foreground">{form.watch("parquetPercentage") || "0"}%</span>
                    </div>
                    <Select
                      onValueChange={(value) => form.setValue("parquetType", value as any)}
                      defaultValue={form.getValues("parquetType")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type de parquet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stratifie">Stratifié</SelectItem>
                        <SelectItem value="contrecolle">Contrecollé</SelectItem>
                        <SelectItem value="massif">Massif</SelectItem>
                      </SelectContent>
                    </Select>
                    <Slider
                      defaultValue={[parseInt(form.getValues("parquetPercentage") || "0")]}
                      max={100}
                      step={10}
                      onValueChange={(value) => form.setValue("parquetPercentage", value[0].toString())}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="wallTileType">Type de faïence</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("wallTileType", value as any)}
                  defaultValue={form.getValues("wallTileType")}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="standard" id="wallTileStandard" className="sr-only" />
                    <Label htmlFor="wallTileStandard" className="cursor-pointer">
                      <span className="font-medium">Standard</span>
                      <p className="text-sm text-muted-foreground">Faïence basique</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="premium" id="wallTilePremium" className="sr-only" />
                    <Label htmlFor="wallTilePremium" className="cursor-pointer">
                      <span className="font-medium">Premium</span>
                      <p className="text-sm text-muted-foreground">Faïence décorative</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}
        
        {/* Étape 4: Équipements techniques */}
        {step === 4 && (
          <div className="space-y-6 transition-opacity duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
                <Thermometer className="h-6 w-6 text-progineer-gold" />
                Équipements techniques
              </h2>
              <p className="text-muted-foreground">Définissez les installations techniques</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="electricalType">Type d'installation électrique</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("electricalType", value as any)}
                  defaultValue={form.getValues("electricalType")}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="standard" id="electricalStandard" className="sr-only" />
                    <Label htmlFor="electricalStandard" className="cursor-pointer">
                      <span className="font-medium">Standard</span>
                      <p className="text-sm text-muted-foreground">Installation basique aux normes</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="domotique" id="electricalDomotique" className="sr-only" />
                    <Label htmlFor="electricalDomotique" className="cursor-pointer">
                      <span className="font-medium">Domotique</span>
                      <p className="text-sm text-muted-foreground">Installation avec système domotique</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="smart" id="electricalSmart" className="sr-only" />
                    <Label htmlFor="electricalSmart" className="cursor-pointer">
                      <span className="font-medium">Smart Home</span>
                      <p className="text-sm text-muted-foreground">Maison connectée complète</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="plumbingType">Type d'installation plomberie</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("plumbingType", value as any)}
                  defaultValue={form.getValues("plumbingType")}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="standard" id="plumbingStandard" className="sr-only" />
                    <Label htmlFor="plumbingStandard" className="cursor-pointer">
                      <span className="font-medium">Standard</span>
                      <p className="text-sm text-muted-foreground">Installation standard en PER</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="premium" id="plumbingPremium" className="sr-only" />
                    <Label htmlFor="plumbingPremium" className="cursor-pointer">
                      <span className="font-medium">Premium</span>
                      <p className="text-sm text-muted-foreground">Installation premium avec multicouche</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="heatingType">Type de chauffage</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("heatingType", value as any)}
                  defaultValue={form.getValues("heatingType")}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="gaz" id="gaz" className="sr-only" />
                    <Label htmlFor="gaz" className="cursor-pointer">
                      <span className="font-medium">Gaz</span>
                      <p className="text-sm text-muted-foreground">Chaudière à condensation</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="pompe-chaleur" id="pompe-chaleur" className="sr-only" />
                    <Label htmlFor="pompe-chaleur" className="cursor-pointer">
                      <span className="font-medium">Pompe à chaleur</span>
                      <p className="text-sm text-muted-foreground">Système air-eau</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="electrique" id="electrique" className="sr-only" />
                    <Label htmlFor="electrique" className="cursor-pointer">
                      <span className="font-medium">Électrique</span>
                      <p className="text-sm text-muted-foreground">Radiateurs à inertie</p>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="geothermie" id="geothermie" className="sr-only" />
                    <Label htmlFor="geothermie" className="cursor-pointer">
                      <span className="font-medium">Géothermie</span>
                      <p className="text-sm text-muted-foreground">Chauffage par le sol</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Climatisation</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("hasAirConditioning", value as any)}
                  defaultValue={form.getValues("hasAirConditioning")}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="yes" id="acYes" className="sr-only" />
                    <Label htmlFor="acYes" className="cursor-pointer">
                      <span className="font-medium">Avec climatisation</span>
                    </Label>
                  </div>
                  
                  <div className="rounded-md border p-4 hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="no" id="acNo" className="sr-only" />
                    <Label htmlFor="acNo" className="cursor-pointer">
                      <span className="font-medium">Sans climatisation</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}
        
        {/* Étape 5: Options et Coordonnées */}
        {step === 5 && (
          <div className="space-y-6 transition-opacity duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
                <User className="h-6 w-6 text-progineer-gold" />
                Pièces spécifiques et contact
              </h2>
              <p className="text-muted-foreground">Précisez vos besoins et coordonnées</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kitchenType">Type de cuisine</Label>
                  <Select
                    onValueChange={(value) => form.setValue("kitchenType", value as any)}
                    defaultValue={form.getValues("kitchenType")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (non équipée)</SelectItem>
                      <SelectItem value="equipee">Équipée</SelectItem>
                      <SelectItem value="surmesure">Sur mesure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bathroomType">Type de salle de bain</Label>
                  <Select
                    onValueChange={(value) => form.setValue("bathroomType", value as any)}
                    defaultValue={form.getValues("bathroomType")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bathroomCount">Nombre de salles de bain</Label>
                <Select
                  onValueChange={(value) => form.setValue("bathroomCount", value)}
                  defaultValue={form.getValues("bathroomCount")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 salle de bain</SelectItem>
                    <SelectItem value="2">2 salles de bain</SelectItem>
                    <SelectItem value="3">3 salles de bain</SelectItem>
                    <SelectItem value="4">4 salles de bain ou plus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="details">Détails supplémentaires</Label>
                <Textarea
                  id="details"
                  placeholder="Décrivez les spécificités supplémentaires de votre projet"
                  {...form.register("details")}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    Prénom <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Votre prénom"
                    {...form.register("firstName")}
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Nom <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Votre nom"
                    {...form.register("lastName")}
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Téléphone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Votre numéro de téléphone"
                    {...form.register("phone")}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  J'accepte que ces informations soient utilisées pour me recontacter concernant mon projet
                </Label>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation entre les étapes */}
        <div className="flex justify-between pt-6">
          {step > 1 ? (
            <Button 
              type="button" 
              variant="outline"
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Précédent
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button 
            type="submit"
            className="bg-progineer-gold hover:bg-progineer-gold/90 flex items-center gap-2"
          >
            {getButtonText()}
            {step < totalSteps && <ArrowRight className="h-4 w-4" />}
            {step === totalSteps && <Calculator className="h-4 w-4" />}
          </Button>
        </div>
      </form>
      
      {/* Affichage du résultat */}
      {showResult && estimationResult && (
        <Card className="mt-8 p-6 bg-green-50 border-green-200">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">Estimation générée avec succès</h2>
            <p className="text-green-700">Votre projet est estimé à environ:</p>
            <div className="flex items-center text-4xl font-bold text-green-900">
              <Euro className="h-6 w-6 mr-2" />
              {estimationResult.toLocaleString('fr-FR')} €
            </div>
            <p className="text-sm text-green-600 max-w-md mx-auto">
              Cette estimation est fournie à titre indicatif. Un devis précis nécessite une étude approfondie de votre projet.
              Nos équipes vous contacteront rapidement pour affiner cette estimation.
            </p>
            <div className="pt-4 flex gap-4">
              <Button 
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-100"
                onClick={() => setStep(1)}
              >
                Nouveau projet
              </Button>
              <Button 
                className="bg-progineer-gold hover:bg-progineer-gold/90"
              >
                Prendre rendez-vous
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default WorkEstimationForm;
