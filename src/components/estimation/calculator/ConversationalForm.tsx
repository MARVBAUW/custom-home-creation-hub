import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  MessageSquare, 
  Send, 
  Calculator, 
  ArrowRight, 
  Check,
  HelpCircle,
  Plus,
  Minus,
  Edit,
  Download,
  FileText,
  ChevronDown,
  ChevronUp,
  PieChart
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { FormData } from './types';
import { useEstimationSteps } from './hooks/useEstimationSteps';
import { calculateDetailedEstimation } from './calculationUtils';
import EstimationReport from './EstimationReport';

// Types pour les messages
type MessageType = 'bot' | 'user' | 'system';
type InputType = 'text' | 'number' | 'select' | 'multiChoice' | 'yesNo' | 'surface' | 'date' | 'city' | 'email' | 'phone';

// Liste des grandes villes françaises pour l'autocomplétion
const CITIES_DATA = [
  { name: "Paris", departement: "75", taxeRate: 5.0 },
  { name: "Marseille", departement: "13", taxeRate: 4.5 },
  { name: "Lyon", departement: "69", taxeRate: 4.8 },
  { name: "Toulouse", departement: "31", taxeRate: 4.0 },
  { name: "Nice", departement: "06", taxeRate: 4.7 },
  { name: "Nantes", departement: "44", taxeRate: 4.2 },
  { name: "Strasbourg", departement: "67", taxeRate: 4.3 },
  { name: "Montpellier", departement: "34", taxeRate: 4.1 },
  { name: "Bordeaux", departement: "33", taxeRate: 4.6 },
  { name: "Lille", departement: "59", taxeRate: 4.4 },
  { name: "Rennes", departement: "35", taxeRate: 4.0 },
  { name: "Reims", departement: "51", taxeRate: 3.9 },
  { name: "Le Havre", departement: "76", taxeRate: 3.8 },
  { name: "Saint-Étienne", departement: "42", taxeRate: 3.7 },
  { name: "Toulon", departement: "83", taxeRate: 4.5 },
  { name: "Grenoble", departement: "38", taxeRate: 4.2 },
  { name: "Dijon", departement: "21", taxeRate: 3.9 },
  { name: "Angers", departement: "49", taxeRate: 3.8 },
  { name: "Nîmes", departement: "30", taxeRate: 4.0 },
  { name: "Aix-en-Provence", departement: "13", taxeRate: 4.6 }
];

// Schéma pour la validation
const inputSchema = z.object({
  text: z.string().optional(),
  number: z.number().optional(),
  choice: z.string().optional(),
  choices: z.array(z.string()).optional(),
  yesNo: z.boolean().optional(),
  surface: z.number().optional(),
  date: z.string().optional(),
  city: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

// Interface pour un message
interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  input?: {
    type: InputType;
    options?: string[];
    value?: any;
    key: string;
    required?: boolean;
    min?: number;
    max?: number;
    unit?: string;
    placeholder?: string;
    help?: string;
  };
}

// Interface pour le rapport détaillé
interface DetailedEstimation {
  totalHT: number;
  totalTTC: number;
  vat: number;
  corpsEtat: {
    [key: string]: {
      montantHT: number;
      details: string[];
    }
  };
  honorairesHT: number;
  honorairesTTC: number;
  taxeAmenagement: number;
  garantieDecennale: number;
  etudesGeotechniques: number;
  etudeThermique: number;
  coutGlobalHT: number;
  coutGlobalTTC: number;
  terrainPrice?: number;
  coutTotalAvecTerrain?: number;
}

const ConversationalForm: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(0);
  const [detailedEstimation, setDetailedEstimation] = useState<DetailedEstimation | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [includeTerrainPrice, setIncludeTerrainPrice] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { visibleSteps } = useEstimationSteps(formData);

  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      text: '',
      number: undefined,
      choice: undefined,
      choices: [],
      yesNo: undefined,
      surface: undefined,
      date: undefined,
      city: undefined,
      email: undefined,
      phone: undefined,
    },
  });

  // Conversation flow logic - plus de questions pour une estimation détaillée
  const conversationFlow = [
    {
      step: 1,
      message: "Bonjour ! Je suis votre assistant d'estimation de projet Progineer. Quel type de projet souhaitez-vous estimer ?",
      input: {
        type: 'select' as InputType,
        options: ['Construction neuve', 'Rénovation', 'Extension', 'Surélévation'],
        key: 'projectType',
        help: "Le type de projet va déterminer les corps d'état impliqués et les coûts associés."
      }
    },
    {
      step: 2,
      message: "Dans quelle ville se situe votre projet ?",
      input: {
        type: 'city' as InputType,
        key: 'city',
        placeholder: "Ex: Marseille, Lyon, Nice...",
        help: "Cette information nous permet de calculer la taxe d'aménagement locale."
      }
    },
    {
      step: 3,
      message: "Quelle est la surface approximative de votre projet en m² ?",
      input: {
        type: 'surface' as InputType,
        key: 'surface',
        min: 10,
        max: 1500,
        unit: 'm²',
        help: "La surface est un élément essentiel pour estimer le coût. Pour une maison, comptez la surface totale habitable."
      }
    },
    {
      step: 4,
      message: "Sur combien de niveaux votre projet s'étend-il ?",
      input: {
        type: 'select' as InputType,
        options: ['1 niveau (plain-pied)', '2 niveaux (R+1)', '3 niveaux (R+2)', '4 niveaux ou plus'],
        key: 'levels',
        help: "Le nombre de niveaux impacte les fondations, la structure et l'aménagement."
      }
    },
    {
      step: 5,
      message: "Quel niveau de finition recherchez-vous ?",
      input: {
        type: 'select' as InputType,
        options: ['Premium (haut de gamme)', 'Standard (qualité moyenne)', 'Basique (entrée de gamme)'],
        key: 'finishLevel',
        help: "Le niveau de finition influence directement le coût des matériaux et prestations."
      },
      condition: (data: FormData) => data.projectType === 'Construction neuve' || data.projectType === 'Extension',
    },
    {
      step: 5,
      message: "S'agit-il d'une rénovation complète ou partielle ?",
      input: {
        type: 'select' as InputType,
        options: ['Rénovation complète', 'Rénovation partielle'],
        key: 'renovationType',
        help: "Une rénovation complète inclut tous les corps d'état, tandis qu'une partielle se concentre sur certains éléments."
      },
      condition: (data: FormData) => data.projectType === 'Rénovation',
    },
    {
      step: 6,
      message: "Quelle est la nature du terrain ?",
      input: {
        type: 'select' as InputType,
        options: ['Terrain plat', 'Terrain en légère pente', 'Terrain en forte pente', 'Terrain complexe (accès difficile, etc.)'],
        key: 'terrainType',
        help: "La nature du terrain impacte les fondations et les travaux préparatoires."
      },
      condition: (data: FormData) => data.projectType === 'Construction neuve' || data.projectType === 'Extension',
    },
    {
      step: 7,
      message: "Quel type de structure souhaitez-vous pour les murs ?",
      input: {
        type: 'select' as InputType,
        options: ['Briques', 'Parpaings', 'Béton', 'Bois', 'Ossature métallique'],
        key: 'wallType',
        help: "Chaque type de structure a ses avantages et son coût propre."
      },
      condition: (data: FormData) => data.projectType === 'Construction neuve' || data.projectType === 'Extension',
    },
    {
      step: 8,
      message: "Quel type de charpente et toiture préférez-vous ?",
      input: {
        type: 'select' as InputType,
        options: ['Toiture terrasse', 'Charpente traditionnelle', 'Charpente métallique', 'Toiture mixte (terrasse et pente)'],
        key: 'roofType',
        help: "Le type de toiture influence l'esthétique et le coût global."
      },
      condition: (data: FormData) => data.projectType === 'Construction neuve' || data.projectType === 'Extension',
    },
    {
      step: 9,
      message: "Quelles parties souhaitez-vous rénover ?",
      input: {
        type: 'multiChoice' as InputType,
        options: ['Cuisine', 'Salle de bain', 'Chambres', 'Salon/Séjour', 'Électricité', 'Plomberie', 'Façade', 'Toiture', 'Isolation'],
        key: 'renovationAreas',
        help: "Sélectionnez toutes les zones concernées par la rénovation."
      },
      condition: (data: FormData) => data.projectType === 'Rénovation',
    },
    {
      step: 10,
      message: "Quel type d'isolation souhaitez-vous ?",
      input: {
        type: 'select' as InputType,
        options: ['Basique (réglementaire)', 'Performance (RT 2012)', 'Ultra-performance (RT 2020/Passif)'],
        key: 'insulationType',
        help: "Une meilleure isolation augmente le coût initial mais réduit les dépenses énergétiques futures."
      }
    },
    {
      step: 11,
      message: "Quel type de chauffage envisagez-vous ?",
      input: {
        type: 'select' as InputType,
        options: ['Électrique', 'Gaz', 'Pompe à chaleur', 'Géothermie', 'Poêle à bois/granulés', 'Solaire'],
        key: 'heatingType',
        help: "Le choix du système de chauffage impacte le confort et la consommation énergétique."
      }
    },
    {
      step: 12,
      message: "Souhaitez-vous une climatisation ?",
      input: {
        type: 'yesNo' as InputType,
        key: 'hasAirConditioning',
        help: "La climatisation représente un investissement supplémentaire mais améliore le confort en été."
      }
    },
    {
      step: 13,
      message: "Quel type de menuiseries extérieures préférez-vous ?",
      input: {
        type: 'select' as InputType,
        options: ['PVC', 'Aluminium', 'Bois', 'Mixte bois/alu'],
        key: 'windowType',
        help: "Les menuiseries représentent un poste important dans le budget global."
      }
    },
    {
      step: 14,
      message: "Quel type de cuisine souhaitez-vous installer ?",
      input: {
        type: 'select' as InputType,
        options: ['Cuisine équipée haut de gamme', 'Cuisine standard équipée', 'Cuisine basique', 'Pas de cuisine (à installer plus tard)'],
        key: 'kitchenType',
        help: "La cuisine peut représenter un budget conséquent dans votre projet."
      }
    },
    {
      step: 15,
      message: "Combien de salles de bain/douche prévoyez-vous ?",
      input: {
        type: 'select' as InputType,
        options: ['1', '2', '3', '4 ou plus'],
        key: 'bathroomCount',
        help: "Les pièces d'eau sont parmi les plus coûteuses au m²."
      }
    },
    {
      step: 16,
      message: "Souhaitez-vous aménager des espaces extérieurs ?",
      input: {
        type: 'multiChoice' as InputType,
        options: ['Terrasse', 'Piscine', 'Jardin paysager', 'Clôture/Portail', 'Garage/Abri', 'Aucun aménagement extérieur'],
        key: 'exteriorFeatures',
        help: "Les aménagements extérieurs peuvent représenter un budget significatif."
      }
    },
    {
      step: 17,
      message: "Quand souhaitez-vous commencer les travaux ?",
      input: {
        type: 'select' as InputType,
        options: ['Dans les 3 mois', 'Dans 3 à 6 mois', 'Dans 6 à 12 mois', "Dans plus d'un an"],
        key: 'startDate',
        help: "Cette information nous permet d'ajuster l'estimation en fonction de l'inflation prévue."
      }
    },
    {
      step: 18,
      message: "Avez-vous déjà un terrain pour votre projet ?",
      input: {
        type: 'yesNo' as InputType,
        key: 'hasLand',
        help: "Cette information nous aidera à déterminer si nous devons inclure le coût du terrain dans l'estimation totale."
      },
      condition: (data: FormData) => data.projectType === 'Construction neuve',
    },
    {
      step: 19,
      message: "Quel est le prix d'acquisition du terrain (en €) ?",
      input: {
        type: 'number' as InputType,
        key: 'landPrice',
        min: 0,
        max: 10000000,
        help: "Cette information sera utilisée pour le calcul du coût global incluant le terrain."
      },
      condition: (data: FormData) => data.hasLand === true && data.projectType === 'Construction neuve',
    },
    {
      step: 20,
      message: "Pour finaliser votre estimation, pourriez-vous me communiquer votre email ?",
      input: {
        type: 'email' as InputType,
        key: 'email',
        placeholder: "votre@email.com",
        help: "Nous utiliserons cette adresse pour vous envoyer votre estimation détaillée."
      }
    },
    {
      step: 21,
      message: "Un dernier point, quel est votre numéro de téléphone ? (facultatif)",
      input: {
        type: 'phone' as InputType,
        key: 'phone',
        placeholder: "06XXXXXXXX",
        help: "Un expert Progineer pourra vous contacter pour affiner votre projet si vous le souhaitez."
      }
    }
  ];

  // Initialiser la conversation
  useEffect(() => {
    if (messages.length === 0) {
      // Calculer le nombre total d'étapes
      const applicableSteps = conversationFlow.filter(step => {
        return !step.condition || step.condition(formData);
      });
      setTotalSteps(applicableSteps.length);

      const welcome: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: "👋 Bienvenue sur notre outil d'estimation détaillée de projet ! Je vais vous poser une série de questions pour vous fournir une évaluation précise des coûts par corps d'état, honoraires et taxes.",
        timestamp: new Date(),
      };
      
      setIsTyping(true);
      setTimeout(() => {
        setMessages([welcome]);
        setIsTyping(false);
        
        // Ajouter la première question après un court délai
        setTimeout(() => {
          const firstQuestion = conversationFlow[0];
          addBotMessage(firstQuestion.message, firstQuestion.input);
        }, 500);
      }, 1000);
    }
  }, []);

  // Faire défiler vers le bas lors de l'ajout de nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ajouter un message du bot
  const addBotMessage = (content: string, input?: any) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const newMessage: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content,
        timestamp: new Date(),
        input,
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Ajouter un message de l'utilisateur
  const addUserMessage = (content: string, value: any, key: string) => {
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Mettre à jour les données du formulaire
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
    
    // Trouver la prochaine étape
    const currentStepIndex = conversationFlow.findIndex(
      step => step.input?.key === key
    );
    
    if (currentStepIndex !== -1) {
      // Mettre à jour l'étape courante
      setCurrentStep(currentStep + 1);
      
      // Trouver la prochaine étape applicable
      let nextStepFound = false;
      
      for (let i = currentStepIndex + 1; i < conversationFlow.length; i++) {
        const nextStep = conversationFlow[i];
        
        // Vérifier si l'étape a une condition et si elle est remplie
        const shouldShow = nextStep.condition 
          ? nextStep.condition(formData) 
          : true;
        
        if (shouldShow) {
          nextStepFound = true;
          setTimeout(() => {
            addBotMessage(nextStep.message, nextStep.input);
          }, 500);
          break;
        }
      }
      
      // Si aucune étape suivante n'est trouvée, finaliser l'estimation
      if (!nextStepFound || currentStepIndex === conversationFlow.length - 1) {
        setTimeout(() => {
          finalizeEstimation();
        }, 500);
      }
    }
  };

  // Calculer l'estimation détaillée
  const finalizeEstimation = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      try {
        // Calculer l'estimation détaillée
        const estimation = calculateDetailedEstimation(formData);
        setDetailedEstimation(estimation);
        
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
        
        // Message de résumé
        const resultMessage: Message = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: `Merci pour toutes ces informations ! J'ai calculé une estimation détaillée de votre projet.

Le montant estimé des travaux est de :
• ${formattedEstimationHT} HT
• ${formattedEstimationTTC} TTC 

Cette estimation comprend :
• Les travaux par corps d'état
• Les honoraires de maîtrise d'œuvre
• La taxe d'aménagement
• Les études techniques
• La garantie décennale

Souhaitez-vous consulter le rapport détaillé ? Il vous permettra de visualiser la répartition des coûts par corps d'état et le détail des frais annexes.`,
          timestamp: new Date(),
          input: {
            type: 'yesNo',
            key: 'showReport',
          },
        };
        
        setMessages(prev => [...prev, resultMessage]);
      } catch (error) {
        console.error("Erreur lors du calcul de l'estimation :", error);
        
        // Message d'erreur
        const errorMessage: Message = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: "Je suis désolé, une erreur s'est produite lors du calcul de l'estimation. Veuillez réessayer ou contacter notre équipe technique.",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 3000);
  };

  // Gérer la demande de rapport
  const handleReportRequest = (value: boolean) => {
    if (value) {
      addUserMessage("Oui, je souhaite consulter le rapport détaillé", true, "showReport");
      setShowReport(true);
      
      // Si le projet est une construction neuve et que l'utilisateur a un terrain
      if (formData.projectType === 'Construction neuve' && formData.hasLand) {
        addBotMessage("Souhaitez-vous inclure le prix de votre terrain dans le calcul du coût global ?", {
          type: 'yesNo',
          key: 'includeTerrainPrice',
        });
      } else {
        // Message de conclusion
        addBotMessage("Voici votre rapport détaillé. Vous pouvez le télécharger ou l'imprimer. Un conseiller Progineer vous contactera prochainement pour discuter de votre projet.", undefined);
      }
    } else {
      addUserMessage("Non, pas pour le moment", false, "showReport");
      
      // Message de conclusion sans afficher le rapport
      addBotMessage("Très bien ! Un conseiller Progineer vous contactera prochainement pour discuter de votre projet et vous proposer une estimation plus précise. Avez-vous d'autres questions ?", undefined);
    }
  };

  // Gérer l'inclusion du prix du terrain
  const handleIncludeTerrainPrice = (value: boolean) => {
    setIncludeTerrainPrice(value);
    
    if (value) {
      addUserMessage("Oui, j'aimerais inclure le prix du terrain", true, "includeTerrainPrice");
    } else {
      addUserMessage("Non, je préfère voir uniquement le coût de construction", false, "includeTerrainPrice");
    }
    
    // Message de conclusion
    addBotMessage("Voici votre rapport détaillé. Vous pouvez le télécharger ou l'imprimer. Un conseiller Progineer vous contactera prochainement pour discuter de votre projet.", undefined);
  };

  // Gérer la soumission du formulaire
  const onSubmit = (values: z.infer<typeof inputSchema>) => {
    const lastMessage = messages[messages.length - 1];
    
    if (!lastMessage.input) return;
    
    const { type, key, options } = lastMessage.input;
    
    switch (type) {
      case 'text':
        if (values.text) {
          addUserMessage(values.text, values.text, key);
          form.reset({ text: '' });
        }
        break;
        
      case 'number':
        if (values.number !== undefined) {
          addUserMessage(`${values.number} €`, values.number, key);
          form.reset({ number: undefined });
        }
        break;
        
      case 'surface':
        if (values.surface !== undefined) {
          addUserMessage(`${values.surface} m²`, values.surface, key);
          form.reset({ surface: undefined });
        }
        break;
        
      case 'select':
        if (values.choice && options) {
          addUserMessage(values.choice, values.choice, key);
          form.reset({ choice: undefined });
        }
        break;
        
      case 'multiChoice':
        if (values.choices && values.choices.length > 0 && options) {
          addUserMessage(values.choices.join(', '), values.choices, key);
          form.reset({ choices: [] });
        }
        break;
        
      case 'yesNo':
        if (values.yesNo !== undefined) {
          if (key === 'showReport') {
            handleReportRequest(values.yesNo);
          } else if (key === 'includeTerrainPrice') {
            handleIncludeTerrainPrice(values.yesNo);
          } else {
            addUserMessage(values.yesNo ? 'Oui' : 'Non', values.yesNo, key);
          }
          form.reset({ yesNo: undefined });
        }
        break;
        
      case 'date':
        if (values.date) {
          addUserMessage(values.date, values.date, key);
          form.reset({ date: undefined });
        }
        break;
        
      case 'city':
        if (values.city) {
          // Trouver les infos de la ville
          const cityInfo = CITIES_DATA.find(c => c.name.toLowerCase() === values.city?.toLowerCase());
          if (cityInfo) {
            addUserMessage(`${cityInfo.name} (${cityInfo.departement})`, cityInfo.name, key);
            // Stocker également le taux de taxe de la ville
            setFormData(prev => ({
              ...prev,
              cityTaxRate: cityInfo.taxeRate
            }));
          } else {
            addUserMessage(values.city, values.city, key);
          }
          form.reset({ city: undefined });
        }
        break;
        
      case 'email':
        if (values.email) {
          addUserMessage(values.email, values.email, key);
          form.reset({ email: undefined });
        }
        break;
        
      case 'phone':
        if (values.phone) {
          addUserMessage(values.phone, values.phone, key);
          form.reset({ phone: undefined });
        }
        break;
    }
  };

  // Filtrer les suggestions de villes en fonction de la saisie
  const filterCities = (input: string) => {
    if (!input || input.length < 2) return [];
    return CITIES_DATA.filter(city => 
      city.name.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 5);
  };

  // Rendu du formulaire d'entrée approprié
  const renderInputForm = () => {
    const lastMessage = messages[messages.length - 1];
    
    if (!lastMessage || !lastMessage.input || lastMessage.type !== 'bot') {
      return null;
    }
    
    const { type, options, key, required, min, max, unit, placeholder, help } = lastMessage.input;
    
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {help && (
            <div className="text-xs text-gray-500 mb-2 flex items-center">
              <HelpCircle className="h-3 w-3 mr-1 text-blue-500" />
              {help}
            </div>
          )}
          
          {type === 'text' && (
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder={placeholder || "Votre réponse..."}
                        {...field}
                        className="flex-1"
                        required={required}
                      />
                      <Button type="submit" size="sm" className="shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          
          {type === 'email' && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder={placeholder || "Votre email..."}
                        {...field}
                        className="flex-1"
                        required={required}
                      />
                      <Button type="submit" size="sm" className="shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          
          {type === 'phone' && (
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        type="tel"
                        placeholder={placeholder || "Votre téléphone..."}
                        {...field}
                        className="flex-1"
                      />
                      <Button type="submit" size="sm" className="shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          
          {type === 'number' && (
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Entrez un nombre..."
                        {...field}
                        value={field.value || ''}
                        onChange={e => field.onChange(e.target.valueAsNumber)}
                        min={min}
                        max={max}
                        className="flex-1"
                      />
                      <Button type="submit" size="sm" className="shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          
          {type === 'surface' && (
            <FormField
              control={form.control}
              name="surface"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type="number"
                          placeholder="Surface..."
                          {...field}
                          value={field.value || ''}
                          onChange={e => field.onChange(e.target.valueAsNumber)}
                          min={min}
                          max={max}
                          className="w-full pr-8"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          {unit}
                        </span>
                      </div>
                      <Button type="submit" size="sm" className="shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          
          {type === 'city' && (
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionnez une ville" />
                          </SelectTrigger>
                          <SelectContent>
                            {CITIES_DATA.map((city) => (
                              <SelectItem key={city.name} value={city.name}>
                                {city.name} ({city.departement})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" size="sm" className="shrink-0" disabled={!field.value}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
