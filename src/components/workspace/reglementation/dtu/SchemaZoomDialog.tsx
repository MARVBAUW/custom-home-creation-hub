
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Download } from 'lucide-react';
import { DTUSchema } from './types';

interface SchemaZoomDialogProps {
  schema: DTUSchema | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SchemaZoomDialog: React.FC<SchemaZoomDialogProps> = ({ 
  schema, 
  isOpen, 
  onOpenChange 
}) => {
  if (!schema) return null;

  const handleDownload = () => {
    // Create a link to download the image
    const link = document.createElement('a');
    link.href = schema.imageUrl;
    link.download = `schema-${schema.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{schema.title}</DialogTitle>
        </DialogHeader>
        
        <div className="my-4">
          <AspectRatio ratio={16/9} className="bg-gray-50 rounded-md border">
            <img 
              src={schema.imageUrl} 
              alt={schema.title}
              className="w-full h-full object-contain p-2"
            />
          </AspectRatio>
        </div>
        
        <p className="text-gray-600 my-4">{schema.description}</p>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Télécharger
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SchemaZoomDialog;
