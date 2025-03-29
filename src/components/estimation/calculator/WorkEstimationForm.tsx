
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { 
  Building, 
  Calculator, 
  ChevronRight, 
  Home, 
  Ruler, 
  Hammer, 
  Wrench, 
  Send,
  Euro,
  Layers,
  Paintbrush,
  Construction,
  Shuffle,
  LightbulbIcon,
  ShowerHead,
  Shovel
} from 'lucide-react';

// Schéma de validation pour le formulaire
const estimationSchema = z.object({
  // Informations générales
  projectType: z.enum(['construction', 'renovation', 'extension'], {
    required_error: "Veuillez sélectionner un type de projet",
  }),
  surface: z.string().min(1, "Veuillez indiquer la surface"),
  levels: z.string().min(1, "Veuillez indiquer le nombre de niveaux"),
  
  // Gros œuvre
  wallType: z.enum(['brique', 'parpaing', 'pierre', 'beton', 'autre'], {
    required_error: "Veuillez sélectionner un type de mur",
  }).optional(),
  foundationType: z.enum(['traditionnelle', 'radier', 'micropieux', 'autre'], {
    required_error: "Veuillez sélectionner un type de fondation",
  }).optional(),
  
  // Charpente
  roofType: z.enum(['traditionnelle', 'industrielle', 'terrasse', 'autre'], {
    required_error: "Veuillez sélectionner un type de charpente",
  }).optional(),
  
  // Couverture
  roofingType: z.enum(['tuiles', 'zinc', 'bac_acier', 'autres'], {
    required_error: "Veuillez sélectionner un type de couverture",
  }).optional(),
  
  // Menuiseries
  windowType: z.enum(['pvc', 'alu', 'bois', 'mixte'], {
    required_error: "Veuillez sélectionner un type de menuiserie",
  }).optional(),
  
  // Plâtrerie
  plasteringType: z.enum(['plaque_platre', 'traditionnel', 'mixte'], {
    required_error: "Veuillez sélectionner un type de plâtrerie",
  }).optional(),
  insulationType: z.enum(['standard', 'renforcee', 'haute_performance'], {
    required_error: "Veuillez sélectionner un type d'isolation",
  }).optional(),
  
  // Revêtements de sol
  flooringType: z.enum(['carrelage', 'parquet', 'stratifie', 'mixte'], {
    required_error: "Veuillez sélectionner un type de sol",
  }).optional(),
  
  // Carrelage
  tileSurface: z.string().optional(),
  
  // Peinture
  wallFinishType: z.enum(['peinture_mate', 'peinture_satinee', 'papier_peint', 'autre'], {
    required_error: "Veuillez sélectionner un type de finition murale",
  }).optional(),
  
  // Electricité
  electricalLevel: z.enum(['basique', 'standard', 'avance', 'domotique'], {
    required_error: "Veuillez sélectionner un niveau d'installation électrique",
  }).optional(),
  
  // Plomberie
  plumbingLevel: z.enum(['basique', 'standard', 'premium'], {
    required_error: "Veuillez sélectionner un niveau d'installation de plomberie",
  }).optional(),
  
  // Chauffage
  heatingType: z.enum(['electrique', 'gaz', 'pompe_chaleur', 'poele', 'autre'], {
    required_error: "Veuillez sélectionner un type de chauffage",
  }).optional(),
  
  // Options complémentaires
  hasVentilation: z.boolean().default(false),
  hasDemolition: z.boolean().default(false),
  hasLandscaping: z.boolean().default(false),
  demolitionPercentage: z.string().optional(),
  vrdPercentage: z.string().optional(),
  
  // Informations de contact
  firstName: z.string().min(1, "Veuillez indiquer votre prénom"),
  lastName: z.string().min(1, "Veuillez indiquer votre nom"),
  email: z.string().email("Veuillez indiquer un email valide"),
  phone: z.string().min(10, "Veuillez indiquer un numéro de téléphone valide"),
  
  // Commentaires
  comments: z.string().optional(),
});

type EstimationFormValues = z.infer<typeof estimationSchema>;

const WorkEstimationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [estimationBreakdown, setEstimationBreakdown] = useState<{[key: string]: number}>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, control, watch, setValue, formState: { errors, isValid } } = useForm<EstimationFormValues>({
    resolver: zodResolver(estimationSchema),
    mode: "onChange",
    defaultValues: {
      projectType: 'construction',
      surface: '',
      levels: '1',
      wallType: 'parpaing',
      foundationType: 'traditionnelle',
      roofType: 'traditionnelle',
      roofingType: 'tuiles',
      windowType: 'pvc',
      plasteringType: 'plaque_platre',
      insulationType: 'standard',
      flooringType: 'carrelage',
      tileSurface: '0',
      wallFinishType: 'peinture_mate',
      electricalLevel: 'standard',
      plumbingLevel: 'standard',
      heatingType: 'electrique',
      hasVentilation: true,
      hasDemolition: false,
      hasLandscaping: false,
      demolitionPercentage: '0',
      vrdPercentage: '0',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      comments: '',
    }
  });
  
  // Surveiller le type de projet pour afficher les champs appropriés
  const projectType = watch('projectType');
  const surface = watch('surface');
  const hasDemolition = watch('hasDemolition');
  const hasLandscaping = watch('hasLandscaping');
  const demolitionPercentage = watch('demolitionPercentage');
  const vrdPercentage = watch('vrdPercentage');
  
  // Mise à jour des pourcentages lors du changement de switch
  React.useEffect(() => {
    if (!hasDemolition) {
      setValue('demolitionPercentage', '0');
    } else if (demolitionPercentage === '0') {
      setValue('demolitionPercentage', '10');
    }
    
    if (!hasLandscaping) {
      setValue('vrdPercentage', '0');
    } else if (vrdPercentage === '0') {
      setValue('vrdPercentage', '10');
    }
  }, [hasDemolition, hasLandscaping, setValue, demolitionPercentage, vrdPercentage]);
  
  // Navigation entre les étapes
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  // Calcul de l'estimation
  const calculateEstimation = async (data: EstimationFormValues) => {
    setIsCalculating(true);
    
    // Simulation d'un calcul basé sur les données du formulaire
    const basePrice = {
      construction: 1200,
      renovation: 850,
      extension: 1000
    }[data.projectType];
    
    const surfaceValue = parseFloat(data.surface) || 0;
    const levelsValue = parseInt(data.levels) || 1;
    
    // Facteurs multiplicateurs basés sur les choix
    // Gros oeuvre
    const wallFactor = {
      brique: 1.1,
      parpaing: 1.0,
      pierre: 1.3,
      beton: 1.2,
      autre: 1.15
    }[data.wallType || 'parpaing'];
    
    const foundationFactor = {
      traditionnelle: 1.0,
      radier: 1.1,
      micropieux: 1.4,
      autre: 1.2
    }[data.foundationType || 'traditionnelle'];
    
    // Toiture et charpente
    const roofFactor = {
      traditionnelle: 1.2,
      industrielle: 1.0,
      terrasse: 1.1,
      autre: 1.15
    }[data.roofType || 'traditionnelle'];
    
    const roofingFactor = {
      tuiles: 1.0,
      zinc: 1.3,
      bac_acier: 0.9,
      autres: 1.1
    }[data.roofingType || 'tuiles'];
    
    // Menuiseries
    const windowFactor = {
      pvc: 1.0,
      alu: 1.2,
      bois: 1.3,
      mixte: 1.15
    }[data.windowType || 'pvc'];
    
    // Plâtrerie et isolation
    const plasteringFactor = {
      plaque_platre: 1.0,
      traditionnel: 1.2,
      mixte: 1.1
    }[data.plasteringType || 'plaque_platre'];
    
    const insulationFactor = {
      standard: 1.0,
      renforcee: 1.2,
      haute_performance: 1.4
    }[data.insulationType || 'standard'];
    
    // Revêtements de sol
    const flooringFactor = {
      carrelage: 1.0,
      parquet: 1.2,
      stratifie: 0.9,
      mixte: 1.1
    }[data.flooringType || 'carrelage'];
    
    // Peinture et finitions
    const wallFinishFactor = {
      peinture_mate: 1.0,
      peinture_satinee: 1.1,
      papier_peint: 1.2,
      autre: 1.15
    }[data.wallFinishType || 'peinture_mate'];
    
    // Installations électriques
    const electricalFactor = {
      basique: 0.8,
      standard: 1.0,
      avance: 1.2,
      domotique: 1.5
    }[data.electricalLevel || 'standard'];
    
    // Plomberie et chauffage
    const plumbingFactor = {
      basique: 0.8,
      standard: 1.0,
      premium: 1.3
    }[data.plumbingLevel || 'standard'];
    
    const heatingFactor = {
      electrique: 0.9,
      gaz: 1.0,
      pompe_chaleur: 1.5,
      poele: 0.8,
      autre: 1.1
    }[data.heatingType || 'electrique'];
    
    // Options supplémentaires (ventilation)
    const ventilationCost = data.hasVentilation ? 35 * surfaceValue : 0;
    
    // Calcul des coûts par poste
    const grossOeuvrePrice = basePrice * 0.28 * surfaceValue * wallFactor * foundationFactor * Math.sqrt(levelsValue);
    const toiturePrice = basePrice * 0.12 * surfaceValue * roofFactor * roofingFactor;
    const menuiseriesPrice = basePrice * 0.10 * surfaceValue * windowFactor;
    const platreriePrice = basePrice * 0.10 * surfaceValue * plasteringFactor * insulationFactor;
    const revSolPrice = basePrice * 0.08 * surfaceValue * flooringFactor;
    const peinturePrice = basePrice * 0.07 * surfaceValue * wallFinishFactor;
    const electricitePrice = basePrice * 0.06 * surfaceValue * electricalFactor;
    const plomberiePrice = basePrice * 0.09 * surfaceValue * plumbingFactor;
    const chauffagePrice = basePrice * 0.10 * surfaceValue * heatingFactor + ventilationCost;
    
    // Options de démolition et VRD si activées
    const demolitionValue = parseFloat(data.demolitionPercentage) / 100 || 0;
    const vrdValue = parseFloat(data.vrdPercentage) / 100 || 0;
    
    const demolitionPrice = data.hasDemolition ? 
      demolitionValue * surfaceValue * 250 : 0;
      
    const vrdPrice = data.hasLandscaping ? 
      vrdValue * surfaceValue * 150 : 0;
    
    // Somme de tous les postes
    const totalPrice = grossOeuvrePrice + toiturePrice + menuiseriesPrice + 
      platreriePrice + revSolPrice + peinturePrice + electricitePrice + 
      plomberiePrice + chauffagePrice + demolitionPrice + vrdPrice;
    
    // Stockage du détail pour affichage
    const breakdown = {
      'Gros œuvre': Math.round(grossOeuvrePrice),
      'Toiture et charpente': Math.round(toiturePrice),
      'Menuiseries': Math.round(menuiseriesPrice),
      'Plâtrerie et isolation': Math.round(platreriePrice),
      'Revêtements de sol': Math.round(revSolPrice),
      'Peinture et finitions': Math.round(peinturePrice),
      'Électricité': Math.round(electricitePrice),
      'Plomberie': Math.round(plomberiePrice),
      'Chauffage et ventilation': Math.round(chauffagePrice)
    };
    
    if (demolitionPrice > 0) {
      breakdown['Démolition'] = Math.round(demolitionPrice);
    }
    
    if (vrdPrice > 0) {
      breakdown['VRD et aménagements extérieurs'] = Math.round(vrdPrice);
    }
    
    setEstimationBreakdown(breakdown);
    
    // TVA et total TTC
    const tva = totalPrice * 0.2;
    const totalTTC = totalPrice + tva;
    
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEstimationResult(Math.round(totalTTC));
    setIsCalculating(false);
    
    toast({
      title: "Estimation réalisée",
      description: "Votre estimation a été calculée avec succès.",
      duration: 5000,
    });
  };
  
  const onSubmit = (data: EstimationFormValues) => {
    console.log("Données du formulaire:", data);
    calculateEstimation(data);
    nextStep();
  };
  
  const formattedPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  const renderProgressBar = () => {
    const progress = ((currentStep - 1) / 5) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-khaki-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };
  
  const getStepTitle = () => {
    switch(currentStep) {
      case 1: return "Informations générales";
      case 2: return "Structure et gros œuvre";
      case 3: return "Second œuvre et revêtements";
      case 4: return "Équipements techniques";
      case 5: return "Options et coordonnées";
      case 6: return "Résultat de l'estimation";
      default: return "Étape";
    }
  };
  
  return (
    <Card className="w-full shadow-lg border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Calculator className="h-6 w-6 text-khaki-600" />
          {getStepTitle()}
        </CardTitle>
        <CardDescription>
          {currentStep < 6 ? "Complétez les informations ci-dessous pour obtenir une estimation précise de votre projet" 
           : "Voici le détail de votre estimation basée sur les informations fournies"}
        </CardDescription>
        {currentStep < 6 && renderProgressBar()}
      </CardHeader>
      
      <CardContent>
        <form id="estimationForm" onSubmit={handleSubmit(onSubmit)}>
          {/* Étape 1: Informations générales */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-5 w-5 text-khaki-600" />
                <h3 className="text-xl font-medium">Informations générales du projet</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectType">Type de projet</Label>
                  <Select 
                    onValueChange={(value) => register('projectType').onChange({ target: { value } })}
                    defaultValue={watch('projectType')}
                  >
                    <SelectTrigger id="projectType">
                      <SelectValue placeholder="Sélectionnez un type de projet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="construction">Construction neuve</SelectItem>
                      <SelectItem value="renovation">Rénovation</SelectItem>
                      <SelectItem value="extension">Extension</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.projectType && (
                    <p className="text-sm text-red-500">{errors.projectType.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="surface">Surface habitable (m²)</Label>
                  <Input
                    id="surface"
                    type="number"
                    placeholder="Ex: 120"
                    {...register('surface')}
                  />
                  {errors.surface && (
                    <p className="text-sm text-red-500">{errors.surface.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="levels">Nombre de niveaux</Label>
                  <Select 
                    onValueChange={(value) => register('levels').onChange({ target: { value } })}
                    defaultValue={watch('levels')}
                  >
                    <SelectTrigger id="levels">
                      <SelectValue placeholder="Sélectionnez le nombre de niveaux" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 niveau (Plain-pied)</SelectItem>
                      <SelectItem value="2">2 niveaux (R+1)</SelectItem>
                      <SelectItem value="3">3 niveaux (R+2)</SelectItem>
                      <SelectItem value="4">4 niveaux ou plus</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.levels && (
                    <p className="text-sm text-red-500">{errors.levels.message}</p>
                  )}
                </div>
                
                {projectType === 'renovation' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hasDemolition" className="cursor-pointer">Travaux de démolition nécessaires</Label>
                      <Switch 
                        id="hasDemolition" 
                        checked={watch('hasDemolition')}
                        onCheckedChange={(checked) => register('hasDemolition').onChange({ target: { value: checked } })}
                      />
                    </div>
                    
                    {hasDemolition && (
                      <div className="pt-2">
                        <Label htmlFor="demolitionPercentage" className="text-sm">
                          Pourcentage de démolition : {demolitionPercentage}%
                        </Label>
                        <Slider
                          id="demolitionPercentage"
                          min={0}
                          max={100}
                          step={5}
                          value={[parseInt(demolitionPercentage) || 0]}
                          onValueChange={(value) => setValue('demolitionPercentage', value[0].toString())}
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-khaki-50 border border-khaki-200 rounded-md">
                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-khaki-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-khaki-800">Projet de {projectType === 'construction' ? 'construction neuve' : projectType === 'renovation' ? 'rénovation' : 'extension'}</h4>
                    <p className="text-sm text-khaki-700 mt-1">
                      {projectType === 'construction' ? 
                        "Une construction neuve nécessite un terrain et des démarches administratives spécifiques (permis de construire, etc.)." :
                        projectType === 'renovation' ? 
                        "La rénovation concerne des travaux sur un bâtiment existant pour l'améliorer ou le remettre à neuf." :
                        "L'extension consiste à agrandir une construction existante."}
                    </p>
                    {surface && <p className="text-sm font-medium text-khaki-800 mt-1">Surface prévue: {surface} m²</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Étape 2: Gros œuvre et structure */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Construction className="h-5 w-5 text-khaki-600" />
                <h3 className="text-xl font-medium">Structure et gros œuvre</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="wallType">Type de murs</Label>
                  <Select 
                    onValueChange={(value) => register('wallType').onChange({ target: { value } })}
                    defaultValue={watch('wallType')}
                  >
                    <SelectTrigger id="wallType">
                      <SelectValue placeholder="Sélectionnez un type de mur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brique">Brique</SelectItem>
                      <SelectItem value="parpaing">Parpaing</SelectItem>
                      <SelectItem value="pierre">Pierre</SelectItem>
                      <SelectItem value="beton">Béton</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.wallType && (
                    <p className="text-sm text-red-500">{errors.wallType.message}</p>
                  )}
                </div>
                
                {projectType !== 'renovation' && (
                  <div className="space-y-2">
                    <Label htmlFor="foundationType">Type de fondation</Label>
                    <Select 
                      onValueChange={(value) => register('foundationType').onChange({ target: { value } })}
                      defaultValue={watch('foundationType')}
                    >
                      <SelectTrigger id="foundationType">
                        <SelectValue placeholder="Sélectionnez un type de fondation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traditionnelle">Traditionnelle (semelles filantes)</SelectItem>
                        <SelectItem value="radier">Radier</SelectItem>
                        <SelectItem value="micropieux">Micropieux</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.foundationType && (
                      <p className="text-sm text-red-500">{errors.foundationType.message}</p>
                    )}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="roofType">Type de charpente</Label>
                  <Select 
                    onValueChange={(value) => register('roofType').onChange({ target: { value } })}
                    defaultValue={watch('roofType')}
                  >
                    <SelectTrigger id="roofType">
                      <SelectValue placeholder="Sélectionnez un type de charpente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traditionnelle">Traditionnelle</SelectItem>
                      <SelectItem value="industrielle">Industrielle (fermettes)</SelectItem>
                      <SelectItem value="terrasse">Toit terrasse</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.roofType && (
                    <p className="text-sm text-red-500">{errors.roofType.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="roofingType">Type de couverture</Label>
                  <Select 
                    onValueChange={(value) => register('roofingType').onChange({ target: { value } })}
                    defaultValue={watch('roofingType')}
                  >
                    <SelectTrigger id="roofingType">
                      <SelectValue placeholder="Sélectionnez un type de couverture" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tuiles">Tuiles</SelectItem>
                      <SelectItem value="zinc">Zinc</SelectItem>
                      <SelectItem value="bac_acier">Bac acier</SelectItem>
                      <SelectItem value="autres">Autres</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.roofingType && (
                    <p className="text-sm text-red-500">{errors.roofingType.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="windowType">Type de menuiseries extérieures</Label>
                  <Select 
                    onValueChange={(value) => register('windowType').onChange({ target: { value } })}
                    defaultValue={watch('windowType')}
                  >
                    <SelectTrigger id="windowType">
                      <SelectValue placeholder="Sélectionnez un type de menuiserie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pvc">PVC</SelectItem>
                      <SelectItem value="alu">Aluminium</SelectItem>
                      <SelectItem value="bois">Bois</SelectItem>
                      <SelectItem value="mixte">Mixte</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.windowType && (
                    <p className="text-sm text-red-500">{errors.windowType.message}</p>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-4">
                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-blue-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Conseils pour le gros œuvre</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Le choix des matériaux de structure impacte fortement le budget, mais aussi les performances thermiques et phoniques de votre construction. 
                      Les fondations doivent être adaptées à la nature du terrain et au type de construction.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Étape 3: Second œuvre et revêtements */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-khaki-600" />
                <h3 className="text-xl font-medium">Second œuvre et revêtements</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="plasteringType">Type de plâtrerie</Label>
                  <Select 
                    onValueChange={(value) => register('plasteringType').onChange({ target: { value } })}
                    defaultValue={watch('plasteringType')}
                  >
                    <SelectTrigger id="plasteringType">
                      <SelectValue placeholder="Sélectionnez un type de plâtrerie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plaque_platre">Plaques de plâtre</SelectItem>
                      <SelectItem value="traditionnel">Plâtre traditionnel</SelectItem>
                      <SelectItem value="mixte">Mixte</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.plasteringType && (
                    <p className="text-sm text-red-500">{errors.plasteringType.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insulationType">Type d'isolation</Label>
                  <Select 
                    onValueChange={(value) => register('insulationType').onChange({ target: { value } })}
                    defaultValue={watch('insulationType')}
                  >
                    <SelectTrigger id="insulationType">
                      <SelectValue placeholder="Sélectionnez un type d'isolation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (RT2012)</SelectItem>
                      <SelectItem value="renforcee">Renforcée (BBC)</SelectItem>
                      <SelectItem value="haute_performance">Haute performance (Passive)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.insulationType && (
                    <p className="text-sm text-red-500">{errors.insulationType.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="flooringType">Type de revêtement de sol principal</Label>
                  <Select 
                    onValueChange={(value) => register('flooringType').onChange({ target: { value } })}
                    defaultValue={watch('flooringType')}
                  >
                    <SelectTrigger id="flooringType">
                      <SelectValue placeholder="Sélectionnez un type de sol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carrelage">Carrelage</SelectItem>
                      <SelectItem value="parquet">Parquet</SelectItem>
                      <SelectItem value="stratifie">Stratifié</SelectItem>
                      <SelectItem value="mixte">Mixte</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.flooringType && (
                    <p className="text-sm text-red-500">{errors.flooringType.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="wallFinishType">Type de finition murale</Label>
                  <Select 
                    onValueChange={(value) => register('wallFinishType').onChange({ target: { value } })}
                    defaultValue={watch('wallFinishType')}
                  >
                    <SelectTrigger id="wallFinishType">
                      <SelectValue placeholder="Sélectionnez un type de finition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="peinture_mate">Peinture mate</SelectItem>
                      <SelectItem value="peinture_satinee">Peinture satinée</SelectItem>
                      <SelectItem value="papier_peint">Papier peint</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.wallFinishType && (
                    <p className="text-sm text-red-500">{errors.wallFinishType.message}</p>
                  )}
                </div>
              </div>
              
              {watch('flooringType') === 'carrelage' && (
                <div className="pt-2">
                  <Label htmlFor="tileSurface" className="text-sm">
                    Surface approximative à carreler (en % de la surface totale) : {watch('tileSurface') || 0}%
                  </Label>
                  <Slider
                    id="tileSurface"
                    min={0}
                    max={100}
                    step={10}
                    value={[parseInt(watch('tileSurface') || '0')]}
                    onValueChange={(value) => setValue('tileSurface', value[0].toString())}
                    className="mt-2"
                  />
                </div>
              )}
              
              <div className="p-4 bg-khaki-50 border border-khaki-200 rounded-md mt-4">
                <div className="flex items-start gap-3">
                  <Paintbrush className="h-5 w-5 text-khaki-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-khaki-800">Finitions et matériaux</h4>
                    <p className="text-sm text-khaki-700 mt-1">
                      Les finitions représentent environ 25-30% du budget total, mais sont les éléments les plus visibles au quotidien. 
                      Une bonne isolation permet de réaliser des économies d'énergie importantes sur le long terme.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Étape 4: Équipements techniques */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="h-5 w-5 text-khaki-600" />
                <h3 className="text-xl font-medium">Équipements techniques</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="electricalLevel">Niveau d'installation électrique</Label>
                  <Select 
                    onValueChange={(value) => register('electricalLevel').onChange({ target: { value } })}
                    defaultValue={watch('electricalLevel')}
                  >
                    <SelectTrigger id="electricalLevel">
                      <SelectValue placeholder="Sélectionnez un niveau d'installation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basique">Basique</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="avance">Avancé (domotique partielle)</SelectItem>
                      <SelectItem value="domotique">Domotique complète</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.electricalLevel && (
                    <p className="text-sm text-red-500">{errors.electricalLevel.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="plumbingLevel">Niveau d'installation plomberie</Label>
                  <Select 
                    onValueChange={(value) => register('plumbingLevel').onChange({ target: { value } })}
                    defaultValue={watch('plumbingLevel')}
                  >
                    <SelectTrigger id="plumbingLevel">
                      <SelectValue placeholder="Sélectionnez un niveau d'installation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basique">Basique</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.plumbingLevel && (
                    <p className="text-sm text-red-500">{errors.plumbingLevel.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heatingType">Type de chauffage</Label>
                  <Select 
                    onValueChange={(value) => register('heatingType').onChange({ target: { value } })}
                    defaultValue={watch('heatingType')}
                  >
                    <SelectTrigger id="heatingType">
                      <SelectValue placeholder="Sélectionnez un type de chauffage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrique">Électrique</SelectItem>
                      <SelectItem value="gaz">Gaz</SelectItem>
                      <SelectItem value="pompe_chaleur">Pompe à chaleur</SelectItem>
                      <SelectItem value="poele">Poêle à bois/granulés</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.heatingType && (
                    <p className="text-sm text-red-500">{errors.heatingType.message}</p>
                  )}
                </div>
                
                <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                  <Label htmlFor="hasVentilation" className="cursor-pointer flex-1">
                    <div className="font-medium">Ventilation mécanique contrôlée (VMC)</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Installation d'une VMC double flux pour un meilleur renouvellement d'air
                    </p>
                  </Label>
                  <Switch 
                    id="hasVentilation" 
                    checked={watch('hasVentilation')}
                    onCheckedChange={(checked) => register('hasVentilation').onChange({ target: { value: checked } })}
                  />
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-4">
                <div className="flex items-start gap-3">
                  <LightbulbIcon className="h-5 w-5 text-blue-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Économies d'énergie</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Le choix du système de chauffage et de ventilation a un impact significatif sur la consommation énergétique et le confort de votre habitation.
                      Les systèmes modernes comme les pompes à chaleur ou la VMC double flux représentent un investissement initial plus important mais permettent des économies à long terme.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Étape 5: Options et coordonnées */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shuffle className="h-5 w-5 text-khaki-600" />
                <h3 className="text-xl font-medium">Options complémentaires</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                {!hasDemolition && (
                  <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <Label htmlFor="hasLandscaping" className="cursor-pointer flex-1">
                      <div className="font-medium">Aménagements extérieurs (VRD)</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Terrassement, voirie, réseaux divers, espaces verts
                      </p>
                    </Label>
                    <Switch 
                      id="hasLandscaping" 
                      checked={watch('hasLandscaping')}
                      onCheckedChange={(checked) => register('hasLandscaping').onChange({ target: { value: checked } })}
                    />
                  </div>
                )}
                
                {hasLandscaping && (
                  <div className="pt-2 pb-4">
                    <Label htmlFor="vrdPercentage" className="text-sm">
                      Importance des travaux VRD (en % du budget total) : {vrdPercentage}%
                    </Label>
                    <Slider
                      id="vrdPercentage"
                      min={0}
                      max={30}
                      step={5}
                      value={[parseInt(vrdPercentage) || 0]}
                      onValueChange={(value) => setValue('vrdPercentage', value[0].toString())}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <ShowerHead className="h-5 w-5 text-khaki-600" />
                <h3 className="text-xl font-medium">Vos coordonnées</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Votre prénom"
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Votre nom"
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Votre numéro de téléphone"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <Label htmlFor="comments">Commentaires ou précisions sur votre projet</Label>
                <Textarea
                  id="comments"
                  placeholder="Ajoutez des détails supplémentaires sur votre projet si nécessaire"
                  className="h-32"
                  {...register('comments')}
                />
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start gap-3">
                  <Send className="h-5 w-5 text-blue-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Finalisation de votre demande</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      En soumettant ce formulaire, vous recevrez une estimation détaillée de votre projet directement par email.
                      Un de nos experts pourra vous contacter pour affiner cette estimation selon vos besoins spécifiques.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Étape 6: Résultat de l'estimation */}
          {currentStep === 6 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Euro className="h-5 w-5 text-khaki-600" />
                <h3 className="text-xl font-medium">Résultat de votre estimation</h3>
              </div>
              
              {isCalculating ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="w-16 h-16 border-4 border-khaki-200 border-t-khaki-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-lg font-medium text-khaki-700">Calcul de votre estimation en cours...</p>
                  <p className="text-sm text-gray-500 mt-2">Cela peut prendre quelques instants</p>
                </div>
              ) : estimationResult ? (
                <div className="p-6 border-2 border-green-200 bg-green-50 rounded-lg">
                  <div className="flex flex-col items-center text-center mb-6">
                    <p className="text-lg text-green-700 mb-2">Le montant estimé de votre projet est de :</p>
                    <div className="text-4xl font-bold text-green-800">
                      {formattedPrice(estimationResult)}
                    </div>
                    <p className="text-sm text-green-600 mt-3">
                      Cette estimation inclut la TVA à 20% et est basée sur les informations que vous avez fournies.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-3 border border-green-200 rounded-md bg-white">
                      <h4 className="font-medium text-green-800">Répartition estimée</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        {Object.entries(estimationBreakdown).map(([poste, montant]) => (
                          <li key={poste} className="flex justify-between">
                            <span>{poste}</span>
                            <span className="font-medium">{formattedPrice(montant)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-3 border border-green-200 rounded-md bg-white">
                      <h4 className="font-medium text-green-800">Prochaines étapes</h4>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Un récapitulatif détaillé vous a été envoyé par email</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Un expert Progineer vous contactera sous 48h pour affiner cette estimation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Nous vous proposerons un rendez-vous sur site pour évaluer précisément votre projet</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="bg-white hover:bg-gray-50"
                      onClick={() => setCurrentStep(1)}
                    >
                      Nouvelle estimation
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-6 border border-yellow-200 bg-yellow-50 rounded-lg text-center">
                  <p className="text-yellow-700">Veuillez compléter le formulaire pour obtenir votre estimation</p>
                </div>
              )}
            </motion.div>
          )}
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between flex-wrap gap-3 pt-6">
        {currentStep > 1 && currentStep < 6 && (
          <Button 
            type="button" 
            variant="outline"
            onClick={prevStep}
          >
            Étape précédente
          </Button>
        )}
        
        {currentStep < 5 && (
          <Button 
            type="button"
            className="ml-auto bg-khaki-600 hover:bg-khaki-700 text-white"
            onClick={nextStep}
          >
            Étape suivante
          </Button>
        )}
        
        {currentStep === 5 && (
          <Button 
            type="submit"
            form="estimationForm"
            className="ml-auto bg-khaki-600 hover:bg-khaki-700 text-white"
            disabled={!isValid}
          >
            Obtenir mon estimation
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkEstimationForm;
