
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, Building, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BaseFormProps } from '../types/formTypes';

const ResultsForm: React.FC<BaseFormProps> = ({ 
  formData, 
  goToPreviousStep, 
  animationDirection,
  isLoading,
  estimationResult,
  categoriesAmounts
}) => {
  // Créer des catégories fictives pour la démo si aucune n'est fournie
  const displayCategories = categoriesAmounts || [
    { category: 'Gros oeuvre', amount: 120000 },
    { category: 'Second oeuvre', amount: 80000 },
    { category: 'Électricité', amount: 25000 },
    { category: 'Plomberie', amount: 25000 },
    { category: 'Menuiseries', amount: 35000 },
    { category: 'Isolation', amount: 30000 },
    { category: 'Finitions', amount: 40000 },
    { category: 'Frais annexes', amount: 20000 }
  ];
  
  // Calculer le montant total à partir des catégories
  const totalAmount = displayCategories.reduce((sum, item) => sum + item.amount, 0);
  
  // Formater les nombres en euros
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-progineer-gold"></div>
      </div>
    );
  }
  
  const displayAmount = typeof estimationResult === 'number' 
    ? estimationResult 
    : estimationResult?.totalAmount || totalAmount;

  return (
    <div className={`transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
    }`}>
      <Card className="bg-white shadow-md">
        <CardHeader className="bg-gray-50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            Estimation de votre projet
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Récapitulatif du projet */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <List className="mr-2 text-blue-600" />
              Récapitulatif du projet
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start">
                <div className="mr-2 mt-1 text-blue-600">
                  <Building size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Type de projet</p>
                  <p className="text-sm">{formData.projectType === 'construction' ? 'Construction neuve' : 
                     formData.projectType === 'renovation' ? 'Rénovation' : 
                     formData.projectType === 'extension' ? 'Extension' : 'Non spécifié'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-1 text-blue-600">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Type de client</p>
                  <p className="text-sm">{formData.clientType === 'individual' ? 'Particulier' : 
                     formData.clientType === 'professional' ? 'Professionnel' : 'Non spécifié'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-1 text-blue-600">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Surface</p>
                  <p className="text-sm">{formData.surface ? `${formData.surface} m²` : 'Non spécifiée'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-1 text-blue-600">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Localisation</p>
                  <p className="text-sm">{formData.city || 'Non spécifiée'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Montant total estimé */}
          <div className="mb-6 text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium">Montant total estimé</h3>
            <p className="text-3xl font-bold text-progineer-gold">
              {formatCurrency(displayAmount)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              * Cette estimation est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts.
            </p>
          </div>
          
          {/* Détail des coûts par catégorie */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Détail par corps d'état</h3>
            <div className="space-y-2">
              {displayCategories.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b">
                  <span className="font-medium">{item.category}</span>
                  <span>{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Boutons d'action */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={goToPreviousStep} variant="outline">
              Modifier l'estimation
            </Button>
            <Button className="bg-progineer-gold hover:bg-progineer-gold/90">
              Télécharger le PDF
            </Button>
            <Button>
              Prendre rendez-vous
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsForm;
