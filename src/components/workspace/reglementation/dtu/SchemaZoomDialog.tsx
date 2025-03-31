
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { DTUSchema } from './types';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface SchemaZoomDialogProps {
  schema: DTUSchema;
  isOpen: boolean;
  onClose: () => void;
}

const SchemaZoomDialog: React.FC<SchemaZoomDialogProps> = ({ schema, isOpen, onClose }) => {
  // Function to download image
  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = schema.imageUrl;
    link.download = `schema-${schema.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>{schema.title}</DialogTitle>
          <DialogDescription>{schema.description}</DialogDescription>
        </DialogHeader>
        
        <div className="my-4 flex justify-center">
          <img 
            src={schema.imageUrl} 
            alt={schema.title} 
            className="max-h-[70vh] max-w-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/schema-placeholder.png';
            }}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            <X className="h-4 w-4 mr-2" />
            Fermer
          </Button>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchemaZoomDialog;
