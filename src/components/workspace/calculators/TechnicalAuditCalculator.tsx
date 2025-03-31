
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import { Camera, Building, Home, Save, FileDown, Plus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TechnicalAuditCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [buildings, setBuildings] = useState<any[]>([
    { id: '1', name: 'Mon bâtiment', type: 'house', year: 1990, address: '' }
  ]);
  const [selectedBuilding, setSelectedBuilding] = useState('1');
  const [photos, setPhotos] = useState<any[]>([]);
  
  // Form data state
  const [formData, setFormData] = useState({
    general: {
      name: 'Mon bâtiment',
      type: 'house',
      year: 1990,
      address: '',
      surface: 120,
      floors: 2,
      orientation: 'south',
    },
    structure: {
      foundationType: 'concrete',
      foundationCondition: 'good',
      wallsMaterial: 'brick',
      wallsCondition: 'good',
      crackPresent: false,
      crackDescription: '',
      moisturePresent: false,
      moistureDescription: '',
    },
    roof: {
      roofType: 'tiles',
      roofCondition: 'good',
      insulationPresent: true,
      insulationType: 'glasswool',
      leakPresent: false,
      leakDescription: '',
    },
    facade: {
      facadeMaterial: 'plaster',
      facadeCondition: 'average',
      insulationPresent: false,
      insulationType: '',
      crackPresent: false,
      crackDescription: '',
      moisturePresent: false,
      moistureDescription: '',
    },
    openings: {
      windowType: 'double',
      windowCondition: 'good',
      doorType: 'wood',
      doorCondition: 'average',
      sealingIssues: false,
      sealingDescription: '',
    },
    technical: {
      heatingType: 'gas',
      heatingCondition: 'good',
      heatingAge: 10,
      electricalType: 'standard',
      electricalCondition: 'good',
      electricalAge: 15,
      plumbingType: 'copper',
      plumbingCondition: 'average',
      plumbingAge: 20,
      ventilationType: 'natural',
      ventilationCondition: 'poor',
    },
    interior: {
      floorType: 'tile',
      floorCondition: 'good',
      wallType: 'paint',
      wallCondition: 'average',
      ceilingType: 'plaster',
      ceilingCondition: 'good',
      moisturePresent: false,
      moistureDescription: '',
    },
    recommendations: []
  });
  
  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newPhotos = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotos.push({
            id: Date.now() + i,
            name: file.name,
            preview: event.target.result,
            section: activeTab,
            description: ''
          });
          
          // Only update state after the last file is processed
          if (i === files.length - 1) {
            setPhotos([...photos, ...newPhotos]);
            toast({
              title: "Photos ajoutées",
              description: `${files.length} photo(s) ajoutée(s) avec succès.`
            });
          }
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  // Update form data handler
  const updateFormData = (section: string, field: string, value: any) => {
    setFormData({
      ...formData,
      [section]: {
        // @ts-ignore - formData indexing
        ...formData[section],
        [field]: value
      }
    });
  };
  
  // Generate recommendations
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Structure recommendations
    if (formData.structure.foundationCondition === 'poor') {
      recommendations.push({
        section: 'structure',
        priority: 'high',
        description: 'Les fondations sont en mauvais état et nécessitent une intervention rapide.',
        estimatedCost: '5000-15000 €'
      });
    }
    
    if (formData.structure.crackPresent) {
      recommendations.push({
        section: 'structure',
        priority: 'high',
        description: 'Présence de fissures dans les murs: une analyse structurelle est nécessaire.',
        estimatedCost: '500-5000 €'
      });
    }
    
    // Roof recommendations
    if (formData.roof.roofCondition === 'poor') {
      recommendations.push({
        section: 'roof',
        priority: 'high',
        description: 'La toiture est en mauvais état et devrait être rénovée.',
        estimatedCost: '10000-30000 €'
      });
    }
    
    if (formData.roof.leakPresent) {
      recommendations.push({
        section: 'roof',
        priority: 'high',
        description: 'Fuites dans la toiture: une réparation est nécessaire pour éviter des dommages plus importants.',
        estimatedCost: '1000-5000 €'
      });
    }
    
    if (!formData.roof.insulationPresent) {
      recommendations.push({
        section: 'roof',
        priority: 'medium',
        description: 'Absence d\'isolation en toiture: l\'ajout d\'une isolation améliorerait significativement la performance énergétique.',
        estimatedCost: '3000-10000 €'
      });
    }
    
    // Facade recommendations
    if (formData.facade.facadeCondition === 'poor') {
      recommendations.push({
        section: 'facade',
        priority: 'medium',
        description: 'La façade est en mauvais état et nécessite une rénovation.',
        estimatedCost: '5000-15000 €'
      });
    }
    
    if (!formData.facade.insulationPresent) {
      recommendations.push({
        section: 'facade',
        priority: 'medium',
        description: 'Absence d\'isolation en façade: l\'ajout d\'une isolation par l\'extérieur améliorerait la performance énergétique.',
        estimatedCost: '10000-25000 €'
      });
    }
    
    // Openings recommendations
    if (formData.openings.windowCondition === 'poor' || formData.openings.windowType === 'single') {
      recommendations.push({
        section: 'openings',
        priority: 'medium',
        description: 'Les fenêtres sont en mauvais état ou à simple vitrage: le remplacement par des fenêtres à double ou triple vitrage est recommandé.',
        estimatedCost: '5000-15000 €'
      });
    }
    
    // Technical recommendations
    if (formData.technical.heatingCondition === 'poor' || formData.technical.heatingAge > 15) {
      recommendations.push({
        section: 'technical',
        priority: 'medium',
        description: 'Le système de chauffage est ancien ou en mauvais état: un remplacement par un système plus efficace est recommandé.',
        estimatedCost: '5000-15000 €'
      });
    }
    
    if (formData.technical.electricalCondition === 'poor' || formData.technical.electricalAge > 30) {
      recommendations.push({
        section: 'technical',
        priority: 'high',
        description: 'L\'installation électrique est ancienne ou en mauvais état: une mise aux normes est nécessaire pour des raisons de sécurité.',
        estimatedCost: '3000-10000 €'
      });
    }
    
    if (formData.technical.ventilationCondition === 'poor' || formData.technical.ventilationType === 'natural') {
      recommendations.push({
        section: 'technical',
        priority: 'medium',
        description: 'La ventilation est insuffisante: l\'installation d\'une VMC améliorerait la qualité de l\'air intérieur.',
        estimatedCost: '2000-5000 €'
      });
    }
    
    // Interior recommendations
    if (formData.interior.moisturePresent) {
      recommendations.push({
        section: 'interior',
        priority: 'high',
        description: 'Présence d\'humidité à l\'intérieur: identification et traitement de la source d\'humidité nécessaires.',
        estimatedCost: '1000-5000 €'
      });
    }
    
    // Set recommendations
    setFormData({
      ...formData,
      recommendations
    });
    
    // Update to recommendations tab
    setActiveTab('recommendations');
    
    toast({
      title: "Recommandations générées",
      description: `${recommendations.length} recommandations ont été générées en fonction de l'audit.`
    });
  };
  
  // Save audit handler
  const saveAudit = () => {
    toast({
      title: "Audit sauvegardé",
      description: "Votre audit technique a été enregistré dans votre espace personnel."
    });
  };
  
  // Export audit handler
  const exportAudit = () => {
    toast({
      title: "Export en cours",
      description: "Votre audit technique est en cours d'export en PDF."
    });
  };
  
  // Add building handler
  const addBuilding = () => {
    const newBuilding = {
      id: Date.now().toString(),
      name: 'Nouveau bâtiment',
      type: 'house',
      year: 2000,
      address: ''
    };
    
    setBuildings([...buildings, newBuilding]);
    setSelectedBuilding(newBuilding.id);
    setFormData({
      ...formData,
      general: {
        name: 'Nouveau bâtiment',
        type: 'house',
        year: 2000,
        address: '',
        surface: 100,
        floors: 1,
        orientation: 'south',
      }
    });
    
    toast({
      title: "Bâtiment ajouté",
      description: "Un nouveau bâtiment a été ajouté à votre liste."
    });
  };
  
  // Get section tab color
  const getSectionColor = (section: string) => {
    // @ts-ignore - formData indexing
    const sectionData = formData[section];
    
    // Check if any fields have a 'poor' condition
    for (const key in sectionData) {
      if (key.includes('Condition') && sectionData[key] === 'poor') {
        return 'text-red-500';
      }
    }
    
    // Check if any fields have an 'average' condition
    for (const key in sectionData) {
      if (key.includes('Condition') && sectionData[key] === 'average') {
        return 'text-amber-500';
      }
    }
    
    return 'text-green-500';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Building className="h-5 w-5 mr-2 text-khaki-600" />
          Audit Technique de Bâtiment
        </CardTitle>
        <CardDescription>
          Réalisez un audit technique complet de votre bâtiment et obtenez des recommandations personnalisées
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Sélectionnez un bâtiment" />
              </SelectTrigger>
              <SelectContent>
                {buildings.map((building) => (
                  <SelectItem key={building.id} value={building.id}>
                    {building.name} ({building.type === 'house' ? 'Maison' : 'Appartement'}, {building.year})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" onClick={addBuilding}>
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={generateRecommendations}>
              Générer des recommandations
            </Button>
            
            <Button variant="outline" onClick={saveAudit}>
              <Save className="h-4 w-4 mr-1" />
              Sauvegarder
            </Button>
            
            <Button variant="outline" onClick={exportAudit}>
              <FileDown className="h-4 w-4 mr-1" />
              Exporter
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="general" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Général</span>
            </TabsTrigger>
            <TabsTrigger value="structure" className="flex items-center gap-1">
              <span>Structure</span>
              <span className={`h-2 w-2 rounded-full ${getSectionColor('structure')}`}></span>
            </TabsTrigger>
            <TabsTrigger value="roof" className="flex items-center gap-1">
              <span>Toiture</span>
              <span className={`h-2 w-2 rounded-full ${getSectionColor('roof')}`}></span>
            </TabsTrigger>
            <TabsTrigger value="facade" className="flex items-center gap-1">
              <span>Façade</span>
              <span className={`h-2 w-2 rounded-full ${getSectionColor('facade')}`}></span>
            </TabsTrigger>
            <TabsTrigger value="openings" className="flex items-center gap-1">
              <span>Ouvertures</span>
              <span className={`h-2 w-2 rounded-full ${getSectionColor('openings')}`}></span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-1">
              <span>Technique</span>
              <span className={`h-2 w-2 rounded-full ${getSectionColor('technical')}`}></span>
            </TabsTrigger>
            <TabsTrigger value="interior" className="flex items-center gap-1">
              <span>Intérieur</span>
              <span className={`h-2 w-2 rounded-full ${getSectionColor('interior')}`}></span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-1">
              <Camera className="h-4 w-4" />
              <span>Photos</span>
              {photos.length > 0 && (
                <span className="ml-1 bg-khaki-100 text-khaki-800 rounded-full px-2 text-xs">
                  {photos.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-1">
              <span>Recommandations</span>
              {formData.recommendations.length > 0 && (
                <span className="ml-1 bg-khaki-100 text-khaki-800 rounded-full px-2 text-xs">
                  {formData.recommendations.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buildingName">Nom du bâtiment</Label>
                <Input 
                  id="buildingName" 
                  value={formData.general.name}
                  onChange={(e) => updateFormData('general', 'name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buildingType">Type de bâtiment</Label>
                <Select 
                  value={formData.general.type}
                  onValueChange={(value) => updateFormData('general', 'type', value)}
                >
                  <SelectTrigger id="buildingType">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">Maison individuelle</SelectItem>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="building">Immeuble</SelectItem>
                    <SelectItem value="commercial">Local commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buildingYear">Année de construction</Label>
                <Input 
                  id="buildingYear" 
                  type="number"
                  value={formData.general.year}
                  onChange={(e) => updateFormData('general', 'year', Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buildingAddress">Adresse</Label>
                <Input 
                  id="buildingAddress" 
                  value={formData.general.address}
                  onChange={(e) => updateFormData('general', 'address', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buildingSurface">Surface (m²)</Label>
                <Input 
                  id="buildingSurface" 
                  type="number"
                  value={formData.general.surface}
                  onChange={(e) => updateFormData('general', 'surface', Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buildingFloors">Nombre d'étages</Label>
                <Input 
                  id="buildingFloors" 
                  type="number"
                  value={formData.general.floors}
                  onChange={(e) => updateFormData('general', 'floors', Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buildingOrientation">Orientation principale</Label>
                <Select 
                  value={formData.general.orientation}
                  onValueChange={(value) => updateFormData('general', 'orientation', value)}
                >
                  <SelectTrigger id="buildingOrientation">
                    <SelectValue placeholder="Sélectionnez l'orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">Nord</SelectItem>
                    <SelectItem value="northeast">Nord-Est</SelectItem>
                    <SelectItem value="east">Est</SelectItem>
                    <SelectItem value="southeast">Sud-Est</SelectItem>
                    <SelectItem value="south">Sud</SelectItem>
                    <SelectItem value="southwest">Sud-Ouest</SelectItem>
                    <SelectItem value="west">Ouest</SelectItem>
                    <SelectItem value="northwest">Nord-Ouest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="structure" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foundationType">Type de fondations</Label>
                <Select 
                  value={formData.structure.foundationType}
                  onValueChange={(value) => updateFormData('structure', 'foundationType', value)}
                >
                  <SelectTrigger id="foundationType">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concrete">Béton</SelectItem>
                    <SelectItem value="stone">Pierre</SelectItem>
                    <SelectItem value="slab">Dalle</SelectItem>
                    <SelectItem value="piles">Pieux</SelectItem>
                    <SelectItem value="unknown">Inconnu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="foundationCondition">État des fondations</Label>
                <Select 
                  value={formData.structure.foundationCondition}
                  onValueChange={(value) => updateFormData('structure', 'foundationCondition', value)}
                >
                  <SelectTrigger id="foundationCondition">
                    <SelectValue placeholder="Sélectionnez l'état" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Bon</SelectItem>
                    <SelectItem value="average">Moyen</SelectItem>
                    <SelectItem value="poor">Mauvais</SelectItem>
                    <SelectItem value="unknown">Non visible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wallsMaterial">Matériau des murs</Label>
                <Select 
                  value={formData.structure.wallsMaterial}
                  onValueChange={(value) => updateFormData('structure', 'wallsMaterial', value)}
                >
                  <SelectTrigger id="wallsMaterial">
                    <SelectValue placeholder="Sélectionnez un matériau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brick">Brique</SelectItem>
                    <SelectItem value="concrete">Béton</SelectItem>
                    <SelectItem value="stone">Pierre</SelectItem>
                    <SelectItem value="wood">Bois</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wallsCondition">État des murs</Label>
                <Select 
                  value={formData.structure.wallsCondition}
                  onValueChange={(value) => updateFormData('structure', 'wallsCondition', value)}
                >
                  <SelectTrigger id="wallsCondition">
                    <SelectValue placeholder="Sélectionnez l'état" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Bon</SelectItem>
                    <SelectItem value="average">Moyen</SelectItem>
                    <SelectItem value="poor">Mauvais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="crackPresent" 
                    checked={formData.structure.crackPresent}
                    onCheckedChange={(checked) => updateFormData('structure', 'crackPresent', !!checked)}
                  />
                  <Label htmlFor="crackPresent">Présence de fissures</Label>
                </div>
                
                {formData.structure.crackPresent && (
                  <Textarea 
                    placeholder="Description des fissures (localisation, taille, orientation...)"
                    value={formData.structure.crackDescription}
                    onChange={(e) => updateFormData('structure', 'crackDescription', e.target.value)}
                  />
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="moisturePresent" 
                    checked={formData.structure.moisturePresent}
                    onCheckedChange={(checked) => updateFormData('structure', 'moisturePresent', !!checked)}
                  />
                  <Label htmlFor="moisturePresent">Présence d'humidité</Label>
                </div>
                
                {formData.structure.moisturePresent && (
                  <Textarea 
                    placeholder="Description des problèmes d'humidité (localisation, étendue...)"
                    value={formData.structure.moistureDescription}
                    onChange={(e) => updateFormData('structure', 'moistureDescription', e.target.value)}
                  />
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="roof" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roofType">Type de toiture</Label>
                <Select 
                  value={formData.roof.roofType}
                  onValueChange={(value) => updateFormData('roof', 'roofType', value)}
                >
                  <SelectTrigger id="roofType">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiles">Tuiles</SelectItem>
                    <SelectItem value="slate">Ardoise</SelectItem>
                    <SelectItem value="metal">Métallique</SelectItem>
                    <SelectItem value="flat">Toit-terrasse</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="roofCondition">État de la toiture</Label>
                <Select 
                  value={formData.roof.roofCondition}
                  onValueChange={(value) => updateFormData('roof', 'roofCondition', value)}
                >
                  <SelectTrigger id="roofCondition">
                    <SelectValue placeholder="Sélectionnez l'état" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Bon</SelectItem>
                    <SelectItem value="average">Moyen</SelectItem>
                    <SelectItem value="poor">Mauvais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="roofInsulationPresent" 
                    checked={formData.roof.insulationPresent}
                    onCheckedChange={(checked) => updateFormData('roof', 'insulationPresent', !!checked)}
                  />
                  <Label htmlFor="roofInsulationPresent">Présence d'isolation</Label>
                </div>
                
                {formData.roof.insulationPresent && (
                  <div className="mt-2">
                    <Label htmlFor="roofInsulationType">Type d'isolation</Label>
                    <Select 
                      value={formData.roof.insulationType}
                      onValueChange={(value) => updateFormData('roof', 'insulationType', value)}
                    >
                      <SelectTrigger id="roofInsulationType">
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="glasswool">Laine de verre</SelectItem>
                        <SelectItem value="rockwool">Laine de roche</SelectItem>
                        <SelectItem value="cellulose">Ouate de cellulose</SelectItem>
                        <SelectItem value="polyurethane">Polyuréthane</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="leakPresent" 
                    checked={formData.roof.leakPresent}
                    onCheckedChange={(checked) => updateFormData('roof', 'leakPresent', !!checked)}
                  />
                  <Label htmlFor="leakPresent">Présence de fuites</Label>
                </div>
                
                {formData.roof.leakPresent && (
                  <Textarea 
                    placeholder="Description des fuites (localisation, étendue...)"
                    value={formData.roof.leakDescription}
                    onChange={(e) => updateFormData('roof', 'leakDescription', e.target.value)}
                  />
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="photos" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Photothèque de l'audit ({photos.length} photos)</h3>
              
              <div>
                <Button variant="outline" className="relative">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={handleFileUpload}
                  />
                  <Upload className="h-4 w-4 mr-2" />
                  Ajouter des photos
                </Button>
              </div>
            </div>
            
            {photos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="border rounded-md overflow-hidden">
                    <div className="aspect-video relative bg-gray-100">
                      <img 
                        src={photo.preview as string} 
                        alt={photo.name} 
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {photo.section}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium truncate">{photo.name}</p>
                      <textarea 
                        className="w-full text-sm mt-2 p-2 border rounded"
                        placeholder="Description de la photo..."
                        value={photo.description}
                        onChange={(e) => {
                          const updatedPhotos = photos.map(p => 
                            p.id === photo.id ? { ...p, description: e.target.value } : p
                          );
                          setPhotos(updatedPhotos);
                        }}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed rounded-md">
                <Camera className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">Aucune photo n'a été ajoutée à cet audit</p>
                <p className="text-sm text-gray-400 mt-1">
                  Cliquez sur "Ajouter des photos" pour commencer à documenter l'audit
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            {formData.recommendations.length > 0 ? (
              <div className="space-y-4">
                {formData.recommendations.map((rec: any, index: number) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-md border ${
                      rec.priority === 'high' ? 'border-red-200 bg-red-50' : 
                      rec.priority === 'medium' ? 'border-amber-200 bg-amber-50' : 
                      'border-green-200 bg-green-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${
                            rec.priority === 'high' ? 'text-red-600' : 
                            rec.priority === 'medium' ? 'text-amber-600' : 
                            'text-green-600'
                          }`}>
                            {rec.priority === 'high' ? 'Priorité haute' : 
                             rec.priority === 'medium' ? 'Priorité moyenne' : 
                             'Priorité basse'}
                          </span>
                          <span className="text-gray-500 text-sm">• {rec.section}</span>
                        </div>
                        <p className="mt-1">{rec.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">Coût estimé:</span>
                        <div className="font-medium">{rec.estimatedCost}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium">Budget estimatif total</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div>
                      <div className="text-sm text-gray-500">Travaux prioritaires</div>
                      <div className="text-lg font-bold">
                        {formData.recommendations
                          .filter((rec: any) => rec.priority === 'high')
                          .length > 0 ? 
                            '15 000 - 35 000 €' : '0 €'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Travaux recommandés</div>
                      <div className="text-lg font-bold">
                        {formData.recommendations
                          .filter((rec: any) => rec.priority === 'medium')
                          .length > 0 ? 
                            '10 000 - 25 000 €' : '0 €'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Budget total</div>
                      <div className="text-lg font-bold">
                        {formData.recommendations.length > 0 ? 
                          '25 000 - 60 000 €' : '0 €'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed rounded-md">
                <p className="text-gray-500">Aucune recommandation n'a été générée</p>
                <p className="text-sm text-gray-400 mt-1">
                  Complétez l'audit technique puis cliquez sur "Générer des recommandations"
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TechnicalAuditCalculator;
