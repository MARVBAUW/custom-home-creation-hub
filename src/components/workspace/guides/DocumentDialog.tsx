
import React from 'react';
import { FileText, Video, Eye, ArrowDownToLine, Calendar } from 'lucide-react';
import { GuideDocument } from './types';
import { guideCategories } from './guidesData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DocumentDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDocument: GuideDocument | null;
  handleDownload: (url: string, title: string) => void;
  handlePreview: (document: GuideDocument) => void;
}

export const DocumentDialog: React.FC<DocumentDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedDocument,
  handleDownload,
  handlePreview
}) => {
  if (!selectedDocument) return null;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Date non disponible";
    }
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getDocumentTypeLabel = (type: string): string => {
    switch (type) {
      case 'pdf': return 'Document PDF';
      case 'video': return 'Vidéo';
      case 'text': return 'Texte';
      default: return 'Document';
    }
  };

  const getDocumentIcon = () => {
    switch (selectedDocument.type) {
      case 'video': return <Video className="h-16 w-16 text-gray-300" />;
      case 'text': 
      case 'pdf':
      default: return <FileText className="h-16 w-16 text-gray-300" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{selectedDocument.title}</DialogTitle>
          <DialogDescription>
            {selectedDocument.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              {getDocumentIcon()}
            </div>
          </div>
          
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Type:</span>
              <span className="font-medium">
                {getDocumentTypeLabel(selectedDocument.type)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Taille:</span>
              <span className="font-medium">{selectedDocument.fileSize || selectedDocument.duration || 'Non spécifiée'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Mise à jour:</span>
              <span className="font-medium">{formatDate(selectedDocument.lastUpdated)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Catégorie:</span>
              <span className="font-medium">
                {guideCategories.find(c => c.id === selectedDocument.categoryId)?.name || 'Non catégorisé'}
              </span>
            </div>
            {selectedDocument.isNew && (
              <div className="flex justify-between">
                <span className="text-gray-500">Statut:</span>
                <span className="font-medium text-khaki-600">Nouveau</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Fermer
            </Button>
            <Button
              onClick={() => handlePreview(selectedDocument)}
              className="bg-khaki-500 hover:bg-khaki-600 text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              Consulter
            </Button>
            <Button
              onClick={() => handleDownload(selectedDocument.url, selectedDocument.title)}
              className="bg-khaki-500 hover:bg-khaki-600 text-white"
            >
              <ArrowDownToLine className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
