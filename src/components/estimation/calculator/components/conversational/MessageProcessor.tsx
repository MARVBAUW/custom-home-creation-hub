
import React from 'react';
import { MessageProcessorProps, ExtractedInfo } from '../../types/conversationalTypes';
import { EstimationFormData } from '../../types/estimationFormData';
import { analyzeUserIntent, extractFormDataFromMessage } from '../../utils/conversationalUtils';

const MessageProcessor: React.FC<MessageProcessorProps> = (props) => {
  const { onUserInput, formData, updateFormData } = props;

  // Traitement des entrées utilisateur
  const processUserInput = (input: string) => {
    console.log('Traitement de l\'entrée utilisateur:', input);
    
    // Analyser l'intention de l'utilisateur
    const analysis = analyzeUserIntent(input);
    console.log('Analyse:', analysis);
    
    // Extraire et mettre à jour les données du formulaire
    const updatedData = extractFormDataFromMessage(input, formData);
    
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

export default MessageProcessor;
