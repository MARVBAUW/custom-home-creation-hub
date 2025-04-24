
import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";

const SummaryStep: React.FC<BaseFormProps> = ({
  formData,
  goToPreviousStep,
  onComplete
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Récapitulatif de votre projet</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium">Type de client</p>
          <p className="text-sm text-gray-600">{formData.clientType === 'individual' ? 'Particulier' : 'Professionnel'}</p>
        </div>
        {formData.projectType && (
          <div>
            <p className="text-sm font-medium">Type de projet</p>
            <p className="text-sm text-gray-600">{formData.projectType}</p>
          </div>
        )}
        {formData.surface && (
          <div>
            <p className="text-sm font-medium">Surface</p>
            <p className="text-sm text-gray-600">{formData.surface} m²</p>
          </div>
        )}
        {formData.city && (
          <div>
            <p className="text-sm font-medium">Ville</p>
            <p className="text-sm text-gray-600">{formData.city}</p>
          </div>
        )}
        {formData.budget && (
          <div>
            <p className="text-sm font-medium">Budget estimé</p>
            <p className="text-sm text-gray-600">{formData.budget} €</p>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={goToPreviousStep ? goToPreviousStep : () => {}}>
          Retour
        </Button>
        <Button onClick={handleSubmit}>
          Finaliser l'estimation
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
