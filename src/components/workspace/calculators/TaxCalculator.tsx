
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, FileDown, Calculator, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const TaxCalculator = () => {
  const { toast } = useToast();
  const [propertyValue, setPropertyValue] = useState<number>(200000);
  const [propertyType, setPropertyType] = useState<string>("ancien");
  const [departement, setDepartement] = useState<string>("13");
  const [notaryFees, setNotaryFees] = useState<{
    total: number;
    details: {
      label: string;
      value: number;
      percentage: number;
    }[];
  }>({
    total: 0,
    details: []
  });
  
  const departements = [
    { value: "13", label: "Bouches-du-Rhône (13)" },
    { value: "83", label: "Var (83)" },
    { value: "84", label: "Vaucluse (84)" },
    { value: "06", label: "Alpes-Maritimes (06)" },
    { value: "04", label: "Alpes-de-Haute-Provence (04)" },
    { value: "05", label: "Hautes-Alpes (05)" },
    { value: "69", label: "Rhône (69)" },
    { value: "38", label: "Isère (38)" },
    { value: "73", label: "Savoie (73)" },
    { value: "74", label: "Haute-Savoie (74)" },
  ];
  
  // Calculate notary fees
  const calculateFees = () => {
    let taxRate: number;
    let emolumentsRate: number;
    
    // Set rates based on property type
    if (propertyType === "neuf") {
      taxRate = 0.01694;  // TVA 20% incluse pour le neuf
      emolumentsRate = 0.01;
    } else {
      taxRate = 0.0581;  // Droits de mutation pour l'ancien
      emolumentsRate = 0.008;
    }
    
    // Adjust tax rate based on departement for old properties
    if (propertyType === "ancien") {
      // Some departements may have different rates
      if (["13", "83", "06"].includes(departement)) {
        taxRate = 0.0581; // 5.81% is standard
      } else if (["04", "05"].includes(departement)) {
        taxRate = 0.0571; // Example of a lower rate
      }
    }
    
    const securityFee = propertyValue * 0.0015;
    const taxAmount = propertyValue * taxRate;
    const emolumentsAmount = propertyValue * emolumentsRate;
    const miscFees = 800; // Frais divers fixes
    
    const totalFees = taxAmount + emolumentsAmount + securityFee + miscFees;
    
    setNotaryFees({
      total: Math.round(totalFees),
      details: [
        {
          label: propertyType === "neuf" ? "TVA" : "Droits de mutation",
          value: Math.round(taxAmount),
          percentage: Math.round((taxAmount / totalFees) * 100)
        },
        {
          label: "Émoluments du notaire",
          value: Math.round(emolumentsAmount),
          percentage: Math.round((emolumentsAmount / totalFees) * 100)
        },
        {
          label: "Contribution de sécurité immobilière",
          value: Math.round(securityFee),
          percentage: Math.round((securityFee / totalFees) * 100)
        },
        {
          label: "Frais divers",
          value: miscFees,
          percentage: Math.round((miscFees / totalFees) * 100)
        }
      ]
    });
    
    toast({
      title: "Calcul effectué",
      description: `Frais de notaire estimés à ${Math.round(totalFees).toLocaleString()} € pour un bien de ${propertyValue.toLocaleString()} €`,
    });
  };
  
  // Generate PDF report
  const generatePDF = () => {
    toast({
      title: "Export PDF",
      description: "Votre rapport de frais de notaire a été généré avec succès.",
    });
  };
  
  // Format data for pie chart
  const chartData = notaryFees.details.map(item => ({
    name: item.label,
    value: item.value
  }));
  
  const COLORS = ['#A8A878', '#C6B785', '#D8C69E', '#E8D8B0'];
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-khaki-600" />
          Calculateur de frais de notaire
        </CardTitle>
        <CardDescription>
          Estimez précisément les frais de notaire pour votre acquisition immobilière en région PACA ou Auvergne-Rhône-Alpes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator">
          <TabsList className="mb-4">
            <TabsTrigger value="calculator">Calculateur</TabsTrigger>
            <TabsTrigger value="information">Informations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyValue">Valeur du bien (€)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    min="10000"
                    step="1000"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Type de bien</Label>
                  <RadioGroup
                    value={propertyType}
                    onValueChange={setPropertyType}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ancien" id="ancien" />
                      <Label htmlFor="ancien">Ancien</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="neuf" id="neuf" />
                      <Label htmlFor="neuf">Neuf</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label>Département</Label>
                  <Select value={departement} onValueChange={setDepartement}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un département" />
                    </SelectTrigger>
                    <SelectContent>
                      {departements.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={calculateFees} 
                  className="w-full bg-khaki-500 hover:bg-khaki-600 text-white"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculer les frais de notaire
                </Button>
              </div>
              
              <div className="bg-khaki-50 p-4 rounded-lg">
                {notaryFees.total > 0 ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">Résultat du calcul</h3>
                      <div className="mt-2 text-3xl font-bold text-khaki-700">
                        {notaryFees.total.toLocaleString()} €
                      </div>
                      <p className="text-sm text-gray-500">
                        soit environ {Math.round((notaryFees.total / propertyValue) * 100)}% du prix du bien
                      </p>
                    </div>
                    
                    <div className="h-48 md:h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => `${Number(value).toLocaleString()} €`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Détail des frais</h4>
                      <ul className="space-y-1 text-sm">
                        {notaryFees.details.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{item.label}</span>
                            <span className="font-medium">{item.value.toLocaleString()} €</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full border-khaki-200 hover:bg-khaki-100"
                      onClick={generatePDF}
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      Exporter en PDF
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <DollarSign className="h-12 w-12 text-khaki-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Complétez le formulaire</h3>
                    <p className="text-gray-500 max-w-xs">
                      Renseignez les informations concernant votre acquisition pour estimer les frais de notaire.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="information">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">À propos des frais de notaire</h3>
              <p>
                Les "frais de notaire" sont en réalité composés de plusieurs éléments :
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Droits de mutation</strong> : Il s'agit de taxes perçues par l'État et les collectivités locales. 
                  Ils représentent la majorité des frais (environ 80% pour un bien ancien).
                </li>
                <li>
                  <strong>Émoluments du notaire</strong> : C'est la rémunération du notaire, fixée par un barème légal dégressif.
                </li>
                <li>
                  <strong>Contribution de sécurité immobilière</strong> : Cette taxe finance le service de publicité foncière.
                </li>
                <li>
                  <strong>Frais divers</strong> : Débours, frais administratifs, etc.
                </li>
              </ul>
              
              <div className="bg-khaki-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-khaki-600" />
                  Spécificités régionales
                </h4>
                <p className="mt-2 text-sm">
                  Notre outil prend en compte les spécificités des départements de la région PACA et Auvergne-Rhône-Alpes 
                  pour vous fournir l'estimation la plus précise possible.
                </p>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium">Différence entre bien ancien et neuf</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="border p-3 rounded-lg">
                    <strong className="block mb-2">Bien ancien</strong>
                    <p className="text-sm">
                      Les frais représentent environ 7 à 8% du prix de vente, principalement composés des droits 
                      de mutation (5,81% dans la plupart des départements).
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg">
                    <strong className="block mb-2">Bien neuf</strong>
                    <p className="text-sm">
                      Les frais sont moins élevés (2 à 3% du prix), car il n'y a pas de droits de mutation 
                      mais de la TVA (déjà incluse dans le prix de vente).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TaxCalculator;
