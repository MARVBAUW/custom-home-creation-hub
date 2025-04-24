
import React, { useState } from 'react';
import { Simulation } from './SimulationTypes';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SimulationContentProps {
  simulation: Simulation;
  onContentChange: (content: any) => void;
}

const SimulationContent: React.FC<SimulationContentProps> = ({
  simulation,
  onContentChange
}) => {
  const [content, setContent] = useState<string>(
    typeof simulation.content.data === 'object'
      ? JSON.stringify(simulation.content.data, null, 2)
      : simulation.content.data || ''
  );

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    
    try {
      // For note type, we don't need to parse as JSON
      if (simulation.type === 'note') {
        onContentChange(e.target.value);
      } else {
        // For calculators and simulations, try to parse as JSON
        const parsedContent = JSON.parse(e.target.value);
        onContentChange(parsedContent);
      }
    } catch (error) {
      // If JSON parsing fails, just use the raw text
      onContentChange(e.target.value);
    }
  };

  const renderSimulationContent = () => {
    switch (simulation.type) {
      case 'note':
        return (
          <Textarea
            className="min-h-[300px] font-mono"
            value={content || ''}
            onChange={handleContentChange}
            placeholder="Saisissez vos notes ici..."
          />
        );
        
      case 'calculator':
      case 'simulation':
        if (simulation.content?.results) {
          return (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Paramètres</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="min-h-[150px] font-mono text-sm"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Paramètres de calcul (JSON)"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Résultats</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-50 p-3 rounded-md text-sm overflow-auto max-h-[200px]">
                    {JSON.stringify(simulation.content.results, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </div>
          );
        } else {
          return (
            <Textarea
              className="min-h-[300px] font-mono"
              value={content}
              onChange={handleContentChange}
              placeholder="Paramètres de calcul (JSON)"
            />
          );
        }
        
      default:
        return (
          <div className="p-4 bg-gray-50 rounded-md text-gray-500">
            Type de simulation non pris en charge: {simulation.type}
          </div>
        );
    }
  };

  return (
    <div>
      {renderSimulationContent()}
    </div>
  );
};

export default SimulationContent;
