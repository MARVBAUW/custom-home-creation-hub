
import React from 'react';
import { Hammer, Construction } from 'lucide-react';
import { FormData } from '../types';

// Options spécifiques pour la rénovation
export const renovationSteps = [
  {
    title: "Démolition",
    icon: <Hammer />,
    skipCondition: (formData: FormData) => formData.projectType !== "renovation",
  },
  {
    title: "Gros œuvre rénovation",
    icon: <Construction />,
    skipCondition: (formData: FormData) => formData.projectType !== "renovation",
  },
  // Autres étapes de rénovation spécifiques
];
