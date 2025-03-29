
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from '../types';

export const useEstimationForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  
  // Utiliser react-hook-form pour la validation et la gestion du formulaire
  const methods = useForm<FormData>({
    defaultValues: formData
  });
  
  // Fonction pour mettre à jour les données du formulaire
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prevState => ({
      ...prevState,
      ...data
    }));
  };
  
  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setFormData({});
    methods.reset({});
  };
  
  return {
    formData,
    updateFormData,
    resetForm,
    methods
  };
};

// Exporter l'interface pour réutilisation
export type { FormData };
