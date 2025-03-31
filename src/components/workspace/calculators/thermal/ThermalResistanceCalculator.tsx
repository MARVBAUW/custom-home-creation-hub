
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Plus, Trash2 } from 'lucide-react';
import { toast } from "sonner";

interface Material {
  id: string;
  name: string;
  thickness: number;
  lambda: number;
}

const ThermalResistanceCalculator = () => {
  const [materials, setMaterials] = useState<Material[]>([
    { id: '1', name: 'Isolation', thickness: 0.12, lambda: 0.035 }
  ]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`${name} téléchargé avec succès`);
      setDownloadingId(null);
    }, 1500);
  };

  const addMaterial = () => {
    const newId = (materials.length + 1).toString();
    setMaterials([...materials, { id: newId, name: 'Nouveau matériau', thickness: 0.05, lambda: 0.04 }]);
  };

  const removeMaterial = (id: string) => {
    if (materials.length > 1) {
      setMaterials(materials.filter(material => material.id !== id));
    } else {
      toast.error("Vous devez conserver au moins un matériau");
    }
  };

  const updateMaterial = (id: string, field: keyof Material, value: string | number) => {
    setMaterials(materials.map(material => {
      if (material.id === id) {
        return { ...material, [field]: value };
      }
      return material;
    }));
  };

  const calculateTotalResistance = () => {
    return materials.reduce((total, material) => {
      return total + (material.thickness / material.lambda);
    }, 0);
  };

  const calculateUValue = () => {
    const totalR = calculateTotalResistance();
    return totalR > 0 ? 1 / totalR : 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur de résistance thermique</CardTitle>
        <CardDescription>
          Calculez la résistance thermique d'une paroi multicouche
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Composition de la paroi</h3>
              <Button variant="outline" size="sm" onClick={addMaterial}>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>

            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 mb-1">
              <div className="col-span-4">Matériau</div>
              <div className="col-span-3">Épaisseur (m)</div>
              <div className="col-span-3">Lambda λ (W/m.K)</div>
              <div className="col-span-2">Actions</div>
            </div>

            {materials.map((material) => (
              <div key={material.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4">
                  <Select 
                    value={material.name}
                    onValueChange={(value) => updateMaterial(material.id, 'name', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un matériau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Isolation">Isolation</SelectItem>
                      <SelectItem value="Brique">Brique</SelectItem>
                      <SelectItem value="Béton">Béton</SelectItem>
                      <SelectItem value="Plâtre">Plâtre</SelectItem>
                      <SelectItem value="Bois">Bois</SelectItem>
                      <SelectItem value="Nouveau matériau">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  <Input 
                    type="number"
                    min={0.001}
                    max={1}
                    step={0.001}
                    value={material.thickness}
                    onChange={(e) => updateMaterial(material.id, 'thickness', parseFloat(e.target.value))}
                  />
                </div>
                <div className="col-span-3">
                  <Input 
                    type="number"
                    min={0.01}
                    max={10}
                    step={0.001}
                    value={material.lambda}
                    onChange={(e) => updateMaterial(material.id, 'lambda', parseFloat(e.target.value))}
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeMaterial(material.id)}
                    disabled={materials.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">Résistance thermique</Label>
                <div className="text-xl font-bold mt-1">
                  {calculateTotalResistance().toFixed(2)} m².K/W
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Coefficient U</Label>
                <div className="text-xl font-bold mt-1">
                  {calculateUValue().toFixed(2)} W/(m².K)
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="secondary"
          onClick={() => handleDownload('thermal-guide', 'Guide thermique')}
          disabled={downloadingId === 'thermal-guide'}
        >
          {downloadingId === 'thermal-guide' ? (
            <span className="flex items-center">Téléchargement...</span>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Télécharger le guide
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ThermalResistanceCalculator;
