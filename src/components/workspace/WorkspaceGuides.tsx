
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowRight, FileText, Download, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// Guide data
const guides = [
  {
    id: 'guide-1',
    title: 'Guide de la rénovation énergétique RE2020',
    description: 'Guide pratique pour comprendre et appliquer les principes de la réglementation environnementale 2020 dans vos projets de rénovation.',
    category: 'Énergie',
    image: '/lovable-uploads/2443b8c7-2cec-45ef-becc-407fb5078cf6.jpg',
    url: '/resources/guides/guide-renovation-energetique.pdf',
    landingPage: '/workspace/resources/guides/guide-renovation-energetique',
    featured: true
  },
  {
    id: 'guide-2',
    title: 'Normes parasismiques en PACA',
    description: 'Comprenez les spécificités des normes parasismiques applicables en région Provence-Alpes-Côte d\'Azur et leur mise en œuvre dans vos projets.',
    category: 'Structure',
    image: '/lovable-uploads/732fa99d-df25-4869-9ca9-b49ccf6f51a4.png',
    url: '/resources/guides/normes-parasismiques.pdf',
    landingPage: '/workspace/resources/guides/normes-parasismiques',
    featured: false
  },
  {
    id: 'guide-3',
    title: 'Guide des matériaux biosourcés',
    description: 'Découvrez les propriétés, avantages et applications des matériaux biosourcés dans la construction contemporaine.',
    category: 'Matériaux',
    image: '/lovable-uploads/3f77f084-4061-4e36-9f32-85cb08372b51.png',
    url: '/resources/guides/materiaux-biosources.pdf',
    landingPage: null,
    featured: true
  },
  {
    id: 'guide-4',
    title: 'Optimisation acoustique des bâtiments',
    description: 'Techniques et solutions pour améliorer le confort acoustique dans les constructions neuves et rénovations.',
    category: 'Acoustique',
    image: null,
    url: '/resources/guides/optimisation-acoustique.pdf',
    landingPage: null,
    featured: false
  },
  {
    id: 'guide-5',
    title: 'Réglementation complète du bâtiment',
    description: 'Guide exhaustif couvrant l\'ensemble des réglementations applicables aux projets de construction et rénovation en France.',
    category: 'Réglementation',
    image: null,
    url: '/resources/guides/reglementation-complete-batiment.pdf',
    landingPage: null,
    featured: false
  },
  {
    id: 'guide-6',
    title: 'Aménagement paysager durable',
    description: 'Principes et bonnes pratiques pour l\'aménagement extérieur écologique et durable en région méditerranéenne.',
    category: 'Paysage',
    image: '/lovable-uploads/e43a5d5c-afde-4564-96ae-58128955dcf7.png',
    url: '/resources/guides/amenagement-paysager-durable.pdf',
    landingPage: null,
    featured: false
  }
];

// Categories for filtering
const categories = ['Tous', 'Énergie', 'Structure', 'Matériaux', 'Acoustique', 'Réglementation', 'Paysage'];

const WorkspaceGuides: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Tous');
  
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'Tous' || guide.category === activeTab;
    return matchesSearch && matchesCategory;
  });
  
  const featuredGuides = guides.filter(guide => guide.featured);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Guides techniques</h1>
        <p className="text-gray-600">Consultez notre collection de guides pratiques pour vos projets de construction et rénovation.</p>
      </div>
      
      {/* Featured guides section */}
      {searchTerm === '' && activeTab === 'Tous' && (
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Guides recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Card key={guide.id} className="flex flex-col h-full overflow-hidden">
                {guide.image && (
                  <div className="w-full h-40 overflow-hidden">
                    <img 
                      src={guide.image} 
                      alt={guide.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <Badge>{guide.category}</Badge>
                    <Badge variant="outline">Recommandé</Badge>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{guide.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  {guide.landingPage ? (
                    <Link to={guide.landingPage}>
                      <Button variant="ghost" size="sm" className="text-khaki-600 hover:text-khaki-800">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Détails
                      </Button>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  <a href={guide.url} className="inline-flex" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Rechercher un guide..."
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
      
      {/* All guides list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <Badge>{guide.category}</Badge>
                {guide.featured && <Badge variant="outline">Recommandé</Badge>}
              </div>
              <CardTitle className="text-lg">{guide.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600 dark:text-gray-300 text-sm">{guide.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              {guide.landingPage ? (
                <Link to={guide.landingPage}>
                  <Button variant="ghost" size="sm" className="text-khaki-600 hover:text-khaki-800">
                    <FileText className="h-4 w-4 mr-2" />
                    Voir les détails
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}
              <a href={guide.url} className="inline-flex">
                <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredGuides.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-gray-500">Aucun guide ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default WorkspaceGuides;
