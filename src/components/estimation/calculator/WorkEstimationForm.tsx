
import React, { useState } from 'react';
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ProgressBar from './ProgressBar';
import { useStepCalculation, useStepNavigation } from './hooks/steps';
import { FormData } from './types';
import StepRenderer from './components/StepRenderer';
import { useEstimationSteps } from './hooks/useEstimationSteps';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Schéma de validation pour le formulaire complet
const formSchema = z.object({
  // Étape 1: Informations générales
  clientType: z.string().optional(),
  projectType: z.string().optional(),
  estimationType: z.string().optional(),
  
  // Étape 2: Construction
  surfaceArea: z.number().min(10).optional(),
  floors: z.number().min(1).optional(),
  terrainType: z.string().optional(),
  wallType: z.string().optional(),
  roofType: z.string().optional(),
  atticType: z.string().optional(),
  roofingType: z.string().optional(),
  
  // Étape 3: Enveloppe et isolation
  insulationType: z.string().optional(),
  facadeMaterial: z.string().optional(),
  windowType: z.string().optional(),
  
  // Étape 4: Technique
  electricalType: z.string().optional(),
  plumbingType: z.string().optional(),
  heatingType: z.string().optional(),
  plasteringType: z.string().optional(),
  interiorDoorsType: z.string().optional(),
  
  // Étape 5: Finitions
  flooringType: z.string().optional(),
  tileType: z.string().optional(),
  paintType: z.string().optional(),
  
  // Contact
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  message: z.string().optional(),
}).partial();

const WorkEstimationForm: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  const [formData, setFormData] = useState<FormData>({});

  // Initialisation du formulaire avec react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientType: undefined,
      projectType: undefined,
      estimationType: undefined,
      surfaceArea: undefined,
      floors: undefined,
      terrainType: undefined,
      wallType: undefined,
      roofType: undefined,
      atticType: undefined,
      roofingType: undefined,
      insulationType: undefined,
      facadeMaterial: undefined,
      windowType: undefined,
      electricalType: undefined,
      plumbingType: undefined,
      heatingType: undefined,
      plasteringType: undefined,
      interiorDoorsType: undefined,
      flooringType: undefined,
      tileType: undefined,
      paintType: undefined,
      name: undefined,
      email: undefined,
      phone: undefined,
      message: undefined,
    },
  });

  // Hooks personnalisés pour la gestion des étapes et calculs
  const { visibleSteps } = useEstimationSteps(formData);
  const { totalSteps } = useStepCalculation({ visibleSteps });
  const { goToNextStep, goToPreviousStep } = useStepNavigation({
    currentStep,
    totalSteps,
    setCurrentStep,
    setAnimationDirection,
  });

  // Fonctions de gestion pour chaque étape du formulaire
  const onClientTypeSubmit = (data: { clientType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onProfessionalProjectSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onIndividualProjectSubmit = (data: { projectType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onEstimationTypeSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onConstructionDetailsSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onTerrainSubmit = (data: { terrainType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onGrosOeuvreSubmit = (data: { wallType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onCharpenteSubmit = (data: { roofType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onComblesSubmit = (data: { atticType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onCouvertureSubmit = (data: { roofingType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onIsolationSubmit = (data: { insulationType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onFacadeSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onMenuiseriesExtSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onElectriciteSubmit = (data: { electricalType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onPlomberieSubmit = (data: { plumbingType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onChauffageSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onPlatrerieSubmit = (data: { plasteringType: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onMenuiseriesIntSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onCarrelageSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onParquetSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onPeintureSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goToNextStep();
  };

  const onContactSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    
    // Afficher un toast de confirmation
    toast({
      title: "Estimation envoyée !",
      description: "Nous vous contacterons bientôt avec les détails de votre estimation.",
    });
    
    // Réinitialiser le formulaire ou afficher les résultats
    console.log("Données complètes du formulaire:", { ...formData, ...data });
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Card className="p-6">
          <div className="mb-6">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>

          <StepRenderer
            step={currentStep}
            totalSteps={totalSteps}
            animationDirection={animationDirection}
            formData={formData}
            visibleSteps={visibleSteps}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            onClientTypeSubmit={onClientTypeSubmit}
            onProfessionalProjectSubmit={onProfessionalProjectSubmit}
            onIndividualProjectSubmit={onIndividualProjectSubmit}
            onEstimationTypeSubmit={onEstimationTypeSubmit}
            onConstructionDetailsSubmit={onConstructionDetailsSubmit}
            onTerrainSubmit={onTerrainSubmit}
            onGrosOeuvreSubmit={onGrosOeuvreSubmit}
            onCharpenteSubmit={onCharpenteSubmit}
            onComblesSubmit={onComblesSubmit}
            onCouvertureSubmit={onCouvertureSubmit}
            onIsolationSubmit={onIsolationSubmit}
            onFacadeSubmit={onFacadeSubmit}
            onMenuiseriesExtSubmit={onMenuiseriesExtSubmit}
            onElectriciteSubmit={onElectriciteSubmit}
            onPlomberieSubmit={onPlomberieSubmit}
            onChauffageSubmit={onChauffageSubmit}
            onPlatrerieSubmit={onPlatrerieSubmit}
            onMenuiseriesIntSubmit={onMenuiseriesIntSubmit}
            onCarrelageSubmit={onCarrelageSubmit}
            onParquetSubmit={onParquetSubmit}
            onPeintureSubmit={onPeintureSubmit}
            onContactSubmit={onContactSubmit}
          />

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={goToPreviousStep}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
              </Button>
            )}
            {currentStep < totalSteps && (
              <Button 
                type="button" 
                className="ml-auto flex items-center"
                onClick={goToNextStep}
              >
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      </form>
    </Form>
  );
};

export default WorkEstimationForm;
