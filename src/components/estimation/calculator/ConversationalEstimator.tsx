
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Send, 
  Download, 
  Bot, 
  Calculator, 
  Info,
  Undo,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import EstimationReport from './EstimationReport';
import { calculateDetailedEstimation } from './calculationUtils';
import { FormData } from './types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { analyzeUserIntent, generateSmartResponse, generateSuggestions } from './utils/conversationalUtils';

// Types pour les messages
type MessageType = 'bot' | 'user' | 'system' | 'error' | 'info';

// Interface pour un message
interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  formData?: Partial<FormData>;
  suggestions?: string[];
}

// Liste des contextes conversationnels possibles
type ConversationContext = 
  | 'initial'
  | 'project_type'
  | 'location'
  | 'dimensions'
  | 'budget'
  | 'finishes'
  | 'terrain'
  | 'materials'
  | 'technology'
  | 'timeline'
  | 'refinement'
  | 'contact'
  | 'estimation';

// Liste des grandes villes françaises pour l'autocomplétion
const CITIES_DATA = [
  { name: "Paris", departement: "75", taxeRate: 5.0, pricePerSqm: 10500 },
  { name: "Marseille", departement: "13", taxeRate: 4.5, pricePerSqm: 3800 },
  { name: "Lyon", departement: "69", taxeRate: 4.8, pricePerSqm: 5200 },
  { name: "Toulouse", departement: "31", taxeRate: 4.0, pricePerSqm: 3500 },
  { name: "Nice", departement: "06", taxeRate: 4.7, pricePerSqm: 4900 },
  { name: "Nantes", departement: "44", taxeRate: 4.2, pricePerSqm: 3900 },
  { name: "Strasbourg", departement: "67", taxeRate: 4.3, pricePerSqm: 3300 },
  { name: "Montpellier", departement: "34", taxeRate: 4.1, pricePerSqm: 3600 },
  { name: "Bordeaux", departement: "33", taxeRate: 4.6, pricePerSqm: 4500 },
  { name: "Lille", departement: "59", taxeRate: 4.4, pricePerSqm: 3400 },
  { name: "Rennes", departement: "35", taxeRate: 4.0, pricePerSqm: 3200 },
  { name: "Aix-en-Provence", departement: "13", taxeRate: 4.6, pricePerSqm: 4700 }
];

// Dictionnaire de réponses intelligentes
const SMART_RESPONSES = {
  greeting: [
    "Bonjour ! Je suis votre assistant d'estimation Progineer. Comment puis-je vous aider à estimer votre projet ?",
    "Bienvenue chez Progineer ! Je suis là pour vous aider à estimer le coût de votre projet de construction ou rénovation.",
    "Ravi de vous rencontrer ! Je suis votre assistant Progineer et je vais vous aider à obtenir une estimation précise pour votre projet."
  ],
  construction_type: [
    "Parlons de votre projet. S'agit-il d'une construction neuve, d'une rénovation, ou d'une extension ?",
    "Pour commencer, pourriez-vous me préciser s'il s'agit d'une construction neuve, d'une rénovation ou d'un agrandissement ?"
  ],
  location_query: [
    "Dans quelle ville ou région se situe votre projet ?",
    "Pourriez-vous m'indiquer la localisation de votre projet ? La ville ou le département ?"
  ],
  surface_query: [
    "Quelle surface habitable envisagez-vous pour votre projet (en m²) ?",
    "Pouvez-vous m'indiquer la superficie prévue pour votre projet ?"
  ],
  quality_level: [
    "Quel niveau de finition recherchez-vous ? (basique, standard, premium)",
    "Pour les finitions, préférez-vous du haut de gamme, du standard ou de l'entrée de gamme ?"
  ],
  terrain_question: [
    "Disposez-vous déjà d'un terrain pour votre projet ? Si oui, quel est son prix d'acquisition ?",
    "Avez-vous déjà acheté un terrain pour ce projet ? Connaissez-vous son prix ?"
  ],
  contact_info: [
    "Pour vous envoyer cette estimation détaillée, pourriez-vous me communiquer votre adresse email ?",
    "Afin de vous faire parvenir les détails de l'estimation, quel est votre email de contact ?"
  ],
  thank_you: [
    "Merci pour ces informations ! Je calcule votre estimation détaillée...",
    "Parfait ! Je dispose désormais de suffisamment d'informations pour calculer votre estimation."
  ],
  unknown: [
    "Je n'ai pas bien compris. Pourriez-vous reformuler ou préciser votre question ?",
    "Pardonnez-moi, mais je n'ai pas saisi votre demande. Pouvez-vous préciser ?"
  ],
  help_suggestions: [
    "Je vois que vous avez besoin d'aide. Voici les informations dont j'ai encore besoin pour finaliser votre estimation:",
    "Pour avancer, j'aurais besoin de quelques précisions. Pouvez-vous me renseigner sur:"
  ],
  loop_detected: [
    "Je constate que nous tournons un peu en rond. Essayons d'avancer différemment. Pouvez-vous me préciser:",
    "Changeons d'approche pour mieux avancer. Pourriez-vous me donner plus de détails sur:"
  ]
};

const ConversationalEstimator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [activeTab, setActiveTab] = useState<'chat' | 'report'>('chat');
  const [currentContext, setCurrentContext] = useState<ConversationContext>('initial');
  const [estimationResult, setEstimationResult] = useState<any>(null);
  const [showLandPriceInput, setShowLandPriceInput] = useState(false);
  const [landPrice, setLandPrice] = useState<number>(0);
  const [includeTerrainPrice, setIncludeTerrainPrice] = useState(false);
  const [lastIntent, setLastIntent] = useState<string | undefined>(undefined);
  const [loopCounter, setLoopCounter] = useState(0);
  const [previousResponses, setPreviousResponses] = useState<Set<string>>(new Set());

  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialiser la conversation
  useEffect(() => {
    if (messages.length === 0) {
      const randomGreeting = getRandomResponse('greeting');
      addBotMessage(randomGreeting);
      
      // Première question après un court délai
      setTimeout(() => {
        const initialQuestion = getRandomResponse('construction_type');
        const suggestions = [
          "Je veux construire une maison", 
          "Je souhaite rénover mon appartement", 
          "J'envisage une extension"
        ];
        addBotMessage(initialQuestion, undefined, suggestions);
        setCurrentContext('project_type');
      }, 1500);
    }
  }, []);

  // Faire défiler vers le bas lors de l'ajout de nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Obtenir une réponse aléatoire pour un type donné
  const getRandomResponse = (type: keyof typeof SMART_RESPONSES) => {
    const responses = SMART_RESPONSES[type];
    const index = Math.floor(Math.random() * responses.length);
    return responses[index];
  };

  // Ajouter un message du bot
  const addBotMessage = (content: string, formData?: Partial<FormData>, suggestions?: string[]) => {
    setIsTyping(true);
    
    // Vérifier si ce message est identique à un message récent (pour éviter les boucles)
    if (previousResponses.has(content)) {
      setLoopCounter(prev => prev + 1);
    } else {
      // Ajouter à l'historique et réinitialiser le compteur de boucle
      setPreviousResponses(prev => {
        const newSet = new Set(prev);
        newSet.add(content);
        // Limiter la taille de l'ensemble pour ne pas qu'il grossisse indéfiniment
        if (newSet.size > 10) {
          const oldestItem = Array.from(newSet)[0];
          newSet.delete(oldestItem);
        }
        return newSet;
      });
      setLoopCounter(0);
    }
    
    // Si on détecte une boucle (3 messages identiques), changer de stratégie
    if (loopCounter >= 2) {
      const helpMessage = SMART_RESPONSES.loop_detected[0];
      const missingFields = [];
      
      if (!formData?.projectType) missingFields.push("Le type de projet (construction, rénovation, extension)");
      if (!formData?.city) missingFields.push("La localisation du projet (ville ou région)");
      if (!formData?.surface) missingFields.push("La surface habitable envisagée (en m²)");
      if (!formData?.hasLand !== undefined) missingFields.push("Si vous possédez déjà un terrain");
      if (!formData?.email) missingFields.push("Votre email pour vous envoyer l'estimation");
      
      let newContent = `${helpMessage}\n\n${missingFields.join('\n- ')}`;
      
      if (missingFields.length === 0) {
        newContent = "Merci pour toutes ces informations ! Je pense avoir tout ce qu'il me faut pour calculer une estimation précise. Souhaitez-vous que je procède au calcul maintenant ?";
      }
      
      setTimeout(() => {
        const newMessage: Message = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: newContent,
          timestamp: new Date(),
          formData,
          suggestions: generateSuggestions(formData as FormData, lastIntent)
        };
        
        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
        setLoopCounter(0);
      }, 800);
      
      return;
    }
    
    setTimeout(() => {
      const newMessage: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content,
        timestamp: new Date(),
        formData,
        suggestions: suggestions || generateSuggestions(formData as FormData, lastIntent)
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 800);
  };

  // Ajouter un message système ou d'information
  const addSystemMessage = (content: string, type: 'system' | 'info' | 'error' = 'system') => {
    const newMessage: Message = {
      id: `system-${Date.now()}`,
      type,
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  // Ajouter un message de l'utilisateur
  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    
    // Traiter la réponse de l'utilisateur
    setTimeout(() => {
      processUserInput(content);
    }, 300);
  };

  // Traiter l'entrée de l'utilisateur - fonction principale d'intelligence
  const processUserInput = (input: string) => {
    setIsTyping(true);
    
    // Analyser l'intention et les entités de l'entrée utilisateur
    const analysis = analyzeUserIntent(input);
    setLastIntent(analysis.intent);
    console.log("Analyse de l'intention:", analysis);
    
    // Mise à jour du contexte et des données du formulaire en fonction de l'analyse
    let updatedFormData: Partial<FormData> = { ...formData };
    
    // Traiter le type de projet
    if (analysis.entities.project_type) {
      updatedFormData.projectType = analysis.entities.project_type;
    }
    
    // Traiter la surface
    if (analysis.entities.surface) {
      updatedFormData.surface = analysis.entities.surface;
    }
    
    // Traiter la localisation (pour l'instant simpliste)
    if (analysis.entities.location) {
      updatedFormData.city = analysis.entities.location;
      // Rechercher une correspondance dans CITIES_DATA
      const cityMatch = CITIES_DATA.find(city => 
        analysis.entities.location?.toLowerCase().includes(city.name.toLowerCase())
      );
      if (cityMatch) {
        updatedFormData.city = cityMatch.name;
        updatedFormData.cityTaxRate = cityMatch.taxeRate;
      }
    }
    
    // Traiter la qualité/finition
    if (analysis.entities.quality) {
      updatedFormData.finishLevel = analysis.entities.quality;
    }
    
    // Traiter les informations de terrain
    if (analysis.entities.has_terrain !== undefined) {
      updatedFormData.hasLand = analysis.entities.has_terrain;
      if (analysis.entities.terrain_price) {
        updatedFormData.landPrice = analysis.entities.terrain_price;
        setLandPrice(analysis.entities.terrain_price);
      } else if (analysis.entities.has_terrain && !updatedFormData.landPrice) {
        setShowLandPriceInput(true);
      }
    }
    
    // Traiter les informations de style
    if (analysis.entities.style) {
      updatedFormData.style = analysis.entities.style;
    }
    
    // Traiter les étages
    if (analysis.entities.floors) {
      updatedFormData.floors = analysis.entities.floors;
    }
    
    // Traiter le nombre de chambres
    if (analysis.entities.rooms) {
      updatedFormData.rooms = analysis.entities.rooms;
    }
    
    // Traiter l'efficacité énergétique
    if (analysis.entities.energy_efficiency) {
      updatedFormData.energyEfficiency = true;
    }
    
    // Traiter l'aspect écologique
    if (analysis.entities.ecological) {
      updatedFormData.ecological = true;
    }
    
    // Traiter les caractéristiques spéciales
    if (analysis.entities.special_features) {
      updatedFormData.specialFeatures = analysis.entities.special_features;
    }
    
    // Traiter les caractéristiques extérieures
    if (analysis.entities.exterior_features) {
      updatedFormData.exteriorFeatures = analysis.entities.exterior_features;
    }
    
    // Traiter l'email de contact
    if (analysis.entities.email) {
      updatedFormData.email = analysis.entities.email;
    }
    
    // Mise à jour des données du formulaire
    setFormData(prev => ({ ...prev, ...updatedFormData }));
    
    // Générer une réponse intelligente basée sur l'analyse
    const smartResponse = generateSmartResponse(analysis, { ...formData, ...updatedFormData });
    
    // Si nous avons collecté suffisamment d'informations et l'utilisateur demande l'estimation
    if (
      (input.match(/calcul|estim|combien|prix|devis/i) || 
       (analysis.intent === 'help' && Object.keys(formData).length >= 4)) && 
      formData.projectType && 
      formData.surface
    ) {
      calculateEstimation();
    } else {
      // Envoyer la réponse intelligente
      setTimeout(() => {
        addBotMessage(smartResponse, updatedFormData);
        setIsTyping(false);
      }, 1000);
    }
  };

  // Calculer l'estimation finale
  const calculateEstimation = () => {
    setIsTyping(true);
    
    // Ajouter un message intermédiaire sur le calcul en cours
    addSystemMessage("🔄 Calcul de l'estimation en cours...", 'info');
    
    setTimeout(() => {
      try {
        // Calculer l'estimation détaillée
        const estimation = calculateDetailedEstimation(formData);
        setEstimationResult(estimation);
        
        // Formater le montant total pour l'affichage
        const formattedEstimationHT = new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        }).format(estimation.totalHT);
        
        const formattedEstimationTTC = new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        }).format(estimation.totalTTC);
        
        // Message de résultat
        const resultMessage = `
Voici l'estimation détaillée de votre projet de ${formData.projectType} :

📊 Estimation des travaux : 
• ${formattedEstimationHT} HT
• ${formattedEstimationTTC} TTC

Cette estimation comprend :
• Les travaux par corps d'état
• Les honoraires de maîtrise d'œuvre (${estimation.honorairesHT.toLocaleString('fr-FR')} € HT)
• La taxe d'aménagement (${estimation.taxeAmenagement.toLocaleString('fr-FR')} €)
• Les études techniques (${(estimation.etudesGeotechniques + estimation.etudeThermique).toLocaleString('fr-FR')} €)
• La garantie décennale (${estimation.garantieDecennale.toLocaleString('fr-FR')} €)

Consultez l'onglet "Rapport détaillé" pour visualiser la répartition des coûts et télécharger votre estimation au format PDF.`;
        
        // Ajouter des suggestions post-estimation
        const postEstimationSuggestions = [
          "Télécharger le rapport détaillé",
          "Comment puis-je ajuster mon budget ?",
          "Je souhaite être contacté par un expert"
        ];
        
        addBotMessage(resultMessage, undefined, postEstimationSuggestions);
        setActiveTab('report');
        
        // Si on n'a pas encore le prix du terrain et c'est une construction neuve
        if (formData.projectType === 'Construction neuve' && !formData.landPrice) {
          setTimeout(() => {
            addBotMessage("Vous pouvez également inclure le prix de votre terrain dans le calcul du coût global. Utilisez l'option disponible dans le rapport détaillé.");
          }, 2000);
        }
        
        toast({
          title: "Estimation calculée avec succès !",
          description: "Votre estimation détaillée est prête à être consultée."
        });
      } catch (error) {
        console.error("Erreur lors du calcul de l'estimation :", error);
        
        // Message d'erreur
        addSystemMessage("❌ Je suis désolé, une erreur s'est produite lors du calcul de l'estimation. Veuillez vérifier les informations saisies ou réessayer.", 'error');
      } finally {
        setIsTyping(false);
      }
    }, 2000);
  };

  // Gérer l'entrée du prix du terrain
  const handleLandPriceSubmit = () => {
    if (landPrice > 0) {
      setFormData(prev => ({ ...prev, landPrice }));
      setShowLandPriceInput(false);
      
      addSystemMessage(`✅ Prix du terrain enregistré : ${landPrice.toLocaleString('fr-FR')} €`, 'info');
      
      if (currentContext === 'terrain') {
        addBotMessage(getRandomResponse('thank_you'));
        setCurrentContext('estimation');
        calculateEstimation();
      } else if (estimationResult) {
        // Recalculer l'estimation avec le prix du terrain
        const updatedEstimation = { ...estimationResult };
        updatedEstimation.terrainPrice = landPrice;
        updatedEstimation.fraisNotaire = landPrice * 0.07;
        updatedEstimation.coutTotalAvecTerrain = updatedEstimation.coutGlobalTTC + landPrice + updatedEstimation.fraisNotaire;
        setEstimationResult(updatedEstimation);
        setIncludeTerrainPrice(true);
        
        toast({
          title: "Prix du terrain ajouté",
          description: "L'estimation a été mise à jour avec le prix du terrain."
        });
      }
    }
  };

  // Gérer la soumission du message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      addUserMessage(inputMessage.trim());
    }
  };

  // Fonction pour réinitialiser la conversation
  const resetConversation = () => {
    if (confirm("Voulez-vous vraiment réinitialiser la conversation ? Toutes les données seront perdues.")) {
      setMessages([]);
      setFormData({});
      setCurrentContext('initial');
      setEstimationResult(null);
      setActiveTab('chat');
      setShowLandPriceInput(false);
      setLandPrice(0);
      setIncludeTerrainPrice(false);
      setPreviousResponses(new Set());
      setLoopCounter(0);
      
      toast({
        title: "Conversation réinitialisée",
        description: "Vous pouvez commencer une nouvelle estimation."
      });
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'chat' | 'report')} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-khaki-600" />
              <h2 className="font-semibold text-lg">Assistant d'estimation Progineer</h2>
            </div>
            
            <div className="flex gap-2">
              <TabsList>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Conversation</span>
                </TabsTrigger>
                <TabsTrigger value="report" className="flex items-center gap-2" disabled={!estimationResult}>
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Rapport détaillé</span>
                </TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="icon" onClick={resetConversation} title="Réinitialiser la conversation">
                <Undo className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="chat" className="space-y-4 mt-2">
            {/* Zone de messages */}
            <ScrollArea className="h-[400px] pr-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type !== 'user' && message.type !== 'system' && message.type !== 'error' && message.type !== 'info' && (
                      <div className="mr-2 flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-khaki-100 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-khaki-700" />
                        </div>
                      </div>
                    )}
                    
                    <div 
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : message.type === 'system'
                            ? 'bg-gray-100 text-gray-800 border border-gray-200'
                            : message.type === 'error'
                              ? 'bg-red-50 text-red-800 border border-red-200'
                              : message.type === 'info'
                                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                : 'bg-white border border-gray-200'
                      }`}
                    >
                      {message.type === 'system' || message.type === 'error' || message.type === 'info' ? (
                        <div className="flex items-start">
                          <div className="mr-2 flex-shrink-0">
                            {message.type === 'error' ? (
                              <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                                <Info className="h-3 w-3 text-red-700" />
                              </div>
                            ) : (
                              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                                <Info className="h-3 w-3 text-blue-700" />
                              </div>
                            )}
                          </div>
                          <div className="text-sm whitespace-pre-line">{message.content}</div>
                        </div>
                      ) : (
                        <div className="text-sm whitespace-pre-line">{message.content}</div>
                      )}
                      
                      {message.suggestions && message.suggestions.length > 0 && message.type === 'bot' && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={`${message.id}-suggestion-${index}`}
                              variant="outline"
                              size="sm"
                              className="text-xs py-1 h-auto"
                              onClick={() => addUserMessage(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="ml-2 flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-700">
                            {/* Première lettre du mot 'Client' */}
                            C
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center mb-4"
                  >
                    <div className="mr-2 flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-khaki-100 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-khaki-700" />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </ScrollArea>
            
            {/* Formulaire d'entrée de prix du terrain si nécessaire */}
            {showLandPriceInput && (
              <Collapsible open={true} className="mb-4">
                <CollapsibleContent>
                  <Card className="border-dashed border-2 border-blue-200 bg-blue-50 p-3">
                    <div className="space-y-2">
                      <Label htmlFor="landPrice" className="text-sm font-medium">
                        Prix du terrain (€)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="landPrice"
                          type="number"
                          placeholder="Entrez le prix du terrain"
                          value={landPrice || ''}
                          onChange={(e) => setLandPrice(Number(e.target.value))}
                          className="flex-1"
                        />
                        <Button size="sm" onClick={handleLandPriceSubmit}>
                          Appliquer
                        </Button>
                      </div>
                      <p className="text-xs text-blue-600">
                        Cette information nous permettra de calculer les frais de notaire et le coût total du projet avec terrain.
                      </p>
                    </div>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            )}
            
            {/* Formulaire de chat */}
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Textarea 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Décrivez votre projet ou posez une question..."
                className="resize-none h-12 py-3"
              />
              <Button type="submit" disabled={isTyping || !inputMessage.trim()} className="h-12 px-4 bg-khaki-600 hover:bg-khaki-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="text-xs text-gray-500 text-center italic">
              Cet assistant utilise les informations que vous fournissez pour générer une estimation personnalisée. Pour une proposition détaillée, un expert Progineer vous contactera.
            </div>
          </TabsContent>
          
          <TabsContent value="report" className="space-y-4 mt-2">
            {estimationResult ? (
              <>
                <div className="bg-khaki-50 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-medium mb-2">Résumé de votre projet</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="text-gray-600">Type de projet</div>
                    <div>{formData.projectType}</div>
                    
                    <div className="text-gray-600">Localisation</div>
                    <div>{formData.city || "Non spécifiée"}</div>
                    
                    <div className="text-gray-600">Surface</div>
                    <div>{formData.surface} m²</div>
                    
                    <div className="text-gray-600">Finition</div>
                    <div>{formData.finishLevel || "Standard"}</div>
                    
                    {formData.rooms && (
                      <>
                        <div className="text-gray-600">Chambres</div>
                        <div>{formData.rooms}</div>
                      </>
                    )}
                    
                    {formData.style && (
                      <>
                        <div className="text-gray-600">Style</div>
                        <div>{formData.style}</div>
                      </>
                    )}
                    
                    {formData.floors && (
                      <>
                        <div className="text-gray-600">Niveaux</div>
                        <div>{formData.floors === 1 ? 'Plain-pied' : `${formData.floors} niveaux`}</div>
                      </>
                    )}
                    
                    {formData.specialFeatures && formData.specialFeatures.length > 0 && (
                      <>
                        <div className="text-gray-600">Caractéristiques</div>
                        <div>{formData.specialFeatures.join(', ')}</div>
                      </>
                    )}
                    
                    {formData.exteriorFeatures && formData.exteriorFeatures.length > 0 && (
                      <>
                        <div className="text-gray-600">Extérieur</div>
                        <div>{formData.exteriorFeatures.join(', ')}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <EstimationReport 
                  estimation={estimationResult} 
                  formData={formData as FormData} 
                  includeTerrainPrice={includeTerrainPrice}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calculator className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Aucune estimation disponible</h3>
                <p className="text-gray-500 max-w-md">
                  Complétez la conversation avec l'assistant pour recevoir une estimation détaillée de votre projet.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab('chat')}
                >
                  Retourner à la conversation
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConversationalEstimator;
