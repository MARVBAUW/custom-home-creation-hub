
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { DTU } from './types';
import DTUSchemas from './DTUSchemas';
import { highlightSearchTerm } from './searchUtils';

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
        return <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />;
      case 'tip':
        return <Lightbulb className="h-4 w-4 text-blue-500 flex-shrink-0" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="mb-2 bg-gray-100">
              {dtu.category}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {dtu.lastUpdate}
            </div>
          </div>
          <DialogTitle className="text-xl">{dtu.title}</DialogTitle>
          <p className="text-gray-600 mt-2">
            {highlightSearchTerm(dtu.description, searchTerm)}
          </p>
        </DialogHeader>

        <Separator className="my-4" />

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Règles principales</h3>
            <ul className="space-y-4">
              {dtu.rules.map((rule, index) => (
                <li key={index} className={`p-4 rounded-md ${
                  rule.type === 'warning' ? 'bg-amber-50' : 
                  rule.type === 'tip' ? 'bg-blue-50' : 
                  rule.type === 'alert' ? 'bg-red-50' : 'bg-green-50'
                }`}>
                  <div className="flex gap-3">
                    {getRuleIcon(rule.type)}
                    <div>
                      <h4 className="font-medium">{highlightSearchTerm(rule.title, searchTerm)}</h4>
                      <p className="text-sm mt-1">{highlightSearchTerm(rule.content, searchTerm)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {dtu.sections && dtu.sections.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Détails additionnels</h3>
              {dtu.sections.map((section, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium mb-2">{highlightSearchTerm(section.title, searchTerm)}</h4>
                  <p className="text-sm text-gray-700">{highlightSearchTerm(section.content, searchTerm)}</p>
                </div>
              ))}
            </div>
          )}
          
          {dtu.schemas && <DTUSchemas schemas={dtu.schemas} searchTerm={searchTerm} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
