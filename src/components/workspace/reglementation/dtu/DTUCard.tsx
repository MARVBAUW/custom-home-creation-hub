
import React from 'react';
import { Book, Clock, ArrowUpRight, ListCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Button from '@/components/common/Button';
import { DTU } from './types';

interface DTUCardProps {
  dtu: DTU;
  onViewDetails: (dtu: DTU) => void;
}

export const DTUCard: React.FC<DTUCardProps> = ({ dtu, onViewDetails }) => {
  return (
    <Card key={dtu.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-khaki-50 pb-4">
        <div className="flex justify-between items-start">
          <Badge className="bg-khaki-100 text-khaki-800">
            {dtu.category}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>MàJ: {dtu.lastUpdate}</span>
          </div>
        </div>
        <CardTitle className="flex items-center mt-2">
          <Book className="h-5 w-5 mr-2 text-khaki-600" />
          {dtu.title}
        </CardTitle>
        <CardDescription>{dtu.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <h4 className="text-sm font-medium flex items-center mb-2">
          <ListCheck className="h-4 w-4 mr-1 text-khaki-600" />
          Aperçu des règles clés:
        </h4>
        <ul className="space-y-1.5 text-sm">
          {dtu.rules.slice(0, 2).map((rule, index) => (
            <li key={index} className="flex items-start">
              <span className="text-khaki-600 mr-1.5">•</span>
              <span className="text-gray-700">{rule.title}</span>
            </li>
          ))}
          {dtu.rules.length > 2 && (
            <li className="text-sm text-khaki-600 italic">
              + {dtu.rules.length - 2} autres règles...
            </li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button 
          variant="outline" 
          className="w-full text-khaki-600 border-khaki-200"
          onClick={() => onViewDetails(dtu)}
        >
          Voir la fiche complète
          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
