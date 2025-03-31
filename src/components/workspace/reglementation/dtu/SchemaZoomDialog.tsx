
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ZoomIn, Download, ExternalLink, Info } from 'lucide-react';
import { DTUSchema } from './types';
import { toast } from "sonner";

interface SchemaZoomDialogProps {
  selectedSchema: DTUSchema | null;
  isOpen: boolean;
  onClose: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onImageError: (schemaId: string) => void;
}

export const SchemaZoomDialog: React.FC<SchemaZoomDialogProps> = ({
  selectedSchema,
  isOpen,
  onClose,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onImageError
}) => {
  const handleDownload = () => {
    if (selectedSchema?.imageUrl) {
      try {
        const link = document.createElement('a');
        link.href = selectedSchema.imageUrl;
        link.download = `schema-${selectedSchema.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success("Téléchargement démarré", {
          description: "Le schéma est en cours de téléchargement."
        });
      } catch (error) {
        toast.error("Erreur de téléchargement", {
          description: "Impossible de télécharger l'image."
        });
      }
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden">
        <DialogDescription className="sr-only">
          Visualisation du schéma {selectedSchema?.title}
        </DialogDescription>
        {selectedSchema?.imageUrl && (
          <div className="relative w-full h-full bg-black">
            {/* Image container with zoom */}
            <div className="relative w-full max-h-[75vh] overflow-auto flex items-center justify-center bg-black">
              <img 
                src={selectedSchema.imageUrl} 
                alt={selectedSchema.title}
                className="max-w-none object-contain transition-transform"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center',
                }}
                onError={() => {
                  onImageError(selectedSchema.id);
                  onClose();
                  toast.error("Erreur de chargement", {
                    description: "Impossible de charger l'image du schéma."
                  });
                }}
              />
            </div>
            
            {/* Zoom controls */}
            <div className="absolute top-2 right-2 flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white"
                      onClick={onZoomIn}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom +</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white"
                      onClick={onZoomOut}
                    >
                      <ZoomIn className="h-4 w-4 rotate-180" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom -</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white"
                      onClick={onZoomReset}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Réinitialiser</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Télécharger</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* Schema info */}
            <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white p-3 rounded">
              <div className="flex items-start">
                <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <DialogTitle className="text-lg font-medium mb-1">{selectedSchema.title}</DialogTitle>
                  <p className="text-sm text-gray-300">{selectedSchema.description}</p>
                </div>
              </div>
            </div>
            
            {/* Zoom level indicator */}
            <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
