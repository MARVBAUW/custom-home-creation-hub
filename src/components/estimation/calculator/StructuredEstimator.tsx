import React, { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEstimationCalculator } from './useEstimationCalculator';
import { FormProvider } from 'react-hook-form';
import { useEstimationForm } from './hooks/useEstimationForm';
import EstimationReport from './EstimationReport';
import DetailedEstimationReport from './DetailedEstimationReport';
import ProfessionalQuoteReport from './ProfessionalQuoteReport';
import EstimationSummaryReport from './EstimationSummaryReport';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircle, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { convertEstimationResponseData } from './utils/typeHelpers';

// Import form components
import ClientTypeForm from './FormSteps/ClientTypeForm';
import ProjectDetailsForm from './FormSteps/ProjectDetailsForm';
import TerrainForm from './FormSteps/TerrainForm';
import GrosOeuvreForm from './FormSteps/GrosOeuvreForm';
import CharpenteForm from './FormSteps/CharpenteForm';
import CouvertureForm from './FormSteps/CouvertureForm';
import FacadeForm from './FormSteps/FacadeForm';
import MenuiseriesExtForm from './FormSteps/MenuiseriesExtForm';
import IsolationForm from './FormSteps/IsolationForm';
import ElectriciteForm from './FormSteps/ElectriciteForm';
import PlomberieForm from './FormSteps/PlomberieForm';
import ChauffageForm from './FormSteps/ChauffageForm';
import PlatrerieForm from './FormSteps/PlatrerieForm';
import MenuiseriesIntForm from './FormSteps/MenuiseriesIntForm';
import CarrelageForm from './FormSteps/CarrelageForm';
import ParquetForm from './FormSteps/ParquetForm';
import PeintureForm from './FormSteps/PeintureForm';
import AmenagementExtForm from './FormSteps/AmenagementExtForm';
import ContactForm from './FormSteps/ContactForm';
import ResultsForm from './FormSteps/ResultsForm';

const StructuredEstimator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("estimation");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [email, setEmail] = useState("");
  
  // Utiliser le hook pour gérer les différentes étapes
  const {
    step,
    setStep,
    totalSteps,
    formData,
    estimationResult,
    animationDirection,
    updateFormData,
    goToNextStep,
    goToPreviousStep
  } = useEstimationCalculator();
  
  const { methods } = useEstimationForm();
  
  // Calculate values for categories based on estimation result
  const calculateCategoryAmount = (percentage: number): number => {
    return estimationResult ? Number(estimationResult.totalAmount) * percentage : 0;
  };
  
  // Simuler des catégories d'estimation basées sur les données du formulaire
  const categoriesAmounts = [
    { category: 'Terrassement', amount: calculateCategoryAmount(0.05) },
    { category: 'Fondations', amount: calculateCategoryAmount(0.08) },
    { category: 'Élévation des murs', amount: calculateCategoryAmount(0.12) },
    { category: 'Charpente', amount: calculateCategoryAmount(0.1) },
    { category: 'Couverture', amount: calculateCategoryAmount(0.08) },
    { category: 'Menuiseries extérieures', amount: calculateCategoryAmount(0.07) },
    { category: 'Isolation', amount: calculateCategoryAmount(0.06) },
    { category: 'Plomberie', amount: calculateCategoryAmount(0.05) },
    { category: 'Électricité', amount: calculateCategoryAmount(0.05) },
    { category: 'Chauffage', amount: calculateCategoryAmount(0.06) },
    { category: 'Revêtements de sol', amount: calculateCategoryAmount(0.06) },
    { category: 'Revêtements muraux', amount: calculateCategoryAmount(0.04) },
    { category: 'Peinture', amount: calculateCategoryAmount(0.03) },
    { category: 'Aménagements extérieurs', amount: calculateCategoryAmount(0.05) },
    { category: 'Frais annexes', amount: calculateCategoryAmount(0.03) },
    { category: 'Honoraires architecte', amount: calculateCategoryAmount(0.03) },
    { category: 'Taxe aménagement', amount: calculateCategoryAmount(0.02) },
    { category: 'Études géotechniques', amount: calculateCategoryAmount(0.01) },
    { category: 'Étude thermique', amount: calculateCategoryAmount(0.01) },
    { category: 'Garantie décennale', amount: calculateCategoryAmount(0.01) },
  ];
  
  // Gérer le changement d'étape en fonction du corps d'état actuel
  const getStepContent = () => {
    switch (step) {
      case 0:
        return <ClientTypeForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 1:
        return <ProjectDetailsForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 2:
        return <TerrainForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 3:
        return <GrosOeuvreForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 4:
        return <CharpenteForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 5:
        return <CouvertureForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 6:
        return <FacadeForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 7:
        return <MenuiseriesExtForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 8:
        return <IsolationForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 9:
        return <ElectriciteForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 10:
        return <PlomberieForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 11:
        return <ChauffageForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 12:
        return <PlatrerieForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 13:
        return <MenuiseriesIntForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 14:
        return <CarrelageForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 15:
        return <ParquetForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 16:
        return <PeintureForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 17:
        return <AmenagementExtForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 18:
        return <ContactForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
      case 19:
        return <ResultsForm 
                 estimationResult={estimationResult} 
                 formData={formData} 
                 categoriesAmounts={categoriesAmounts}
                 goToPreviousStep={goToPreviousStep} 
                 animationDirection={animationDirection}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
           />;
      default:
        return <ClientTypeForm 
                 formData={formData}
                 updateFormData={updateFormData}
                 goToNextStep={goToNextStep}
                 goToPreviousStep={goToPreviousStep}
                 animationDirection={animationDirection}
               />;
    }
  };
  
  // Gérer l'impression du document
  const handlePrint = () => {
    if (printRef.current) {
      // Logique pour déclencher l'impression du navigateur
      window.print();
      
      toast({
        title: "Impression lancée",
        description: "Le rapport d'estimation est en cours d'impression",
      });
    }
  };
  
  // Gérer la sauvegarde de l'estimation
  const handleSaveEstimation = () => {
    setShowSaveDialog(true);
  };
  
  // Confirmer la sauvegarde et rediriger vers la création de compte
  const handleConfirmSave = () => {
    // Sauvegarder les données dans le localStorage pour les récupérer après création de compte
    localStorage.setItem('savedEstimation', JSON.stringify({
      projectName: projectName,
      email: email,
      formData: formData,
      estimationResult: estimationResult,
      date: new Date().toISOString()
    }));
    
    toast({
      title: "Estimation sauvegardée",
      description: "Vous allez être redirigé vers la création de compte",
    });
    
    // Rediriger vers la page d'inscription
    setTimeout(() => {
      navigate('/auth/signup');
    }, 1500);
  };
  
  // Progression de l'étape actuelle
  const stepProgress = ((step + 1) / totalSteps) * 100;
  
  return (
    <FormProvider {...methods}>
      <div className="w-full">
        {/* Affichage du résultat final ou des étapes du formulaire */}
        {step === totalSteps - 1 && estimationResult ? (
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="estimation">Estimation Détaillée</TabsTrigger>
              <TabsTrigger value="summary">Résumé</TabsTrigger>
              <TabsTrigger value="quote">Devis Professionnel</TabsTrigger>
            </TabsList>
            
            <div className="flex justify-end gap-2 my-4">
              <Button variant="outline" onClick={handleSaveEstimation} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Sauvegarder Projet
              </Button>
              <Button variant="outline" onClick={() => goToPreviousStep()}>
                Modifier mon estimation
              </Button>
            </div>
            
            <TabsContent value="estimation" className="mt-0">
              <div ref={printRef}>
                <EstimationReport 
                  estimation={{
                    totalHT: estimationResult.totalAmount || 0,
                    totalTTC: (estimationResult.totalAmount || 0) * 1.2,
                    vat: (estimationResult.totalAmount || 0) * 0.2,
                    coutGlobalHT: (estimationResult.totalAmount || 0) * 1.15,
                    coutGlobalTTC: (estimationResult.totalAmount || 0) * 1.15 * 1.2,
                    honorairesHT: (estimationResult.totalAmount || 0) * 0.1,
                    taxeAmenagement: (estimationResult.totalAmount || 0) * 0.03,
                    garantieDecennale: (estimationResult.totalAmount || 0) * 0.01,
                    etudesGeotechniques: (estimationResult.totalAmount || 0) * 0.005,
                    etudeThermique: (estimationResult.totalAmount || 0) * 0.005,
                    corpsEtat: categoriesAmounts.reduce((acc, cat) => ({
                      ...acc,
                      [cat.category]: {
                        montantHT: cat.amount,
                        details: [
                          formData.projectType ? `Type de projet: ${formData.projectType}` : '',
                          formData.surface ? `Surface concernée: ${formData.surface} m²` : '',
                        ].filter(Boolean)
                      }
                    }), {})
                  }}
                  formData={formData}
                  onBack={() => setActiveTab('form')}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="summary" className="mt-0">
              {/* Render summary component */}
              <EstimationSummaryReport 
                estimationResult={estimationResult}
                formData={formData}
              />
            </TabsContent>
            
            <TabsContent value="quote" className="mt-0">
              {/* Render professional quote */}
              <ProfessionalQuoteReport 
                estimationResult={estimationResult}
                formData={formData}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="w-full shadow-md border p-6">
            {getStepContent()}
          </Card>
        )}
        
        {/* Save dialog */}
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sauvegarder votre estimation</DialogTitle>
              <DialogDescription>
                Remplissez les informations suivantes pour sauvegarder votre estimation et y accéder ultérieurement.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Nom du projet</Label>
                <Input 
                  id="projectName" 
                  value={projectName} 
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Ex: Rénovation maison Marseille"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>Annuler</Button>
              <Button onClick={handleConfirmSave} disabled={!email || !projectName}>
                Sauvegarder et créer un compte
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </FormProvider>
  );
};

export default StructuredEstimator;
