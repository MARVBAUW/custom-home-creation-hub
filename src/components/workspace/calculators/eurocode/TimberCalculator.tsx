
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TimberCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('beam');
  const [baseWidth, setBaseWidth] = useState('200');
  const [height, setHeight] = useState('300');
  const [length, setLength] = useState('5000');
  const [woodClass, setWoodClass] = useState('c24');
  const [serviceClass, setServiceClass] = useState('1');
  const [loadDuration, setLoadDuration] = useState('medium');
  const [uniformLoad, setUniformLoad] = useState('5');
  
  // Calcul de la résistance en flexion du bois selon l'Eurocode 5
  const calculateBendingStrength = () => {
    // Classes de résistance du bois (valeurs en MPa)
    const strengthClasses: {[key: string]: number} = {
      'c16': 16,
      'c18': 18,
      'c24': 24,
      'c30': 30,
      'c35': 35,
      'c40': 40,
      'd30': 30,
      'd35': 35,
      'd40': 40,
      'd50': 50,
      'd60': 60,
      'd70': 70
    };
    
    // Coefficients de durée de charge
    const kmodValues: {[key: string]: {[key: string]: number}} = {
      '1': {
        'permanent': 0.6,
        'long': 0.7,
        'medium': 0.8,
        'short': 0.9,
        'instantaneous': 1.1
      },
      '2': {
        'permanent': 0.6,
        'long': 0.7,
        'medium': 0.8,
        'short': 0.9,
        'instantaneous': 1.1
      },
      '3': {
        'permanent': 0.5,
        'long': 0.55,
        'medium': 0.65,
        'short': 0.7,
        'instantaneous': 0.9
      }
    };
    
    // Calcul du coefficient de modification
    const kmod = kmodValues[serviceClass]?.[loadDuration] || 0.8;
    
    // Coefficient de sécurité pour le bois massif
    const gammaM = 1.3;
    
    // Résistance caractéristique en flexion
    const fm_k = strengthClasses[woodClass] || 24;
    
    // Résistance de calcul en flexion
    const fm_d = fm_k * kmod / gammaM;
    
    return fm_d.toFixed(2);
  };
  
  // Calcul de la flèche
  const calculateDeflection = () => {
    // Modules d'élasticité moyens (en MPa) par classe de résistance
    const elasticityModules: {[key: string]: number} = {
      'c16': 8000,
      'c18': 9000,
      'c24': 11000,
      'c30': 12000,
      'c35': 13000,
      'c40': 14000,
      'd30': 11000,
      'd35': 12000,
      'd40': 13000,
      'd50': 14000,
      'd60': 17000,
      'd70': 20000
    };
    
    const E = elasticityModules[woodClass] || 11000; // Module d'élasticité en MPa
    const b = parseFloat(baseWidth) / 1000; // Base en m
    const h = parseFloat(height) / 1000; // Hauteur en m
    const L = parseFloat(length) / 1000; // Longueur en m
    const q = parseFloat(uniformLoad); // Charge uniforme en kN/m
    
    // Moment d'inertie (en m^4)
    const I = (b * Math.pow(h, 3)) / 12;
    
    // Flèche instantanée pour une poutre simplement appuyée avec charge uniforme
    // f = 5 * q * L^4 / (384 * E * I)
    const deflection = (5 * q * Math.pow(L, 4) * 1000) / (384 * E * I); // En mm
    
    return deflection.toFixed(2);
  };
  
  // Calcul de la contrainte de flexion
  const calculateBendingStress = () => {
    const b = parseFloat(baseWidth) / 1000; // Base en m
    const h = parseFloat(height) / 1000; // Hauteur en m
    const L = parseFloat(length) / 1000; // Longueur en m
    const q = parseFloat(uniformLoad); // Charge uniforme en kN/m
    
    // Moment fléchissant maximum pour une poutre simplement appuyée avec charge uniforme
    // M = q * L^2 / 8
    const M = (q * Math.pow(L, 2)) / 8; // en kNm
    
    // Module de section
    // W = b * h^2 / 6
    const W = (b * Math.pow(h, 2)) / 6; // en m^3
    
    // Contrainte de flexion
    // sigma_m = M / W
    const sigma_m = M / W / 1000; // en MPa
    
    return sigma_m.toFixed(2);
  };
  
  // Taux de travail en flexion
  const calculateUtilizationRatio = () => {
    const sigma_m = parseFloat(calculateBendingStress());
    const fm_d = parseFloat(calculateBendingStrength());
    
    const ratio = (sigma_m / fm_d) * 100;
    return ratio.toFixed(1);
  };
  
  const handleReset = () => {
    setBaseWidth('200');
    setHeight('300');
    setLength('5000');
    setWoodClass('c24');
    setServiceClass('1');
    setLoadDuration('medium');
    setUniformLoad('5');
  };
  
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le rapport de calcul est en cours de téléchargement."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur Bois (Eurocode 5)</CardTitle>
        <CardDescription>
          Dimensionnement et vérification des éléments structuraux en bois conformes à l'Eurocode 5
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="beam">Poutres</TabsTrigger>
            <TabsTrigger value="column">Poteaux</TabsTrigger>
            <TabsTrigger value="connection">Assemblages</TabsTrigger>
            <TabsTrigger value="reference">Référence</TabsTrigger>
          </TabsList>
          
          <TabsContent value="beam" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="baseWidth">Largeur (mm)</Label>
                  <Input 
                    id="baseWidth"
                    type="number" 
                    value={baseWidth} 
                    onChange={(e) => setBaseWidth(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="height">Hauteur (mm)</Label>
                  <Input 
                    id="height"
                    type="number" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="length">Portée (mm)</Label>
                  <Input 
                    id="length"
                    type="number" 
                    value={length} 
                    onChange={(e) => setLength(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="woodClass">Classe de résistance</Label>
                  <Select value={woodClass} onValueChange={setWoodClass}>
                    <SelectTrigger id="woodClass">
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c16">C16</SelectItem>
                      <SelectItem value="c18">C18</SelectItem>
                      <SelectItem value="c24">C24</SelectItem>
                      <SelectItem value="c30">C30</SelectItem>
                      <SelectItem value="c35">C35</SelectItem>
                      <SelectItem value="c40">C40</SelectItem>
                      <SelectItem value="d30">D30</SelectItem>
                      <SelectItem value="d35">D35</SelectItem>
                      <SelectItem value="d40">D40</SelectItem>
                      <SelectItem value="d50">D50</SelectItem>
                      <SelectItem value="d60">D60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="serviceClass">Classe de service</Label>
                  <Select value={serviceClass} onValueChange={setServiceClass}>
                    <SelectTrigger id="serviceClass">
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Classe 1</SelectItem>
                      <SelectItem value="2">Classe 2</SelectItem>
                      <SelectItem value="3">Classe 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="loadDuration">Durée de charge</Label>
                  <Select value={loadDuration} onValueChange={setLoadDuration}>
                    <SelectTrigger id="loadDuration">
                      <SelectValue placeholder="Sélectionner une durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">Permanente</SelectItem>
                      <SelectItem value="long">Longue durée</SelectItem>
                      <SelectItem value="medium">Moyenne durée</SelectItem>
                      <SelectItem value="short">Courte durée</SelectItem>
                      <SelectItem value="instantaneous">Instantanée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="uniformLoad">Charge uniforme (kN/m)</Label>
                  <Input 
                    id="uniformLoad"
                    type="number" 
                    step="0.1"
                    value={uniformLoad} 
                    onChange={(e) => setUniformLoad(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handleReset}>
                    Réinitialiser
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4 mt-4">
              <h3 className="text-lg font-medium mb-3">Résultats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Résistance de calcul en flexion</p>
                  <p className="text-lg font-medium">{calculateBendingStrength()} MPa</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Contrainte de flexion</p>
                  <p className="text-lg font-medium">{calculateBendingStress()} MPa</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Flèche</p>
                  <p className="text-lg font-medium">{calculateDeflection()} mm</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Taux de travail</p>
                  <p className={`text-lg font-medium ${parseFloat(calculateUtilizationRatio()) > 100 ? 'text-red-500' : 'text-green-500'}`}>
                    {calculateUtilizationRatio()} %
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="column">
            <div className="flex items-center justify-center h-48 border rounded-md">
              <div className="text-center space-y-2">
                <Info className="mx-auto h-8 w-8 text-blue-500" />
                <p>Le module de calcul des poteaux sera disponible prochainement.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="connection">
            <div className="flex items-center justify-center h-48 border rounded-md">
              <div className="text-center space-y-2">
                <Info className="mx-auto h-8 w-8 text-blue-500" />
                <p>Le module de calcul des assemblages sera disponible prochainement.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reference">
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Classes de service</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><span className="font-medium">Classe 1:</span> Humidité relative de l'air ≤ 65%, bois à une humidité ≤ 12%</li>
                  <li><span className="font-medium">Classe 2:</span> Humidité relative de l'air ≤ 85%, bois à une humidité ≤ 20%</li>
                  <li><span className="font-medium">Classe 3:</span> Humidité relative de l'air > 85%, bois à une humidité > 20%</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Durées de charge</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><span className="font-medium">Permanente:</span> > 10 ans (poids propre)</li>
                  <li><span className="font-medium">Longue durée:</span> 6 mois à 10 ans (stockage)</li>
                  <li><span className="font-medium">Moyenne durée:</span> 1 semaine à 6 mois (charges d'exploitation)</li>
                  <li><span className="font-medium">Courte durée:</span> < 1 semaine (neige)</li>
                  <li><span className="font-medium">Instantanée:</span> (vent, accidentelle)</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Les résultats de ce calculateur sont fournis à titre indicatif et ne remplacent pas l'avis d'un ingénieur structure.
      </CardFooter>
    </Card>
  );
};

export default TimberCalculator;
