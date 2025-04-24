
import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FinalDetailsStep: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goToNextStep) goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="additionalDetails">Détails supplémentaires</Label>
        <Textarea
          id="additionalDetails"
          value={formData.additionalDetails || ''}
          onChange={(e) => updateFormData({ additionalDetails: e.target.value })}
          placeholder="Ajoutez des détails supplémentaires sur votre projet"
          rows={4}
        />
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={goToPreviousStep}>
          Retour
        </Button>
        <Button type="submit">
          Continuer
        </Button>
      </div>
    </form>
  );
};

export default FinalDetailsStep;
