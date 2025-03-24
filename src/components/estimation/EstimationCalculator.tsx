
import React, { useState } from 'react';
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
}

const EstimationCalculator = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(7); // This will change based on user choices
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
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // Define all possible steps
  const steps: EstimationStep[] = [
    { title: "Votre profil" },
    { title: "Informations sur votre projet (Professionnel)" },
    { title: "Informations sur votre projet (Particulier)" },
    { title: "Type d'estimation", description: "Choisissez le niveau de précision souhaité pour votre estimation" },
    { title: "Détails de construction", description: "Informations de base sur votre projet" },
    { title: "Type de terrain", description: "Caractéristiques de votre terrain" },
    { title: "Vos coordonnées", description: "Pour recevoir votre estimation par email" },
  ];

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
    setStep(7); // Contact info
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
    
    // Calculate estimation based on form data
    calculateEstimation();
  };

  // Calculate the cost estimation
  const calculateEstimation = () => {
    // Basic calculation formula - this would be much more complex in reality
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
    
    // Calculate final estimation
    const estimatedCost = Math.round(basePrice * surface * terrainMultiplier);
    
    setEstimationResult(estimatedCost);
    setShowResultDialog(true);
    
    // Send the data to backend (would be implemented in a real scenario)
    console.log("Sending estimation data:", formData);
    console.log("Estimated cost:", estimatedCost);
  };

  // Go back to previous step
  const handlePrevious = () => {
    if (step > 1) {
      let prevStep = step - 1;
      
      // Skip professional step if user is individual
      if (prevStep === 2 && formData.clientType === "individual") {
        prevStep = 1;
      }
      
      // Skip individual step if user is professional
      if (prevStep === 3 && formData.clientType === "professional") {
        prevStep = 2;
      }
      
      setStep(prevStep);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Form {...clientTypeForm}>
            <form onSubmit={clientTypeForm.handleSubmit(onClientTypeSubmit)} className="space-y-6">
              <FormField
                control={clientTypeForm.control}
                name="clientType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Vous êtes ?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="professional" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Professionnel
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="individual" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Particulier
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4 flex justify-end">
                <Button type="submit">
                  Poursuivre
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 2: // Professional project info
        return (
          <Form {...professionalProjectForm}>
            <form onSubmit={professionalProjectForm.handleSubmit(onProfessionalProjectSubmit)} className="space-y-6">
              <FormField
                control={professionalProjectForm.control}
                name="activity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Quel est votre activité ?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="offices" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Bureaux
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="commerce" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Commerce
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="hotel" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Hotellerie
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="restaurant" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Restauration
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="industry" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Industrie
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="realEstate" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Investisseur immobilier
                          </FormLabel>
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
                    <FormLabel className="text-base">Quel type de projet ?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="construction" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Construction
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="renovation" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Rénovation
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="extension" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Extension
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="optimization" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Optimisation
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="division" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Division
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="design" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Design d'espace / décoration
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={professionalProjectForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quand souhaitez-vous réaliser le projet ?</FormLabel>
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
                      <FormLabel>Date de fin souhaitée ?</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                <Button type="submit">
                  Poursuivre
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 3: // Individual project info
        return (
          <Form {...individualProjectForm}>
            <form onSubmit={individualProjectForm.handleSubmit(onIndividualProjectSubmit)} className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
                <p className="text-amber-800 text-sm">
                  Cet estimatif de travaux est fourni à titre indicatif pour vous aider dans votre prise de décision. 
                  Il ne remplace pas un devis complet, qui nécessite un rendez-vous avec un maître d'œuvre ou des artisans 
                  pour étudier votre projet en détail et adapter le chiffrage à vos besoins spécifiques.
                </p>
              </div>
              
              <FormField
                control={individualProjectForm.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Quel type de projet ?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="construction" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Construction
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="renovation" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Rénovation
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="extension" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Extension
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="optimization" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Optimisation
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="division" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Division
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="design" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Design d'espace / décoration
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                <Button type="submit">
                  Poursuivre
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 4: // Estimation type
        return (
          <Form {...estimationTypeForm}>
            <form onSubmit={estimationTypeForm.handleSubmit(onEstimationTypeSubmit)} className="space-y-6">
              <FormField
                control={estimationTypeForm.control}
                name="estimationType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">TYPE D'ESTIMATION</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-6"
                      >
                        <FormItem className="flex flex-col space-y-2 border border-gray-200 p-4 rounded-md hover:border-khaki-600 transition-all">
                          <div className="flex items-start space-x-3">
                            <FormControl>
                              <RadioGroupItem value="quick" />
                            </FormControl>
                            <div>
                              <FormLabel className="font-medium cursor-pointer">
                                Rapide 5 mins (Précision à + ou - 10%)
                              </FormLabel>
                              <p className="text-sm text-gray-500">L'estimation rapide demande peu ou pas de connaissances</p>
                            </div>
                          </div>
                        </FormItem>
                        
                        <FormItem className="flex flex-col space-y-2 border border-gray-200 p-4 rounded-md hover:border-khaki-600 transition-all">
                          <div className="flex items-start space-x-3">
                            <FormControl>
                              <RadioGroupItem value="precise" />
                            </FormControl>
                            <div>
                              <FormLabel className="font-medium cursor-pointer">
                                Précise 15 mins (précision à + ou- 5%)
                              </FormLabel>
                              <p className="text-sm text-gray-500">L'estimation précise demande quelques connaissances dans le domaine</p>
                            </div>
                          </div>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-md space-y-4">
                <p className="text-sm text-gray-600">
                  <strong>NOTA :</strong> Pour les questions nécessitant des quantités (m², ml, nombre, %), il n'est pas nécessaire d'indiquer des valeurs avec une précision absolue. L'important est de donner une estimation selon votre propre appréciation, afin que nous puissions vous fournir une estimation indicative adaptée.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>NOTA :</strong> Pour les questions nécessitant un niveau de gamme (Base, milieu de gamme, haut de gamme, premium), ces précisions ont une vocation économique : standards étant le plus économique $ , haut de gamme ou prémium étant le moins économique $$$.
                </p>
              </div>
              
              <FormField
                control={estimationTypeForm.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        J'ai pris connaissance des NOTA.
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                <Button type="submit">
                  Poursuivre
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 5: // Construction details
        return (
          <Form {...constructionDetailsForm}>
            <form onSubmit={constructionDetailsForm.handleSubmit(onConstructionDetailsSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={constructionDetailsForm.control}
                  name="surface"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quelle est la surface de votre projet ?</FormLabel>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <span className="text-gray-500">m²</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={constructionDetailsForm.control}
                  name="levels"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Combien de niveaux comporte votre projet ?</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={constructionDetailsForm.control}
                  name="units"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Combien de logements comporte le projet futur ?</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                <Button type="submit">
                  Poursuivre
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 6: // Terrain type
        return (
          <Form {...terrainForm}>
            <form onSubmit={terrainForm.handleSubmit(onTerrainSubmit)} className="space-y-6">
              <FormField
                control={terrainForm.control}
                name="terrainType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">CARACTÉRISTIQUE DU TERRAIN</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      {[
                        { id: "rocky", label: "ROCHEUX", image: "https://storage.tally.so/ca35d469-4aca-4551-b106-d82eb6685aad/DALL-E-2024-10-23-11.00.10---A-beautiful-illustration-of-a-rocky-terrain-showing-a-rugged-landscape-with-scattered-rocks-and-boulders.-The-ground-is-uneven-with-stone-formations-.webp" },
                        { id: "clayey", label: "ARGILEUX", image: "https://storage.tally.so/19204de1-2be8-40c9-82fa-ee1469480b67/DALL-E-2024-10-23-11.00.08---A-beautiful-illustration-of-a-clayey-terrain-showing-a-landscape-with-slightly-cracked-earth-and-a-smooth-surface.-The-ground-looks-soft-and-dense-w.webp" },
                        { id: "flat", label: "PLAT", image: "https://storage.tally.so/02f06ce3-8138-4760-881a-3caaebe90099/DALL-E-2024-10-23-11.00.12---A-beautiful-illustration-of-a-flat-terrain-showing-a-wide-open-plain-with-even-ground.-The-landscape-is-serene-and-peaceful-with-short-green-grass-.webp" },
                        { id: "rough", label: "ACCIDENTÉ", image: "https://storage.tally.so/1c1404ae-601d-4378-a2ff-d235bd924c65/DALL-E-2024-10-23-10.56.00---An-illustration-of-rugged-accidented-terrain-with-uneven-and-irregular-ground-levels-showing-a-variety-of-small-hills-dips-and-mounds.-The-landsca.webp" },
                        { id: "sloped", label: "PENTU", image: "https://storage.tally.so/e0576168-a151-4776-b05e-640c8aa7f610/DALL-E-2024-10-23-11.01.11---A-beautiful-illustration-of-a-steep-terrain-showing-a-sloped-landscape-with-a-noticeable-incline.-The-ground-features-scattered-rocks-and-patches-of-.webp" },
                        { id: "serviced", label: "VIABILISÉ", image: "https://storage.tally.so/cc16539f-40fa-4acf-8503-1ab1ae322053/DALL-E-2024-10-23-11.09.38---A-detailed-illustration-of-a-serviced-viabilise-terrain-showing-a-flat-plot-of-land-with-essential-infrastructure-in-place.-The-landscape-is-clean-.webp" },
                      ].map((item) => (
                        <FormItem
                          key={item.id}
                          className={`relative border rounded-lg overflow-hidden transition-all ${
                            field.value?.includes(item.id) 
                              ? "border-khaki-600 ring-2 ring-khaki-600" 
                              : "border-gray-200 hover:border-khaki-400"
                          }`}
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                              className="sr-only"
                            />
                          </FormControl>
                          <div 
                            className="cursor-pointer"
                            onClick={() => {
                              const checked = field.value?.includes(item.id);
                              return checked
                                ? field.onChange(field.value?.filter((value) => value !== item.id))
                                : field.onChange([...field.value || [], item.id]);
                            }}
                          >
                            <img src={item.image} alt={item.label} className="w-full h-36 object-cover" />
                            <div className="p-3">
                              <FormLabel className="text-sm font-medium cursor-pointer">{item.label}</FormLabel>
                            </div>
                            {field.value?.includes(item.id) && (
                              <div className="absolute top-2 right-2 bg-khaki-600 text-white p-1 rounded-full">
                                <Check className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        </FormItem>
                      ))}
                      
                      <FormItem
                        className={`relative border rounded-lg overflow-hidden transition-all ${
                          field.value?.includes("none") 
                            ? "border-khaki-600 ring-2 ring-khaki-600" 
                            : "border-gray-200 hover:border-khaki-400"
                        }`}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes("none")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange(["none"])
                                : field.onChange([])
                            }}
                            className="sr-only"
                          />
                        </FormControl>
                        <div 
                          className="cursor-pointer h-full flex items-center justify-center p-10"
                          onClick={() => {
                            const checked = field.value?.includes("none");
                            return checked
                              ? field.onChange([])
                              : field.onChange(["none"]);
                          }}
                        >
                          <FormLabel className="text-lg font-medium cursor-pointer text-center">SANS OBJET</FormLabel>
                          {field.value?.includes("none") && (
                            <div className="absolute top-2 right-2 bg-khaki-600 text-white p-1 rounded-full">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </FormItem>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                <Button type="submit">
                  Poursuivre
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case 7: // Contact info
        return (
          <Form {...contactForm}>
            <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={contactForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre prénom" {...field} />
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
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={contactForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre numéro de téléphone" {...field} />
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
                        <Input type="email" placeholder="Votre adresse email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                <Button type="submit">
                  <Calculator className="mr-2 h-4 w-4" />
                  Obtenir mon estimation
                </Button>
              </div>
            </form>
          </Form>
        );
        
      default:
        return null;
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="px-8 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-khaki-800">Estimer votre projet</h2>
        <div className="flex items-center mt-6">
          <div className="relative flex items-center justify-center w-full">
            {steps.slice(0, totalSteps).map((_, index) => (
              <React.Fragment key={index}>
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    index + 1 === step 
                      ? "bg-khaki-600 text-white" 
                      : index + 1 < step 
                        ? "bg-khaki-200 text-khaki-800" 
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1 < step ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                {index < totalSteps - 1 && (
                  <div 
                    className={`h-[2px] flex-1 ${
                      index + 1 < step ? "bg-khaki-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-800">{steps[step - 1]?.title}</h3>
          {steps[step - 1]?.description && (
            <p className="text-gray-500 mt-1">{steps[step - 1]?.description}</p>
          )}
        </div>

        <div>{renderStep()}</div>
      </div>

      {/* Result Dialog */}
      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estimation de votre projet</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div className="text-center my-6">
                <p className="text-lg text-gray-600">L'estimation de votre projet est de :</p>
                <p className="text-3xl font-bold text-khaki-800 my-4">
                  {estimationResult ? formatCurrency(estimationResult) : "0 €"} HT*
                </p>
                <p className="text-xs text-gray-500">
                  *hors terrain, frais de notaire, étude géotechnique, honoraires de maitrise d'oeuvre, 
                  taxe d'aménagement, taxe archéologique, assurance dommage ouvrage
                </p>
              </div>
              <p>
                Merci de nous avoir contacté pour votre projet. Nous prendrons contact avec vous 
                rapidement pour pouvoir répondre au mieux à vos attentes pour votre projet 🚀
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowResultDialog(false)}>
              Fermer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EstimationCalculator;
