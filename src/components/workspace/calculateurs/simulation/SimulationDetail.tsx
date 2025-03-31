
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Save, Loader2 } from 'lucide-react';
import SimulationContent from './SimulationContent';
import { Simulation } from './SimulationTypes';

interface SimulationDetailProps {
  simulation: Simulation;
  saving: boolean;
  isUserLoggedIn: boolean;
  onTitleChange: (title: string) => void;
  onContentChange: (newContent: any) => void;
  onSave: () => Promise<void>;
  onExportPDF: () => void;
  onToggleTemporary: () => void;
}

const SimulationDetail: React.FC<SimulationDetailProps> = ({
  simulation,
  saving,
  isUserLoggedIn,
  onTitleChange,
  onContentChange,
  onSave,
  onExportPDF,
  onToggleTemporary
}) => {
  const [editingTitle, setEditingTitle] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center mb-2">
          {editingTitle ? (
            <Input
              value={simulation.title}
              onChange={handleTitleChange}
              className="text-xl font-semibold"
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setEditingTitle(false);
              }}
              autoFocus
            />
          ) : (
            <CardTitle 
              className="cursor-pointer hover:text-khaki-700"
              onClick={() => setEditingTitle(true)}
            >
              {simulation.title}
            </CardTitle>
          )}
          <Badge variant={simulation.is_temporary ? "outline" : "default"}>
            {simulation.is_temporary ? 'Temporaire' : 'Enregistré'}
          </Badge>
        </div>
        <CardDescription>
          {simulation.type === 'calculator' ? 'Calculateur' : 
           simulation.type === 'simulation' ? 'Simulation' : 'Note'}
          {simulation.updated_at && ` • Mis à jour le ${new Date(simulation.updated_at).toLocaleDateString()}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <SimulationContent 
          simulation={simulation} 
          onContentChange={onContentChange} 
        />
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <div>
          <Button
            variant="outline"
            onClick={onToggleTemporary}
            disabled={!isUserLoggedIn}
          >
            {simulation.is_temporary ? 'Enregistrer définitivement' : 'Marquer comme temporaire'}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onExportPDF}
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter PDF
          </Button>
          <Button 
            onClick={onSave} 
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sauvegarde...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SimulationDetail;
