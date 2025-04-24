
import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LocationStep: React.FC<BaseFormProps> = ({
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
        <Label htmlFor="city">Ville</Label>
        <Input
          id="city"
          value={formData.city || ''}
          onChange={(e) => updateFormData({ city: e.target.value })}
          placeholder="Entrez votre ville"
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

export default LocationStep;
