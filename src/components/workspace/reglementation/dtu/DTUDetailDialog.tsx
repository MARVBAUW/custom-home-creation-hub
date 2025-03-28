
import React from 'react';
import { Book, ListCheck, Info, AlertTriangle, HelpCircle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { DTU } from './types';

interface DTUDetailDialogProps {
  dtu: DTU | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DTUDetailDialog: React.FC<DTUDetailDialogProps> = ({ 
  dtu, 
  isOpen, 
  onOpenChange 
}) => {
  if (!dtu) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-sm text-khaki-600 mb-1">
            <Book className="h-4 w-4" />
            <span>{dtu.category}</span>
            <span className="text-gray-400">•</span>
            <span>Mise à jour: {dtu.lastUpdate}</span>
          </div>
          <DialogTitle className="text-2xl">{dtu.title}</DialogTitle>
          <DialogDescription className="text-base">{dtu.description}</DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          {/* Règles empiriques */}
          <div>
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <ListCheck className="h-5 w-5 mr-2 text-khaki-600" />
              Règles empiriques essentielles
            </h3>
            <div className="space-y-4">
              {dtu.rules.map((rule, idx) => {
                let Icon = Info;
                let bgColor = "bg-blue-50";
                let textColor = "text-blue-800";
                
                if (rule.type === 'warning') {
                  Icon = AlertTriangle;
                  bgColor = "bg-amber-50";
                  textColor = "text-amber-800";
                } else if (rule.type === 'tip') {
                  Icon = HelpCircle;
                  bgColor = "bg-green-50";
                  textColor = "text-green-800";
                }
                
                return (
                  <div key={idx} className={`p-3 rounded-md ${bgColor} flex`}>
                    <Icon className={`h-5 w-5 ${textColor} mt-0.5 mr-3 flex-shrink-0`} />
                    <div>
                      <h4 className={`font-medium ${textColor}`}>{rule.title}</h4>
                      <p className="mt-1 text-gray-700">{rule.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Sections détaillées */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Informations détaillées</h3>
            <div className="space-y-4">
              {dtu.sections.map((section, idx) => (
                <div key={idx} className="pb-4 border-b border-gray-100 last:border-0">
                  <h4 className="font-medium text-khaki-800 mb-2">{section.title}</h4>
                  <p className="text-gray-700">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
