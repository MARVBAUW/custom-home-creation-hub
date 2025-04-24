import React, { useState } from 'react';
import { ArrowLeft, Download, Eye, FileText, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ResourceSEOHead from './ResourceSEOHead';
import { formatFileSize, checkFileExists } from '@/utils/resourceUtils';
import { handleFileDownload, previewFile } from '@/utils/downloadUtils';
import { Link } from 'react-router-dom';

interface ResourceLandingPageProps {
  resource: {
    title: string;
    description: string;
    fileUrl: string;
    fileType: string;
    fileSize?: number;
    category?: string;
    keywords?: string[];
    datePublished?: string;
    previewAvailable?: boolean;
    relatedResources?: Array<{
      title: string;
      url: string;
      description?: string;
    }>;
  };
}

const ResourceLandingPage: React.FC<ResourceLandingPageProps> = ({
  resource
}) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileExists, setFileExists] = useState(true);

  React.useEffect(() => {
    // Check if the file actually exists
    const verifyFile = async () => {
      const exists = await checkFileExists(resource.fileUrl);
      setFileExists(exists);
    };
    
    verifyFile();
  }, [resource.fileUrl]);

  const handleDownload = async () => {
    if (!fileExists) {
      toast({
        title: "Fichier temporairement indisponible",
        description: "Ce document sera disponible prochainement. Veuillez réessayer plus tard.",
        duration: 3000
      });
      return;
    }
    
    setIsDownloading(true);
    
    const success = await handleFileDownload(resource.fileUrl, resource.title);
    
    if (success) {
      toast({
        title: "Téléchargement réussi",
        description: `Le document "${resource.title}" a été téléchargé avec succès.`,
        duration: 3000
      });
    } else {
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue lors du téléchargement. Veuillez réessayer.",
        variant: 'destructive',
        duration: 3000
      });
    }
    
    setIsDownloading(false);
  };

  const handlePreview = () => {
    if (!fileExists) {
      toast({
        title: "Aperçu indisponible",
        description: "Ce document n'est pas disponible pour un aperçu pour le moment.",
        duration: 3000
      });
      return;
    }
    
    previewFile(resource.fileUrl);
  };

  return (
    <>
      <ResourceSEOHead
        title={resource.title}
        description={resource.description}
        fileType={resource.fileType}
        fileUrl={resource.fileUrl}
        keywords={resource.keywords?.join(', ') || ''}
        datePublished={resource.datePublished}
        category={resource.category}
      />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link to="/workspace" className="flex items-center text-khaki-600 hover:text-khaki-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Retour à l'espace ressources</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {resource.title}
          </h1>
          
          <p className="text-lg text-gray-700 mb-6">
            {resource.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center text-sm text-gray-600">
              <FileText className="h-4 w-4 mr-2" />
              <span>Type: {resource.fileType.toUpperCase()}</span>
            </div>
            
            {resource.fileSize && (
              <div className="flex items-center text-sm text-gray-600">
                <span>Taille: {formatFileSize(resource.fileSize)}</span>
              </div>
            )}
            
            {resource.datePublished && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Publié le: {new Date(resource.datePublished).toLocaleDateString('fr-FR')}</span>
              </div>
            )}
            
            {resource.category && (
              <div className="flex items-center text-sm text-gray-600">
                <Tag className="h-4 w-4 mr-2" />
                <span>Catégorie: {resource.category}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              onClick={handleDownload} 
              className="bg-khaki-600 hover:bg-khaki-700 text-white"
              disabled={isDownloading || !fileExists}
            >
              <Download className="h-5 w-5 mr-2" />
              {isDownloading ? 'Téléchargement...' : 'Télécharger le document'}
            </Button>
            
            {resource.previewAvailable && (
              <Button 
                onClick={handlePreview} 
                variant="outline"
                disabled={!fileExists}
              >
                <Eye className="h-5 w-5 mr-2" />
                Aperçu du document
              </Button>
            )}
          </div>
          
          {/* Resource details */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">À propos de ce document</h2>
            <p className="text-gray-700 mb-6">
              Ce document fait partie de la sélection de ressources professionnelles proposées par Progineer pour
              accompagner les professionnels du bâtiment et de la construction dans leurs projets. Il regroupe
              des informations essentielles sur les réglementations et normes en vigueur.
            </p>
            
            {resource.keywords && resource.keywords.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Mots-clés</h3>
                <div className="flex flex-wrap gap-2">
                  {resource.keywords.map((keyword, i) => (
                    <span 
                      key={i}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Related resources */}
          {resource.relatedResources && resource.relatedResources.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Documents associés</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resource.relatedResources.map((related, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{related.title}</h3>
                      {related.description && (
                        <p className="text-sm text-gray-600 mb-3">{related.description}</p>
                      )}
                      <Link 
                        to={related.url}
                        className="text-khaki-600 hover:text-khaki-800 text-sm flex items-center"
                      >
                        <span>Voir le document</span>
                        <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResourceLandingPage;
