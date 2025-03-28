
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GuideDocument } from './types';
import { Button } from "@/components/ui/button";

interface PreviewDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDocument: GuideDocument | null;
  handleDownload: (url: string, title: string) => void;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedDocument,
  handleDownload
}) => {
  if (!selectedDocument) return null;

  const renderContent = () => {
    switch (selectedDocument.type) {
      case 'pdf':
        return (
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <iframe 
              src={selectedDocument.url} 
              className="w-full h-[70vh] rounded border border-gray-200"
              title={selectedDocument.title}
            >
              Votre navigateur ne prend pas en charge l'affichage des PDF. 
              <a href={selectedDocument.url} target="_blank" rel="noopener noreferrer">
                Cliquez ici pour télécharger le document.
              </a>
            </iframe>
          </div>
        );
      case 'video':
        return (
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="aspect-video bg-black rounded overflow-hidden">
              <iframe 
                src={selectedDocument.url.replace('watch?v=', 'embed/')} 
                className="w-full h-full" 
                title={selectedDocument.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="prose prose-khaki max-w-none px-2 py-4 prose-headings:text-khaki-800 prose-a:text-khaki-600">
            {selectedDocument.content ? (
              <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(selectedDocument.content) }} />
            ) : (
              <p className="text-center text-gray-500">Contenu non disponible</p>
            )}
          </div>
        );
      default:
        return (
          <div className="text-center p-6">
            <p>Aperçu non disponible pour ce type de document.</p>
          </div>
        );
    }
  };

  // Simple markdown to HTML converter
  const convertMarkdownToHtml = (markdown: string): string => {
    let html = markdown
      // Headers
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      // Line breaks
      .replace(/\n/g, '<br/>');
    
    // Wrap lists in <ul>
    html = html.replace(/<li>.*?<\/li>/g, match => {
      return '<ul>' + match + '</ul>';
    });
    
    return html;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="pr-10">{selectedDocument.title}</DialogTitle>
          <Button 
            onClick={() => setIsOpen(false)} 
            className="absolute right-4 top-4 p-2 h-8 w-8 rounded-full"
            variant="ghost"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </Button>
        </DialogHeader>
        
        <div className="mt-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
