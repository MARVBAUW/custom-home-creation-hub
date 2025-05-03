
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Info, Book, Image } from "lucide-react";
import { DTU } from './types';
import { Highlighter } from './Highlighter';

interface DTUDetailDialogProps {
  dtu: DTU | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchTerm?: string;
}

export const DTUDetailDialog: React.FC<DTUDetailDialogProps> = ({
  dtu,
  isOpen,
  onOpenChange,
  searchTerm = ''
}) => {
  if (!dtu) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline" className="text-sm">{dtu.category}</Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Dernière mise à jour: {dtu.lastUpdate}</span>
            </div>
          </div>
          
          <DialogTitle className="text-xl">
            <Highlighter text={dtu.title} highlight={searchTerm} />
          </DialogTitle>
          
          <DialogDescription className="text-base mt-2">
            <Highlighter text={dtu.description} highlight={searchTerm} />
          </DialogDescription>
        </DialogHeader>
        
        <Separator className="my-4" />
        
        <Tabs defaultValue="rules">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>Règles essentielles</span>
            </TabsTrigger>
            <TabsTrigger value="sections" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Sections</span>
            </TabsTrigger>
            <TabsTrigger value="schemas" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>Schémas</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules" className="pt-4 space-y-4">
            {dtu.rules.map((rule, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  rule.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                  rule.type === 'alert' ? 'bg-red-50 border-red-200' :
                  rule.type === 'tip' ? 'bg-green-50 border-green-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <h3 className="font-medium mb-1">
                  <Highlighter text={rule.title} highlight={searchTerm} />
                </h3>
                <p className="text-sm">
                  <Highlighter text={rule.content} highlight={searchTerm} />
                </p>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="sections" className="pt-4">
            {dtu.sections && dtu.sections.length > 0 ? (
              <div className="space-y-6">
                {dtu.sections.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-medium">
                      <Highlighter text={section.title} highlight={searchTerm} />
                    </h3>
                    <p className="text-gray-600">
                      <Highlighter text={section.content} highlight={searchTerm} />
                    </p>
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border border-dashed rounded-md">
                <p className="text-gray-500">Aucune section détaillée disponible pour ce DTU.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="schemas" className="pt-4">
            {dtu.schemas && dtu.schemas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dtu.schemas.map((schema) => (
                  <div key={schema.id} className="border rounded-lg overflow-hidden">
                    <img 
                      src={schema.imageUrl} 
                      alt={schema.title} 
                      className="w-full h-auto" 
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h4 className="font-medium mb-1">{schema.title}</h4>
                      <p className="text-sm text-gray-600">{schema.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border border-dashed rounded-md">
                <p className="text-gray-500">Aucun schéma disponible pour ce DTU.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
