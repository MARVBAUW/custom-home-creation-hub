
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye } from 'lucide-react';
import { DTU } from './types';
import { Checkbox } from "@/components/ui/checkbox";

interface DTUCardProps {
  dtu: DTU;
  onViewDetails: (dtu: DTU) => void;
  onSelect?: (dtu: DTU, selected: boolean) => void;
  searchTerm?: string;
  selectionMode?: boolean;
}

export const DTUCard: React.FC<DTUCardProps> = ({ 
  dtu, 
  onViewDetails, 
  onSelect,
  searchTerm = '',
  selectionMode = false
}) => {
  const handleViewDetails = () => {
    onViewDetails(dtu);
  };

  const handleSelectChange = (checked: boolean) => {
    if (onSelect) {
      onSelect(dtu, checked);
    }
  };

  return (
    <Card className="h-full flex flex-col relative">
      {selectionMode && onSelect && (
        <div className="absolute top-2 left-2 z-10">
          <Checkbox 
            checked={dtu.selected} 
            onCheckedChange={handleSelectChange}
            aria-label={`Sélectionner ${dtu.title}`}
          />
        </div>
      )}
      <CardHeader className={selectionMode ? "pl-10" : ""}>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2 bg-gray-100">
            {dtu.category}
          </Badge>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {dtu.lastUpdate}
          </div>
        </div>
        <CardTitle className="text-xl">{dtu.title}</CardTitle>
        <CardDescription>
          {dtu.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Points clés:</h4>
          <ul className="text-sm list-disc pl-5 space-y-1">
            {dtu.rules.slice(0, 2).map((rule, index) => (
              <li key={index} className={rule.type === 'warning' ? 'text-amber-600' : ''}>
                {rule.title}
              </li>
            ))}
            {dtu.rules.length > 2 && (
              <li className="text-gray-500">+ {dtu.rules.length - 2} autres règles</li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleViewDetails}>
          <Eye className="h-4 w-4 mr-2" />
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
};
