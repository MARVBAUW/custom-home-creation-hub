
import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PriceRangeStep: React.FC<BaseFormProps> = ({
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
        <Label htmlFor="budget">Budget estimé</Label>
        <Input
          id="budget"
          type="number"
          value={formData.budget || ''}
          onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) })}
          placeholder="Votre budget en euros"
          required
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

export default PriceRangeStep;
