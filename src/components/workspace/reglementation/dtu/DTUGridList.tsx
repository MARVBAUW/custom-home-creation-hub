
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, ArrowRight } from "lucide-react";
import { DTU } from './types';
import { Highlighter } from './Highlighter';

interface DTUGridListProps {
  dtus: DTU[];
  onViewDetails: (dtu: DTU) => void;
  onSelectDTU?: (dtu: DTU, selected: boolean) => void;
  selectionMode?: boolean;
  searchTerm?: string;
}

export const DTUGridList: React.FC<DTUGridListProps> = ({
  dtus,
  onViewDetails,
  onSelectDTU,
  selectionMode = false,
  searchTerm = ''
}) => {
  if (dtus.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-500">Aucun DTU ne correspond à votre recherche.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {dtus.map((dtu) => (
        <Card 
          key={dtu.id} 
          className={`hover:shadow-md transition-shadow border ${dtu.selected ? 'border-khaki-500 bg-khaki-50/30' : 'border-gray-200'}`}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <Badge variant="outline">{dtu.category}</Badge>
              {selectionMode && (
                <Checkbox
                  checked={dtu.selected || false}
                  onCheckedChange={(checked) => onSelectDTU && onSelectDTU(dtu, !!checked)}
                  aria-label={`Sélectionner ${dtu.title}`}
                />
              )}
            </div>
            
            <h3 className="text-lg font-medium mb-2">
              <Highlighter text={dtu.title} highlight={searchTerm} />
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              <Highlighter text={dtu.description} highlight={searchTerm} />
            </p>
            
            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Màj: {dtu.lastUpdate}</span>
              </div>
              
              <Button 
                variant="ghost"
                size="sm"
                className="text-khaki-600 hover:text-khaki-700"
                onClick={() => onViewDetails(dtu)}
              >
                Détails <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
