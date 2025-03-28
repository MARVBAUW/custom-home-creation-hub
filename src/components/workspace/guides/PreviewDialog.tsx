
import React from 'react';
import { FileText, ArrowDownToLine } from 'lucide-react';
import { GuideDocument } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PreviewDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDocument: GuideDocument | null;
  handleDownload: (url: string, title: string) => void;
}

export const PreviewDialog: React.FC<PreviewDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedDocument,
  handleDownload
}) => {
  if (!selectedDocument) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {selectedDocument.type === 'pdf' ? (
              <FileText className="h-5 w-5 mr-2" />
            ) : selectedDocument.type === 'video' ? (
              <FileText className="h-5 w-5 mr-2" />
            ) : (
              <FileText className="h-5 w-5 mr-2" />
            )}
            <span>{selectedDocument.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="prose prose-sm max-w-none mt-4">
          {selectedDocument.content ? (
            <div dangerouslySetInnerHTML={{ 
              __html: selectedDocument.content
                .replace(/\n\n/g, '<br /><br />')
                .replace(/\n/g, '<br />')
                .replace(/# (.*)/g, '<h1>$1</h1>')
                .replace(/## (.*)/g, '<h2>$1</h2>')
                .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*)\*/g, '<em>$1</em>')
                .replace(/- (.*)/g, '<li>$1</li>') 
            }} />
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aperçu non disponible pour ce document</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <span className="text-sm text-gray-500">
            Mis à jour le {selectedDocument.lastUpdated}
          </span>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Fermer
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
