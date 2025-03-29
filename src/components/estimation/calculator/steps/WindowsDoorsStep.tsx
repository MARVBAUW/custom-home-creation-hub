
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Window, DoorClosed } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface WindowsDoorsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const WindowsDoorsStep: React.FC<WindowsDoorsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [activeTab, setActiveTab] = useState("remplacement");
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      windowType: formData.windowType || '',
      windowRenovationArea: formData.windowRenovationArea || '',
      windowNewArea: formData.windowNewArea || '',
      windowsIncluded: formData.windowsIncluded !== false
    }
  });
  
  const windowType = watch('windowType');
  const needsReplacementArea = windowType !== 'non_concerne' && activeTab === "remplacement";
  const needsNewArea = windowType !== 'non_concerne' && activeTab === "ajout";
  
  const onSubmit = (data: any) => {
    const submitData = {
      ...data,
      windowRenovationArea: activeTab === "remplacement" ? data.windowRenovationArea : undefined,
      windowNewArea: activeTab === "ajout" ? data.windowNewArea : undefined
    };
    
    updateFormData(submitData);
    goToNextStep();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Menuiseries Extérieures</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="remplacement">Remplacement</TabsTrigger>
              <TabsTrigger value="ajout">Ajout</TabsTrigger>
            </TabsList>
            
            <TabsContent value="remplacement" className="pt-4">
              <div className="space-y-4">
                <Label className="text-base font-medium">Type de menuiseries extérieures</Label>
                <RadioGroup className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="bois" id="bois-remplacement" {...register('windowType')} />
                    <Label htmlFor="bois-remplacement" className="flex flex-col cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Window className="h-4 w-4 text-amber-700" />
                        <span>Bois</span>
                      </div>
                      <img 
                        src="https://storage.tally.so/431090b7-6e9f-4b65-9287-b5fbd328627a/fenetre-bois-exotique.jpg" 
                        alt="Fenêtre bois"
                        className="w-full h-20 object-cover rounded mt-2"
                      />
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="pvc" id="pvc-remplacement" {...register('windowType')} />
                    <Label htmlFor="pvc-remplacement" className="flex flex-col cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Window className="h-4 w-4 text-gray-500" />
                        <span>PVC</span>
                      </div>
                      <img 
                        src="https://storage.tally.so/373eab2e-754c-4ce1-84c5-06620cd162a4/201824309.jpg" 
                        alt="Fenêtre PVC"
                        className="w-full h-20 object-cover rounded mt-2"
                      />
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="alu" id="alu-remplacement" {...register('windowType')} />
                    <Label htmlFor="alu-remplacement" className="flex flex-col cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Window className="h-4 w-4 text-gray-700" />
                        <span>Aluminium</span>
                      </div>
                      <img 
                        src="https://storage.tally.so/0c7036b5-5dd9-49e7-a61d-38aa1ce89904/fenetre-aluminium.png" 
                        alt="Fenêtre aluminium"
                        className="w-full h-20 object-cover rounded mt-2"
                      />
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="mixte" id="mixte-remplacement" {...register('windowType')} />
                    <Label htmlFor="mixte-remplacement" className="flex flex-col cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Window className="h-4 w-4 text-blue-700" />
                        <span>Mixte bois-alu</span>
                      </div>
                      <img 
                        src="https://storage.tally.so/6a387837-9be3-456c-8b14-df07914e6958/fe_bois_alu.webp" 
                        alt="Fenêtre mixte"
                        className="w-full h-20 object-cover rounded mt-2"
                      />
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="pvc_colore" id="pvc_colore-remplacement" {...register('windowType')} />
                    <Label htmlFor="pvc_colore-remplacement" className="flex flex-col cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Window className="h-4 w-4 text-green-500" />
                        <span>PVC coloré</span>
                      </div>
                      <img 
                        src="https://storage.tally.so/d7c9b355-b6a5-4b3b-9886-459581f8c2de/fenetre-pvc-de-differente-couleur.webp" 
                        alt="Fenêtre PVC coloré"
                        className="w-full h-20 object-cover rounded mt-2"
                      />
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="non_concerne" id="non_concerne-remplacement" {...register('windowType')} />
                    <Label htmlFor="non_concerne-remplacement" className="cursor-pointer">Non concerné</Label>
                  </div>
                </RadioGroup>
                
                {needsReplacementArea && (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="windowRenovationArea">Surface à remplacer (m²)</Label>
                    <Input
                      id="windowRenovationArea"
                      type="number"
                      placeholder="Ex: 15"
                      {...register('windowRenovationArea', { 
                        required: needsReplacementArea ? 'Veuillez indiquer la surface à remplacer' : false 
                      })}
                    />
                    {errors.windowRenovationArea && (
                      <p className="text-sm text-red-500">{errors.windowRenovationArea.message as string}</p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="ajout" className="pt-4">
              <div className="space-y-4">
                <Label className="text-base font-medium">Type de menuiseries à ajouter</Label>
                <RadioGroup className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="bois" id="bois-ajout" {...register('windowType')} />
                    <Label htmlFor="bois-ajout" className="flex flex-col cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Window className="h-4 w-4 text-amber-700" />
                        <span>Bois</span>
                      </div>
                      <img 
                        src="https://storage.tally.so/431090b7-6e9f-4b65-9287-b5fbd328627a/fenetre-bois-exotique.jpg" 
                        alt="Fenêtre bois"
                        className="w-full h-20 object-cover rounded mt-2"
                      />
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="pvc" id="pvc-ajout" {...register('windowType')} />
                    <Label htmlFor="pvc-ajout" className="flex flex-col cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Window className="h-4 w-4 text-gray-500" />
                        <span>PVC</span>
                      </div>
                      <img 
                        src="https://storage.tally.so/373eab2e-754c-4ce1-84c5-06620cd162a4/201824309.jpg" 
                        alt="Fenêtre PVC"
                        className="w-full h-20 object-cover rounded mt-2"
                      />
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="alu" id="alu-ajout" {...register('windowType')} />
                    <Label htmlFor="alu-ajout" className="flex flex-col cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Window className="h-4 w-4 text-gray-700" />
                        <span>Aluminium</span>
                      </div>
                      <img 
                        src="https://storage.tally.so/0c7036b5-5dd9-49e7-a61d-38aa1ce89904/fenetre-aluminium.png" 
                        alt="Fenêtre aluminium"
                        className="w-full h-20 object-cover rounded mt-2"
                      />
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="mixte" id="mixte-ajout" {...register('windowType')} />
                    <Label htmlFor="mixte-ajout" className="flex flex-col cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Window className="h-4 w-4 text-blue-700" />
                        <span>Mixte bois-alu</span>
                      </div>
                      <img 
                        src="https://storage.tally.so/6a387837-9be3-456c-8b14-df07914e6958/fe_bois_alu.webp" 
                        alt="Fenêtre mixte"
                        className="w-full h-20 object-cover rounded mt-2"
                      />
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="pvc_colore" id="pvc_colore-ajout" {...register('windowType')} />
                    <Label htmlFor="pvc_colore-ajout" className="flex flex-col cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Window className="h-4 w-4 text-green-500" />
                        <span>PVC coloré</span>
                      </div>
                      <img 
                        src="https://storage.tally.so/d7c9b355-b6a5-4b3b-9886-459581f8c2de/fenetre-pvc-de-differente-couleur.webp" 
                        alt="Fenêtre PVC coloré"
                        className="w-full h-20 object-cover rounded mt-2"
                      />
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="non_concerne" id="non_concerne-ajout" {...register('windowType')} />
                    <Label htmlFor="non_concerne-ajout" className="cursor-pointer">Non concerné</Label>
                  </div>
                </RadioGroup>
                
                {needsNewArea && (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="windowNewArea">Surface à créer (m²)</Label>
                    <Input
                      id="windowNewArea"
                      type="number"
                      placeholder="Ex: 10"
                      {...register('windowNewArea', { 
                        required: needsNewArea ? 'Veuillez indiquer la surface à créer' : false 
                      })}
                    />
                    {errors.windowNewArea && (
                      <p className="text-sm text-red-500">{errors.windowNewArea.message as string}</p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button type="submit">
            Suivant
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default WindowsDoorsStep;
