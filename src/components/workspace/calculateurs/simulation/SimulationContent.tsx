
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Simulation } from './SimulationTypes';

interface SimulationContentProps {
  simulation: Simulation;
  onContentChange: (newContent: any) => void;
}

const SimulationContent: React.FC<SimulationContentProps> = ({ 
  simulation, 
  onContentChange 
}) => {
  switch (simulation.type) {
    case 'calculator':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parameter1">Paramètre 1</Label>
              <Input 
                id="parameter1" 
                type="number"
                value={simulation.content.data.parameter1 || ''}
                onChange={(e) => onContentChange({
                  ...simulation.content.data,
                  parameter1: e.target.value
                })}
              />
            </div>
            <div>
              <Label htmlFor="parameter2">Paramètre 2</Label>
              <Input 
                id="parameter2" 
                type="number"
                value={simulation.content.data.parameter2 || ''}
                onChange={(e) => onContentChange({
                  ...simulation.content.data,
                  parameter2: e.target.value
                })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="result">Résultat</Label>
            <Input 
              id="result" 
              readOnly
              value={
                simulation.content.data.parameter1 && 
                simulation.content.data.parameter2 
                  ? parseFloat(simulation.content.data.parameter1) * parseFloat(simulation.content.data.parameter2)
                  : ''
              }
            />
          </div>
        </div>
      );
    
    case 'note':
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="noteContent">Contenu de la note</Label>
            <textarea
              id="noteContent"
              className="w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-khaki-500"
              value={simulation.content.data.text || ''}
              onChange={(e) => onContentChange({
                ...simulation.content.data,
                text: e.target.value
              })}
              placeholder="Écrivez vos notes ici..."
            />
          </div>
        </div>
      );
    
    default:
      return (
        <div className="space-y-4">
          <p className="text-gray-500">
            Contenu non disponible pour ce type de simulation.
          </p>
        </div>
      );
  }
};

export default SimulationContent;
