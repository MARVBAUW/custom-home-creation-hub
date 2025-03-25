
import React from 'react';
import EstimationVisualizer from '../visualizer';

type StepContextProps = {
  step: number;
  title: string;
  icon: React.ReactNode;
  formData: any;
  totalSteps: number;
};

const StepContext: React.FC<StepContextProps> = ({ 
  step,
  title,
  icon,
  formData,
  totalSteps
}) => {
  return (
    <div className="md:col-span-1">
      <div className="hidden md:block">
        <EstimationVisualizer 
          step={step} 
          formData={formData} 
          totalSteps={totalSteps} 
        />
      </div>
      
      {/* Infos complémentaires */}
      <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Conseils pour cette étape</h3>
        <p className="text-xs text-muted-foreground">
          {step === 1 && "Choisissez votre profil pour personnaliser l'estimation de votre projet."}
          {step === 2 && "Précisez le type d'activité professionnelle pour une estimation adaptée."}
          {step === 3 && "Le type de projet influence considérablement le budget final."}
          {step === 4 && "Une estimation précise nécessite plus d'informations mais offre un résultat plus fiable."}
          {step === 5 && "La surface et le nombre de niveaux sont des facteurs clés du coût."}
          {(step > 5 && step < totalSteps) && "Chaque détail compte pour une estimation précise de votre projet."}
          {step === totalSteps && "Nous vous enverrons votre estimation détaillée par email."}
        </p>
      </div>
    </div>
  );
};

export default StepContext;
