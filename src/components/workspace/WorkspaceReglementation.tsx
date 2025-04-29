
import React, { useState } from 'react';
import { Search, FileText, Download } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WorkspaceFileViewer from './fileViewer/WorkspaceFileViewer';

interface RegulationDocument {
  id: string;
  title: string;
  description: string;
  filename: string;
  type: string;
  category: string;
  lastUpdate: string;
  url: string;
  isNew?: boolean;
}

const WorkspaceReglementation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<RegulationDocument | null>(null);

  // Liste des documents de réglementation
  const regulationDocuments: RegulationDocument[] = [
    {
      id: 'norme-parasismique',
      title: 'Guide des normes parasismiques',
      description: 'Guide complet sur les normes parasismiques pour la construction en France',
      filename: 'Normes parasismiques en construction.pdf',
      type: 'pdf',
      category: 'Réglementation technique',
      lastUpdate: '2023-09-15',
      url: '/resources/guides/normes-parasismiques.pdf',
      isNew: true
    },
    {
      id: 'liste-dtu',
      title: 'Liste des DTUs du bâtiment',
      description: 'Liste complète des Documents Techniques Unifiés (DTU) pour le bâtiment',
      filename: 'Liste DTU batiment.pdf',
      type: 'pdf',
      category: 'Normes et DTU',
      lastUpdate: '2023-06-08',
      url: '/resources/documents/liste-dtu-batiment.pdf'
    },
    {
      id: 'texte-reglementation',
      title: 'Texte intégral de la réglementation du bâtiment',
      description: 'Texte officiel de la réglementation en vigueur pour le bâtiment',
      filename: 'Texte réglementation bâtiment.pdf',
      type: 'pdf',
      category: 'Textes officiels',
      lastUpdate: '2023-05-10',
      url: '/resources/documents/texte-integral-reglementation.pdf'
    },
    {
      id: 'guide-renovation-energetique',
      title: 'Guide de la rénovation énergétique RE2020',
      description: 'Guide pratique pour la rénovation énergétique selon la RE2020',
      filename: 'Guide rénovation énergétique.pdf',
      type: 'pdf',
      category: 'Énergie',
      lastUpdate: '2023-07-22',
      url: '/resources/guides/guide-renovation-energetique.pdf'
    }
  ];

  const filteredDocuments = regulationDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDocumentClick = (document: RegulationDocument) => {
    setSelectedFile(document);
    setViewerOpen(true);
  };

  const handleFileClose = () => {
    setViewerOpen(false);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium mb-2">Réglementation et normes</h2>
        <p className="text-gray-600 mb-6">
          Consultez la réglementation technique du bâtiment, les DTUs et les normes en vigueur.
        </p>
        
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Rechercher un document..."
            className="pl-9 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((document) => (
            <Card 
              key={document.id} 
              className="hover:shadow-md transition-shadow cursor-pointer" 
              onClick={() => handleDocumentClick(document)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="bg-stone-100 p-2 rounded">
                    <FileText className="h-6 w-6 text-khaki-600" />
                  </div>
                  {document.isNew && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                      Nouveau
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-medium text-lg mt-4 mb-2">{document.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{document.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Mis à jour: {document.lastUpdate}</span>
                  <span className="bg-stone-100 py-1 px-2 rounded">{document.category}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(document.url, '_blank');
                  }}
                >
                  <Download className="h-4 w-4" />
                  Télécharger
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun document ne correspond à votre recherche.</p>
          </div>
        )}
      </div>

      {/* Viewer for PDF documents */}
      <WorkspaceFileViewer
        file={selectedFile}
        isOpen={viewerOpen}
        onClose={handleFileClose}
      />
    </div>
  );
};

export default WorkspaceReglementation;
