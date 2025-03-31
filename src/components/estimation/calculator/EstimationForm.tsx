
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from './types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface EstimationFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

const EstimationForm: React.FC<EstimationFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    goToNextStep();
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string | number) => {
    updateFormData({ [field]: value });
  };

  // Render different form fields based on the current step in the parent component
  // This is a simplified implementation
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic project information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type de projet</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={formData.projectType || ''}
                onChange={(e) => handleInputChange('projectType', e.target.value)}
              >
                <option value="">Sélectionnez un type</option>
                <option value="construction">Construction neuve</option>
                <option value="renovation">Rénovation</option>
                <option value="extension">Extension</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Surface (m²)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md"
                value={formData.surface || ''}
                onChange={(e) => handleInputChange('surface', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Ville</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                value={formData.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Budget estimé (€)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md"
                value={formData.budget || ''}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              />
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Précédent
            </Button>
            
            <Button
              type="submit"
              className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
            >
              Suivant
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EstimationForm;
