import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEstimationCalculator } from './useEstimationCalculator';
import EstimationReport from './EstimationReport';
import { FormProvider } from 'react-hook-form';
import { useEstimationForm } from './hooks/useEstimationForm';
import { toArray } from './utils/dataConverters';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import ConversationalEstimator from './ConversationalEstimator';

const WorkEstimationForm: React.FC = () => {
  const formWrapper = useRef<HTMLDivElement>(null);
  // Utiliser le hook pour gérer les différentes étapes
  const {
    step,
    totalSteps,
    formData,
    estimationResult,
    animationDirection,
    goToNextStep,
    goToPreviousStep,
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit,
    onCuisineSubmit,
    onSalleDeBainSubmit,
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit,
    onContactSubmit
  } = useEstimationCalculator();
  
  const { methods } = useEstimationForm();
  const [showSummary, setShowSummary] = useState(false);

  // Définir les étapes visibles en fonction du type de projet
  const visibleSteps = {
    "1": "Type de client",
    "2": "Projet professionnel",
    "3": "Projet particulier", 
    "4": "Type d'estimation",
    "5": "Détails construction",
    "6": "Terrain",
    "7": "Gros œuvre",
    "8": "Charpente",
    "9": "Combles",
    "10": "Couverture",
    "11": "Isolation",
    "12": "Façade",
    "13": "Menuiseries extérieures",
    "14": "Électricité",
    "15": "Plomberie",
    "16": "Chauffage",
    "17": "Plâtrerie",
    "18": "Menuiseries intérieures",
    "19": "Carrelage",
    "20": "Parquet",
    "21": "Peinture",
    "22": "Solutions environnementales",
    "23": "Énergies renouvelables",
    "24": "Aménagement paysager",
    "25": "Options supplémentaires",
    "26": "Cuisine",
    "27": "Salle de bain",
    "28": "Contact",
    "29": "Résultats"
  };

  // Prevent page jumping during step transitions
  useEffect(() => {
    if (formWrapper.current) {
      const scrollPosition = window.scrollY;
      
      // Keep same scroll position after step update
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'auto'
        });
      }, 10);
    }
  }, [step]);

  const handleFormChange = (newStep: number) => {
    // Save current scroll position
    if (formWrapper.current) {
      const scrollPosition = window.scrollY;
      
      // Stay at the same position after step update
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'auto'
        });
      }, 10);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full" ref={formWrapper}>
        {/* Switch entre les deux modes d'estimation */}
        <Card className="border-0 shadow-none">
          <div className="overflow-hidden">
            {/* Outil d'estimation conversationnel */}
            <ConversationalEstimator 
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
              onEnergiesRenouvelablesSubmit={onEnergiesRenouvelablesSubmit}
              onSolutionsEnvironSubmit={onSolutionsEnvironSubmit}
              onAmenagementPaysagerSubmit={onAmenagementPaysagerSubmit}
              onOptionsSubmit={onOptionsSubmit}
              onCuisineSubmit={onCuisineSubmit}
              onSalleDeBainSubmit={onSalleDeBainSubmit}
              onDemolitionSubmit={onDemolitionSubmit}
              onGrosOeuvreRenovSubmit={onGrosOeuvreRenovSubmit}
              onCharpenteRenovSubmit={onCharpenteRenovSubmit}
              onCouvertureRenovSubmit={onCouvertureRenovSubmit}
              onFacadeRenovSubmit={onFacadeRenovSubmit}
              onContactSubmit={onContactSubmit}
              formData={formData}
              step={step}
              onStepChange={handleFormChange}
            />
          </div>
        </Card>

        {/* Affichage du résultat estimatif ou boutons de navigation */}
        {showSummary && estimationResult ? (
          <div className="mt-8">
            <EstimationReport
              estimation={{
                totalHT: estimationResult,
                totalTTC: estimationResult * 1.2,
                vat: estimationResult * 0.2,
                corpsEtat: {
                  "Gros oeuvre": { montantHT: estimationResult * 0.3, details: ['Fondations', 'Élévation'] },
                  "Charpente": { montantHT: estimationResult * 0.15, details: ['Charpente traditionnelle'] },
                  "Couverture": { montantHT: estimationResult * 0.1, details: ['Tuiles céramiques'] },
                  "Menuiseries Extérieures": { montantHT: estimationResult * 0.1, details: ['PVC double vitrage'] },
                  "Second oeuvre": { montantHT: estimationResult * 0.35, details: ['Plomberie', 'Électricité', 'Isolation', 'Plâtrerie', 'Peinture'] }
                },
                honorairesHT: estimationResult * 0.12,
                coutGlobalHT: estimationResult * 1.12,
                coutGlobalTTC: estimationResult * 1.12 * 1.2,
                taxeAmenagement: estimationResult * 0.05
              }}
              formData={formData}
              includeTerrainPrice={formData.landIncluded === "yes"}
            />
            <div className="flex justify-center mt-6">
              <Button onClick={() => setShowSummary(false)}>
                Retour à l'estimation
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={goToPreviousStep}
                className="flex items-center"
              >
                <ArrowLeftIcon className="mr-2 h-4 w-4" /> 
                Précédent
              </Button>
            )}
            {estimationResult > 0 && (
              <Button 
                type="button"
                onClick={() => setShowSummary(true)}
                className="ml-auto bg-progineer-gold hover:bg-progineer-gold/90"
              >
                Voir le résumé
              </Button>
            )}
            {!estimationResult && step < totalSteps && (
              <Button 
                type="button"
                onClick={goToNextStep}
                className="ml-auto flex items-center bg-progineer-gold hover:bg-progineer-gold/90"
              >
                Suivant
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default WorkEstimationForm;
