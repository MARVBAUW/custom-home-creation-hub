
import React from 'react';
import { FileText, Video, Eye, ArrowDownToLine } from 'lucide-react';
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
            {selectedDocument.type === 'video' ? (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
                <Video className="h-12 w-12 opacity-70" />
                <span className="ml-2 text-lg">Prévisualisation de la vidéo</span>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                <FileText className="h-16 w-16 text-gray-300" />
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Type:</span>
              <span className="font-medium">
                {selectedDocument.type === 'pdf' ? 'Document PDF' : 
                  selectedDocument.type === 'video' ? 'Vidéo' : 'Texte'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Taille:</span>
              <span className="font-medium">{selectedDocument.fileSize || selectedDocument.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Mise à jour:</span>
              <span className="font-medium">{selectedDocument.lastUpdated}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Catégorie:</span>
              <span className="font-medium">
                {guideCategories.find(c => c.id === selectedDocument.categoryId)?.name}
              </span>
            </div>
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
