
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Calculator } from 'lucide-react';
import { toast } from "sonner";

interface ConcreteClass {
  name: string;
  fck: number;
  description: string;
}

interface SteelClass {
  name: string;
  fyk: number;
  description: string;
}

interface BeamResult {
  moment: number;
  requiredAs: number;
  minAs: number;
  barCount: number;
  barDiameter: number;
  d: number;
  z: number;
  x: number;
}

const BeamCalculator = () => {
  // Entrées de dimensionnement
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(500);
  const [cover, setCover] = useState<number>(30);
  const [moment, setMoment] = useState<number>(100);
  const [concreteClass, setConcreteClass] = useState<string>("C25/30");
  const [steelClass, setSteelClass] = useState<string>("B500B");
  const [barDiameter, setBarDiameter] = useState<number>(12);
  
  // États de calcul
  const [result, setResult] = useState<BeamResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  
  // Classes de béton selon l'EC2
  const concreteClasses: ConcreteClass[] = [
    { name: "C20/25", fck: 20, description: "Béton courant - Résistance faible" },
    { name: "C25/30", fck: 25, description: "Béton courant - Résistance moyenne" },
    { name: "C30/37", fck: 30, description: "Béton courant - Bonne résistance" },
    { name: "C35/45", fck: 35, description: "Béton de haute résistance" },
    { name: "C40/50", fck: 40, description: "Béton de haute résistance" },
    { name: "C45/55", fck: 45, description: "Béton de haute résistance" },
    { name: "C50/60", fck: 50, description: "Béton de très haute résistance" },
  ];
  
  // Classes d'acier selon l'EC2
  const steelClasses: SteelClass[] = [
    { name: "B500A", fyk: 500, description: "Acier de constructiun soudable" },
    { name: "B500B", fyk: 500, description: "Acier de construction soudable à haute ductilité" },
    { name: "B500C", fyk: 500, description: "Acier de construction soudable à très haute ductilité" },
  ];
  
  // Diamètres d'armatures courantes
  const barDiameters = [6, 8, 10, 12, 14, 16, 20, 25, 32];
  
  // Fonction de calcul
  const calculateReinforcement = () => {
    setIsCalculating(true);
    
    // Simuler un délai de calcul
    setTimeout(() => {
      try {
        // Récupérer les valeurs des classes de matériaux
        const concrete = concreteClasses.find(c => c.name === concreteClass) || concreteClasses[1];
        const steel = steelClasses.find(s => s.name === steelClass) || steelClasses[1];
        
        // Coefficients de sécurité
        const gammaC = 1.5;
        const gammaS = 1.15;
        
        // Résistances de calcul
        const fcd = concrete.fck / gammaC;
        const fyd = steel.fyk / gammaS;
        
        // Hauteur utile d (en mm)
        const d = height - cover - barDiameter / 2;
        
        // Moment réduit μ = MEd / (b * d² * fcd)
        const mu = (moment * 1000000) / (width * d * d * fcd);
        
        // Position relative de l'axe neutre et bras de levier z
        // Formules simplifiées pour le dimensionnement
        const alpha = 1.25 * (1 - Math.sqrt(1 - 2 * mu));
        const z = d * (1 - 0.4 * alpha);
        
        // Section d'armatures requise (en mm²)
        const As = (moment * 1000000) / (z * fyd);
        
        // Section minimale selon l'EC2
        const minAs = Math.max(0.26 * (concrete.fck ** 0.5) / steel.fyk * width * d, 0.0013 * width * d);
        
        // Nombre de barres nécessaires
        const singleBarArea = Math.PI * (barDiameter * barDiameter) / 4;
        const barCount = Math.ceil(Math.max(As, minAs) / singleBarArea);
        
        setResult({
          moment: moment,
          requiredAs: parseFloat(As.toFixed(0)),
          minAs: parseFloat(minAs.toFixed(0)),
          barCount: barCount,
          barDiameter: barDiameter,
          d: d,
          z: parseFloat(z.toFixed(0)),
          x: parseFloat((alpha * d).toFixed(0)),
        });
        
        toast.success("Calcul effectué avec succès");
      } catch (error) {
        toast.error("Erreur lors du calcul");
        console.error(error);
      } finally {
        setIsCalculating(false);
      }
    }, 1000);
  };
  
  // Export des résultats en PDF
  const exportToPDF = () => {
    if (!result) return;
    
    import('jspdf').then(({ jsPDF }) => {
      import('jspdf-autotable').then((autoTable) => {
        const doc = new jsPDF();
        
        // Titre
        doc.setFontSize(18);
        doc.text('Dimensionnement de poutre en béton armé', 105, 15, { align: 'center' });
        
        // Informations du projet
        doc.setFontSize(12);
        doc.text('Dimensionnement selon l\'Eurocode 2', 14, 25);
        doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 14, 32);
        
        // Données d'entrée
        doc.setFontSize(14);
        doc.text('Données d\'entrée', 14, 45);
        
        // @ts-ignore
        doc.autoTable({
          startY: 50,
          head: [['Paramètre', 'Valeur', 'Unité']],
          body: [
            ['Largeur de poutre (b)', width.toString(), 'mm'],
            ['Hauteur de poutre (h)', height.toString(), 'mm'],
            ['Enrobage', cover.toString(), 'mm'],
            ['Moment de calcul (MEd)', moment.toString(), 'kN.m'],
            ['Classe de béton', concreteClass, ''],
            ['Classe d\'acier', steelClass, ''],
          ],
        });
        
        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY + 10;
        
        // Résultats
        doc.setFontSize(14);
        doc.text('Résultats de calcul', 14, finalY);
        
        // @ts-ignore
        doc.autoTable({
          startY: finalY + 5,
          head: [['Paramètre', 'Valeur', 'Unité']],
          body: [
            ['Hauteur utile (d)', result.d.toString(), 'mm'],
            ['Bras de levier (z)', result.z.toString(), 'mm'],
            ['Position axe neutre (x)', result.x.toString(), 'mm'],
            ['Section d\'armatures requise (As)', result.requiredAs.toString(), 'mm²'],
            ['Section d\'armatures minimale', result.minAs.toString(), 'mm²'],
            ['Diamètre des barres', result.barDiameter.toString(), 'mm'],
            ['Nombre de barres', result.barCount.toString(), ''],
          ],
        });
        
        // Schéma simplifié
        // @ts-ignore
        const schemaY = doc.lastAutoTable.finalY + 15;
        doc.setFontSize(12);
        doc.text('Schéma de ferraillage (vue en coupe)', 105, schemaY, { align: 'center' });
        
        // Dessin simplifié de la poutre (rectangle)
        const scale = 0.5;  // Échelle pour le dessin
        const startX = 50;
        const startY = schemaY + 15;
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
        
        // Contour de la poutre
        doc.setDrawColor(0);
        doc.setFillColor(240, 240, 240);
        doc.rect(startX, startY, scaledWidth, scaledHeight, 'FD');
        
        // Position approximative des armatures
        doc.setFillColor(0);
        const barSpacing = Math.min(25, scaledWidth / (result.barCount + 1));
        for (let i = 0; i < result.barCount; i++) {
          const barX = startX + (i + 1) * barSpacing;
          const barY = startY + scaledHeight - 10;
          doc.circle(barX, barY, 2, 'F');
        }
        
        // Cotes
        doc.setDrawColor(0);
        doc.setLineWidth(0.1);
        // Cote hauteur
        doc.line(startX - 10, startY, startX - 5, startY);
        doc.line(startX - 10, startY + scaledHeight, startX - 5, startY + scaledHeight);
        doc.line(startX - 10, startY, startX - 10, startY + scaledHeight);
        doc.text('h=' + height + 'mm', startX - 35, startY + scaledHeight/2);
        
        // Cote largeur
        doc.line(startX, startY + scaledHeight + 10, startX, startY + scaledHeight + 5);
        doc.line(startX + scaledWidth, startY + scaledHeight + 10, startX + scaledWidth, startY + scaledHeight + 5);
        doc.line(startX, startY + scaledHeight + 10, startX + scaledWidth, startY + scaledHeight + 10);
        doc.text('b=' + width + 'mm', startX + scaledWidth/2 - 15, startY + scaledHeight + 20);
        
        // Note de bas de page
        doc.setFontSize(10);
        doc.text('Calcul simplifié pour une poutre soumise à de la flexion simple selon l\'Eurocode 2', 105, 280, { align: 'center' });
        
        doc.save('Dimensionnement_Poutre_BA.pdf');
        
        toast.success('PDF téléchargé avec succès');
      });
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-purple-600" />
          Dimensionnement de poutre en béton armé
        </CardTitle>
        <CardDescription>
          Calcul de ferraillage selon l'Eurocode 2 pour une poutre en flexion simple
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="input">
          <TabsList className="mb-4">
            <TabsTrigger value="input">Données d'entrée</TabsTrigger>
            <TabsTrigger value="results" disabled={!result}>Résultats</TabsTrigger>
            <TabsTrigger value="help">Aide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Géométrie de la poutre</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="beam-width">Largeur (b)</Label>
                        <span className="text-gray-500 text-sm">{width} mm</span>
                      </div>
                      <Slider
                        id="beam-width"
                        value={[width]}
                        onValueChange={(value) => setWidth(value[0])}
                        min={150}
                        max={1000}
                        step={10}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="beam-height">Hauteur (h)</Label>
                        <span className="text-gray-500 text-sm">{height} mm</span>
                      </div>
                      <Slider
                        id="beam-height"
                        value={[height]}
                        onValueChange={(value) => setHeight(value[0])}
                        min={200}
                        max={1200}
                        step={10}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="beam-cover">Enrobage</Label>
                        <span className="text-gray-500 text-sm">{cover} mm</span>
                      </div>
                      <Slider
                        id="beam-cover"
                        value={[cover]}
                        onValueChange={(value) => setCover(value[0])}
                        min={15}
                        max={50}
                        step={5}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Ferraillage</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bar-diameter">Diamètre des barres</Label>
                      <Select 
                        value={barDiameter.toString()} 
                        onValueChange={(value) => setBarDiameter(parseInt(value))}
                      >
                        <SelectTrigger id="bar-diameter">
                          <SelectValue placeholder="Diamètre" />
                        </SelectTrigger>
                        <SelectContent>
                          {barDiameters.map((diam) => (
                            <SelectItem key={diam} value={diam.toString()}>
                              ⌀{diam} mm
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Chargement</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="moment">Moment de calcul (MEd)</Label>
                      <div className="flex items-center">
                        <Input
                          id="moment"
                          type="number"
                          value={moment}
                          onChange={(e) => setMoment(parseFloat(e.target.value) || 0)}
                          min="0"
                          step="5"
                        />
                        <span className="ml-2 text-gray-500">kN.m</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Matériaux</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="concrete-class">Classe de béton</Label>
                      <Select 
                        value={concreteClass} 
                        onValueChange={setConcreteClass}
                      >
                        <SelectTrigger id="concrete-class">
                          <SelectValue placeholder="Classe de béton" />
                        </SelectTrigger>
                        <SelectContent>
                          {concreteClasses.map((concrete) => (
                            <SelectItem key={concrete.name} value={concrete.name}>
                              {concrete.name} - fck = {concrete.fck} MPa
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="steel-class">Classe d'acier</Label>
                      <Select 
                        value={steelClass} 
                        onValueChange={setSteelClass}
                      >
                        <SelectTrigger id="steel-class">
                          <SelectValue placeholder="Classe d'acier" />
                        </SelectTrigger>
                        <SelectContent>
                          {steelClasses.map((steel) => (
                            <SelectItem key={steel.name} value={steel.name}>
                              {steel.name} - fyk = {steel.fyk} MPa
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <Button 
                    onClick={calculateReinforcement} 
                    disabled={isCalculating}
                    className="w-full"
                  >
                    {isCalculating ? 'Calcul en cours...' : 'Calculer le ferraillage'}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            {result && (
              <>
                <Card className="border-t-4 border-t-green-500">
                  <CardHeader className="pb-2">
                    <CardTitle>Résultats du dimensionnement</CardTitle>
                    <CardDescription>
                      Ferraillage pour une poutre {width}×{height} mm soumise à un moment de {moment} kN.m
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Caractéristiques géométriques</h4>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Hauteur utile (d)</TableCell>
                              <TableCell>{result.d} mm</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Bras de levier (z)</TableCell>
                              <TableCell>{result.z} mm</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Position axe neutre (x)</TableCell>
                              <TableCell>{result.x} mm</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Ferraillage</h4>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Section d'armatures requise</TableCell>
                              <TableCell>{result.requiredAs} mm²</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Section minimale réglementaire</TableCell>
                              <TableCell>{result.minAs} mm²</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Ferraillage retenu</TableCell>
                              <TableCell>{result.barCount} ⌀{result.barDiameter}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm border">
                      <div className="font-medium mb-2">Notes :</div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Vérifier la résistance à l'effort tranchant si nécessaire</li>
                        <li>Prévoir les armatures de montage (cadres/étriers)</li>
                        <li>Vérifier les conditions de mise en œuvre (espacements, ancrages)</li>
                        <li>Ces résultats ne concernent que la flexion simple</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={exportToPDF} className="ml-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter en PDF
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="flex justify-center py-4">
                  <div className="w-full max-w-md aspect-video relative bg-gray-100 border rounded-md flex flex-col items-center justify-center">
                    <div className="text-sm text-gray-500 mb-4">Schéma de principe (vue en coupe)</div>
                    
                    {/* Poutre simplifiée */}
                    <div 
                      className="bg-gray-200 border border-gray-400 relative"
                      style={{ 
                        width: Math.min(350, width / 2),
                        height: Math.min(200, height / 2),
                      }}
                    >
                      {/* Position approximative des armatures */}
                      <div className="absolute bottom-2 left-0 right-0 flex justify-around">
                        {Array.from({ length: result.barCount }).map((_, i) => (
                          <div 
                            key={i} 
                            className="rounded-full bg-black"
                            style={{ 
                              width: Math.max(4, barDiameter / 3),
                              height: Math.max(4, barDiameter / 3)
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Cotes */}
                      <div className="absolute -bottom-6 left-0 right-0 text-xs text-center text-gray-600">
                        b = {width} mm
                      </div>
                      <div className="absolute -right-8 top-0 bottom-0 flex items-center">
                        <div className="text-xs text-gray-600 rotate-90">h = {height} mm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="help" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Comment utiliser ce calculateur</h3>
                <p className="text-gray-600">
                  Ce calculateur permet de dimensionner le ferraillage longitudinal d'une poutre en béton armé
                  soumise à de la flexion simple (moment positif), selon l'Eurocode 2.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Méthode de calcul</h3>
                <p className="text-gray-600">
                  Le dimensionnement est basé sur la méthode des états limites ultimes (ELU) et utilise les principes suivants :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 mt-2">
                  <li>Équilibre de la section</li>
                  <li>Compatibilité des déformations</li>
                  <li>Diagramme rectangulaire simplifié pour le béton</li>
                  <li>Comportement élasto-plastique parfait pour l'acier</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Limites du calculateur</h3>
                <p className="text-gray-600">
                  Ce calculateur présente certaines limitations :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 mt-2">
                  <li>Uniquement pour la flexion simple (pas de compression/traction)</li>
                  <li>Ne vérifie pas la résistance à l'effort tranchant</li>
                  <li>Ne dimensionne pas les armatures transversales (cadres/étriers)</li>
                  <li>Ne vérifie pas les conditions de service (ELS - flèches, fissuration)</li>
                  <li>Ne prend pas en compte des formes complexes de section</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Références</h3>
                <p className="text-gray-600">
                  Ce calculateur est basé sur les normes suivantes :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 mt-2">
                  <li>EN 1992-1-1 : Eurocode 2 - Calcul des structures en béton</li>
                  <li>NF EN 1992-1-1/NA : Annexe Nationale Française</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 px-6 py-4">
        <div className="text-xs text-gray-500 w-full flex justify-between items-center">
          <span>Conforme à l'EN 1992-1-1 (Eurocode 2)</span>
          <span>Version simplifiée pour la flexion simple</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BeamCalculator;
