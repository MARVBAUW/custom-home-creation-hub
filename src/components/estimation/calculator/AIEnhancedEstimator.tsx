
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
import { corpsEtatQuestions } from './data/corpsEtatQuestions';
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

// Interface pour l'état de progression du questionnaire par corps d'état
interface CorpsEtatProgress {
  [key: string]: {
    completed: boolean;
    currentQuestionIndex: number;
    answers: Record<string, any>;
  }
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
  const [currentCorpsEtat, setCurrentCorpsEtat] = useState<string | null>(null);
  const [corpsEtatProgress, setCorpsEtatProgress] = useState<CorpsEtatProgress>({
    "gros_oeuvre": { completed: false, currentQuestionIndex: 0, answers: {} },
    "charpente_toiture": { completed: false, currentQuestionIndex: 0, answers: {} },
    "facade_isolation": { completed: false, currentQuestionIndex: 0, answers: {} },
    "menuiseries": { completed: false, currentQuestionIndex: 0, answers: {} },
    "electricite": { completed: false, currentQuestionIndex: 0, answers: {} },
    "plomberie_chauffage": { completed: false, currentQuestionIndex: 0, answers: {} },
    "cloisons_platrerie": { completed: false, currentQuestionIndex: 0, answers: {} },
    "revetements": { completed: false, currentQuestionIndex: 0, answers: {} },
    "cuisine_sdb": { completed: false, currentQuestionIndex: 0, answers: {} },
    "amenagements_exterieurs": { completed: false, currentQuestionIndex: 0, answers: {} }
  });

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
    
    // Ajouter la progression des corps d'état
    const corpsEtats = Object.keys(corpsEtatProgress);
    const completedCorpsEtats = corpsEtats.filter(key => corpsEtatProgress[key].completed).length;
    const corpsEtatPercentage = completedCorpsEtats / corpsEtats.length;
    
    const newProgress = Math.round((completedFields / totalFields) * 50 + corpsEtatPercentage * 50);
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
    
    // Vérifier si nous sommes en train de poser des questions spécifiques sur un corps d'état
    if (currentCorpsEtat) {
      handleCorpsEtatQuestionResponse(content);
    } else {
      // Analyser l'intention de l'utilisateur
      const intentAnalysis = analyzeUserIntent(content);
      
      // Extraire les entités identifiées et mettre à jour les données du formulaire
      updateFormDataFromIntent(intentAnalysis);
      
      // Vérifier si l'utilisateur a demandé des détails sur un corps d'état spécifique
      const mentionedCorpsEtat = detectCorpsEtatMention(content);
      
      if (mentionedCorpsEtat && formData.projectType) {
        // Commencer le questionnaire spécifique à ce corps d'état
        startCorpsEtatQuestionnaire(mentionedCorpsEtat);
      } else {
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
          
          // Si nous avons les infos de base du projet, proposer d'entrer dans le détail des corps d'état
          if (formData.projectType && formData.surface && !currentCorpsEtat) {
            suggestCorpsEtatDetails();
          }
          
          // Vérifier si nous avons suffisamment d'informations pour une estimation
          if (intentAnalysis.entities.email || 
              content.toLowerCase().includes('calcul') || 
              content.toLowerCase().includes('estim') ||
              (progress >= 80 && intentAnalysis.intent === 'help')) {
            checkForEstimationReadiness();
          }
        }, 1000);
      }
    }
  };

  // Détecter si un corps d'état est mentionné dans le texte
  const detectCorpsEtatMention = (text: string): string | null => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('gros œuvre') || lowerText.includes('gros oeuvre') || lowerText.includes('fondation')) 
      return 'gros_oeuvre';
    if (lowerText.includes('charpente') || lowerText.includes('toit')) 
      return 'charpente_toiture';
    if (lowerText.includes('façade') || lowerText.includes('facade') || lowerText.includes('isolation')) 
      return 'facade_isolation';
    if (lowerText.includes('menuiserie') || lowerText.includes('fenêtre') || lowerText.includes('fenetre') || lowerText.includes('porte')) 
      return 'menuiseries';
    if (lowerText.includes('électricité') || lowerText.includes('electricite')) 
      return 'electricite';
    if (lowerText.includes('plomberie') || lowerText.includes('chauffage')) 
      return 'plomberie_chauffage';
    if (lowerText.includes('cloison') || lowerText.includes('plâtre') || lowerText.includes('platre')) 
      return 'cloisons_platrerie';
    if (lowerText.includes('revêtement') || lowerText.includes('revetement') || lowerText.includes('sol') || lowerText.includes('peinture')) 
      return 'revetements';
    if (lowerText.includes('cuisine') || lowerText.includes('salle de bain') || lowerText.includes('sdb')) 
      return 'cuisine_sdb';
    if (lowerText.includes('extérieur') || lowerText.includes('exterieur') || lowerText.includes('jardin') || lowerText.includes('piscine')) 
      return 'amenagements_exterieurs';
    
    return null;
  };

  // Commencer un questionnaire spécifique à un corps d'état
  const startCorpsEtatQuestionnaire = (corpsEtat: string) => {
    setCurrentCorpsEtat(corpsEtat);
    
    // Trouver la première question pour ce corps d'état
    const questions = corpsEtatQuestions[corpsEtat] || [];
    if (questions.length === 0) {
      setCurrentCorpsEtat(null);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: "Je suis désolé, je n'ai pas de questions spécifiques pour ce corps d'état pour le moment.",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
      return;
    }
    
    // Poser la première question
    const currentIndex = corpsEtatProgress[corpsEtat].currentQuestionIndex;
    const question = questions[currentIndex];
    
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      content: `Pour estimer le coût du poste "${getCorpsEtatDisplayName(corpsEtat)}", ${question.question}`,
      sender: 'assistant',
      timestamp: new Date()
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
      
      // Générer des suggestions pour les réponses possibles
      if (question.options) {
        const optionSuggestions = question.options.map((option, index) => ({
          id: `opt-${index}-${Date.now()}`,
          text: option
        }));
        setSuggestions(optionSuggestions);
      }
    }, 1000);
  };

  // Traiter la réponse à une question spécifique d'un corps d'état
  const handleCorpsEtatQuestionResponse = (response: string) => {
    if (!currentCorpsEtat) return;
    
    // Enregistrer la réponse
    const corpsEtat = currentCorpsEtat;
    const currentProgress = { ...corpsEtatProgress[corpsEtat] };
    const questions = corpsEtatQuestions[corpsEtat] || [];
    const currentQuestion = questions[currentProgress.currentQuestionIndex];
    
    // Stocker la réponse
    currentProgress.answers[currentQuestion.id] = response;
    
    // Passer à la question suivante ou terminer le questionnaire
    if (currentProgress.currentQuestionIndex < questions.length - 1) {
      // Passer à la question suivante
      currentProgress.currentQuestionIndex += 1;
      
      // Mettre à jour l'état
      setCorpsEtatProgress(prev => ({
        ...prev,
        [corpsEtat]: currentProgress
      }));
      
      // Poser la question suivante
      const nextQuestion = questions[currentProgress.currentQuestionIndex];
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: nextQuestion.question,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setLoading(false);
        
        // Générer des suggestions pour les réponses possibles
        if (nextQuestion.options) {
          const optionSuggestions = nextQuestion.options.map((option, index) => ({
            id: `opt-${index}-${Date.now()}`,
            text: option
          }));
          setSuggestions(optionSuggestions);
        } else {
          // Réinitialiser les suggestions si pas d'options
          setSuggestions([]);
        }
      }, 1000);
    } else {
      // Terminer le questionnaire
      currentProgress.completed = true;
      currentProgress.currentQuestionIndex = 0; // Réinitialiser pour une éventuelle utilisation future
      
      // Mettre à jour l'état
      setCorpsEtatProgress(prev => ({
        ...prev,
        [corpsEtat]: currentProgress
      }));
      
      // Message de confirmation
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: `Merci pour ces précisions concernant "${getCorpsEtatDisplayName(corpsEtat)}". Ces informations me permettront de faire une estimation plus précise de ce poste.`,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setCurrentCorpsEtat(null); // Sortir du mode questionnaire
        setLoading(false);
        
        // Suggérer un autre corps d'état si nécessaire
        const nextCorpsEtat = findNextIncompleteCorpsEtat();
        if (nextCorpsEtat) {
          suggestNextCorpsEtat(nextCorpsEtat);
        } else {
          // Si tous les corps d'état sont complétés, proposer l'estimation finale
          if (allCorpsEtatCompleted()) {
            finalizeEstimation();
          } else {
            // Sinon, revenir au mode conversation général
            const followUpSuggestions = [
              { id: `sugg-1-${Date.now()}`, text: "Calculer l'estimation" },
              { id: `sugg-2-${Date.now()}`, text: "Parler d'un autre aspect du projet" },
              { id: `sugg-3-${Date.now()}`, text: "Quels sont les corps d'état restants ?" }
            ];
            setSuggestions(followUpSuggestions);
          }
        }
      }, 1000);
    }
  };

  // Trouver le prochain corps d'état incomplet
  const findNextIncompleteCorpsEtat = (): string | null => {
    const entries = Object.entries(corpsEtatProgress);
    const incomplete = entries.find(([_, progress]) => !progress.completed);
    return incomplete ? incomplete[0] : null;
  };

  // Vérifier si tous les corps d'état ont été complétés
  const allCorpsEtatCompleted = (): boolean => {
    return Object.values(corpsEtatProgress).every(progress => progress.completed);
  };

  // Suggérer de détailler un corps d'état spécifique
  const suggestNextCorpsEtat = (corpsEtat: string) => {
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      content: `Souhaitez-vous maintenant me donner des détails sur "${getCorpsEtatDisplayName(corpsEtat)}" ?`,
      sender: 'assistant',
      timestamp: new Date()
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage]);
      
      // Suggestions
      const suggestions = [
        { id: `sugg-yes-${Date.now()}`, text: `Oui, parlons du ${getCorpsEtatDisplayName(corpsEtat)}` },
        { id: `sugg-no-${Date.now()}`, text: "Non, passons à autre chose" },
        { id: `sugg-later-${Date.now()}`, text: "Plus tard, calculez d'abord une estimation préliminaire" }
      ];
      setSuggestions(suggestions);
    }, 500);
  };

  // Suggérer d'entrer dans le détail des corps d'état
  const suggestCorpsEtatDetails = () => {
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      content: "Maintenant que j'ai les informations de base sur votre projet, souhaitez-vous que nous entrions dans le détail des différents postes de travaux ? Cela me permettra de vous fournir une estimation beaucoup plus précise.",
      sender: 'assistant',
      timestamp: new Date()
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage]);
      
      // Suggestions de corps d'état
      const suggestions = [
        { id: `sugg-gros-oeuvre-${Date.now()}`, text: "Parlons du gros œuvre (fondations, murs)" },
        { id: `sugg-toiture-${Date.now()}`, text: "Détaillons la toiture et charpente" },
        { id: `sugg-isolation-${Date.now()}`, text: "Précisons l'isolation et façades" },
        { id: `sugg-later-${Date.now()}`, text: "Plus tard, faites-moi d'abord une estimation globale" }
      ];
      setSuggestions(suggestions);
    }, 1500);
  };

  // Obtenir le nom d'affichage d'un corps d'état
  const getCorpsEtatDisplayName = (corpsEtat: string): string => {
    const displayNames: Record<string, string> = {
      'gros_oeuvre': 'Gros Œuvre',
      'charpente_toiture': 'Charpente & Toiture',
      'facade_isolation': 'Façade & Isolation',
      'menuiseries': 'Menuiseries',
      'electricite': 'Électricité',
      'plomberie_chauffage': 'Plomberie & Chauffage',
      'cloisons_platrerie': 'Cloisons & Plâtrerie',
      'revetements': 'Revêtements',
      'cuisine_sdb': 'Cuisine & Salle de bain',
      'amenagements_exterieurs': 'Aménagements Extérieurs'
    };
    
    return displayNames[corpsEtat] || corpsEtat;
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
        finalizeEstimation();
      }
    }
  };

  // Finaliser et afficher l'estimation
  const finalizeEstimation = () => {
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
      
      // Calcul du montant total, ajusté en fonction des réponses aux corps d'état
      let totalEstimation = basePrice * surface;
      
      // Ajustements basés sur les réponses aux corps d'état
      Object.entries(corpsEtatProgress).forEach(([corpsEtat, progress]) => {
        if (progress.completed) {
          // Appliquer des ajustements spécifiques en fonction des réponses
          // Ceci est une simplification, à adapter selon votre logique métier réelle
          const answers = progress.answers;
          
          // Exemple d'ajustement pour le gros œuvre
          if (corpsEtat === 'gros_oeuvre') {
            if (answers['gros_oeuvre_type'] === 'Béton') totalEstimation *= 1.1;
            if (answers['gros_oeuvre_type'] === 'Bois') totalEstimation *= 1.05;
            if (answers['terrain_type'] === 'Terrain en pente') totalEstimation *= 1.15;
          }
          
          // Exemple d'ajustement pour la toiture
          if (corpsEtat === 'charpente_toiture') {
            if (answers['roof_type'] === 'Toit plat') totalEstimation *= 0.95;
            if (answers['roof_type'] === 'Toit complexe') totalEstimation *= 1.2;
          }
          
          // Et ainsi de suite pour les autres corps d'état...
        }
      });
      
      // Arrondir à l'entier
      totalEstimation = Math.round(totalEstimation);
      
      // Mettre à jour le résultat et afficher la boîte de dialogue
      setEstimationResult(totalEstimation);
      setShowResultDialog(true);
      setShowSummary(true);
      
      // Message de confirmation
      const estimationMessage: Message = {
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

  // Récupérer un résumé des réponses par corps d'état
  const getCorpsEtatSummary = () => {
    const summary: {label: string, value: string}[] = [];
    
    Object.entries(corpsEtatProgress).forEach(([corpsEtat, progress]) => {
      if (progress.completed) {
        const answers = Object.entries(progress.answers)
          .map(([_, answer]) => answer)
          .join(", ");
        
        summary.push({
          label: getCorpsEtatDisplayName(corpsEtat),
          value: answers.length > 50 ? answers.substring(0, 50) + "..." : answers
        });
      }
    });
    
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
    const corpsEtatSummary = getCorpsEtatSummary();
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {summary.map((item, index) => (
            <div key={index} className="flex flex-col p-3 border rounded-lg bg-gray-50 dark:bg-gray-900">
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
              <span className="text-base font-medium">{item.value}</span>
            </div>
          ))}
        </div>
        
        {corpsEtatSummary.length > 0 && (
          <div className="pt-4">
            <h4 className="text-md font-medium mb-3">Détails des corps d'état</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {corpsEtatSummary.map((item, index) => (
                <div key={index} className="flex flex-col p-3 border rounded-lg bg-gray-50 dark:bg-gray-900">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
                  <span className="text-base font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
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
