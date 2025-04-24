
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Building,
  Scale,
  PiggyBank,
  Ruler,
  Thermometer,
  Volume2,
  Flame,
  Search
} from 'lucide-react';

interface CalculatorInfo {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  icon: React.ReactNode;
}

const calculators: CalculatorInfo[] = [
  // Immobilier
  {
    id: 'surface-habitable',
    title: 'Surface habitable',
    description: 'Calculer la surface habitable d\'un logement ainsi que la SHON/SHOB',
    category: 'Immobilier',
    path: '/workspace/calculateurs?tab=immobilier',
    icon: <Building className="h-5 w-5" />
  },
  {
    id: 'frais-notaire',
    title: 'Frais de notaire',
    description: 'Calculer les frais de notaire pour un achat immobilier',
    category: 'Immobilier',
    path: '/workspace/calculateurs?tab=immobilier',
    icon: <Building className="h-5 w-5" />
  },
  
  // Financier
  {
    id: 'capacite-emprunt',
    title: 'Capacité d\'emprunt',
    description: 'Calculer votre capacité d\'emprunt selon vos revenus',
    category: 'Financier',
    path: '/workspace/calculateurs?tab=financier',
    icon: <PiggyBank className="h-5 w-5" />
  },
  {
    id: 'rentabilite-locative',
    title: 'Rentabilité locative',
    description: 'Calculer la rentabilité d\'un investissement immobilier locatif',
    category: 'Financier',
    path: '/workspace/calculateurs?tab=financier',
    icon: <PiggyBank className="h-5 w-5" />
  },
  
  // Technique
  {
    id: 'eurocodes',
    title: 'Eurocodes',
    description: 'Outils de calcul pour la conception de structures selon les Eurocodes',
    category: 'Technique',
    path: '/workspace/calculateurs?tab=technique',
    icon: <Ruler className="h-5 w-5" />
  },
  
  // Réglementaire
  {
    id: 'accessibilite',
    title: 'Accessibilité',
    description: 'Vérification de la conformité à la réglementation accessibilité',
    category: 'Réglementaire',
    path: '/workspace/calculateurs?tab=reglementaire',
    icon: <Scale className="h-5 w-5" />
  },
  {
    id: 'classe-erp',
    title: 'Classification ERP',
    description: 'Déterminez la classification d\'un Établissement Recevant du Public',
    category: 'Réglementaire',
    path: '/workspace/calculateurs?tab=reglementaire',
    icon: <Scale className="h-5 w-5" />
  },
  
  // Spécialités
  {
    id: 'dpe',
    title: 'DPE prévisionnel',
    description: 'Estimation du Diagnostic de Performance Énergétique',
    category: 'Thermique',
    path: '/workspace/calculateurs?tab=thermique',
    icon: <Thermometer className="h-5 w-5" />
  },
  {
    id: 'acoustique',
    title: 'Isolation acoustique',
    description: 'Calculs d\'isolation acoustique pour les bâtiments',
    category: 'Acoustique',
    path: '/workspace/calculateurs?tab=acoustique',
    icon: <Volume2 className="h-5 w-5" />
  },
  {
    id: 'securite-incendie',
    title: 'Sécurité incendie',
    description: 'Vérification des exigences de sécurité incendie',
    category: 'Sécurité',
    path: '/workspace/calculateurs?tab=incendie',
    icon: <Flame className="h-5 w-5" />
  }
];

const CalculatorDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCalculators = searchQuery 
    ? calculators.filter(calc => 
        calc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : calculators;
    
  const categories = [...new Set(calculators.map(calc => calc.category))];

  const navigateToCalculator = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Rechercher un calculateur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-8">
        {searchQuery ? (
          <div>
            <h3 className="text-lg font-medium mb-4">Résultats de recherche</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCalculators.map((calc) => (
                <Card key={calc.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {calc.icon}
                        <CardTitle className="text-base">{calc.title}</CardTitle>
                      </div>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                        {calc.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {calc.description}
                    </CardDescription>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigateToCalculator(calc.path)}
                    >
                      <Calculator className="h-3.5 w-3.5 mr-2" />
                      Accéder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category}>
              <h3 className="text-lg font-medium mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {calculators
                  .filter(calc => calc.category === category)
                  .map((calc) => (
                    <Card key={calc.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          {calc.icon}
                          <CardTitle className="text-base">{calc.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          {calc.description}
                        </CardDescription>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => navigateToCalculator(calc.path)}
                        >
                          <Calculator className="h-3.5 w-3.5 mr-2" />
                          Accéder
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalculatorDirectory;
