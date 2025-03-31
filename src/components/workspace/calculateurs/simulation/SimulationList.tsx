
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Trash2 } from 'lucide-react';
import { Simulation } from './SimulationTypes';

interface SimulationListProps {
  simulations: Simulation[];
  loading: boolean;
  currentSimulationId?: string;
  onSimulationSelect: (simulation: Simulation) => void;
  onSimulationDelete: (id: string) => void;
}

const SimulationList: React.FC<SimulationListProps> = ({
  simulations,
  loading,
  currentSimulationId,
  onSimulationSelect,
  onSimulationDelete
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes documents</CardTitle>
        <CardDescription>
          Documents enregistrés dans votre compte
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-khaki-600" />
          </div>
        ) : simulations.length > 0 ? (
          <div className="space-y-2">
            {simulations.map((sim) => (
              <div 
                key={sim.id} 
                className={`p-3 rounded-md cursor-pointer flex justify-between items-center hover:bg-gray-100 ${
                  currentSimulationId === sim.id ? 'bg-khaki-100 border border-khaki-200' : 'bg-white border border-gray-200'
                }`}
                onClick={() => onSimulationSelect(sim)}
              >
                <div>
                  <div className="font-medium text-gray-900 truncate max-w-[150px]">
                    {sim.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(sim.updated_at || Date.now()).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge variant={sim.is_temporary ? "outline" : "default"} className="mr-2">
                    {sim.is_temporary ? 'Temp' : 'Sauvé'}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSimulationDelete(sim.id!);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            Aucun document. Créez votre premier document en cliquant sur les boutons ci-dessus.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimulationList;
