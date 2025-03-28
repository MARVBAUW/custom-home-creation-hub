
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { DTU } from './types';

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

  const getRuleIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'tip':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">
              {dtu.category}
            </Badge>
            <span className="text-sm text-gray-500">Mise à jour: {dtu.lastUpdate}</span>
          </div>
          <DialogTitle className="text-xl">{dtu.title}</DialogTitle>
          <DialogDescription>
            {dtu.description}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="regles" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="regles">Règles principales</TabsTrigger>
            <TabsTrigger value="sections">Sections détaillées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regles" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4 p-1">
                {dtu.rules.map((rule, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${
                      rule.type === 'warning' 
                        ? 'bg-amber-50 border-amber-200' 
                        : rule.type === 'tip' 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getRuleIcon(rule.type)}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{rule.title}</h3>
                        <p className="text-sm">{rule.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="sections" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[60vh]">
              <div className="space-y-6 p-1">
                {dtu.sections.map((section, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h3 className="font-medium text-lg mb-2">{section.title}</h3>
                    <p className="text-sm">{section.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
