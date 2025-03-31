
import React, { useState } from 'react';
import { DTUSchema } from './types';
import { Card, CardContent } from "@/components/ui/card";
import { ImageOff, ZoomIn, Download, ExternalLink, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface DTUSchemasProps {
  schemas: DTUSchema[];
}

export const DTUSchemas: React.FC<DTUSchemasProps> = ({ schemas }) => {
  const [selectedSchema, setSelectedSchema] = useState<DTUSchema | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  
  if (!schemas || schemas.length === 0) return null;

  const handleOpenImage = (schema: DTUSchema) => {
    if (schema.imageUrl && !imageError[schema.id]) {
      setSelectedSchema(schema);
      setZoomLevel(1); // Reset zoom level when opening a new image
    } else {
      toast.error("Image non disponible", {
        description: "L'image de ce schéma n'est pas disponible actuellement."
      });
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3)); // Max zoom 3x
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5)); // Min zoom 0.5x
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

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

  const handleImageError = (schemaId: string) => {
    setImageError(prev => ({
      ...prev,
      [schemaId]: true
    }));
  };

  // Placeholder image URL (ensure this exists in your public folder)
  const placeholderImageUrl = '/placeholder-image.jpg';

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Schémas techniques</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemas.map((schema) => (
          <Card key={schema.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-4">
                <h4 className="font-medium mb-1">{schema.title}</h4>
                <div 
                  className={`relative aspect-video bg-gray-100 overflow-hidden mb-2 ${!imageError[schema.id] && schema.imageUrl ? 'cursor-pointer group' : ''}`}
                  onClick={() => !imageError[schema.id] && schema.imageUrl && handleOpenImage(schema)}
                >
                  {schema.imageUrl && !imageError[schema.id] ? (
                    <>
                      <img 
                        src={schema.imageUrl} 
                        alt={schema.title}
                        className="w-full h-full object-contain transition-transform group-hover:scale-105"
                        onError={() => handleImageError(schema.id)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <ZoomIn className="text-white h-8 w-8" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <ImageOff className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Image non disponible</p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">{schema.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Image Zoom Dialog with enhanced controls */}
      <Dialog 
        open={!!selectedSchema} 
        onOpenChange={(open) => !open && setSelectedSchema(null)}
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
                    handleImageError(selectedSchema.id);
                    setSelectedSchema(null);
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
                        onClick={handleZoomIn}
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
                        onClick={handleZoomOut}
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
                        onClick={handleZoomReset}
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
    </div>
  );
};
