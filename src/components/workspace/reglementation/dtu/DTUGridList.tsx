
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { DTU } from './types';
import { highlightSearchTerm } from './searchUtils';
import { Checkbox } from "@/components/ui/checkbox";

interface DTUGridListProps {
  dtus: DTU[];
  onViewDetails: (dtu: DTU) => void;
  onSelectDTU?: (dtu: DTU, selected: boolean) => void;
  searchTerm?: string;
  selectionMode?: boolean;
}

export const DTUGridList: React.FC<DTUGridListProps> = ({
  dtus,
  onViewDetails,
  onSelectDTU,
  searchTerm = '',
  selectionMode = false
}) => {
  if (dtus.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">Aucun DTU ne correspond à votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {dtus.map((dtu) => (
        <Card key={dtu.id} className="overflow-hidden transition-shadow hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="bg-gray-100 mb-2">
                {dtu.category}
              </Badge>
              
              {selectionMode && onSelectDTU && (
                <Checkbox 
                  checked={dtu.selected} 
                  onCheckedChange={(checked) => onSelectDTU(dtu, !!checked)}
                  className="h-5 w-5"
                />
              )}
            </div>
            <CardTitle className="text-lg">
              {highlightSearchTerm(dtu.title, searchTerm)}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {highlightSearchTerm(dtu.description, searchTerm)}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2">
              {dtu.rules.slice(0, 2).map((rule, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  {rule.type === 'warning' ? (
                    <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠️</span>
                  ) : rule.type === 'tip' ? (
                    <span className="text-blue-500 flex-shrink-0 mt-0.5">💡</span>
                  ) : rule.type === 'alert' ? (
                    <span className="text-red-500 flex-shrink-0 mt-0.5">🚨</span>
                  ) : (
                    <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                  )}
                  <span>
                    <strong>{highlightSearchTerm(rule.title, searchTerm)}</strong>
                  </span>
                </li>
              ))}
              {dtu.rules.length > 2 && (
                <li className="text-sm text-gray-500">
                  + {dtu.rules.length - 2} autres règles
                </li>
              )}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between items-center pt-2 pb-4">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {dtu.lastUpdate}
            </div>
            <Button variant="ghost" size="sm" onClick={() => onViewDetails(dtu)} className="gap-1">
              Détails
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
