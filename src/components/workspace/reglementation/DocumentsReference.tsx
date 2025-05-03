
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Document reference data
const documents = [
  {
    id: 'doc-1',
    title: 'Guide complet des DTU du bâtiment',
    description: 'Recueil des principaux Documents Techniques Unifiés pour le secteur du bâtiment',
    type: 'pdf',
    category: 'technique',
    url: '/resources/documents/liste-dtu-batiment.pdf',
    size: '950 KB',
    landingPage: '/workspace/resources/documents/liste-dtu-batiment',
    isExternal: false
  },
  {
    id: 'doc-2',
    title: 'Texte intégral de la réglementation du bâtiment',
    description: 'Compilation officielle des textes réglementaires applicables aux constructions',
    type: 'pdf',
    category: 'réglementation',
    url: '/resources/documents/texte-integral-reglementation.pdf',
    size: '2.1 MB',
    landingPage: '/workspace/resources/documents/texte-integral-reglementation',
    isExternal: false
  },
  {
    id: 'doc-3',
    title: 'Guide de la réglementation environnementale RE2020',
    description: 'Guide d\'application détaillé de la nouvelle réglementation environnementale',
    type: 'pdf',
    category: 'environnement',
    url: 'https://www.ecologie.gouv.fr/sites/default/files/guide_re2020.pdf',
    size: '3.4 MB',
    landingPage: null,
    isExternal: true
  },
  {
    id: 'doc-4',
    title: 'Réglementation incendie - Guide pratique',
    description: 'Guide complet pour comprendre et appliquer les normes de sécurité incendie',
    type: 'pdf',
    category: 'sécurité',
    url: 'https://www.sitesecurite.com/contenu/erp/guide_erp.pdf',
    size: '1.8 MB',
    landingPage: null,
    isExternal: true
  },
  {
    id: 'doc-5',
    title: 'Guide accessibilité des bâtiments',
    description: 'Normes et règles pour garantir l\'accessibilité des constructions aux personnes à mobilité réduite',
    type: 'pdf',
    category: 'accessibilité',
    url: 'https://www.ecologie.gouv.fr/sites/default/files/guide_accessibilite_batiments.pdf',
    size: '2.3 MB',
    landingPage: null,
    isExternal: true
  },
  {
    id: 'doc-6',
    title: 'Memento des coefficients thermiques des matériaux',
    description: 'Valeurs de référence pour les calculs thermiques et énergétiques',
    type: 'pdf',
    category: 'thermique',
    url: '/resources/documents/coefficients-thermiques.pdf',
    size: '780 KB',
    landingPage: null,
    isExternal: false
  }
];

// Categories for filtering
const categories = ['tous', 'technique', 'réglementation', 'environnement', 'sécurité', 'accessibilité', 'thermique'];

const DocumentsReference: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('tous');
  
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'tous' || doc.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Rechercher un document..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'tous' ? 'Toutes les catégories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="flex flex-col h-full">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-khaki-50 rounded-md">
                  <FileText className="h-8 w-8 text-khaki-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">{doc.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{doc.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Format: {doc.type.toUpperCase()}</span>
                    <span>Taille: {doc.size}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-2 border-t mt-auto">
              {doc.landingPage ? (
                <Link to={doc.landingPage} className="text-sm text-gray-600 hover:text-khaki-700">
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}
              
              <a 
                href={doc.url} 
                target={doc.isExternal ? "_blank" : "_self"}
                rel={doc.isExternal ? "noopener noreferrer" : ""}
                className="inline-flex"
              >
                <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700">
                  <Download className="h-4 w-4 mr-1" />
                  Télécharger
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredDocs.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-gray-500">Aucun document ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default DocumentsReference;
