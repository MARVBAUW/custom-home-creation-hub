
import React from 'react';
import { MessageProcessorProps } from '../../types/conversationalTypes';
import { EstimationFormData } from '../../types/estimationFormData';

const MessageProcessor: React.FC<MessageProcessorProps> = (props) => {
  const { onUserInput, formData, updateFormData } = props;

  // Traitement des entrées utilisateur
  const processUserInput = (input: string) => {
    console.log('Traitement de l\'entrée utilisateur:', input);
    
    // Analyser l'intention de l'utilisateur
    const analysis = analyzeUserIntent(input);
    console.log('Analyse:', analysis);
    
    // Extraire et mettre à jour les données du formulaire
    const updatedData = extractFormDataFromMessage(input, formData as EstimationFormData);
    
    // Mettre à jour les données si des mises à jour ont été détectées
    if (Object.keys(updatedData).length > 0) {
      updateFormData(updatedData);
    }
    
    // Transmettre l'entrée traitée au parent
    onUserInput(input);
  };

  // Ce composant ne rend rien visuellement
  return null;
};

// Fonction pour analyser l'intention de l'utilisateur
export const analyzeUserIntent = (input: string) => {
  const lowerInput = input.toLowerCase();
  
  // Détecter le type de projet
  if (lowerInput.includes('maison') || lowerInput.includes('construction')) {
    return { intent: 'project_type', value: 'construction' };
  } else if (lowerInput.includes('rénovation') || lowerInput.includes('renovation')) {
    return { intent: 'project_type', value: 'renovation' };
  } else if (lowerInput.includes('extension') || lowerInput.includes('agrandissement')) {
    return { intent: 'project_type', value: 'extension' };
  }
  
  // Détecter le type de client
  if (lowerInput.includes('particulier')) {
    return { intent: 'client_type', value: 'individual' };
  } else if (lowerInput.includes('professionnel') || lowerInput.includes('entreprise')) {
    return { intent: 'client_type', value: 'professional' };
  }
  
  // Détecter la surface
  const surfaceMatch = lowerInput.match(/(\d+)\s*(?:m²|m2|mètres carrés|metres carres)/);
  if (surfaceMatch) {
    return { intent: 'surface', value: parseInt(surfaceMatch[1]) };
  }
  
  // Détecter le budget
  const budgetMatch = lowerInput.match(/(\d+(?:\s*\d+)*)\s*(?:euros|€|k€|k euros)/);
  if (budgetMatch) {
    let budget = parseInt(budgetMatch[1].replace(/\s/g, ''));
    if (lowerInput.includes('k€') || lowerInput.includes('k euros')) {
      budget *= 1000;
    }
    return { intent: 'budget', value: budget };
  }
  
  // Détecter l'emplacement
  if (lowerInput.includes('à ') || lowerInput.includes('a ')) {
    const locationMatch = lowerInput.match(/(?:à|a)\s+([A-Za-zÀ-ÿ-]+)/);
    if (locationMatch) {
      return { intent: 'location', value: locationMatch[1] };
    }
  }
  
  // Si aucune intention spécifique n'est détectée
  return { intent: 'unknown', value: null };
};

// Fonction pour extraire les données du formulaire à partir d'un message
export const extractFormDataFromMessage = (input: string, currentFormData: EstimationFormData): Partial<EstimationFormData> => {
  const lowerInput = input.toLowerCase();
  const updatedData: Partial<EstimationFormData> = {};
  
  // Extraire le type de projet
  if (lowerInput.includes('maison') || lowerInput.includes('construction')) {
    updatedData.projectType = 'construction';
  } else if (lowerInput.includes('rénovation') || lowerInput.includes('renovation')) {
    updatedData.projectType = 'renovation';
  } else if (lowerInput.includes('extension') || lowerInput.includes('agrandissement')) {
    updatedData.projectType = 'extension';
  }
  
  // Extraire le type de client
  if (lowerInput.includes('particulier')) {
    updatedData.clientType = 'individual';
  } else if (lowerInput.includes('professionnel') || lowerInput.includes('entreprise')) {
    updatedData.clientType = 'professional';
  }
  
  // Extraire la surface
  const surfaceMatch = lowerInput.match(/(\d+)\s*(?:m²|m2|mètres carrés|metres carres)/);
  if (surfaceMatch && surfaceMatch[1]) {
    updatedData.surface = parseInt(surfaceMatch[1]);
  }
  
  // Extraire le budget
  const budgetMatch = lowerInput.match(/(\d+(?:\s*\d+)*)\s*(?:euros|€|k€|k euros)/);
  if (budgetMatch && budgetMatch[1]) {
    let budget = parseInt(budgetMatch[1].replace(/\s/g, ''));
    if (lowerInput.includes('k€') || lowerInput.includes('k euros')) {
      budget *= 1000;
    }
    updatedData.budget = budget;
  }
  
  // Extraire l'emplacement ou la ville
  if (lowerInput.includes('à ') || lowerInput.includes('a ')) {
    const locationMatch = lowerInput.match(/(?:à|a)\s+([A-Za-zÀ-ÿ-]+)/i);
    if (locationMatch && locationMatch[1]) {
      const city = locationMatch[1].charAt(0).toUpperCase() + locationMatch[1].slice(1).toLowerCase();
      updatedData.city = city;
    }
  }
  
  // Extraire le nombre de chambres
  const bedroomsMatch = lowerInput.match(/(\d+)\s*(?:chambres|chambre)/);
  if (bedroomsMatch && bedroomsMatch[1]) {
    updatedData.bedrooms = parseInt(bedroomsMatch[1]);
  }
  
  // Extraire le nombre de salles de bain
  const bathroomsMatch = lowerInput.match(/(\d+)\s*(?:salles? de bains?|sdb)/);
  if (bathroomsMatch && bathroomsMatch[1]) {
    updatedData.bathrooms = parseInt(bathroomsMatch[1]);
  }
  
  return updatedData;
};

export default MessageProcessor;
