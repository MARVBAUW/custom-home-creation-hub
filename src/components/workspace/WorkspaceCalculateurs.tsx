
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calculator, Thermometer, Ruler, Scale, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Calculator data
const calculators = [
  {
    id: 'calc-1',
    title: 'Calculateur de surface habitable',
    description: 'Calculez rapidement la surface habitable d\'un logement selon les normes en vigueur.',
    category: 'Dimension',
    icon: <Ruler className="h-6 w-6" />,
    url: '/workspace/calculateurs/surface',
    complexity: 'simple'
  },
  {
    id: 'calc-2',
    title: 'Estimateur de coût de construction',
    description: 'Obtenez une estimation du coût de construction de votre projet en fonction de sa typologie et superficie.',
    category: 'Budget',
    icon: <Calculator className="h-6 w-6" />,
    url: '/estimation',
    complexity: 'avancé'
  },
  {
    id: 'calc-3',
    title: 'Calculateur de bilan thermique',
    description: 'Évaluez les déperditions thermiques d\'un bâtiment et identifiez les améliorations possibles.',
    category: 'Thermique',
    icon: <Thermometer className="h-6 w-6" />,
    url: '/workspace/calculateurs/bilan-thermique',
    complexity: 'avancé'
  },
  {
    id: 'calc-4',
    title: 'Convertisseur d\'unités de construction',
    description: 'Convertissez facilement entre différentes unités utilisées dans la construction.',
    category: 'Outils',
    icon: <Scale className="h-6 w-6" />,
    url: '/workspace/calculateurs/convertisseur',
    complexity: 'simple'
  },
  {
    id: 'calc-5',
    title: 'Planificateur de chantier',
    description: 'Estimez la durée des différentes phases de votre chantier et créez un planning prévisionnel.',
    category: 'Planification',
    icon: <Clock className="h-6 w-6" />,
    url: '/workspace/calculateurs/planning',
    complexity: 'avancé'
  },
  {
    id: 'calc-6',
    title: 'Calculateur de matériaux',
    description: 'Estimez les quantités de matériaux nécessaires pour votre projet (béton, brique, etc.).',
    category: 'Matériaux',
    icon: <Calculator className="h-6 w-6" />,
    url: '/workspace/calculateurs/materiaux',
    complexity: 'intermédiaire'
  }
];

// Categories for filtering
const categories = ['Tous', 'Dimension', 'Budget', 'Thermique', 'Outils', 'Planification', 'Matériaux'];

const WorkspaceCalculateurs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Tous');
  
  const filteredCalculators = calculators.filter(calc => {
    const matchesSearch = calc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          calc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'Tous' || calc.category === activeTab;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Calculateurs et outils</h1>
        <p className="text-gray-600">Utilisez nos outils en ligne pour simplifier vos calculs et estimations.</p>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Rechercher un outil..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 sm:grid-cols-7">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="text-xs sm:text-sm px-2">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {/* Calculators grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCalculators.map((calc) => (
          <Card key={calc.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center mb-4">
                <div className="p-3 rounded-md bg-khaki-50">
                  {calc.icon}
                </div>
                <span className={`
                  ${calc.complexity === 'simple' ? 'bg-green-100 text-green-800' : 
                    calc.complexity === 'intermédiaire' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'}
                  text-xs px-2 py-1 rounded-full
                `}>
                  {calc.complexity.charAt(0).toUpperCase() + calc.complexity.slice(1)}
                </span>
              </div>
              <CardTitle className="text-lg">{calc.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600 dark:text-gray-300 text-sm">{calc.description}</p>
            </CardContent>
            <CardFooter>
              <Link to={calc.url} className="w-full">
                <Button variant="outline" className="w-full justify-between group">
                  <span>Accéder à l'outil</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredCalculators.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-gray-500">Aucun calculateur ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default WorkspaceCalculateurs;
