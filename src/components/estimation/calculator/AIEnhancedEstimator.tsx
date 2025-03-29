
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Calculator, ExternalLink, Download, Save, MessageSquare, X, ChevronRight, ChevronDown, PlusCircle, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { analyzeUserIntent, generateSmartResponse, generateSuggestions, ExtractedInfo } from './utils/conversationalUtils';
import { FormData } from './types';
import EstimationResult from './EstimationResult';
import ProgressBar from './ProgressBar';
import { getStepIcon } from './steps';

// Interfaces pour les messages de conversation
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  intent?: ExtractedInfo;
}

// Interface pour les suggestions
interface Suggestion {
  id: string;
  text: string;
}

const AIEnhancedEstimator: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [showSummary, setShowSummary] = useState(false);

  // Message de bienvenue initial
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: "Bonjour ! Je suis votre assistant d'estimation Progineer. Décrivez-moi votre projet de construction ou de rénovation, et je vous aiderai à obtenir une estimation précise. Par exemple, vous pouvez commencer par me dire si vous envisagez une construction neuve ou une rénovation ?",
      sender: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    
    // Générer des suggestions initiales
    const initialSuggestions = [
      { id: '1', text: "Je souhaite construire une maison neuve" },
      { id: '2', text: "J'envisage de rénover mon appartement" },
      { id: '3', text: "Je veux une extension de ma maison" },
    ];
    setSuggestions(initialSuggestions);
  }, []);

  // Faire défiler vers le bas lors de l'ajout de nouveaux messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Mise à jour des suggestions en fonction des données du formulaire
  useEffect(() => {
    // Trouver la dernière intention analysée
    const lastIntentMessage = [...messages].reverse().find(m => m.intent);
    const lastIntent = lastIntentMessage?.intent?.intent;
    
    // Générer de nouvelles suggestions
    const newSuggestions = generateSuggestions(formData, lastIntent);
    setSuggestions(newSuggestions.map((text, i) => ({ id: `sugg-${i}-${Date.now()}`, text })));
    
    // Calculer la progression
    calculateProgress();
  }, [formData, messages]);

  // Calculer la progression de la collecte d'informations
  const calculateProgress = () => {
    const totalFields = 10; // Nombre total de champs importants pour une estimation
    let completedFields = 0;
    
    // Vérifier les champs remplis
    if (formData.clientType) completedFields++;
    if (formData.projectType) completedFields++;
    if (formData.surface) completedFields++;
    if (formData.city) completedFields++;
    if (formData.hasLand !== undefined) completedFields++;
    if (formData.constructionYear) completedFields++;
    if (formData.finishLevel) completedFields++;
    if (formData.name) completedFields++;
    if (formData.email) completedFields++;
    if (formData.phone) completedFields++;
    
    const newProgress = Math.round((completedFields / totalFields) * 100);
    setProgress(newProgress);
  };

  // Soumettre un message utilisateur
  const handleSubmit = async (content: string = inputValue) => {
    if (!content.trim()) return;
    
    // Ajouter le message utilisateur
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    
    // Analyser l'intention de l'utilisateur
    console.info('Analyse de l\'intention:', analyzeUserIntent(content));
    const intentAnalysis = analyzeUserIntent(content);
    
    // Extraire les entités identifiées et mettre à jour les données du formulaire
    updateFormDataFromIntent(intentAnalysis);
    
    // Générer une réponse intelligente
    const assistantResponse = generateSmartResponse(intentAnalysis, formData);
    
    // Simuler un délai de traitement
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: assistantResponse,
        sender: 'assistant',
        timestamp: new Date(),
        intent: intentAnalysis
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
      
      // Vérifier si nous avons suffisamment d'informations pour une estimation
      if (intentAnalysis.entities.email || 
          content.toLowerCase().includes('calcul') || 
          content.toLowerCase().includes('estim') ||
          (progress >= 80 && intentAnalysis.intent === 'help')) {
        checkForEstimationReadiness();
      }
    }, 1000);
  };

  // Mettre à jour les données du formulaire à partir de l'analyse d'intention
  const updateFormDataFromIntent = (intent: ExtractedInfo) => {
    const newFormData = { ...formData };
    const entities = intent.entities;
    
    // Mettre à jour les champs en fonction des entités détectées
    if (entities.project_type) newFormData.projectType = entities.project_type;
    if (entities.surface) newFormData.surface = entities.surface;
    if (entities.location) newFormData.city = entities.location;
    if (entities.budget) newFormData.budget = entities.budget;
    if (entities.quality) newFormData.finishLevel = entities.quality;
    if (entities.rooms) newFormData.rooms = entities.rooms;
    if (entities.floors) newFormData.floors = entities.floors;
    if (entities.style) newFormData.style = entities.style;
    if (entities.has_terrain !== undefined) newFormData.hasLand = entities.has_terrain;
    if (entities.terrain_price) newFormData.landPrice = entities.terrain_price;
    if (entities.materials) newFormData.materials = entities.materials;
    if (entities.email) newFormData.email = entities.email;
    if (entities.phone) newFormData.phone = entities.phone;
    if (entities.energy_efficiency) newFormData.energyEfficiency = true;
    
    setFormData(newFormData);
  };

  // Vérifier si nous avons assez d'informations pour calculer une estimation
  const checkForEstimationReadiness = () => {
    // Vérifier les champs essentiels
    if (formData.projectType && 
        (formData.surface || formData.rooms) && 
        (formData.city || formData.finishLevel)) {
      
      // Si email est manquant mais que nous avons beaucoup d'informations
      if (!formData.email && progress >= 70) {
        handleSubmit("Pouvez-vous me donner votre email pour finaliser l'estimation ?");
        return;
      }
      
      // Si nous avons un email ou suffisamment d'informations, proposer une estimation
      if (formData.email || progress >= 80) {
        // Simuler un calcul d'estimation
        setTimeout(() => {
          // Base de prix au m²
          let basePrice = 0;
          
          switch(formData.projectType) {
            case 'Construction neuve':
              basePrice = 1800;
              break;
            case 'Rénovation':
              basePrice = 900;
              break;
            case 'Extension':
              basePrice = 1500;
              break;
            default:
              basePrice = 1500;
          }
          
          // Ajustements en fonction des autres paramètres
          if (formData.finishLevel?.includes('Premium')) basePrice *= 1.3;
          if (formData.finishLevel?.includes('Standard')) basePrice *= 1;
          if (formData.finishLevel?.includes('Basique')) basePrice *= 0.8;
          
          // Surface par défaut si non spécifiée
          const surface = formData.surface || (formData.rooms ? formData.rooms * 25 : 100);
          
          // Calcul du montant total
          const totalEstimation = Math.round(basePrice * surface);
          
          // Mettre à jour le résultat et afficher la boîte de dialogue
          setEstimationResult(totalEstimation);
          setShowResultDialog(true);
          setShowSummary(true);
          
          // Message de confirmation
          const estimationMessage = {
            id: `assistant-estimation-${Date.now()}`,
            content: `J'ai calculé une estimation pour votre projet. Le coût estimé est d'environ ${totalEstimation.toLocaleString('fr-FR')} €. Vous pouvez voir les détails dans l'onglet Résumé.`,
            sender: 'assistant',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, estimationMessage]);
          
          // Notification toast
          toast({
            title: "Estimation calculée",
            description: `Votre projet est estimé à environ ${totalEstimation.toLocaleString('fr-FR')} €`,
          });
        }, 2000);
      }
    }
  };

  // Utiliser une suggestion
  const handleSuggestionClick = (suggestion: string) => {
    handleSubmit(suggestion);
  };

  // Préparer un résumé des informations recueillies
  const getFormDataSummary = () => {
    const summary = [];
    
    if (formData.projectType) summary.push({ label: "Type de projet", value: formData.projectType });
    if (formData.surface) summary.push({ label: "Surface", value: `${formData.surface} m²` });
    if (formData.city) summary.push({ label: "Localisation", value: formData.city });
    if (formData.rooms) summary.push({ label: "Nombre de pièces", value: formData.rooms });
    if (formData.floors) summary.push({ label: "Nombre d'étages", value: formData.floors });
    if (formData.style) summary.push({ label: "Style architectural", value: formData.style });
    if (formData.finishLevel) summary.push({ label: "Niveau de finition", value: formData.finishLevel });
    if (formData.hasLand !== undefined) summary.push({ label: "Possession du terrain", value: formData.hasLand ? "Oui" : "Non" });
    if (formData.landPrice) summary.push({ label: "Prix du terrain", value: `${formData.landPrice.toLocaleString('fr-FR')} €` });
    if (formData.materials && formData.materials.length > 0) summary.push({ label: "Matériaux", value: formData.materials.join(", ") });
    if (formData.energyEfficiency) summary.push({ label: "Efficacité énergétique", value: "Optimisée" });
    if (formData.budget) summary.push({ label: "Budget", value: `${formData.budget.toLocaleString('fr-FR')} €` });
    
    return summary;
  };

  // Animation pour les messages
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  // Rendu d'un résumé visuel des données collectées
  const renderFormDataSummary = () => {
    const summary = getFormDataSummary();
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {summary.map((item, index) => (
          <div key={index} className="flex flex-col p-3 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
            <span className="text-base font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Rendu des boutons d'action
  const renderActionButtons = () => {
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        <Button 
          size="sm" 
          onClick={() => setShowResultDialog(true)}
          className="flex items-center gap-1"
          disabled={estimationResult === null}
        >
          <Calculator className="h-4 w-4" />
          Voir l'estimation détaillée
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          disabled={estimationResult === null}
        >
          <Download className="h-4 w-4" />
          Télécharger le PDF
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => {
            toast({
              title: "Devis sauvegardé",
              description: "Nous avons sauvegardé votre devis dans votre compte"
            });
          }}
          disabled={estimationResult === null}
        >
          <Save className="h-4 w-4" />
          Sauvegarder
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => {
            toast({
              title: "Demande envoyée",
              description: "Un expert vous contactera prochainement"
            });
          }}
        >
          <MessageSquare className="h-4 w-4" />
          Contacter un expert
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="shadow-lg border-gray-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Estimation intelligente</CardTitle>
              <CardDescription>
                Décrivez votre projet en langage naturel et obtenez une estimation précise
              </CardDescription>
            </div>
            {progress > 0 && (
              <Badge variant="outline" className="px-2 py-1">
                <span className="mr-1">Progression:</span>
                <span className="font-medium">{progress}%</span>
              </Badge>
            )}
          </div>
          <ProgressBar currentStep={progress} totalSteps={100} />
        </CardHeader>

        <CardContent className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Assistant
              </TabsTrigger>
              <TabsTrigger value="summary" className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" />
                Résumé
                {showSummary && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    <Check className="h-3 w-3" />
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="m-0">
              <div className="flex flex-col h-[500px]">
                <ScrollArea className="flex-1 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={messageVariants}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white dark:bg-gray-800 border'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <div
                              className={`text-xs mt-1 ${
                                message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {loading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] p-3 rounded-lg bg-white dark:bg-gray-800 border">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <p className="text-sm">L'assistant réfléchit...</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion.text)}
                        className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        {suggestion.text}
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className="flex items-end gap-2"
                  >
                    <div className="flex-1">
                      <Textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Décrivez votre projet ou posez une question..."
                        className="resize-none min-h-[80px]"
                      />
                    </div>
                    <Button type="submit" size="icon" disabled={loading || !inputValue.trim()}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Envoyer</span>
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="m-0 space-y-4">
              {!showSummary ? (
                <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg">
                  <ChevronDown className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium">Aucune estimation encore</h3>
                  <p className="text-gray-500 mt-2 max-w-md">
                    Discutez avec l'assistant pour fournir les détails de votre projet et obtenir une estimation personnalisée.
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setActiveTab('chat')}
                    variant="outline"
                  >
                    Retourner à l'assistant
                  </Button>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-400">Estimation de votre projet</h3>
                      {estimationResult && (
                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                          {estimationResult.toLocaleString('fr-FR')} €
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Cette estimation est basée sur les informations que vous avez fournies.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Résumé de votre projet</h3>
                    {renderFormDataSummary()}
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="details">
                      <AccordionTrigger>Détails de l'estimation</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between border-b pb-2">
                            <span>Coût des matériaux</span>
                            <span className="font-medium">{Math.round(estimationResult! * 0.6).toLocaleString('fr-FR')} €</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span>Main d'œuvre</span>
                            <span className="font-medium">{Math.round(estimationResult! * 0.35).toLocaleString('fr-FR')} €</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span>Frais d'étude</span>
                            <span className="font-medium">{Math.round(estimationResult! * 0.05).toLocaleString('fr-FR')} €</span>
                          </div>
                          <div className="flex justify-between pt-2 font-bold">
                            <span>Total HT</span>
                            <span>{Math.round(estimationResult! / 1.2).toLocaleString('fr-FR')} €</span>
                          </div>
                          <div className="flex justify-between pt-1 font-bold">
                            <span>TVA (20%)</span>
                            <span>{Math.round(estimationResult! - (estimationResult! / 1.2)).toLocaleString('fr-FR')} €</span>
                          </div>
                          <div className="flex justify-between pt-2 text-lg font-bold text-green-700 dark:text-green-300">
                            <span>Total TTC</span>
                            <span>{estimationResult!.toLocaleString('fr-FR')} €</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="nextSteps">
                      <AccordionTrigger>Prochaines étapes</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <PlusCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Rendez-vous avec un expert</p>
                              <p className="text-sm text-gray-500">Discutez des détails de votre projet avec un de nos experts</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <PlusCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Visite technique</p>
                              <p className="text-sm text-gray-500">Un technicien visitera votre propriété pour une évaluation précise</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <PlusCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Devis détaillé</p>
                              <p className="text-sm text-gray-500">Recevez un devis complet avec tous les détails techniques</p>
                            </div>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {renderActionButtons()}
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Boîte de dialogue de résultat */}
      <EstimationResult
        showResultDialog={showResultDialog}
        setShowResultDialog={setShowResultDialog}
        estimationResult={estimationResult}
        formData={formData}
      />
    </div>
  );
};

export default AIEnhancedEstimator;
