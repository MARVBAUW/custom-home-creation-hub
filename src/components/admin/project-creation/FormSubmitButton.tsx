
import React from 'react';
import { Button } from "@/components/ui/button";
import { SaveIcon, Loader2 } from "lucide-react";

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  label?: string;
  submitLabel?: string;
}

const FormSubmitButton = ({ 
  isSubmitting, 
  label = "Valider la saisie et enregistrer", 
  submitLabel = "Enregistrement en cours..." 
}: FormSubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="bg-khaki-600 hover:bg-khaki-700 text-white"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          {submitLabel}
        </>
      ) : (
        <>
          <SaveIcon className="h-4 w-4 mr-2" />
          {label}
        </>
      )}
    </Button>
  );
};

export default FormSubmitButton;
