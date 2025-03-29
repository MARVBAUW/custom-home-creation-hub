
import React from 'react';
import { Message } from './types';

interface MessageProcessorProps {
  onClientTypeSubmit: (data: { clientType: string }) => void;
  onProfessionalProjectSubmit: (data: any) => void;
  onIndividualProjectSubmit: (data: { projectType: string }) => void;
  onConstructionDetailsSubmit: (data: any) => void;
  onTerrainSubmit: (data: { terrainType: string }) => void;
  onGrosOeuvreSubmit: (data: { wallType: string }) => void;
  onCharpenteSubmit: (data: { roofType: string }) => void;
  onComblesSubmit: (data: { atticType: string }) => void;
  onCouvertureSubmit: (data: { roofingType: string }) => void;
  onIsolationSubmit: (data: { insulationType: string }) => void;
  onFacadeSubmit: (data: any) => void;
  onMenuiseriesExtSubmit: (data: any) => void;
  onElectriciteSubmit: (data: { electricalType: string }) => void;
  onPlomberieSubmit: (data: { plumbingType: string }) => void;
  onChauffageSubmit: (data: any) => void;
  onPlatrerieSubmit: (data: { plasteringType: string }) => void;
  onMenuiseriesIntSubmit: (data: any) => void;
  onCarrelageSubmit: (data: any) => void;
  onParquetSubmit: (data: any) => void;
  onPeintureSubmit: (data: any) => void;
  onEnergiesRenouvelablesSubmit: (data: any) => void;
  onSolutionsEnvironSubmit: (data: any) => void;
  onAmenagementPaysagerSubmit: (data: any) => void;
  onOptionsSubmit: (data: any) => void;
  onCuisineSubmit: (data: any) => void;
  onSalleDeBainSubmit: (data: any) => void;
  onDemolitionSubmit: (data: any) => void;
  onGrosOeuvreRenovSubmit: (data: any) => void;
  onCharpenteRenovSubmit: (data: any) => void;
  onCouvertureRenovSubmit: (data: any) => void;
  onFacadeRenovSubmit: (data: any) => void;
  onContactSubmit: (data: any) => void;
  onStepChange?: (step: number) => void;
  addSystemMessage: (content: string, options?: string[]) => void;
}

const MessageProcessor: React.FC<MessageProcessorProps> = (props) => {
  const {
    onIndividualProjectSubmit,
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onStepChange,
    addSystemMessage
  } = props;

  const processUserInput = (input: string) => {
    // Détecter le type de projet et soumettre les données appropriées
    if (input.toLowerCase().includes('construction') || 
        input.toLowerCase().includes('neuve') || 
        input.toLowerCase().includes('neuf')) {
      onIndividualProjectSubmit({ projectType: 'construction' });
      
      addSystemMessage(
        'Parfait ! Pour une construction neuve, quelle surface habitable envisagez-vous (en m²) ?',
        []
      );
      
      if (onStepChange) {
        onStepChange(3);
      }
    }
    else if (input.toLowerCase().includes('rénovation') || 
             input.toLowerCase().includes('renovation')) {
      onIndividualProjectSubmit({ projectType: 'renovation' });
      
      addSystemMessage(
        'Pour votre projet de rénovation, quelle est la superficie concernée (en m²) ?',
        []
      );
      
      if (onStepChange) {
        onStepChange(3);
      }
    }
    else if (input.toLowerCase().includes('extension')) {
      onIndividualProjectSubmit({ projectType: 'extension' });
      
      addSystemMessage(
        'Pour votre extension, quelle surface additionnelle souhaitez-vous construire (en m²) ?',
        []
      );
      
      if (onStepChange) {
        onStepChange(3);
      }
    }
    else if (!isNaN(Number(input))) {
      // Si l'entrée est un nombre, supposer que c'est une surface
      onConstructionDetailsSubmit({ surface: Number(input) });
      
      addSystemMessage(
        `Merci pour cette information. Pour une surface de ${input} m², quel type de terrain avez-vous ?`,
        ['Terrain plat', 'Terrain en pente', 'Pas encore de terrain']
      );
      
      if (onStepChange) {
        onStepChange(5);
      }
    }
    else if (input.toLowerCase().includes('plat') || 
             input.toLowerCase().includes('pente') || 
             input.toLowerCase().includes('pas encore')) {
      let terrainType = 'flat';
      if (input.toLowerCase().includes('pente')) {
        terrainType = 'sloped';
      } else if (input.toLowerCase().includes('pas encore')) {
        terrainType = 'unknown';
      }
      
      onTerrainSubmit({ terrainType });
      
      addSystemMessage(
        'Parlons maintenant du gros œuvre. Quel type de murs préférez-vous pour votre construction ?',
        ['Parpaings', 'Briques', 'Ossature bois', 'Béton cellulaire']
      );
      
      if (onStepChange) {
        onStepChange(6);
      }
    }
    else if (input.toLowerCase().includes('parpaing') || 
             input.toLowerCase().includes('brique') || 
             input.toLowerCase().includes('bois') || 
             input.toLowerCase().includes('béton') || 
             input.toLowerCase().includes('beton')) {
      let wallType = '';
      if (input.toLowerCase().includes('parpaing')) {
        wallType = 'concrete_blocks';
      } else if (input.toLowerCase().includes('brique')) {
        wallType = 'bricks';
      } else if (input.toLowerCase().includes('bois')) {
        wallType = 'wood_frame';
      } else if (input.toLowerCase().includes('béton') || input.toLowerCase().includes('beton')) {
        wallType = 'cellular_concrete';
      }
      
      onGrosOeuvreSubmit({ wallType });
      
      addSystemMessage(
        'Pour votre charpente, quelle option préférez-vous ?',
        ['Charpente traditionnelle en bois', 'Fermettes industrielles', 'Charpente métallique']
      );
      
      if (onStepChange) {
        onStepChange(7);
      }
    }
    // Ajouter d'autres conditions pour les étapes suivantes
    
    else {
      // Message générique si l'entrée ne correspond à aucune condition
      addSystemMessage(
        'Pourriez-vous préciser votre choix parmi les options proposées ?',
        ['Construction neuve', 'Rénovation', 'Extension']
      );
    }
  };

  return { processUserInput };
};

export default MessageProcessor;
