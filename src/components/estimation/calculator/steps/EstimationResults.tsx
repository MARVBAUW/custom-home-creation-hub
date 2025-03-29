
import React, { useState } from 'react';
import { FormData } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Download, Mail, ChevronLeft, FileText, Share2, Calculator } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { generatePDF } from '../utils/pdfGenerator';

interface EstimationResultsProps {
  estimation: number | null;
  formData: FormData;
  goToPreviousStep: () => void;
  updateFormData?: (data: Partial<FormData>) => void;
  goToNextStep?: () => void;
  isLoading?: boolean;
}

// Define interface for annexFees object to fix TypeScript errors
interface AnnexFees {
  honorairesHT: number;
  honorairesTTC: number;
  taxeAmenagement: number;
  dommageOuvrage: number;
  etudeThermique: number;
  etudeGeotechnique: number;
  fraisGeometre: number;
  raccordements: number;
  fraisNotaire: number;
  totalFees: number;
  [key: string]: number; // Allow for additional numeric properties
}

const EstimationResults: React.FC<EstimationResultsProps> = ({ 
  estimation, 
  formData,
  goToPreviousStep,
  updateFormData,
  goToNextStep,
  isLoading = false
}) => {
  const [activeTab, setActiveTab] = useState('summary');
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57', '#83a6ed', '#8dd1e1'];
  
  // Calculer les frais annexes basés sur l'estimation
  const calculateAnnexFees = (estimate: number, isRenovation: boolean = false): AnnexFees => {
    if (!estimate) return {
      honorairesHT: 0,
      honorairesTTC: 0,
      taxeAmenagement: 0,
      dommageOuvrage: 0,
      etudeThermique: 0,
      etudeGeotechnique: 0,
      fraisGeometre: 0,
      raccordements: 0,
      fraisNotaire: 0,
      totalFees: 0
    };
    
    const surfaceM2 = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 100);
    
    // Calculer les frais en fonction du type de projet
    const isConstruction = formData.projectType === 'construction' || formData.projectType === 'extension';
    
    const fees: AnnexFees = {
      honorairesHT: estimate * 0.12, // 12% pour les honoraires de maîtrise d'œuvre
      honorairesTTC: estimate * 0.12 * 1.2, // avec TVA
      taxeAmenagement: isRenovation ? 0 : estimate * 0.05, // 5% uniquement pour construction neuve
      dommageOuvrage: estimate * 0.03, // 3% pour l'assurance dommage-ouvrage
      etudeThermique: isConstruction ? 2500 : 1500,
      etudeGeotechnique: isConstruction ? 3000 : 0, // Uniquement pour la construction
      fraisGeometre: isConstruction ? 2000 : 1000,
      raccordements: isConstruction ? 5000 : 0, // Raccordements aux réseaux (eau, électricité, etc.)
      fraisNotaire: 0, // Calculé séparément si terrain fourni
      totalFees: 0 // Will be calculated below
    };
    
    // Calculer les frais de notaire si un prix de terrain est fourni
    const landPrice = typeof formData.landPrice === 'string' ? parseFloat(formData.landPrice) : (formData.landPrice || 0);
    if (landPrice > 0) {
      fees.fraisNotaire = landPrice * 0.08; // 8% en moyenne pour les frais de notaire
    }
    
    // Total des frais annexes
    fees.totalFees = Object.values(fees).reduce((sum: number, fee: number) => {
      // Exclude totalFees itself from the calculation
      if (fee !== fees.totalFees) {
        return sum + fee;
      }
      return sum;
    }, 0);
    
    return fees;
  };
  
  // Générer les catégories basées sur l'estimation
  const generateCategories = () => {
    if (!estimation) return [];
    
    const isRenovation = formData.projectType === 'renovation' || formData.projectType === 'division';
    
    let categories = [];
    
    if (isRenovation) {
      categories = [
        { category: 'Démolition', amount: Math.round(estimation * 0.08) },
        { category: 'Maçonnerie', amount: Math.round(estimation * 0.15) },
        { category: 'Plomberie', amount: Math.round(estimation * 0.12) },
        { category: 'Électricité', amount: Math.round(estimation * 0.10) },
        { category: 'Menuiseries', amount: Math.round(estimation * 0.15) },
        { category: 'Isolation', amount: Math.round(estimation * 0.12) },
        { category: 'Finitions', amount: Math.round(estimation * 0.18) },
        { category: 'Frais annexes', amount: Math.round(estimation * 0.10) },
      ];
    } else {
      // Construction ou extension
      categories = [
        { category: 'Terrain', amount: Math.round(estimation * 0.25) },
        { category: 'Gros œuvre', amount: Math.round(estimation * 0.25) },
        { category: 'Charpente/Toiture', amount: Math.round(estimation * 0.10) },
        { category: 'Menuiseries', amount: Math.round(estimation * 0.10) },
        { category: 'Plomberie/Électricité', amount: Math.round(estimation * 0.10) },
        { category: 'Isolation', amount: Math.round(estimation * 0.08) },
        { category: 'Finitions', amount: Math.round(estimation * 0.07) },
        { category: 'Frais annexes', amount: Math.round(estimation * 0.05) },
      ];
    }
    
    return categories;
  };
  
  const categories = generateCategories();
  const annexFees: AnnexFees = estimation ? calculateAnnexFees(estimation, formData.projectType === 'renovation' || formData.projectType === 'division') : {
    honorairesHT: 0,
    honorairesTTC: 0,
    taxeAmenagement: 0,
    dommageOuvrage: 0,
    etudeThermique: 0,
    etudeGeotechnique: 0,
    fraisGeometre: 0,
    raccordements: 0,
    fraisNotaire: 0,
    totalFees: 0
  };
  
  // Simulation d'emprunt
  const calculateLoan = (amount: number, years: number = 20, rate: number = 4.1) => {
    if (!amount) return { monthlyPayment: 0, totalInterest: 0, totalCost: 0 };
    
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    
    const monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalCost = monthlyPayment * numPayments;
    const totalInterest = totalCost - amount;
    
    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost)
    };
  };
  
  // Calcul du prêt basé sur l'estimation + frais annexes
  const totalProjectCost = estimation ? estimation + annexFees.totalFees : 0;
  const loanDetails = calculateLoan(totalProjectCost);
  
  // Données pour le graphique de simulation d'emprunt
  const generateLoanData = (totalAmount: number, years: number = 20) => {
    if (!totalAmount) return [];
    
    const principal = totalAmount;
    const loanDetails = calculateLoan(principal, years);
    const monthlyPayment = loanDetails.monthlyPayment;
    const periodsPerYear = 4; // Trimestriel
    
    return Array.from({ length: years * periodsPerYear }, (_, i) => {
      const year = Math.floor(i / periodsPerYear) + 1;
      const period = (i % periodsPerYear) + 1;
      const remainingAmount = principal - (monthlyPayment * 3 * i);
      
      return {
        name: `A${year}-T${period}`,
        remaining: Math.max(0, Math.round(remainingAmount)),
        paid: Math.round((principal - Math.max(0, remainingAmount))),
      };
    }).filter((_, i) => i % 4 === 0); // Filtrer pour avoir seulement les années complètes
  };
  
  const loanChartData = generateLoanData(totalProjectCost);
  
  const handleDownloadPDF = () => {
    if (estimation) {
      const landPrice = typeof formData.landPrice === 'string' ? parseFloat(formData.landPrice) : (formData.landPrice || 0);
      generatePDF(formData, estimation, landPrice > 0);
    }
  };
  
  const handleSendEmail = () => {
    // Implémenter l'envoi par email
    console.log('Envoi du rapport par email');
  };
  
  const handleShare = () => {
    // Implémenter le partage
    console.log('Partage du rapport');
  };

  return (
    <div className="space-y-8">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-blue-700 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Résultat de votre estimation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-8 w-3/4 bg-blue-200 rounded mb-2"></Skeleton>
                <Skeleton className="h-6 w-1/2 bg-blue-100 rounded"></Skeleton>
              </div>
            ) : !estimation ? (
              <div className="text-gray-500">
                <p>Impossible de calculer l'estimation. Veuillez vérifier vos données.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <h2 className="text-4xl font-bold text-blue-800">
                  {estimation.toLocaleString('fr-FR')} €
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Estimation des travaux HT
                </p>
                <div className="flex justify-center items-center gap-6 mt-3">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-blue-700">
                      {(estimation * 1.2).toLocaleString('fr-FR')} €
                    </p>
                    <p className="text-xs text-gray-500">TTC avec TVA (20%)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-green-700">
                      {(estimation * 1.2 + (annexFees.totalFees || 0)).toLocaleString('fr-FR')} €
                    </p>
                    <p className="text-xs text-gray-500">Coût total avec frais annexes</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 mb-4">
          <TabsTrigger value="summary">Récapitulatif</TabsTrigger>
          <TabsTrigger value="costs">Détail des coûts</TabsTrigger>
          <TabsTrigger value="annexes">Frais annexes</TabsTrigger>
          <TabsTrigger value="charts">Graphiques</TabsTrigger>
          <TabsTrigger value="loan">Simulation de prêt</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-4">Récapitulatif du projet</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Type de projet</h4>
                  <p className="text-sm">{formData.projectType === 'construction' ? 'Construction neuve' : formData.projectType === 'renovation' ? 'Rénovation' : formData.projectType === 'extension' ? 'Extension' : 'Division'}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Surface</h4>
                  <p className="text-sm">{formData.surface} m²</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Localisation</h4>
                  <p className="text-sm">{formData.city || 'Non spécifié'}</p>
                </div>
                
                {formData.bedrooms && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Chambres</h4>
                    <p className="text-sm">{formData.bedrooms}</p>
                  </div>
                )}
                
                {formData.bathrooms && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Salles de bain</h4>
                    <p className="text-sm">{formData.bathrooms}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Type de construction</h4>
                  <p className="text-sm">
                    {formData.constructionType === 'traditional' ? 'Traditionnelle' : 
                     formData.constructionType === 'contemporary' ? 'Contemporaine' : 
                     formData.constructionType === 'eco' ? 'Écologique' : 'Standard'}
                  </p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h4 className="font-medium">Estimation financière globale</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">Coût des travaux</h5>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-sm">
                        <span>Montant HT</span>
                        <span className="font-medium">{estimation?.toLocaleString('fr-FR') || '-'} €</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>TVA (20%)</span>
                        <span className="font-medium">{estimation ? (estimation * 0.2).toLocaleString('fr-FR') : '-'} €</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>Total TTC</span>
                        <span>{estimation ? (estimation * 1.2).toLocaleString('fr-FR') : '-'} €</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">Coûts annexes</h5>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-sm">
                        <span>Frais annexes HT</span>
                        <span className="font-medium">{annexFees.totalFees?.toLocaleString('fr-FR') || '-'} €</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Prix du terrain</span>
                        <span className="font-medium">
                          {formData.landPrice ? (typeof formData.landPrice === 'string' ? parseFloat(formData.landPrice).toLocaleString('fr-FR') : formData.landPrice.toLocaleString('fr-FR')) : '-'} €
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>Budget global</span>
                        <span>{totalProjectCost.toLocaleString('fr-FR')} €</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h4 className="font-medium">Financement</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="text-sm font-medium text-blue-700 mb-2">Mensualité (sur 20 ans)</h5>
                    <p className="text-xl font-semibold">{loanDetails.monthlyPayment.toLocaleString('fr-FR')} € <span className="text-xs text-gray-500 font-normal">/mois</span></p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="text-sm font-medium text-green-700 mb-2">Coût total du crédit</h5>
                    <p className="text-xl font-semibold">{loanDetails.totalCost.toLocaleString('fr-FR')} €</p>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h5 className="text-sm font-medium text-amber-700 mb-2">Total intérêts</h5>
                    <p className="text-xl font-semibold">{loanDetails.totalInterest.toLocaleString('fr-FR')} €</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="costs">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-4">Détail par corps d'état</h4>
              
              <div className="space-y-6">
                {categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{category.category}</span>
                      <div className="text-right">
                        <div className="font-medium">{category.amount.toLocaleString('fr-FR')} € HT</div>
                        <div className="text-xs text-gray-500">{Math.round((category.amount / (estimation || 1)) * 100)}% du total</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(category.amount / (estimation || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-medium">
                  <span>Total HT</span>
                  <span>{estimation?.toLocaleString('fr-FR') || '-'} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>TVA (20%)</span>
                  <span>{estimation ? (estimation * 0.2).toLocaleString('fr-FR') : '-'} €</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total TTC</span>
                  <span>{estimation ? (estimation * 1.2).toLocaleString('fr-FR') : '-'} €</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="annexes">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-4">Détail des frais annexes</h4>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium mb-3">Frais techniques et administratifs</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Honoraires de maîtrise d'œuvre</span>
                        <div className="text-right">
                          <div className="font-medium">{annexFees.honorairesHT?.toLocaleString('fr-FR') || '-'} € HT</div>
                          <div className="text-xs text-gray-500">{annexFees.honorairesTTC?.toLocaleString('fr-FR') || '-'} € TTC</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Étude thermique</span>
                        <div className="font-medium">{annexFees.etudeThermique?.toLocaleString('fr-FR') || '-'} €</div>
                      </div>
                      
                      {(formData.projectType === 'construction' || formData.projectType === 'extension') && (
                        <>
                          <div className="flex justify-between items-center">
                            <span>Étude géotechnique</span>
                            <div className="font-medium">{annexFees.etudeGeotechnique?.toLocaleString('fr-FR') || '-'} €</div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span>Frais de géomètre</span>
                            <div className="font-medium">{annexFees.fraisGeometre?.toLocaleString('fr-FR') || '-'} €</div>
                          </div>
                        </>
                      )}
                      
                      {(formData.projectType === 'construction' || formData.projectType === 'extension') && (
                        <div className="flex justify-between items-center">
                          <span>Taxe d'aménagement</span>
                          <div className="font-medium">{annexFees.taxeAmenagement?.toLocaleString('fr-FR') || '-'} €</div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span>Assurance dommage-ouvrage</span>
                        <div className="font-medium">{annexFees.dommageOuvrage?.toLocaleString('fr-FR') || '-'} €</div>
                      </div>
                      
                      {(formData.projectType === 'construction' || formData.projectType === 'extension') && (
                        <div className="flex justify-between items-center">
                          <span>Raccordements aux réseaux</span>
                          <div className="font-medium">{annexFees.raccordements?.toLocaleString('fr-FR') || '-'} €</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium mb-3">Frais liés au terrain</h5>
                    <div className="space-y-3">
                      {formData.landPrice && (
                        <div className="flex justify-between items-center">
                          <span>Prix du terrain</span>
                          <div className="font-medium">
                            {typeof formData.landPrice === 'string' ? parseFloat(formData.landPrice).toLocaleString('fr-FR') : formData.landPrice.toLocaleString('fr-FR')} €
                          </div>
                        </div>
                      )}
                      
                      {annexFees.fraisNotaire > 0 && (
                        <div className="flex justify-between items-center">
                          <span>Frais de notaire (8% du terrain)</span>
                          <div className="font-medium">{annexFees.fraisNotaire?.toLocaleString('fr-FR') || '-'} €</div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="font-medium">Total des frais annexes</span>
                        <div className="font-medium text-lg">{annexFees.totalFees?.toLocaleString('fr-FR') || '-'} €</div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-medium">Total du projet</span>
                        <div className="font-bold text-lg text-blue-700">{totalProjectCost.toLocaleString('fr-FR')} €</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                  <h5 className="font-medium text-amber-800 mb-1">À noter pour votre dossier bancaire</h5>
                  <p className="text-amber-700">
                    Ces frais annexes font partie intégrante du coût global de votre projet et doivent être inclus dans votre demande de financement auprès de votre établissement bancaire.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ventilation par poste</CardTitle>
              </CardHeader>
              <CardContent>
                {categories.length === 0 ? (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    Données insuffisantes pour générer le graphique
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                          nameKey="category"
                        >
                          {categories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${Number(value).toLocaleString('fr-FR')} €`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Détail par catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                {categories.length === 0 ? (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    Données insuffisantes pour générer le graphique
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categories}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${Number(value).toLocaleString('fr-FR')} €`} />
                        <Bar dataKey="amount" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="loan">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-4 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-blue-500" />
                Simulation de prêt immobilier
              </h4>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm text-blue-700 font-medium mb-1">Montant financé</h5>
                    <p className="text-2xl font-semibold">{totalProjectCost.toLocaleString('fr-FR')} €</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm text-blue-700 font-medium mb-1">Mensualité (taux 4.1%)</h5>
                    <p className="text-2xl font-semibold">{loanDetails.monthlyPayment.toLocaleString('fr-FR')} €</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm text-blue-700 font-medium mb-1">Coût total du crédit</h5>
                    <p className="text-2xl font-semibold">{loanDetails.totalCost.toLocaleString('fr-FR')} €</p>
                    <p className="text-xs text-gray-500">dont {loanDetails.totalInterest.toLocaleString('fr-FR')} € d'intérêts</p>
                  </div>
                </div>
              </div>
              
              <h5 className="text-lg font-medium mb-4">Évolution du capital restant dû</h5>
              <div className="h-[300px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={loanChartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString('fr-FR')} €`} />
                    <Legend />
                    <Bar dataKey="remaining" name="Capital restant" fill="#0088FE" />
                    <Bar dataKey="paid" name="Capital remboursé" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                <h5 className="font-medium text-amber-800 mb-1">Information importante</h5>
                <p className="text-amber-700">
                  Cette simulation est donnée à titre indicatif sur la base d'un taux fixe de 4.1% sur 20 ans, 
                  sans tenir compte de votre situation personnelle ni des conditions spécifiques des établissements bancaires. 
                  Le taux effectif peut varier en fonction de votre profil, de l'apport personnel et de la durée du prêt.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3">
        <Button
          variant="outline"
          className="flex items-center"
          onClick={goToPreviousStep}
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> 
          Revenir aux informations
        </Button>
        
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleDownloadPDF}
            disabled={isLoading || !estimation}
          >
            <Download className="h-4 w-4 mr-2" />
            Télécharger PDF
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleSendEmail}
            disabled={isLoading || !estimation}
          >
            <Mail className="h-4 w-4 mr-2" />
            Recevoir par email
          </Button>
          
          <Button
            className="flex items-center bg-blue-600 hover:bg-blue-700"
            onClick={handleShare}
            disabled={isLoading || !estimation}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 italic">
        * Cette estimation est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts.
      </div>
    </div>
  );
};

export default EstimationResults;
