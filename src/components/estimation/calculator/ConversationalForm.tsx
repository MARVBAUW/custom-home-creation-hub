
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
  Edit
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import { FormData } from './types';
import { useEstimationSteps } from './hooks/useEstimationSteps';

// Types pour les messages
type MessageType = 'bot' | 'user' | 'system';
type InputType = 'text' | 'number' | 'select' | 'multiChoice' | 'yesNo' | 'surface';

// Prix unitaires et facteurs pour le calcul (à adapter selon vos ratios)
const PRICE_FACTORS = {
  construction: {
    base: 1500, // Prix au m²
    premium: 1.3, // Multiplicateur pour finition premium
    standard: 1,
    basic: 0.8,
    terrainPlat: 1,
    terrainPente: 1.2,
  },
  renovation: {
    base: 800,
    complete: 1.2,
    partial: 0.8,
    surface: 1 // Prix au m²
  }
};

// Schéma pour la validation
const inputSchema = z.object({
  text: z.string().optional(),
  number: z.number().optional(),
  choice: z.string().optional(),
  choices: z.array(z.string()).optional(),
  yesNo: z.boolean().optional(),
  surface: z.number().optional(),
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
  };
}

const ConversationalForm: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [isTyping, setIsTyping] = useState(false);
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { totalSteps } = useEstimationSteps(formData);

  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      text: '',
      number: undefined,
      choice: undefined,
      choices: [],
      yesNo: undefined,
      surface: undefined,
    },
  });

  // Conversation flow logic
  const conversationFlow = [
    {
      step: 1,
      message: "Bonjour ! Je suis votre assistant d'estimation de projet. Quel type de projet souhaitez-vous estimer ?",
      input: {
        type: 'select' as InputType,
        options: ['Construction neuve', 'Rénovation'],
        key: 'projectType',
      }
    },
    {
      step: 2,
      message: "Super ! Quelle est la surface approximative de votre projet en m² ?",
      input: {
        type: 'surface' as InputType,
        key: 'surface',
        min: 10,
        max: 1000,
        unit: 'm²',
      }
    },
    {
      step: 3,
      message: "Quel niveau de finition recherchez-vous ?",
      input: {
        type: 'select' as InputType,
        options: ['Premium', 'Standard', 'Basique'],
        key: 'finishLevel',
      },
      condition: (data: FormData) => data.projectType === 'Construction neuve',
    },
    {
      step: 3,
      message: "S'agit-il d'une rénovation complète ou partielle ?",
      input: {
        type: 'select' as InputType,
        options: ['Complète', 'Partielle'],
        key: 'renovationType',
      },
      condition: (data: FormData) => data.projectType === 'Rénovation',
    },
    {
      step: 4,
      message: "Votre terrain est-il plat ou en pente ?",
      input: {
        type: 'select' as InputType,
        options: ['Plat', 'En pente'],
        key: 'terrainType',
      },
      condition: (data: FormData) => data.projectType === 'Construction neuve',
    },
    {
      step: 4,
      message: "Quelles parties de votre logement souhaitez-vous rénover ?",
      input: {
        type: 'multiChoice' as InputType,
        options: ['Cuisine', 'Salle de bain', 'Salon', 'Chambre(s)', 'Électricité', 'Plomberie'],
        key: 'renovationAreas',
      },
      condition: (data: FormData) => data.projectType === 'Rénovation',
    },
    {
      step: 5,
      message: "Avez-vous besoin d'un permis de construire ?",
      input: {
        type: 'yesNo' as InputType,
        key: 'needsPermit',
      }
    },
    {
      step: 6,
      message: "Quand souhaitez-vous commencer les travaux ?",
      input: {
        type: 'select' as InputType,
        options: ['Dans le mois', 'Dans 3 mois', 'Dans 6 mois', 'Dans plus de 6 mois'],
        key: 'startDate',
      }
    }
  ];

  // Initialiser la conversation
  useEffect(() => {
    if (messages.length === 0) {
      const welcome: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: "👋 Bienvenue sur notre outil d'estimation de projet ! Je vais vous poser quelques questions pour vous donner une estimation de prix approximative.",
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
      if (!nextStepFound && currentStepIndex === conversationFlow.length - 1) {
        finalizeEstimation();
      }
    }
  };

  // Calculer l'estimation
  const calculateEstimation = (): number => {
    let basePrice = 0;
    const surface = formData.surface as number || 0;
    
    if (formData.projectType === 'Construction neuve') {
      // Prix de base pour la construction
      basePrice = surface * PRICE_FACTORS.construction.base;
      
      // Ajustement pour le niveau de finition
      if (formData.finishLevel === 'Premium') {
        basePrice *= PRICE_FACTORS.construction.premium;
      } else if (formData.finishLevel === 'Basique') {
        basePrice *= PRICE_FACTORS.construction.basic;
      }
      
      // Ajustement pour le type de terrain
      if (formData.terrainType === 'En pente') {
        basePrice *= PRICE_FACTORS.construction.terrainPente;
      }
    } else {
      // Prix de base pour la rénovation
      basePrice = surface * PRICE_FACTORS.renovation.base;
      
      // Ajustement pour le type de rénovation
      if (formData.renovationType === 'Complète') {
        basePrice *= PRICE_FACTORS.renovation.complete;
      } else {
        basePrice *= PRICE_FACTORS.renovation.partial;
      }
      
      // Ajustement selon les zones à rénover
      const areas = formData.renovationAreas as string[] || [];
      basePrice *= (1 + (areas.length * 0.1));
    }
    
    // Ajustement pour le permis de construire
    if (formData.needsPermit) {
      basePrice += 3000; // Frais estimés pour un permis
    }
    
    return Math.round(basePrice);
  };

  // Finaliser l'estimation
  const finalizeEstimation = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      const estimation = calculateEstimation();
      setEstimationResult(estimation);
      
      const formattedEstimation = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(estimation);
      
      const resultMessage: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: `D'après les informations que vous avez fournies, l'estimation du coût de votre projet est d'environ ${formattedEstimation}. Cette estimation est indicative et peut varier en fonction des spécificités de votre projet. Souhaitez-vous être contacté par un de nos experts pour une estimation plus précise ?`,
        timestamp: new Date(),
        input: {
          type: 'yesNo',
          key: 'requestContact',
        },
      };
      
      setMessages(prev => [...prev, resultMessage]);
      setIsTyping(false);
    }, 2000);
  };

  // Gérer le contact utilisateur
  const handleContactRequest = (value: boolean) => {
    setIsComplete(true);
    
    if (value) {
      addUserMessage("Oui, je souhaite être contacté(e)", true, "requestContact");
      
      addBotMessage("Merci ! Pour que nous puissions vous contacter, merci de nous laisser votre email ou numéro de téléphone :", {
        type: 'text',
        key: 'contactInfo',
        required: true,
      });
    } else {
      addUserMessage("Non merci, pas maintenant", false, "requestContact");
      
      addBotMessage("Merci d'avoir utilisé notre outil d'estimation ! N'hésitez pas à nous contacter si vous avez d'autres questions.", undefined);
      
      toast({
        title: "Estimation terminée",
        description: "Vous pouvez refaire une estimation à tout moment.",
      });
    }
  };

  // Gérer les informations de contact
  const handleContactInfo = (info: string) => {
    addUserMessage(info, info, "contactInfo");
    
    addBotMessage("Merci ! Un expert vous contactera prochainement pour discuter de votre projet. À bientôt !", undefined);
    
    toast({
      title: "Demande envoyée",
      description: "Un expert vous contactera bientôt.",
    });
  };

  // Gérer la soumission du formulaire
  const onSubmit = (values: z.infer<typeof inputSchema>) => {
    const lastMessage = messages[messages.length - 1];
    
    if (!lastMessage.input) return;
    
    const { type, key, options } = lastMessage.input;
    
    switch (type) {
      case 'text':
        if (values.text) {
          if (key === 'contactInfo') {
            handleContactInfo(values.text);
          } else {
            addUserMessage(values.text, values.text, key);
          }
          form.reset({ text: '' });
        }
        break;
        
      case 'number':
        if (values.number !== undefined) {
          addUserMessage(`${values.number}`, values.number, key);
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
          if (key === 'requestContact') {
            handleContactRequest(values.yesNo);
          } else {
            addUserMessage(values.yesNo ? 'Oui' : 'Non', values.yesNo, key);
          }
          form.reset({ yesNo: undefined });
        }
        break;
    }
  };

  // Rendu du formulaire d'entrée approprié
  const renderInputForm = () => {
    const lastMessage = messages[messages.length - 1];
    
    if (!lastMessage || !lastMessage.input || lastMessage.type !== 'bot') {
      return null;
    }
    
    const { type, options, key, required, min, max, unit } = lastMessage.input;
    
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {type === 'text' && (
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Votre réponse..."
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
          
          {type === 'select' && options && (
            <div className="space-y-2">
              <div className="grid grid-cols-1 gap-2">
                {options.map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.setValue('choice', option);
                      form.handleSubmit(onSubmit)();
                    }}
                    className="justify-start text-left font-normal hover:bg-blue-50"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 text-blue-500" />
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {type === 'multiChoice' && options && (
            <div className="space-y-2">
              <div className="grid grid-cols-1 gap-2">
                {options.map((option) => {
                  const isSelected = form.watch('choices')?.includes(option);
                  
                  return (
                    <Button
                      key={option}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => {
                        const currentChoices = form.watch('choices') || [];
                        
                        if (isSelected) {
                          form.setValue('choices', currentChoices.filter(c => c !== option));
                        } else {
                          form.setValue('choices', [...currentChoices, option]);
                        }
                      }}
                      className="justify-start text-left font-normal"
                    >
                      {isSelected ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4 text-blue-500" />
                      )}
                      {option}
                    </Button>
                  );
                })}
              </div>
              
              {form.watch('choices')?.length > 0 && (
                <Button 
                  type="submit" 
                  className="w-full mt-2"
                >
                  Valider ma sélection
                </Button>
              )}
            </div>
          )}
          
          {type === 'yesNo' && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 hover:bg-green-50 hover:border-green-200"
                onClick={() => {
                  form.setValue('yesNo', true);
                  form.handleSubmit(onSubmit)();
                }}
              >
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Oui
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="flex-1 hover:bg-red-50 hover:border-red-200"
                onClick={() => {
                  form.setValue('yesNo', false);
                  form.handleSubmit(onSubmit)();
                }}
              >
                <Minus className="mr-2 h-4 w-4 text-red-500" />
                Non
              </Button>
            </div>
          )}
        </form>
      </Form>
    );
  };

  // Redémarrer le formulaire
  const handleRestart = () => {
    setMessages([]);
    setFormData({});
    setEstimationResult(null);
    setIsComplete(false);
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh]">
      <div className="bg-gray-50 p-4 border-b rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <Calculator className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="font-medium">Estimation de projet</h3>
        </div>
        
        {estimationResult && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Estimation: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(estimationResult)}
          </Badge>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                {message.type === 'bot' && (
                  <div className="shrink-0 mr-2">
                    <Avatar className="h-8 w-8 bg-blue-600">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </Avatar>
                  </div>
                )}
                
                <Card className={`${
                  message.type === 'bot' 
                    ? 'bg-white border-gray-200' 
                    : 'bg-blue-600 text-white border-blue-600'
                }`}>
                  <CardContent className="p-3">
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </CardContent>
                </Card>
                
                {message.type === 'user' && (
                  <div className="shrink-0 ml-2">
                    <Avatar className="h-8 w-8 bg-gray-200">
                      <div className="text-sm font-medium text-gray-700">
                        {/* Initiales de l'utilisateur */}
                        U
                      </div>
                    </Avatar>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-start">
              <div className="shrink-0 mr-2">
                <Avatar className="h-8 w-8 bg-blue-600">
                  <MessageSquare className="h-4 w-4 text-white" />
                </Avatar>
              </div>
              
              <Card className="bg-white border-gray-200">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <span className="animate-bounce">•</span>
                    <span className="animate-bounce delay-100">•</span>
                    <span className="animate-bounce delay-200">•</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-white rounded-b-lg">
        {!isComplete && renderInputForm()}
        
        {isComplete && (
          <Button 
            onClick={handleRestart} 
            variant="outline" 
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Faire une nouvelle estimation
          </Button>
        )}
        
        {estimationResult && !isComplete && (
          <div className="mt-2 text-xs text-center text-gray-500">
            * Cette estimation est fournie à titre indicatif et pourrait varier selon les spécificités de votre projet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationalForm;
