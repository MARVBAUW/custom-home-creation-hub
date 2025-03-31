
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BaseFormProps } from '../types/formTypes';

const TerrainForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [landType, setLandType] = React.useState<string>(
    formData.landType || ''
  );

  const handleSubmit = () => {
    updateFormData({ landType });
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Terrain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="landType">Type de terrain</Label>
            <Select 
              value={landType} 
              onValueChange={setLandType}
            >
              <SelectTrigger id="landType">
                <SelectValue placeholder="Sélectionnez un type de terrain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Terrain plat</SelectItem>
                <SelectItem value="sloped">Terrain en pente</SelectItem>
                <SelectItem value="rocky">Terrain rocheux</SelectItem>
                <SelectItem value="clay">Terrain argileux</SelectItem>
                <SelectItem value="urban">Terrain urbain</SelectItem>
                <SelectItem value="rural">Terrain rural</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={!landType}>
            Suivant
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TerrainForm;
