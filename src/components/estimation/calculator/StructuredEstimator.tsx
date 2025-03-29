
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, ArrowRight, Calculator, PlusCircle, CheckCircle2, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { corpsEtatQuestions } from './data/corpsEtatQuestions';
import { calculateDetailedEstimation } from './calculations/detailedEstimation';
import { FormData } from './types';

// Définition des corps d'état
const corpsEtatList = [
  { id: "gros_oeuvre", label: "Gros Œuvre", icon: <PlusCircle className="h-4 w-4" /> },
  { id: "charpente_toiture", label: "Charpente & Toiture", icon: <PlusCircle className="h-4 w-4" /> },
  { id: "facade_isolation", label: "Façade & Isolation", icon: <PlusCircle className="h-4 w-4" /> },
  { id: "menuiseries", label: "Menuiseries", icon: <PlusCircle className="h-4 w-4" /> },
  { id: "electricite", label: "Électricité", icon: <PlusCircle className="h-4 w-4" /> },
  { id: "plomberie_chauffage", label: "Plomberie & Chauffage", icon: <PlusCircle className="h-4 w-4" /> },
  { id: "cloisons_platrerie", label: "Cloisons & Plâtrerie", icon: <PlusCircle className="h-4 w-4" /> },
  { id: "revetements", label: "Revêtements", icon: <PlusCircle className="h-4 w-4" /> },
  { id: "cuisine_sdb", label: "Cuisine & SDB", icon: <PlusCircle className="h-4 w-4" /> },
  { id: "amenagements_exterieurs", label: "Aménagements Extérieurs", icon: <PlusCircle className="h-4 w-4" /> },
];

// Composant principal d'estimation structurée
const StructuredEstimator: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [estimationResult, setEstimationResult] = useState<any>(null);
  const [activeCorpsEtat, setActiveCorpsEtat] = useState("gros_oeuvre");
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Gérer les changements de réponses
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Marquer une section comme complétée
  const markSectionCompleted = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
    }
  };

  // Passer à la section suivante
  const goToNextSection = () => {
    const currentIndex = corpsEtatList.findIndex(ce => ce.id === activeCorpsEtat);
    if (currentIndex < corpsEtatList.length - 1) {
      markSectionCompleted(activeCorpsEtat);
      setActiveCorpsEtat(corpsEtatList[currentIndex + 1].id);
    } else {
      // Toutes les sections sont complétées
      calculateEstimation();
    }
  };

  // Calculer l'estimation
  const calculateEstimation = () => {
    // Mettre à jour le formData avec les réponses
    const updatedFormData = { ...formData, ...answers };
    setFormData(updatedFormData);
    
    // Calculer l'estimation détaillée
    const result = calculateDetailedEstimation(updatedFormData);
    setEstimationResult(result);
    
    toast({
      title: "Estimation calculée",
      description: `Votre projet est estimé à environ ${Math.round(result.totalTTC).toLocaleString('fr-FR')} €`,
      duration: 5000,
    });
  };

  // Rendu des questions pour le corps d'état actif
  const renderQuestions = () => {
    const questions = corpsEtatQuestions[activeCorpsEtat] || [];
    
    return questions.map(question => (
      <div key={question.id} className="mb-6">
        <Label className="text-base font-medium mb-2">{question.question}</Label>
        {question.helpText && (
          <p className="text-sm text-gray-500 mb-2">{question.helpText}</p>
        )}
        
        <RadioGroup 
          value={answers[question.id] || ""} 
          onValueChange={(value) => handleAnswerChange(question.id, value)}
          className="mt-2"
        >
          {question.options && question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`${question.id}-${index}`} />
              <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    ));
  };

  // Vérifier si toutes les questions de la section actuelle sont répondues
  const isCurrentSectionComplete = () => {
    const questions = corpsEtatQuestions[activeCorpsEtat] || [];
    return questions.every(q => answers[q.id]);
  };

  // Progression globale en pourcentage
  const calculateProgress = () => {
    const totalQuestions = Object.values(corpsEtatQuestions).reduce(
      (sum, questions) => sum + questions.length, 0
    );
    const answeredQuestions = Object.keys(answers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  // Afficher le résultat de l'estimation
  const renderEstimationResult = () => {
    if (!estimationResult) return null;
    
    return (
      <div className="space-y-4">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-green-800">Estimation de votre projet</h3>
            <div className="text-2xl font-bold text-green-700">
              {Math.round(estimationResult.totalTTC).toLocaleString('fr-FR')} €
            </div>
          </div>
          <p className="text-sm text-green-600">Cette estimation est basée sur vos réponses au questionnaire.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="breakdown">
            <AccordionTrigger>Détail par corps d'état</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {estimationResult.corpsEtat && Object.entries(estimationResult.corpsEtat).map(([name, data]: [string, any]) => (
                  <div key={name} className="flex justify-between border-b pb-2">
                    <span>{name}</span>
                    <span className="font-medium">{Math.round(data.montantHT).toLocaleString('fr-FR')} € HT</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 font-bold">
                  <span>Total HT</span>
                  <span>{Math.round(estimationResult.totalHT).toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>TVA ({Math.round(estimationResult.vat * 100)}%)</span>
                  <span>{Math.round(estimationResult.totalTTC - estimationResult.totalHT).toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold text-green-700">
                  <span>Total TTC</span>
                  <span>{Math.round(estimationResult.totalTTC).toLocaleString('fr-FR')} €</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="details">
            <AccordionTrigger>Frais annexes</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span>Honoraires de maîtrise d'œuvre</span>
                  <span className="font-medium">{Math.round(estimationResult.honorairesHT).toLocaleString('fr-FR')} € HT</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Études géotechniques</span>
                  <span className="font-medium">{Math.round(estimationResult.etudesGeotechniques).toLocaleString('fr-FR')} € HT</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Étude thermique</span>
                  <span className="font-medium">{Math.round(estimationResult.etudeThermique).toLocaleString('fr-FR')} € HT</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Garantie décennale</span>
                  <span className="font-medium">{Math.round(estimationResult.garantieDecennale).toLocaleString('fr-FR')} € HT</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Taxe d'aménagement</span>
                  <span className="font-medium">{Math.round(estimationResult.taxeAmenagement).toLocaleString('fr-FR')} €</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="total">
            <AccordionTrigger>Coût global du projet</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span>Coût des travaux TTC</span>
                  <span className="font-medium">{Math.round(estimationResult.totalTTC).toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Frais annexes TTC</span>
                  <span className="font-medium">
                    {Math.round(estimationResult.coutGlobalTTC - estimationResult.totalTTC).toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold text-green-700">
                  <span>Coût global TTC</span>
                  <span>{Math.round(estimationResult.coutGlobalTTC).toLocaleString('fr-FR')} €</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Button className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Télécharger le devis détaillé
          </Button>
          <Button variant="outline" className="flex items-center gap-1" onClick={() => {
            toast({
              title: "Demande envoyée",
              description: "Un expert vous contactera prochainement pour affiner votre projet",
            });
          }}>
            <InfoIcon className="h-4 w-4" />
            Contacter un expert
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-lg border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Estimation de travaux détaillée</CardTitle>
            <CardDescription>
              Répondez aux questions pour chaque corps d'état pour obtenir une estimation précise
            </CardDescription>
          </div>
          {calculateProgress() > 0 && (
            <Badge variant="outline" className="px-2 py-1">
              <span className="mr-1">Progression:</span>
              <span className="font-medium">{calculateProgress()}%</span>
            </Badge>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {estimationResult ? (
          renderEstimationResult()
        ) : (
          <Tabs value={activeCorpsEtat} onValueChange={setActiveCorpsEtat} className="w-full">
            <TabsList className="flex flex-nowrap overflow-x-auto pb-2 mb-4 w-full">
              {corpsEtatList.map((corpsEtat) => (
                <TabsTrigger 
                  key={corpsEtat.id} 
                  value={corpsEtat.id}
                  className="whitespace-nowrap flex items-center gap-1"
                >
                  {corpsEtat.icon}
                  {corpsEtat.label}
                  {completedSections.includes(corpsEtat.id) && (
                    <CheckCircle2 className="h-3 w-3 text-green-500 ml-1" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {corpsEtatList.map((corpsEtat) => (
              <TabsContent key={corpsEtat.id} value={corpsEtat.id} className="m-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{corpsEtat.label}</h3>
                  {renderQuestions()}
                  
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={goToNextSection} 
                      disabled={!isCurrentSectionComplete()}
                      className="flex items-center gap-1"
                    >
                      {corpsEtatList.findIndex(ce => ce.id === activeCorpsEtat) === corpsEtatList.length - 1 ? (
                        <>
                          <Calculator className="h-4 w-4" />
                          Calculer l'estimation
                        </>
                      ) : (
                        <>
                          Section suivante
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
      
      <CardFooter className="bg-gray-50 border-t p-4 text-sm text-center text-gray-500">
        Cette estimation est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts.
      </CardFooter>
    </Card>
  );
};

export default StructuredEstimator;
