
import React from 'react';
import { BaseFormProps } from '../types/baseFormProps';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ContactInfoStep: React.FC<BaseFormProps> = ({
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
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="Votre email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          placeholder="Votre numéro de téléphone"
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

export default ContactInfoStep;
