
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormData } from '../types';
import { analyzeUserIntent, ExtractedInfo, IntentType } from '../utils/conversationalUtils';
import { Message, ConversationState } from '../components/conversational/types';

export interface ConversationalEstimatorProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit: (data: {clientType: string}) => void;
  goToStep: (step: number) => void;
}

export const useConversationalEstimator = (props: ConversationalEstimatorProps) => {
  const { formData, updateFormData, onClientTypeSubmit, goToStep } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationState, setConversationState] = useState<ConversationState>({
    currentStep: 'welcome',
    askedQuestions: [],
    completedFields: [],
    formProgress: 0
  });

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: uuidv4(),
        type: 'system',
        content: "Bonjour ! Je suis votre assistant virtuel pour vous aider à estimer votre projet de construction ou rénovation. Comment puis-je vous aider aujourd'hui ?",
        options: [
          "Je souhaite estimer un projet de construction neuve",
          "Je voudrais estimer une rénovation",
          "J'ai besoin d'estimer une extension"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ajouter un message de l'assistant
  const addAssistantMessage = (content: string, options?: string[]) => {
    const newMessage: Message = {
      id: uuidv4(),
      type: 'assistant',
      content,
      options
    };

    setMessages(prev => [...prev, newMessage]);
  };

  // Ajouter un message de l'utilisateur
  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content
    };

    setMessages(prev => [...prev, newMessage]);
  };

  // Marquer une question comme posée pour éviter les répétitions
  const markQuestionAsAsked = (questionId: string) => {
    setConversationState(prev => ({
      ...prev,
      askedQuestions: [...prev.askedQuestions, questionId]
    }));
  };

  // Vérifier si une question a déjà été posée
  const hasQuestionBeenAsked = (questionId: string): boolean => {
    return conversationState.askedQuestions.includes(questionId);
  };

  // Mettre à jour les champs complétés et la progression
  const updateCompletedFields = (field: string) => {
    if (!conversationState.completedFields.includes(field)) {
      const updatedFields = [...conversationState.completedFields, field];
      const totalRequiredFields = 7; // projectType, surface, city, levels, finishLevel, hasLand, email
      const progress = Math.min(Math.round((updatedFields.length / totalRequiredFields) * 100), 100);
      
      setConversationState(prev => ({
        ...prev,
        completedFields: updatedFields,
        formProgress: progress
      }));
    }
  };

  // Gérer la progression du formulaire
  const updateFormProgress = (intent: IntentType, extractedInfo: ExtractedInfo) => {
    // Mettre à jour les données du formulaire en fonction des informations extraites
    const newFormData: Partial<FormData> = {};
    const updatedFields: string[] = [];

    if (extractedInfo.entities.project_type && !formData.projectType) {
      if (extractedInfo.entities.project_type.toLowerCase().includes('construction')) {
        newFormData.projectType = 'construction';
        updatedFields.push('projectType');
      } else if (extractedInfo.entities.project_type.toLowerCase().includes('rénov')) {
        newFormData.projectType = 'renovation';
        updatedFields.push('projectType');
      } else if (extractedInfo.entities.project_type.toLowerCase().includes('extension')) {
        newFormData.projectType = 'extension';
        updatedFields.push('projectType');
      }
    }

    if (extractedInfo.entities.surface && !formData.surface) {
      newFormData.surface = extractedInfo.entities.surface.toString();
      updatedFields.push('surface');
    }

    if (extractedInfo.entities.location && !formData.city) {
      newFormData.city = extractedInfo.entities.location;
      updatedFields.push('city');
    }

    if (extractedInfo.entities.rooms && !formData.roomCount) {
      newFormData.roomCount = extractedInfo.entities.rooms.toString();
      updatedFields.push('roomCount');
    }

    if (extractedInfo.entities.floors && !formData.levels) {
      if (extractedInfo.entities.floors === 1) {
        newFormData.levels = '1 niveau (plain-pied)';
      } else if (extractedInfo.entities.floors === 2) {
        newFormData.levels = '2 niveaux (R+1)';
      } else if (extractedInfo.entities.floors === 3) {
        newFormData.levels = '3 niveaux (R+2)';
      } else {
        newFormData.levels = '4 niveaux ou plus';
      }
      updatedFields.push('levels');
    }

    if (extractedInfo.entities.quality && !formData.finishLevel) {
      newFormData.finishLevel = extractedInfo.entities.quality;
      updatedFields.push('finishLevel');
    }

    if (extractedInfo.entities.has_terrain !== undefined && formData.hasLand === undefined) {
      newFormData.hasLand = extractedInfo.entities.has_terrain;
      updatedFields.push('hasLand');
      
      if (extractedInfo.entities.terrain_price) {
        newFormData.landPrice = extractedInfo.entities.terrain_price.toString();
        updatedFields.push('landPrice');
      }
    }

    if (extractedInfo.entities.budget && !formData.budget) {
      newFormData.budget = extractedInfo.entities.budget.toString();
      updatedFields.push('budget');
    }

    if (extractedInfo.entities.email && !formData.email) {
      newFormData.email = extractedInfo.entities.email;
      updatedFields.push('email');
    }

    if (extractedInfo.entities.phone && !formData.phone) {
      newFormData.phone = extractedInfo.entities.phone;
      updatedFields.push('phone');
    }

    // Matériaux de construction
    if (extractedInfo.entities.materials?.includes('Béton') && !formData.wallType) {
      newFormData.wallType = 'Béton';
      updatedFields.push('wallType');
    } else if (extractedInfo.entities.materials?.includes('Briques') && !formData.wallType) {
      newFormData.wallType = 'Briques';
      updatedFields.push('wallType');
    } else if (extractedInfo.entities.materials?.includes('Parpaings') && !formData.wallType) {
      newFormData.wallType = 'Parpaings';
      updatedFields.push('wallType');
    } else if (extractedInfo.entities.materials?.includes('Bois') && !formData.wallType) {
      newFormData.wallType = 'Bois';
      updatedFields.push('wallType');
    } else if (extractedInfo.entities.materials?.includes('Métal') && !formData.wallType) {
      newFormData.wallType = 'Ossature métallique';
      updatedFields.push('wallType');
    }

    // Mettre à jour conversationState et formData si des modifications ont été faites
    if (updatedFields.length > 0) {
      updateFormData(newFormData);
      
      // Marquer les champs comme complétés pour la progression
      updatedFields.forEach(field => updateCompletedFields(field));
      
      // Mettre à jour l'état de la conversation
      setConversationState(prev => ({
        ...prev,
        currentStep: determineNextStep(prev.currentStep, updatedFields)
      }));

      return updatedFields;
    }

    return [];
  };

  // Déterminer la prochaine étape de la conversation
  const determineNextStep = (currentStep: string, updatedFields: string[]): string => {
    // Priorité des questions
    const stepOrder = [
      'welcome',
      'projectType',
      'surface',
      'location',
      'levels',
      'rooms',
      'finishLevel',
      'hasLand',
      'wallType',
      'email',
      'confirmation'
    ];
    
    // Si un champ a été mis à jour, passez à l'étape suivante
    if (updatedFields.length > 0) {
      const currentIndex = stepOrder.indexOf(currentStep);
      if (currentIndex >= 0 && currentIndex < stepOrder.length - 1) {
        return stepOrder[currentIndex + 1];
      }
    }
    
    // Si aucun champ n'a été mis à jour, déterminer quelle question poser ensuite
    if (!formData.projectType) return 'projectType';
    if (!formData.surface) return 'surface';
    if (!formData.city) return 'location';
    if (!formData.levels) return 'levels';
    if (!formData.roomCount) return 'rooms';
    if (!formData.finishLevel) return 'finishLevel';
    if (formData.hasLand === undefined) return 'hasLand';
    if (!formData.wallType) return 'wallType';
    if (!formData.email) return 'email';
    
    return 'confirmation';
  };

  // Déterminer si nous avons suffisamment d'informations pour procéder à l'estimation
  const canProceedToEstimation = () => {
    const requiredFields = ['projectType', 'surface'];
    const recommendedFields = ['city', 'levels', 'finishLevel', 'email'];
    
    const hasAllRequired = requiredFields.every(field => Boolean(formData[field as keyof FormData]));
    const hasRecommendedCount = recommendedFields.filter(field => Boolean(formData[field as keyof FormData])).length >= 2;
    
    return hasAllRequired && hasRecommendedCount;
  };

  // Générer la prochaine question à poser
  const generateNextQuestion = (): string => {
    // Vérifier l'étape actuelle pour déterminer la question
    switch (conversationState.currentStep) {
      case 'welcome':
        return "Quel type de projet souhaitez-vous estimer ? Une construction neuve, une rénovation ou une extension ?";
      
      case 'projectType':
        return "Quel type de projet souhaitez-vous estimer ? Une construction neuve, une rénovation ou une extension ?";
      
      case 'surface':
        markQuestionAsAsked('surface');
        return "Quelle surface approximative en m² envisagez-vous pour votre projet ?";
      
      case 'location':
        markQuestionAsAsked('location');
        return "Dans quelle ville ou région se situe votre projet ?";
      
      case 'levels':
        markQuestionAsAsked('levels');
        return "Combien de niveaux souhaitez-vous pour votre construction ? Un plain-pied ou plusieurs étages ?";
      
      case 'rooms':
        markQuestionAsAsked('rooms');
        return "Combien de chambres souhaitez-vous dans votre logement ?";
      
      case 'finishLevel':
        markQuestionAsAsked('finishLevel');
        return "Quel niveau de finition recherchez-vous ? Premium (haut de gamme), standard ou basique ?";
      
      case 'hasLand':
        markQuestionAsAsked('hasLand');
        return "Disposez-vous déjà d'un terrain pour votre projet ?";
      
      case 'wallType':
        markQuestionAsAsked('wallType');
        return "Quel type de matériaux préférez-vous pour les murs ? (Béton, briques, parpaings, bois ou ossature métallique)";
      
      case 'email':
        markQuestionAsAsked('email');
        return "Pour finaliser votre estimation personnalisée, pourriez-vous me communiquer votre email de contact ?";
      
      case 'confirmation':
        return "Je pense avoir suffisamment d'informations pour calculer une estimation de votre projet. Souhaitez-vous que je procède à l'estimation maintenant ?";
      
      default:
        // Fallback question
        if (!formData.projectType) {
          return "Quel type de projet souhaitez-vous estimer ? Une construction neuve, une rénovation ou une extension ?";
        } else if (!formData.surface) {
          return "Quelle surface approximative en m² envisagez-vous pour votre projet ?";
        } else {
          return "Avez-vous d'autres informations à ajouter pour votre projet ?";
        }
    }
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user message
    addUserMessage(userInput);
    
    setUserInput('');
    setLoading(true);

    // Process the message with analysis and intent detection
    setTimeout(() => {
      processUserInput(userInput);
      setLoading(false);
    }, 1000);
  };

  // Process user input and determine next steps
  const processUserInput = (input: string) => {
    // Analyser l'intention et les entités
    const analysis = analyzeUserIntent(input);
    console.log("Analyse de l'intention:", analysis);
    
    // Mettre à jour les données du formulaire
    const updatedFields = updateFormProgress(analysis.intent, analysis);
    
    // Réagir à la demande explicite de démarrer l'estimation
    if (input.toLowerCase().match(/estim|calcul|commenc|démarr|ok|d'accord|procéd|oui|go/i) && canProceedToEstimation()) {
      handleStartEstimation();
      return;
    }
    
    // Déterminer la réponse en fonction de l'intention et des champs mis à jour
    let response = "";
    
    if (updatedFields.length > 0) {
      // Confirmer les informations récupérées
      const fieldDescriptions: {[key: string]: string} = {
        projectType: "type de projet",
        surface: "surface",
        city: "localisation",
        levels: "nombre de niveaux",
        roomCount: "nombre de chambres",
        finishLevel: "niveau de finition",
        hasLand: "possession d'un terrain",
        landPrice: "prix du terrain",
        budget: "budget",
        email: "email de contact",
        phone: "numéro de téléphone",
        wallType: "type de murs"
      };
      
      const updateDescriptions = updatedFields.map(field => 
        `votre ${fieldDescriptions[field] || field}`
      );
      
      if (updateDescriptions.length === 1) {
        response = `Merci, j'ai bien noté ${updateDescriptions[0]}. `;
      } else {
        const lastField = updateDescriptions.pop();
        response = `Merci, j'ai bien noté ${updateDescriptions.join(', ')} et ${lastField}. `;
      }
    } else if (analysis.intent === 'help') {
      response = "Je suis là pour vous aider à estimer votre projet. ";
    } else if (analysis.confidence < 0.4) {
      // Si l'intention n'est pas claire
      response = "Je n'ai pas bien compris votre demande. ";
    }
    
    // Ajouter la prochaine question à poser
    response += generateNextQuestion();
    
    // Rendre le bot plus humain avec des transitions aléatoires
    if (!response.startsWith("Merci") && !response.startsWith("Je n'ai pas") && response.indexOf(generateNextQuestion()) === 0) {
      const transitions = [
        "Très bien ! ",
        "Je comprends. ",
        "D'accord. ",
        "Parfait. ",
        "Excellent. ",
        ""
      ];
      
      const transition = transitions[Math.floor(Math.random() * transitions.length)];
      response = transition + response;
    }
    
    // Ajouter des options de réponse si pertinent
    let options: string[] | undefined;
    
    // Déterminer les options en fonction de l'étape actuelle
    switch (conversationState.currentStep) {
      case 'projectType':
        options = ["Construction neuve", "Rénovation", "Extension"];
        break;
      case 'levels':
        options = ["Plain-pied", "2 niveaux (R+1)", "3 niveaux (R+2)"];
        break;
      case 'rooms':
        options = ["1 chambre", "2 chambres", "3 chambres", "4 chambres ou plus"];
        break;
      case 'finishLevel':
        options = ["Finition standard", "Finition premium", "Finition basique"];
        break;
      case 'hasLand':
        options = ["J'ai déjà un terrain", "Je n'ai pas encore de terrain"];
        break;
      case 'wallType':
        options = ["Béton", "Briques", "Parpaings", "Bois", "Ossature métallique"];
        break;
      case 'confirmation':
        options = ["Oui, calculez mon estimation", "Non, j'ai d'autres informations à ajouter"];
        break;
    }
    
    // Ajouter la réponse du bot
    addAssistantMessage(response, options);
  };

  // Handle pre-defined option selection
  const handleOptionClick = (option: string) => {
    // Ajouter le message utilisateur correspondant à l'option
    addUserMessage(option);
    setLoading(true);

    // Traiter l'option sélectionnée
    setTimeout(() => {
      // Logique spécifique en fonction de l'option choisie
      if (option.toLowerCase().includes('construction')) {
        updateFormData({ projectType: 'construction' });
        setConversationState(prev => ({ ...prev, currentStep: 'surface' }));
      } else if (option.toLowerCase().includes('rénovation')) {
        updateFormData({ projectType: 'renovation' });
        setConversationState(prev => ({ ...prev, currentStep: 'surface' }));
      } else if (option.toLowerCase().includes('extension')) {
        updateFormData({ projectType: 'extension' });
        setConversationState(prev => ({ ...prev, currentStep: 'surface' }));
      } else if (option.toLowerCase().includes('plain-pied')) {
        updateFormData({ levels: '1 niveau (plain-pied)' });
        setConversationState(prev => ({ ...prev, currentStep: 'rooms' }));
      } else if (option.toLowerCase().includes('2 niveaux')) {
        updateFormData({ levels: '2 niveaux (R+1)' });
        setConversationState(prev => ({ ...prev, currentStep: 'rooms' }));
      } else if (option.toLowerCase().includes('3 niveaux')) {
        updateFormData({ levels: '3 niveaux (R+2)' });
        setConversationState(prev => ({ ...prev, currentStep: 'rooms' }));
      } else if (option.toLowerCase().includes('chambre')) {
        const count = option.match(/(\d+)/);
        if (count) {
          updateFormData({ roomCount: count[0] });
          setConversationState(prev => ({ ...prev, currentStep: 'finishLevel' }));
        } else if (option.toLowerCase().includes('ou plus')) {
          updateFormData({ roomCount: '4' });
          setConversationState(prev => ({ ...prev, currentStep: 'finishLevel' }));
        }
      } else if (option.toLowerCase().includes('finition standard')) {
        updateFormData({ finishLevel: 'Standard (qualité moyenne)' });
        setConversationState(prev => ({ ...prev, currentStep: 'hasLand' }));
      } else if (option.toLowerCase().includes('finition premium')) {
        updateFormData({ finishLevel: 'Premium (haut de gamme)' });
        setConversationState(prev => ({ ...prev, currentStep: 'hasLand' }));
      } else if (option.toLowerCase().includes('finition basique')) {
        updateFormData({ finishLevel: 'Basique (entrée de gamme)' });
        setConversationState(prev => ({ ...prev, currentStep: 'hasLand' }));
      } else if (option.toLowerCase().includes("j'ai déjà un terrain")) {
        updateFormData({ hasLand: true });
        setConversationState(prev => ({ ...prev, currentStep: 'wallType' }));
      } else if (option.toLowerCase().includes("je n'ai pas encore de terrain")) {
        updateFormData({ hasLand: false });
        setConversationState(prev => ({ ...prev, currentStep: 'wallType' }));
      } else if (option.toLowerCase().includes('béton')) {
        updateFormData({ wallType: 'Béton' });
        setConversationState(prev => ({ ...prev, currentStep: 'email' }));
      } else if (option.toLowerCase().includes('briques')) {
        updateFormData({ wallType: 'Briques' });
        setConversationState(prev => ({ ...prev, currentStep: 'email' }));
      } else if (option.toLowerCase().includes('parpaings')) {
        updateFormData({ wallType: 'Parpaings' });
        setConversationState(prev => ({ ...prev, currentStep: 'email' }));
      } else if (option.toLowerCase().includes('bois')) {
        updateFormData({ wallType: 'Bois' });
        setConversationState(prev => ({ ...prev, currentStep: 'email' }));
      } else if (option.toLowerCase().includes('ossature métallique')) {
        updateFormData({ wallType: 'Ossature métallique' });
        setConversationState(prev => ({ ...prev, currentStep: 'email' }));
      } else if (option.toLowerCase().includes('oui, calculez mon estimation')) {
        handleStartEstimation();
        setLoading(false);
        return;
      } else if (option.toLowerCase().includes('particulier')) {
        onClientTypeSubmit({ clientType: "individual" });
        updateFormData({ clientType: "individual" });
      } else if (option.toLowerCase().includes('professionnel')) {
        onClientTypeSubmit({ clientType: "professional" });
        updateFormData({ clientType: "professional" });
      }
      
      // Générer la prochaine question
      const nextQuestion = generateNextQuestion();
      
      // Déterminer les options à afficher
      let options: string[] | undefined;
      
      // Déterminer les options en fonction de l'étape actuelle
      switch (conversationState.currentStep) {
        case 'projectType':
          options = ["Construction neuve", "Rénovation", "Extension"];
          break;
        case 'surface':
          // Pas d'options pour la surface, entrée libre
          break;
        case 'location':
          // Pas d'options pour la localisation, entrée libre
          break;
        case 'levels':
          options = ["Plain-pied", "2 niveaux (R+1)", "3 niveaux (R+2)"];
          break;
        case 'rooms':
          options = ["1 chambre", "2 chambres", "3 chambres", "4 chambres ou plus"];
          break;
        case 'finishLevel':
          options = ["Finition standard", "Finition premium", "Finition basique"];
          break;
        case 'hasLand':
          options = ["J'ai déjà un terrain", "Je n'ai pas encore de terrain"];
          break;
        case 'wallType':
          options = ["Béton", "Briques", "Parpaings", "Bois", "Ossature métallique"];
          break;
        case 'confirmation':
          options = ["Oui, calculez mon estimation", "Non, j'ai d'autres informations à ajouter"];
          break;
      }
      
      addAssistantMessage(nextQuestion, options);
      setLoading(false);
    }, 1000);
  };

  // Démarrer l'estimation formelle
  const handleStartEstimation = () => {
    addAssistantMessage("Merci pour toutes ces informations ! Je vais maintenant calculer une estimation détaillée de votre projet.");
    
    // Déterminer le type de client si non défini
    if (!formData.clientType) {
      if (formData.projectType === 'construction' && formData.surface && parseInt(formData.surface) > 300) {
        updateFormData({ clientType: "professional" });
      } else {
        updateFormData({ clientType: "individual" });
      }
    }
    
    // Message de transition
    setTimeout(() => {
      addAssistantMessage("Je prépare votre estimation personnalisée...");
      
      // Transition vers le formulaire structuré
      setTimeout(() => {
        addAssistantMessage("J'ai préparé une estimation détaillée pour vous. Je vous redirige vers notre formulaire structuré pour finaliser les détails et obtenir une estimation précise par corps de métier.");
        
        // Aller à l'étape du formulaire structuré (étape 1)
        setTimeout(() => {
          goToStep(1);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  // Handle keyboard events
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messages,
    loading,
    userInput,
    setUserInput,
    messagesEndRef,
    handleSendMessage,
    handleOptionClick,
    handleKeyPress,
    conversationState
  };
};
