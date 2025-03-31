
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ClientTypeForm, ProjectDetailsForm, TerrainForm, ConstructionDetailsForm, RoomsDetailsForm, ResultsForm } from './FormSteps';
import ProgressBar from './ProgressBar';
import FormNavigation from './FormNavigation';
import { FormData } from './types';
import { calculateEstimation } from './calculationUtils';

// Initial form data
const initialFormData: FormData = {
  clientType: '',
  contactMethod: '',
  projectType: '',
  surface: '',
  city: '',
  budget: '',
  timeframe: '',
  location: '',
  landType: '',
  constructionType: '',
  constructionStyle: '',
  storyCount: '',
  roofingType: '',
  insulationType: '',
  heatingType: '',
  bedrooms: '',
  bathrooms: '',
  specialFeatures: [],
  qualityStandard: '',
  complexity: '',
};

const EstimationWizard = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Define the total number of steps based on form data and flow
  const getTotalSteps = (): number => {
    // Basic flow: Client Type -> Project Details -> Terrain -> Construction Details -> Rooms -> Results
    return 6;
  };
  
  const totalSteps = getTotalSteps();
  
  // Calculate progress percentage
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  // Update form data
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };
  
  // Navigate to next step
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Form completed, show results
      handleSubmit();
    }
  };
  
  // Navigate to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Navigate to specific step
  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const estimationResult = calculateEstimation(formData);
      setIsLoading(false);
    }, 1500);
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ClientTypeForm 
            formData={formData} 
            updateFormData={updateFormData} 
            goToNextStep={goToNextStep}
          />
        );
      case 2:
        return (
          <ProjectDetailsForm 
            formData={formData} 
            updateFormData={updateFormData} 
            goToNextStep={goToNextStep} 
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 3:
        return (
          <TerrainForm 
            formData={formData} 
            updateFormData={updateFormData} 
            goToNextStep={goToNextStep} 
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 4:
        return (
          <ConstructionDetailsForm 
            formData={formData} 
            updateFormData={updateFormData} 
            goToNextStep={goToNextStep} 
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 5:
        return (
          <RoomsDetailsForm 
            formData={formData} 
            updateFormData={updateFormData} 
            goToNextStep={goToNextStep} 
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 6:
        return (
          <ResultsForm 
            formData={formData} 
            goToPreviousStep={goToPreviousStep}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md">
      <CardContent className="p-6">
        <ProgressBar progress={progress} />
        
        <div className="mt-4 text-right text-sm text-gray-500">
          Étape {currentStep} sur {totalSteps}
        </div>
        
        <div className="mt-6 min-h-[300px]">
          {renderStepContent()}
        </div>
        
        {currentStep < totalSteps && (
          <FormNavigation 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            goToNextStep={goToNextStep} 
            goToPreviousStep={goToPreviousStep} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EstimationWizard;
