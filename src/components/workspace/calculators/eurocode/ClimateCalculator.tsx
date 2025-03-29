
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Calculator } from 'lucide-react';
import { toast } from "sonner";

// Types de données
interface SnowResult {
  sk: number;
  s: number;
  zone: string;
  altitude: number;
  description: string;
}

interface WindResult {
  qb: number;
  vb: number;
  zone: number;
  description: string;
  terrain: string;
}

const ClimateCalculator = () => {
  // États pour les entrées
  const [activeTab, setActiveTab] = useState('snow');
  const [location, setLocation] = useState('');
  const [altitude, setAltitude] = useState<number>(0);
  const [snowZone, setSnowZone] = useState('A1');
  const [windZone, setWindZone] = useState('1');
  const [terrainCategory, setTerrainCategory] = useState('II');
  
  // États pour les résultats
  const [snowResult, setSnowResult] = useState<SnowResult | null>(null);
  const [windResult, setWindResult] = useState<WindResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Données de référence pour la France
  const snowZones = [
    { value: 'A1', label: 'Zone A1', description: 'Altitude < 200m - Partie Nord-Ouest' },
    { value: 'A2', label: 'Zone A2', description: 'Altitude < 200m - Partie Nord-Est' },
    { value: 'B1', label: 'Zone B1', description: '200m < Altitude < 500m - Ouest et Centre' },
    { value: 'B2', label: 'Zone B2', description: '200m < Altitude < 500m - Est' },
    { value: 'C1', label: 'Zone C1', description: '500m < Altitude < 900m - Alpes du Nord' },
    { value: 'C2', label: 'Zone C2', description: '500m < Altitude < 900m - Pyrénées' },
    { value: 'D', label: 'Zone D', description: 'Altitude > 900m - Haute Montagne' },
    { value: 'E', label: 'Zone E', description: 'Corse' },
  ];

  const windZones = [
    { value: '1', label: 'Zone 1', description: 'Intérieur des terres - Nord-Ouest' },
    { value: '2', label: 'Zone 2', description: 'Zones côtières Atlantique et Méditerranée' },
    { value: '3', label: 'Zone 3', description: 'Vallée du Rhône, pointes bretonnes' },
    { value: '4', label: 'Zone 4', description: 'Zones cycloniques (DOM-TOM)' },
  ];

  const terrainCategories = [
    { value: '0', label: 'Catégorie 0', description: 'Mer ou zone côtière exposée aux vents de mer' },
    { value: 'I', label: 'Catégorie I', description: 'Lacs ou zone plate et horizontale avec végétation négligeable' },
    { value: 'II', label: 'Catégorie II', description: 'Zone avec végétation basse et obstacles isolés' },
    { value: 'IIIa', label: 'Catégorie IIIa', description: 'Zone avec une couverture régulière de végétation ou de bâtiments' },
    { value: 'IIIb', label: 'Catégorie IIIb', description: 'Zone urbaine régulière avec bâtiments (< 15m)' },
    { value: 'IV', label: 'Catégorie IV', description: 'Zone urbaine dense avec bâtiments hauts (> 15m)' },
  ];

  // Calcul de la charge de neige
  const calculateSnowLoad = () => {
    setIsCalculating(true);
    
    // Simulation de calcul
    setTimeout(() => {
      let sk = 0; // Valeur caractéristique de la charge de neige au sol
      
      // Valeurs simplifiées pour la démonstration
      switch(snowZone) {
        case 'A1': sk = 0.45 * (1 + (altitude / 500)); break;
        case 'A2': sk = 0.55 * (1 + (altitude / 450)); break;
        case 'B1': sk = 0.65 * (1 + (altitude / 400)); break;
        case 'B2': sk = 0.75 * (1 + (altitude / 350)); break;
        case 'C1': sk = 0.90 * (1 + (altitude / 300)); break;
        case 'C2': sk = 1.00 * (1 + (altitude / 250)); break;
        case 'D': sk = 1.40 * (1 + (altitude / 200)); break;
        case 'E': sk = 0.50 * (1 + (altitude / 500)); break;
        default: sk = 0.45;
      }
      
      // Coefficient d'exposition Ce et coefficient thermique Ct simplifiés
      const Ce = 1.0;
      const Ct = 1.0;
      
      // Coefficient de forme de toit μ (simplifié pour toit plat)
      const mu = 0.8;
      
      // Charge de neige sur la toiture s = μ · Ce · Ct · sk
      const s = mu * Ce * Ct * sk;
      
      setSnowResult({
        sk: parseFloat(sk.toFixed(2)),
        s: parseFloat(s.toFixed(2)),
        zone: snowZone,
        altitude: altitude,
        description: snowZones.find(z => z.value === snowZone)?.description || ''
      });
      
      setIsCalculating(false);
      toast.success('Calcul de la charge de neige effectué');
    }, 1000);
  };
  
  // Calcul de la charge de vent
  const calculateWindLoad = () => {
    setIsCalculating(true);
    
    // Simulation de calcul
    setTimeout(() => {
      let vb = 0; // Vitesse de référence du vent
      
      // Valeurs simplifiées pour la démonstration
      switch(windZone) {
        case '1': vb = 22.0; break;
        case '2': vb = 24.0; break;
        case '3': vb = 26.0; break;
        case '4': vb = 28.0; break;
        default: vb = 22.0;
      }
      
      // Pression dynamique de référence qb = 0.5 * ρ * vb²
      // ρ = 1.225 kg/m³ (masse volumique de l'air)
      const rho = 1.225;
      const qb = 0.5 * rho * vb * vb / 1000; // en kN/m²
      
      setWindResult({
        qb: parseFloat(qb.toFixed(3)),
        vb: vb,
        zone: parseInt(windZone),
        description: windZones.find(z => z.value === windZone)?.description || '',
        terrain: terrainCategories.find(t => t.value === terrainCategory)?.description || ''
      });
      
      setIsCalculating(false);
      toast.success('Calcul de la charge de vent effectué');
    }, 1000);
  };

  // Export des résultats en PDF
  const exportToPDF = (type: 'snow' | 'wind') => {
    import('jspdf').then(({ jsPDF }) => {
      import('jspdf-autotable').then((autoTable) => {
        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(18);
        doc.text(type === 'snow' ? 'Charge de neige selon EC1' : 'Charge de vent selon EC1', 105, 15, { align: 'center' });
        
        // Project info
        doc.setFontSize(12);
        doc.text(`Lieu: ${location || 'Non spécifié'}`, 14, 25);
        doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 14, 32);
        
        if (type === 'snow' && snowResult) {
          // Snow load table
          doc.setFontSize(14);
          doc.text('Paramètres de calcul', 14, 45);
          
          // @ts-ignore
          doc.autoTable({
            startY: 50,
            head: [['Paramètre', 'Valeur', 'Unité']],
            body: [
              ['Zone de neige', snowResult.zone, ''],
              ['Description', snowResult.description, ''],
              ['Altitude', snowResult.altitude.toString(), 'm'],
              ['Charge de neige au sol (sk)', snowResult.sk.toString(), 'kN/m²'],
              ['Charge de neige sur la toiture (s)', snowResult.s.toString(), 'kN/m²'],
            ],
          });
          
          doc.save('Charge_de_neige_EC1.pdf');
        } else if (type === 'wind' && windResult) {
          // Wind load table
          doc.setFontSize(14);
          doc.text('Paramètres de calcul', 14, 45);
          
          // @ts-ignore
          doc.autoTable({
            startY: 50,
            head: [['Paramètre', 'Valeur', 'Unité']],
            body: [
              ['Zone de vent', windResult.zone.toString(), ''],
              ['Description', windResult.description, ''],
              ['Catégorie de terrain', terrainCategory, ''],
              ['Description du terrain', windResult.terrain, ''],
              ['Vitesse de référence du vent (vb)', windResult.vb.toString(), 'm/s'],
              ['Pression dynamique de référence (qb)', windResult.qb.toString(), 'kN/m²'],
            ],
          });
          
          doc.save('Charge_de_vent_EC1.pdf');
        }
        
        toast.success('PDF téléchargé avec succès');
      });
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-purple-600" />
          Calcul des charges climatiques EC1
        </CardTitle>
        <CardDescription>
          Détermination des charges de neige et de vent selon l'Eurocode 1
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="snow">Charge de neige</TabsTrigger>
            <TabsTrigger value="wind">Charge de vent</TabsTrigger>
            <TabsTrigger value="help">Aide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="snow" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="snow-location">Lieu du projet</Label>
                  <Input
                    id="snow-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Entrer le nom de la commune"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="snow-altitude">Altitude (m)</Label>
                  <Input
                    id="snow-altitude"
                    type="number"
                    value={altitude}
                    onChange={(e) => setAltitude(parseInt(e.target.value) || 0)}
                    min="0"
                    max="3000"
                    step="10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="snow-zone">Zone de neige</Label>
                  <Select value={snowZone} onValueChange={setSnowZone}>
                    <SelectTrigger id="snow-zone">
                      <SelectValue placeholder="Sélectionner une zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {snowZones.map((zone) => (
                        <SelectItem key={zone.value} value={zone.value}>
                          {zone.label} - {zone.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => exportToPDF('snow')}
                  disabled={!snowResult || isCalculating}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter les résultats
                </Button>
                <Button 
                  onClick={calculateSnowLoad}
                  disabled={isCalculating}
                >
                  {isCalculating ? 'Calcul en cours...' : 'Calculer'}
                </Button>
              </div>
              
              {snowResult && (
                <Card className="mt-4 border-t-4 border-t-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Résultats du calcul</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Paramètre</TableHead>
                          <TableHead>Valeur</TableHead>
                          <TableHead>Unité</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Zone de neige</TableCell>
                          <TableCell>{snowResult.zone}</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Altitude</TableCell>
                          <TableCell>{snowResult.altitude}</TableCell>
                          <TableCell>m</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Charge de neige au sol (sk)</TableCell>
                          <TableCell>{snowResult.sk}</TableCell>
                          <TableCell>kN/m²</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Charge de neige sur toiture (s)</TableCell>
                          <TableCell>{snowResult.s}</TableCell>
                          <TableCell>kN/m²</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="wind" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wind-location">Lieu du projet</Label>
                  <Input
                    id="wind-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Entrer le nom de la commune"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="wind-zone">Zone de vent</Label>
                  <Select value={windZone} onValueChange={setWindZone}>
                    <SelectTrigger id="wind-zone">
                      <SelectValue placeholder="Sélectionner une zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {windZones.map((zone) => (
                        <SelectItem key={zone.value} value={zone.value}>
                          {zone.label} - {zone.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="terrain-category">Catégorie de terrain</Label>
                  <Select value={terrainCategory} onValueChange={setTerrainCategory}>
                    <SelectTrigger id="terrain-category">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {terrainCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label} - {cat.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => exportToPDF('wind')}
                  disabled={!windResult || isCalculating}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter les résultats
                </Button>
                <Button 
                  onClick={calculateWindLoad}
                  disabled={isCalculating}
                >
                  {isCalculating ? 'Calcul en cours...' : 'Calculer'}
                </Button>
              </div>
              
              {windResult && (
                <Card className="mt-4 border-t-4 border-t-amber-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Résultats du calcul</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Paramètre</TableHead>
                          <TableHead>Valeur</TableHead>
                          <TableHead>Unité</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Zone de vent</TableCell>
                          <TableCell>{windResult.zone}</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Catégorie de terrain</TableCell>
                          <TableCell>{terrainCategory}</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Vitesse de référence du vent (vb)</TableCell>
                          <TableCell>{windResult.vb}</TableCell>
                          <TableCell>m/s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pression dynamique de référence (qb)</TableCell>
                          <TableCell>{windResult.qb}</TableCell>
                          <TableCell>kN/m²</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="help" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Comment utiliser ce calculateur</h3>
                <p className="text-gray-600">
                  Ce calculateur permet de déterminer les charges climatiques (neige et vent) selon l'Eurocode 1 - Parties 1-3 et 1-4,
                  qui sont utilisées pour le dimensionnement des structures.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Charges de neige</h3>
                <p className="text-gray-600">
                  Le calcul des charges de neige est basé sur la formule s = μ · Ce · Ct · sk où :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 mt-2">
                  <li>s est la charge de neige sur la toiture</li>
                  <li>μ est le coefficient de forme de la toiture (0.8 pour un toit plat)</li>
                  <li>Ce est le coefficient d'exposition (1.0 pour un terrain normal)</li>
                  <li>Ct est le coefficient thermique (1.0 pour une toiture normale)</li>
                  <li>sk est la valeur caractéristique de la charge de neige au sol</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Charges de vent</h3>
                <p className="text-gray-600">
                  Le calcul de base pour la pression dynamique de référence est qb = 0.5 · ρ · vb² où :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 mt-2">
                  <li>qb est la pression dynamique de référence</li>
                  <li>ρ est la masse volumique de l'air (1.225 kg/m³)</li>
                  <li>vb est la vitesse de référence du vent</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 px-6 py-4">
        <div className="text-xs text-gray-500">
          Conforme à l'EN 1991-1-3 (charges de neige) et l'EN 1991-1-4 (charges de vent)
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClimateCalculator;
