
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

// Import des formulaires pour chaque corps d'état
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
    showResultDialog,
    animationDirection,
    updateFormData,
    goToNextStep,
    goToPreviousStep
  } = useEstimationCalculator();
  
  const { methods } = useEstimationForm();
  
  // Simuler des catégories d'estimation basées sur les données du formulaire
  const categoriesAmounts = [
    { category: 'Terrassement', amount: estimationResult ? estimationResult * 0.05 : 0 },
    { category: 'Fondations', amount: estimationResult ? estimationResult * 0.08 : 0 },
    { category: 'Élévation des murs', amount: estimationResult ? estimationResult * 0.12 : 0 },
    { category: 'Charpente', amount: estimationResult ? estimationResult * 0.1 : 0 },
    { category: 'Couverture', amount: estimationResult ? estimationResult * 0.08 : 0 },
    { category: 'Menuiseries extérieures', amount: estimationResult ? estimationResult * 0.07 : 0 },
    { category: 'Isolation', amount: estimationResult ? estimationResult * 0.06 : 0 },
    { category: 'Plomberie', amount: estimationResult ? estimationResult * 0.05 : 0 },
    { category: 'Électricité', amount: estimationResult ? estimationResult * 0.05 : 0 },
    { category: 'Chauffage', amount: estimationResult ? estimationResult * 0.06 : 0 },
    { category: 'Revêtements de sol', amount: estimationResult ? estimationResult * 0.06 : 0 },
    { category: 'Revêtements muraux', amount: estimationResult ? estimationResult * 0.04 : 0 },
    { category: 'Peinture', amount: estimationResult ? estimationResult * 0.03 : 0 },
    { category: 'Aménagements extérieurs', amount: estimationResult ? estimationResult * 0.05 : 0 },
    { category: 'Frais annexes', amount: estimationResult ? estimationResult * 0.03 : 0 },
    { category: 'Honoraires architecte', amount: estimationResult ? estimationResult * 0.03 : 0 },
    { category: 'Taxe aménagement', amount: estimationResult ? estimationResult * 0.02 : 0 },
    { category: 'Études géotechniques', amount: estimationResult ? estimationResult * 0.01 : 0 },
    { category: 'Étude thermique', amount: estimationResult ? estimationResult * 0.01 : 0 },
    { category: 'Garantie décennale', amount: estimationResult ? estimationResult * 0.01 : 0 },
  ];
  
  // Gérer le changement d'étape en fonction du corps d'état actuel
  const getStepContent = () => {
    switch (step) {
      case 0:
        return <ClientTypeForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} />;
      case 1:
        return <ProjectDetailsForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 2:
        return <TerrainForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 3:
        return <GrosOeuvreForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 4:
        return <CharpenteForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 5:
        return <CouvertureForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 6:
        return <FacadeForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 7:
        return <MenuiseriesExtForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 8:
        return <IsolationForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 9:
        return <ElectriciteForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 10:
        return <PlomberieForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 11:
        return <ChauffageForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 12:
        return <PlatrerieForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 13:
        return <MenuiseriesIntForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 14:
        return <CarrelageForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 15:
        return <ParquetForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 16:
        return <PeintureForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 17:
        return <AmenagementExtForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 18:
        return <ContactForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
      case 19:
        return <ResultsForm 
          estimationResult={estimationResult} 
          formData={formData} 
          categoriesAmounts={categoriesAmounts}
          goToPreviousStep={goToPreviousStep} 
        />;
      default:
        return <ClientTypeForm formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} />;
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
                    totalHT: estimationResult || 0,
                    totalTTC: (estimationResult || 0) * 1.2,
                    vat: (estimationResult || 0) * 0.2,
                    coutGlobalHT: (estimationResult || 0) * 1.15,
                    coutGlobalTTC: (estimationResult || 0) * 1.15 * 1.2,
                    honorairesHT: (estimationResult || 0) * 0.1,
                    taxeAmenagement: (estimationResult || 0) * 0.03,
                    garantieDecennale: (estimationResult || 0) * 0.01,
                    etudesGeotechniques: (estimationResult || 0) * 0.005,
                    etudeThermique: (estimationResult || 0) * 0.005,
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
                  includeTerrainPrice={!!formData.landPrice} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="summary" className="mt-0">
              <EstimationSummaryReport 
                formData={formData}
                estimationResult={estimationResult}
                categoriesAmounts={categoriesAmounts}
              />
            </TabsContent>
            
            <TabsContent value="quote" className="mt-0">
              <ProfessionalQuoteReport 
                formData={formData}
                estimationResult={estimationResult}
                onPrint={handlePrint}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="p-6">
            {/* Barre de progression */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
              <div 
                className="h-2 bg-progineer-gold rounded-full transition-all duration-300"
                style={{ width: `${stepProgress}%` }}
              ></div>
            </div>
            
            {/* Étape actuelle */}
            <div className="text-sm text-gray-500 mb-2">
              Étape {step + 1} sur {totalSteps}
            </div>
            
            {/* Contenu de l'étape actuelle */}
            <div className={`transform transition-all duration-300 ${animationDirection === 'next' ? 'translate-x-0 opacity-100' : animationDirection === 'prev' ? 'translate-x-0 opacity-100' : ''}`}>
              {getStepContent()}
            </div>
            
            {/* Boutons de navigation (sauf pour les premières et dernières étapes qui ont leurs propres boutons) */}
            {step > 0 && step < totalSteps - 2 && (
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="flex items-center gap-2"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Précédent
                </Button>
                <Button
                  type="button"
                  onClick={goToNextStep}
                  className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
                >
                  Suivant
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </div>
            )}
          </Card>
        )}
        
        {/* Dialog pour sauvegarder l'estimation */}
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sauvegarder votre estimation</DialogTitle>
              <DialogDescription>
                Donnez un nom à votre projet et renseignez votre email pour créer un compte et sauvegarder votre estimation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projectName" className="text-right">
                  Nom du projet
                </Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="col-span-3"
                  placeholder="Maison rue des Lilas"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                  placeholder="votre@email.com"
                  type="email"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowSaveDialog(false)}>
                Annuler
              </Button>
              <Button type="button" onClick={handleConfirmSave} className="bg-progineer-gold hover:bg-progineer-gold/90">
                <CheckCircle className="w-4 h-4 mr-2" />
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
