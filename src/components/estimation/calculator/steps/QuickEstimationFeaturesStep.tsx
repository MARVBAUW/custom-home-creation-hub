import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { EstimationFormData, FormData } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, CheckCircle } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface QuickEstimationFeaturesStepProps {
  formData: EstimationFormData | FormData;
  updateFormData: (data: Partial<EstimationFormData | FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

const QuickEstimationFeaturesStep: React.FC<QuickEstimationFeaturesStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  // State to track selected features
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(formData.selectedFeatures || []);
  
  // Feature options
  const featureOptions = [
    { id: 'demolition', label: 'Démolition dépose' },
    { id: 'grosOeuvre', label: 'Gros œuvre (Dalle, réseaux sous dalle, assainissement, maçonnerie, démolition de maçonnerie, plancher, IPN, fondation, chape)' },
    { id: 'charpente', label: 'Charpente' },
    { id: 'couverture', label: 'Couverture' },
    { id: 'isolation', label: 'Isolation' },
    { id: 'facade', label: 'Revêtements de façade' },
    { id: 'menuiserieExt', label: 'Menuiseries extérieures (fenêtre, porte d\'entrée)' },
    { id: 'electricite', label: 'Electricité' },
    { id: 'plomberie', label: 'Plomberie' },
    { id: 'chauffage', label: 'Chauffage / Climatisation' },
    { id: 'platrerie', label: 'Platerie (cloison ba13, doublage, plafond)' },
    { id: 'menuiserieInt', label: 'Menuiseries intérieures (boiseries, portes intérieures, bâti de porte, moulure, meuble encastré)' },
    { id: 'carrelage', label: 'Carrelage / Faïence' },
    { id: 'parquet', label: 'Parquet / sol souple (moquette, linoleum, sol pvc, sol vinylique)' },
    { id: 'peinture', label: 'Peinture revêtements muraux' },
    { id: 'energieRenouvelable', label: 'Energies renouvelables (photovoltaïque etc.)' },
    { id: 'ecoSolutions', label: 'Solutions environnementales (matériaux respectueux de l\'environnement)' },
    { id: 'amenagementPaysager', label: 'Aménagement paysagers (Plantations, clôture, terrasse, portail)' },
    { id: 'options', label: 'Options: Piscine, jacuzzi, carport' },
    { id: 'cuisine', label: 'Cuisine équipée' },
    { id: 'salleDeBain', label: 'Salle d\'eau / de bain' },
  ];

  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    setSelectedFeatures((current) => {
      if (current.includes(feature)) {
        return current.filter(item => item !== feature);
      } else {
        return [...current, feature];
      }
    });
  };

  // Check if a feature is selected
  const isSelected = (feature: string) => selectedFeatures.includes(feature);

  // Get the page number based on a feature
  const getNextPageForFeature = (feature: string) => {
    const featurePageMap: Record<string, number> = {
      'demolition': 29,
      'grosOeuvre': 30,
      'charpente': 31,
      'couverture': 32,
      'isolation': 33,
      'facade': 34,
      'menuiserieExt': 35,
      'electricite': 36,
      'plomberie': 37,
      'chauffage': 38,
      'platrerie': 39,
      'menuiserieInt': 40,
      'carrelage': 41,
      'parquet': 42,
      'peinture': 43,
      'energieRenouvelable': 23,
      'ecoSolutions': 24,
      'amenagementPaysager': 25,
      'options': 26,
      'cuisine': 27,
      'salleDeBain': 28,
    };
    
    return featurePageMap[feature] || 45; // Default to contact page if no mapping
  };

  // Handle form submission
  const handleSubmit = () => {
    // Update the form data with selected features
    updateFormData({
      selectedFeatures,
      // Set flags for the various options based on selections
      includeEcoSolutions: selectedFeatures.includes('ecoSolutions'),
      includeRenewableEnergy: selectedFeatures.includes('energieRenouvelable'),
      includeLandscaping: selectedFeatures.includes('amenagementPaysager'),
      includeOptions: selectedFeatures.includes('options'),
      includeCuisine: selectedFeatures.includes('cuisine'),
      includeBathroom: selectedFeatures.includes('salleDeBain')
    });
    
    // If there are selected features, navigate to the first one
    if (selectedFeatures.length > 0) {
      // Get the ID of the first selected feature
      const firstFeature = selectedFeatures[0];
      
      // Find the corresponding page number
      const nextPage = getNextPageForFeature(firstFeature);
      
      // Update form data with the next page information
      updateFormData({
        nextPage
      });
    }
    
    // Proceed to next step (which will use the nextPage from formData)
    goToNextStep();
  };

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Quels sont les prestations ci-dessous qui concernent votre projet ?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featureOptions.map((feature) => (
          <Card 
            key={feature.id}
            className={cn(
              "cursor-pointer transition-all border-2", 
              isSelected(feature.id) 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-200 hover:border-blue-300"
            )}
            onClick={() => toggleFeature(feature.id)}
          >
            <CardContent className="p-4 flex items-start gap-3">
              <Checkbox 
                checked={isSelected(feature.id)}
                onCheckedChange={() => toggleFeature(feature.id)}
                className="mt-1"
              />
              <Label className="cursor-pointer font-normal text-sm">
                {feature.label}
              </Label>
              {isSelected(feature.id) && (
                <CheckCircle className="ml-auto h-5 w-5 text-blue-500 flex-shrink-0" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Retour
        </Button>
        
        <Button 
          onClick={handleSubmit}
          className="flex items-center gap-2"
        >
          Poursuivre
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuickEstimationFeaturesStep;
