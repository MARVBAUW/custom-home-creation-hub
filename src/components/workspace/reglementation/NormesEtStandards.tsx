
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from 'lucide-react';

// Data for norms and standards
const normsData = [
  {
    id: 'nf-en-1992',
    title: 'NF EN 1992 - Eurocode 2',
    category: 'Structure',
    description: 'Calcul des structures en béton',
    link: 'https://www.afnor.org/norme/nf-en-1992/',
    lastUpdate: '2022-03-15'
  },
  {
    id: 'nf-en-1991',
    title: 'NF EN 1991 - Eurocode 1',
    category: 'Structure',
    description: 'Actions sur les structures',
    link: 'https://www.afnor.org/norme/nf-en-1991/',
    lastUpdate: '2021-11-03'
  },
  {
    id: 're-2020',
    title: 'RE 2020',
    category: 'Thermique',
    description: 'Réglementation environnementale des bâtiments neufs',
    link: 'https://www.ecologie.gouv.fr/re2020',
    lastUpdate: '2022-01-01'
  },
  {
    id: 'nf-p-01-012',
    title: 'NF P 01-012',
    category: 'Sécurité',
    description: 'Garde-corps - Dimensions et essais',
    link: 'https://www.afnor.org/norme/nf-p-01-012/',
    lastUpdate: '2020-07-22'
  },
  {
    id: 'nf-c-15-100',
    title: 'NF C 15-100',
    category: 'Électricité',
    description: 'Installations électriques à basse tension',
    link: 'https://www.afnor.org/norme/nf-c-15-100/',
    lastUpdate: '2021-06-18'
  },
  {
    id: 'nf-en-206',
    title: 'NF EN 206',
    category: 'Matériaux',
    description: 'Béton - Spécification, performances, production et conformité',
    link: 'https://www.afnor.org/norme/nf-en-206/',
    lastUpdate: '2021-09-30'
  },
  {
    id: 'nf-dtu-25-41',
    title: 'NF DTU 25.41',
    category: 'Construction',
    description: 'Ouvrages en plaques de plâtre',
    link: 'https://www.afnor.org/norme/nf-dtu-25-41/',
    lastUpdate: '2020-12-10'
  },
  {
    id: 'nf-en-13829',
    title: 'NF EN 13829',
    category: 'Thermique',
    description: 'Test d\'infiltrométrie',
    link: 'https://www.afnor.org/norme/nf-en-13829/',
    lastUpdate: '2021-02-15'
  }
];

// Categories for filtering
const categories = ['Tous', 'Structure', 'Thermique', 'Sécurité', 'Électricité', 'Matériaux', 'Construction'];

const NormesEtStandards: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('Tous');
  
  const filteredNorms = normsData.filter(norm => {
    const matchesSearch = norm.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        norm.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'Tous' || norm.category === activeTab;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Rechercher une norme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="Tous" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 sm:grid-cols-7">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="text-xs px-2">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNorms.map((norm) => (
          <Card key={norm.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{norm.title}</CardTitle>
                <Badge variant="outline">{norm.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{norm.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                <span>Mise à jour: {norm.lastUpdate}</span>
                <a 
                  href={norm.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-khaki-600 hover:text-khaki-800 hover:underline"
                >
                  Voir la norme
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredNorms.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-gray-500">Aucune norme ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default NormesEtStandards;
