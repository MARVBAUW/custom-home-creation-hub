
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
import { 
  Building, 
  Calculator, 
  ChevronRight, 
  Home, 
  Ruler, 
  Hammer, 
  Wrench, 
  Send,
  Euro
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
  
  // Finitions
  plasteringType: z.enum(['plaque_platre', 'traditionnel', 'mixte'], {
    required_error: "Veuillez sélectionner un type de plâtrerie",
  }).optional(),
  flooringType: z.enum(['carrelage', 'parquet', 'pvc', 'mixte'], {
    required_error: "Veuillez sélectionner un type de sol",
  }).optional(),
  
  // Options complémentaires
  hasIsolation: z.boolean().default(false),
  hasPainting: z.boolean().default(false),
  hasElectricity: z.boolean().default(false),
  hasPlumbing: z.boolean().default(false),
  hasHeating: z.boolean().default(false),
  
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
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, control, watch, formState: { errors, isValid } } = useForm<EstimationFormValues>({
    resolver: zodResolver(estimationSchema),
    mode: "onChange",
    defaultValues: {
      projectType: 'construction',
      surface: '',
      levels: '1',
      wallType: 'parpaing',
      roofType: 'traditionnelle',
      roofingType: 'tuiles',
      windowType: 'pvc',
      plasteringType: 'plaque_platre',
      flooringType: 'carrelage',
      hasIsolation: true,
      hasPainting: true,
      hasElectricity: true,
      hasPlumbing: true,
      hasHeating: true,
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
  
  // Navigation entre les étapes
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  // Calcul de l'estimation
  const calculateEstimation = async (data: EstimationFormValues) => {
    setIsCalculating(true);
    
    // Simulation d'un calcul basé sur les données du formulaire
    const basePrice = {
      construction: 1200,
      renovation: 800,
      extension: 1000
    }[data.projectType];
    
    const surfaceValue = parseFloat(data.surface) || 0;
    const levelsValue = parseInt(data.levels) || 1;
    
    // Facteurs multiplicateurs basés sur les choix
    const wallFactor = {
      brique: 1.1,
      parpaing: 1.0,
      pierre: 1.3,
      beton: 1.2,
      autre: 1.15
    }[data.wallType || 'parpaing'];
    
    const roofFactor = {
      traditionnelle: 1.2,
      industrielle: 1.0,
      terrasse: 1.1,
      autre: 1.15
    }[data.roofType || 'traditionnelle'];
    
    const windowFactor = {
      pvc: 1.0,
      alu: 1.2,
      bois: 1.3,
      mixte: 1.15
    }[data.windowType || 'pvc'];
    
    // Options supplémentaires
    const optionsPrice = (
      (data.hasIsolation ? 50 : 0) +
      (data.hasPainting ? 35 : 0) +
      (data.hasElectricity ? 60 : 0) +
      (data.hasPlumbing ? 70 : 0) +
      (data.hasHeating ? 80 : 0)
    ) * surfaceValue;
    
    // Calcul final
    const totalHT = Math.round(basePrice * surfaceValue * wallFactor * roofFactor * windowFactor * Math.sqrt(levelsValue) + optionsPrice);
    const tva = Math.round(totalHT * 0.2);
    const totalTTC = totalHT + tva;
    
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEstimationResult(totalTTC);
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
  
  return (
    <Card className="w-full shadow-lg border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Calculator className="h-6 w-6 text-khaki-600" />
          Estimation de travaux détaillée
        </CardTitle>
        <CardDescription>
          Complétez les informations ci-dessous pour obtenir une estimation précise de votre projet
        </CardDescription>
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
              <div className="flex items-center gap-2 mb-6">
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
              <div className="flex items-center gap-2 mb-6">
                <Ruler className="h-5 w-5 text-khaki-600" />
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
              </div>
            </motion.div>
          )}
          
          {/* Étape 3: Second œuvre et finitions */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Hammer className="h-5 w-5 text-khaki-600" />
                <h3 className="text-xl font-medium">Second œuvre et finitions</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="flooringType">Type de revêtement de sol</Label>
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
                      <SelectItem value="pvc">Sol PVC / Vinyle</SelectItem>
                      <SelectItem value="mixte">Mixte</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.flooringType && (
                    <p className="text-sm text-red-500">{errors.flooringType.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h4 className="font-medium">Options de finition</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <Label htmlFor="hasIsolation" className="cursor-pointer flex-1">Isolation thermique</Label>
                    <Switch 
                      id="hasIsolation" 
                      checked={watch('hasIsolation')}
                      onCheckedChange={(checked) => register('hasIsolation').onChange({ target: { value: checked } })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <Label htmlFor="hasPainting" className="cursor-pointer flex-1">Peinture</Label>
                    <Switch 
                      id="hasPainting" 
                      checked={watch('hasPainting')}
                      onCheckedChange={(checked) => register('hasPainting').onChange({ target: { value: checked } })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <Label htmlFor="hasElectricity" className="cursor-pointer flex-1">Électricité</Label>
                    <Switch 
                      id="hasElectricity" 
                      checked={watch('hasElectricity')}
                      onCheckedChange={(checked) => register('hasElectricity').onChange({ target: { value: checked } })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <Label htmlFor="hasPlumbing" className="cursor-pointer flex-1">Plomberie</Label>
                    <Switch 
                      id="hasPlumbing" 
                      checked={watch('hasPlumbing')}
                      onCheckedChange={(checked) => register('hasPlumbing').onChange({ target: { value: checked } })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <Label htmlFor="hasHeating" className="cursor-pointer flex-1">Chauffage</Label>
                    <Switch 
                      id="hasHeating" 
                      checked={watch('hasHeating')}
                      onCheckedChange={(checked) => register('hasHeating').onChange({ target: { value: checked } })}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Étape 4: Informations de contact */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Wrench className="h-5 w-5 text-khaki-600" />
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
          
          {/* Étape 5: Résultat de l'estimation */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-6">
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
                        <li className="flex justify-between">
                          <span>Gros œuvre</span>
                          <span className="font-medium">{formattedPrice(estimationResult * 0.35)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Charpente / Couverture</span>
                          <span className="font-medium">{formattedPrice(estimationResult * 0.15)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Menuiseries</span>
                          <span className="font-medium">{formattedPrice(estimationResult * 0.1)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Plâtrerie / Isolation</span>
                          <span className="font-medium">{formattedPrice(estimationResult * 0.1)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Plomberie / Électricité</span>
                          <span className="font-medium">{formattedPrice(estimationResult * 0.15)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Finitions</span>
                          <span className="font-medium">{formattedPrice(estimationResult * 0.15)}</span>
                        </li>
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
        {currentStep > 1 && currentStep < 5 && (
          <Button 
            type="button" 
            variant="outline"
            onClick={prevStep}
          >
            Étape précédente
          </Button>
        )}
        
        {currentStep < 4 && (
          <Button 
            type="button"
            className="ml-auto bg-khaki-600 hover:bg-khaki-700 text-white"
            onClick={nextStep}
          >
            Étape suivante
          </Button>
        )}
        
        {currentStep === 4 && (
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
