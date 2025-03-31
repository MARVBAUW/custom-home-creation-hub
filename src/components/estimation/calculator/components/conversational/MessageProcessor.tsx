
import React from 'react';
import { EstimationFormData as FormData } from '../../types';
import { ExtractedInfo, analyzeUserIntent } from '../../utils/conversationalUtils';
import { ensureNumber } from '../../utils/typeConversions';

interface MessageProcessorProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const MessageProcessor: React.FC<MessageProcessorProps> = (props) => {
  const { onUserInput, formData, updateFormData } = props;

  // Traitement des entrées utilisateur
  const processUserInput = (input: string) => {
    console.log('Traitement de l\'entrée utilisateur:', input);
    
    // Analyser l'intention de l'utilisateur
    const analysis = analyzeUserIntent(input);
    console.log('Analyse:', analysis);
    
    // Extraire et mettre à jour les données du formulaire
    extractAndUpdateFormData(analysis);
    
    // Transmettre l'entrée traitée au parent
    onUserInput(input);
  };

  // Extraire et mettre à jour les données du formulaire
  const extractAndUpdateFormData = (analysis: ExtractedInfo) => {
    const newData: Partial<FormData> = {};
    let hasUpdates = false;
    
    // Récupérer le type de projet s'il est mentionné
    if (analysis.entities.project_type) {
      if (analysis.entities.project_type.toLowerCase().includes('construction')) {
        newData.projectType = 'construction';
        hasUpdates = true;
      } else if (analysis.entities.project_type.toLowerCase().includes('rénov')) {
        newData.projectType = 'renovation';
        hasUpdates = true;
      } else if (analysis.entities.project_type.toLowerCase().includes('extension')) {
        newData.projectType = 'extension';
        hasUpdates = true;
      }
    }
    
    // Récupérer la surface si elle est mentionnée
    if (analysis.entities.surface) {
      newData.surface = ensureNumber(analysis.entities.surface);
      hasUpdates = true;
    }
    
    // Récupérer la localisation si elle est mentionnée
    if (analysis.entities.location) {
      newData.city = analysis.entities.location;
      hasUpdates = true;
    }
    
    // Récupérer le nombre de chambres si mentionné
    if (analysis.entities.rooms) {
      newData.roomCount = ensureNumber(analysis.entities.rooms);
      hasUpdates = true;
    }
    
    // Récupérer le nombre d'étages si mentionné
    if (analysis.entities.floors) {
      if (analysis.entities.floors === 1) {
        newData.levels = '1 niveau (plain-pied)';
      } else if (analysis.entities.floors === 2) {
        newData.levels = '2 niveaux (R+1)';
      } else if (analysis.entities.floors === 3) {
        newData.levels = '3 niveaux (R+2)';
      } else {
        newData.levels = '4 niveaux ou plus';
      }
      hasUpdates = true;
    }
    
    // Récupérer le niveau de qualité s'il est mentionné
    if (analysis.entities.quality) {
      newData.finishLevel = analysis.entities.quality;
      hasUpdates = true;
    }
    
    // Récupérer les informations sur le terrain s'il est mentionné
    if (analysis.entities.has_terrain !== undefined) {
      newData.hasLand = analysis.entities.has_terrain;
      
      if (analysis.entities.terrain_price) {
        newData.landPrice = ensureNumber(analysis.entities.terrain_price);
      }
      
      hasUpdates = true;
    }
    
    // Récupérer le budget s'il est mentionné
    if (analysis.entities.budget) {
      newData.budget = ensureNumber(analysis.entities.budget);
      hasUpdates = true;
    }
    
    // Récupérer l'email s'il est mentionné
    if (analysis.entities.email) {
      newData.email = analysis.entities.email;
      hasUpdates = true;
    }
    
    // Récupérer le téléphone s'il est mentionné
    if (analysis.entities.phone) {
      newData.phone = analysis.entities.phone;
      hasUpdates = true;
    }
    
    // Mettre à jour les données du formulaire si des modifications ont été détectées
    if (hasUpdates) {
      console.log('Mise à jour des données du formulaire:', newData);
      updateFormData(newData);
    }
  };

  // Ce composant ne rend rien visuellement
  return null;
};

export default MessageProcessor;
