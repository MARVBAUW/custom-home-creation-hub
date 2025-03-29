
import React, { useState } from 'react';
import { DTU } from './dtu/types';
import { Volume, Home, Store, Headphones, Building, School, ExternalLink, BookOpen, Download, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { acoustiqueData } from './data/acoustique';
import { acoustiqueDTUs } from './data/dtu/acoustique';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AcoustiqueRecapSection = () => {
  const [acoustiqueTab, setAcoustiqueTab] = useState("logement");
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDTUDialogOpen, setIsDTUDialogOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [openCalculator, setOpenCalculator] = useState<string | null>(null);

  // Form states for the acoustic calculators
  const [isolementData, setIsolementData] = useState({
    localEmission: 'sejour',
    localReception: 'chambre',
    surfaceSeparation: 10,
    volumeReception: 30,
    isolementParoi: 52,
    transmissionsLaterales: 'faibles'
  });

  const [impactData, setImpactData] = useState({
    typePlancher: 'beton',
    epaisseur: 20,
    revetement: 'carrelage',
    faux_plafond: false
  });

  const [reverberationData, setReverberationData] = useState({
    volume: 100,
    surface: 120,
    type: 'classe',
    alpha_murs: 0.1,
    alpha_plafond: 0.2,
    alpha_sol: 0.05
  });

  const handleOpenDTU = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDTUDialogOpen(true);
  };

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`${name} téléchargé avec succès`);
      setDownloadingId(null);
    }, 1500);
  };

  const handleOpenCalculator = (id: string) => {
    setOpenCalculator(id);
  };

  // Calculate isolement acoustique
  const calculateIsolement = () => {
    // Simple formula based on EN 12354
    const Dnt = isolementData.isolementParoi;
    
    // Transmission latérale adjustment
    let k_tl = 0;
    if (isolementData.transmissionsLaterales === 'faibles') k_tl = 0;
    else if (isolementData.transmissionsLaterales === 'moyennes') k_tl = 3;
    else if (isolementData.transmissionsLaterales === 'fortes') k_tl = 5;
    
    // Volume adjustment
    const volumeFactor = 10 * Math.log10(0.32 * isolementData.volumeReception / isolementData.surfaceSeparation);
    
    // Final DnT,A (simplified approximation)
    const DnTA = Dnt - k_tl + volumeFactor;
    
    return Math.round(DnTA);
  };

  // Calculate impact noise level
  const calculateImpact = () => {
    // Base values for different floor types (simplified)
    const baseValues = {
      'beton': 78,
      'bois': 85
    };
    
    // Revetement improvement (simplified)
    const revetementImprovements = {
      'carrelage': 0,
      'parquet': 5,
      'pvc': 8,
      'moquette': 18
    };
    
    // Thickness improvement (simplified)
    const thicknessImprovement = Math.log10(impactData.epaisseur) * 5;
    
    // Suspended ceiling improvement
    const ceilingImprovement = impactData.faux_plafond ? 6 : 0;
    
    // Calculate L'nT,w (simplified approximation)
    const LnTw = baseValues[impactData.typePlancher as keyof typeof baseValues] - 
                revetementImprovements[impactData.revetement as keyof typeof revetementImprovements] - 
                thicknessImprovement - 
                ceilingImprovement;
    
    return Math.round(LnTw);
  };

  // Calculate reverberation time
  const calculateReverberation = () => {
    // Sabine formula: T = 0.16 * V / A
    // Where: 
    // - T is the reverberation time in seconds
    // - V is the volume of the room in m³
    // - A is the equivalent absorption area in m²
    
    // Calculate the equivalent absorption area
    const wallsArea = reverberationData.surface * 0.65; // Estimation of walls area
    const ceilingArea = reverberationData.volume / reverberationData.surface; // Approximate ceiling area
    const floorArea = ceilingArea; // Floor area same as ceiling
    
    const totalAbsorption = 
      (wallsArea * reverberationData.alpha_murs) + 
      (ceilingArea * reverberationData.alpha_plafond) + 
      (floorArea * reverberationData.alpha_sol);
    
    // Calculate reverberation time
    const TR = 0.16 * reverberationData.volume / totalAbsorption;
    
    return TR.toFixed(2);
  };

  const calculators = {
    'acoustique-isolement': {
      title: 'Isolement aux bruits aériens',
      description: 'Calcul d\'isolement acoustique entre locaux',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="localEmission">Local d'émission</Label>
                <Select 
                  value={isolementData.localEmission}
                  onValueChange={val => setIsolementData({...isolementData, localEmission: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un local" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sejour">Séjour</SelectItem>
                    <SelectItem value="cuisine">Cuisine</SelectItem>
                    <SelectItem value="chambre">Chambre</SelectItem>
                    <SelectItem value="sdb">Salle de bain</SelectItem>
                    <SelectItem value="circulations">Circulations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="localReception">Local de réception</Label>
                <Select 
                  value={isolementData.localReception}
                  onValueChange={val => setIsolementData({...isolementData, localReception: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un local" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sejour">Séjour</SelectItem>
                    <SelectItem value="cuisine">Cuisine</SelectItem>
                    <SelectItem value="chambre">Chambre</SelectItem>
                    <SelectItem value="sdb">Salle de bain</SelectItem>
                    <SelectItem value="circulations">Circulations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isolementParoi">Indice d'affaiblissement Rw de la paroi (dB)</Label>
                <Input
                  id="isolementParoi"
                  type="number"
                  value={isolementData.isolementParoi}
                  onChange={e => setIsolementData({...isolementData, isolementParoi: parseInt(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="surfaceSeparation">Surface de la paroi séparative (m²)</Label>
                <Input
                  id="surfaceSeparation"
                  type="number"
                  value={isolementData.surfaceSeparation}
                  onChange={e => setIsolementData({...isolementData, surfaceSeparation: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="volumeReception">Volume du local de réception (m³)</Label>
                <Input
                  id="volumeReception"
                  type="number"
                  value={isolementData.volumeReception}
                  onChange={e => setIsolementData({...isolementData, volumeReception: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transmissionsLaterales">Transmissions latérales</Label>
                <Select 
                  value={isolementData.transmissionsLaterales}
                  onValueChange={val => setIsolementData({...isolementData, transmissionsLaterales: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau de transmissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faibles">Faibles</SelectItem>
                    <SelectItem value="moyennes">Moyennes</SelectItem>
                    <SelectItem value="fortes">Fortes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-lg font-medium mb-4">Résultat du calcul</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                <p className="text-sm text-gray-500">Isolement standardisé DnT,A</p>
                <p className="text-3xl font-bold text-indigo-600">{calculateIsolement()} dB</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                <p className="text-sm text-gray-500">Exigence réglementaire</p>
                <p className="text-3xl font-bold text-indigo-600">53 dB</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className={`text-sm ${calculateIsolement() >= 53 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {calculateIsolement() >= 53 ? '✓ Conforme à la réglementation' : '✗ Non conforme à la réglementation'}
              </p>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>Note: Ce calcul est une estimation simplifiée basée sur la norme EN 12354.</p>
            <p>Pour un calcul précis, consultez un bureau d'études en acoustique.</p>
          </div>
        </div>
      )
    },
    'acoustique-impact': {
      title: 'Bruits d\'impact',
      description: 'Calcul de niveau de bruit d\'impact',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="typePlancher">Type de plancher</Label>
                <Select 
                  value={impactData.typePlancher}
                  onValueChange={val => setImpactData({...impactData, typePlancher: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beton">Béton</SelectItem>
                    <SelectItem value="bois">Bois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="epaisseur">Épaisseur du plancher (cm)</Label>
                <Input
                  id="epaisseur"
                  type="number"
                  value={impactData.epaisseur}
                  onChange={e => setImpactData({...impactData, epaisseur: parseInt(e.target.value)})}
                  min="5"
                  max="50"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="revetement">Revêtement de sol</Label>
                <Select 
                  value={impactData.revetement}
                  onValueChange={val => setImpactData({...impactData, revetement: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un revêtement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carrelage">Carrelage</SelectItem>
                    <SelectItem value="parquet">Parquet</SelectItem>
                    <SelectItem value="pvc">Sol PVC</SelectItem>
                    <SelectItem value="moquette">Moquette</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="faux_plafond"
                  checked={impactData.faux_plafond}
                  onChange={e => setImpactData({...impactData, faux_plafond: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Label htmlFor="faux_plafond">Faux-plafond acoustique dans le local de réception</Label>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-lg font-medium mb-4">Résultat du calcul</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                <p className="text-sm text-gray-500">Niveau de bruit d'impact L'nT,w</p>
                <p className="text-3xl font-bold text-indigo-600">{calculateImpact()} dB</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                <p className="text-sm text-gray-500">Exigence réglementaire</p>
                <p className="text-3xl font-bold text-indigo-600">≤ 58 dB</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className={`text-sm ${calculateImpact() <= 58 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {calculateImpact() <= 58 ? '✓ Conforme à la réglementation' : '✗ Non conforme à la réglementation'}
              </p>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>Note: Ce calcul est une estimation simplifiée.</p>
            <p>Pour un calcul précis, des mesures sur site sont nécessaires.</p>
          </div>
        </div>
      )
    },
    'acoustique-reverberation': {
      title: 'Temps de réverbération',
      description: 'Calcul du temps de réverbération d\'un local',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type de local</Label>
                <Select 
                  value={reverberationData.type}
                  onValueChange={val => setReverberationData({...reverberationData, type: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classe">Salle de classe</SelectItem>
                    <SelectItem value="bureau">Bureau</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="salle_reunion">Salle de réunion</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="volume">Volume du local (m³)</Label>
                <Input
                  id="volume"
                  type="number"
                  value={reverberationData.volume}
                  onChange={e => setReverberationData({...reverberationData, volume: parseInt(e.target.value)})}
                  min="10"
                  max="1000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="surface">Surface au sol (m²)</Label>
                <Input
                  id="surface"
                  type="number"
                  value={reverberationData.surface}
                  onChange={e => setReverberationData({...reverberationData, surface: parseInt(e.target.value)})}
                  min="5"
                  max="500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="block mb-2">Coefficients d'absorption (α)</Label>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Label htmlFor="alpha_murs" className="text-sm">Murs</Label>
                    <Input
                      id="alpha_murs"
                      type="number"
                      value={reverberationData.alpha_murs}
                      onChange={e => setReverberationData({...reverberationData, alpha_murs: parseFloat(e.target.value)})}
                      min="0.01"
                      max="1"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Label htmlFor="alpha_plafond" className="text-sm">Plafond</Label>
                    <Input
                      id="alpha_plafond"
                      type="number"
                      value={reverberationData.alpha_plafond}
                      onChange={e => setReverberationData({...reverberationData, alpha_plafond: parseFloat(e.target.value)})}
                      min="0.01"
                      max="1"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Label htmlFor="alpha_sol" className="text-sm">Sol</Label>
                    <Input
                      id="alpha_sol"
                      type="number"
                      value={reverberationData.alpha_sol}
                      onChange={e => setReverberationData({...reverberationData, alpha_sol: parseFloat(e.target.value)})}
                      min="0.01"
                      max="1"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-lg font-medium mb-4">Résultat du calcul</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                <p className="text-sm text-gray-500">Temps de réverbération Tr</p>
                <p className="text-3xl font-bold text-indigo-600">{calculateReverberation()} s</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                <p className="text-sm text-gray-500">Valeur cible</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {reverberationData.type === 'classe' ? '≤ 0.6 s' : 
                   reverberationData.type === 'bureau' ? '≤ 0.8 s' : 
                   reverberationData.type === 'restaurant' ? '≤ 1.2 s' : 
                   '0.4 - 0.8 s'}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 font-medium">
                Formule utilisée: <span className="font-mono">Tr = 0.16 × V / A</span> (Formule de Sabine)
              </p>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>Note: Ce calcul est basé sur la formule de Sabine et donne une approximation du temps de réverbération.</p>
            <p>Pour une évaluation précise, des mesures sur site sont recommandées.</p>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-6">
        <h3 className="text-indigo-800 font-medium flex items-center gap-2 mb-2">
          <Volume className="h-5 w-5" />
          Réglementation Acoustique
        </h3>
        <p className="text-indigo-700 text-sm">
          Cette section présente les règles, normes et données techniques relatives à l'acoustique du bâtiment.
          Consultez les exigences pour différents types de bâtiments et leurs applications.
        </p>
      </div>
      
      <Tabs value={acoustiqueTab} onValueChange={setAcoustiqueTab} className="mt-6">
        <TabsList className="mb-6 bg-indigo-50">
          <TabsTrigger value="logement" className="data-[state=active]:bg-white">
            <Home className="h-4 w-4 mr-2" />
            <span>Logement</span>
          </TabsTrigger>
          <TabsTrigger value="erp" className="data-[state=active]:bg-white">
            <Store className="h-4 w-4 mr-2" />
            <span>ERP</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-white">
            <School className="h-4 w-4 mr-2" />
            <span>Établissements d'enseignement</span>
          </TabsTrigger>
          <TabsTrigger value="bureau" className="data-[state=active]:bg-white">
            <Building className="h-4 w-4 mr-2" />
            <span>Bureaux</span>
          </TabsTrigger>
        </TabsList>

        {Object.entries(acoustiqueData).map(([key, data]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{data.title}</CardTitle>
                  <CardDescription>
                    {data.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.sections.slice(0, 2).map((section) => (
                    <div key={section.id}>
                      <h4 className="font-medium text-sm">{section.title}</h4>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        {section.rules.map((rule, rIndex) => (
                          <li key={rIndex}><strong>{rule.title} :</strong> {rule.content}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownload(`${key}-details`, `Réglementation acoustique ${key} détaillée`)}
                    disabled={downloadingId === `${key}-details`}
                  >
                    {downloadingId === `${key}-details` ? (
                      <span className="flex items-center">Téléchargement...</span>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger les détails
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Solutions techniques</CardTitle>
                  <CardDescription>
                    Mise en application pour {key === 'logement' ? 'logements' : 
                                            key === 'erp' ? 'ERP' : 
                                            key === 'education' ? 'établissements d\'enseignement' : 'bureaux'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.sections.slice(2, 3).map((section) => (
                      <div key={section.id}>
                        <h4 className="font-medium text-sm">{section.title}</h4>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          {section.rules.map((rule, rIndex) => (
                            <li key={rIndex}>
                              <div className={`p-3 rounded-md ${
                                rule.type === 'warning' ? 'bg-amber-50' : 
                                rule.type === 'tip' ? 'bg-blue-50' : 'bg-green-50'
                              }`}>
                                <strong>{rule.title}</strong>: {rule.content}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    
                    <p className="text-sm mt-3 text-gray-600">
                      Pour des performances optimales, combinez différentes solutions selon les contraintes du projet.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownload(`${key}-guide`, `Guide acoustique ${key}`)}
                    disabled={downloadingId === `${key}-guide`}
                  >
                    {downloadingId === `${key}-guide` ? (
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
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Outils de calcul acoustique</CardTitle>
                <CardDescription>
                  Calculateurs et simulateurs pour l'acoustique du bâtiment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium">Isolement aux bruits aériens</h3>
                    <p className="text-sm text-gray-600 mt-1">Calcul d'isolement entre locaux</p>
                    <div className="mt-2 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOpenCalculator('acoustique-isolement')}
                      >
                        <Calculator className="h-4 w-4 mr-1" />
                        Calculer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleDownload('acoustique-isolement-doc', 'Guide isolement acoustique')}
                        disabled={downloadingId === 'acoustique-isolement-doc'}
                      >
                        {downloadingId === 'acoustique-isolement-doc' ? 'En cours...' : (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Guide
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium">Bruits d'impact</h3>
                    <p className="text-sm text-gray-600 mt-1">Calcul niveau de bruit d'impact</p>
                    <div className="mt-2 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOpenCalculator('acoustique-impact')}
                      >
                        <Calculator className="h-4 w-4 mr-1" />
                        Calculer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleDownload('acoustique-impact-doc', 'Guide bruits d\'impact')}
                        disabled={downloadingId === 'acoustique-impact-doc'}
                      >
                        {downloadingId === 'acoustique-impact-doc' ? 'En cours...' : (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Guide
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium">Temps de réverbération</h3>
                    <p className="text-sm text-gray-600 mt-1">Calcul de réverbération d'un local</p>
                    <div className="mt-2 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOpenCalculator('acoustique-reverberation')}
                      >
                        <Calculator className="h-4 w-4 mr-1" />
                        Calculer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleDownload('acoustique-reverberation-doc', 'Guide réverbération')}
                        disabled={downloadingId === 'acoustique-reverberation-doc'}
                      >
                        {downloadingId === 'acoustique-reverberation-doc' ? 'En cours...' : (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Guide
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DTU et normes applicables</CardTitle>
                <CardDescription>
                  Documents techniques unifiés et normes acoustiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {acoustiqueDTUs.map((dtu) => (
                    <div 
                      key={dtu.id} 
                      onClick={() => handleOpenDTU(dtu)}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{dtu.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{dtu.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {dtu.category}
                        </Badge>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="ghost">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(`dtu-${dtu.id}`, dtu.title);
                          }}
                          disabled={downloadingId === `dtu-${dtu.id}`}
                        >
                          {downloadingId === `dtu-${dtu.id}` ? 'En cours...' : (
                            <>
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Dialog de détail DTU */}
      <DTUDetailDialog
        dtu={selectedDTU}
        isOpen={isDTUDialogOpen}
        onOpenChange={setIsDTUDialogOpen}
      />

      {/* Calculator Dialogs */}
      <Dialog open={!!openCalculator} onOpenChange={() => setOpenCalculator(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {openCalculator && calculators[openCalculator as keyof typeof calculators]?.title}
            </DialogTitle>
            <DialogDescription>
              {openCalculator && typeof calculators[openCalculator as keyof typeof calculators]?.description === 'string' 
                ? calculators[openCalculator as keyof typeof calculators]?.description 
                : ''}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            {openCalculator && calculators[openCalculator as keyof typeof calculators]?.content}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
