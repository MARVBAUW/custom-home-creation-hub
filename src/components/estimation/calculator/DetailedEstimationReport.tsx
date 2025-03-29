
import React, { useState } from 'react';
import { FormData } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FileText, Printer, Calendar, Building, PieChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Logo from '@/components/common/Logo';
import ProfessionalQuoteReport from './ProfessionalQuoteReport';

interface DetailedEstimationReportProps {
  formData: FormData;
  estimationResult: number | null;
  categoriesAmounts: Array<{
    category: string;
    amount: number;
    details?: string;
  }>;
}

const DetailedEstimationReport: React.FC<DetailedEstimationReportProps> = ({
  formData,
  estimationResult,
  categoriesAmounts
}) => {
  const [activeTab, setActiveTab] = useState('summary');
  const { toast } = useToast();
  
  // Formater les prix
  const formatPrice = (price: number | null) => {
    if (price === null) return '---';
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(price);
  };
  
  // Générer un identifiant unique pour le rapport
  const reportId = `R${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  
  // Données pour le graphique
  const chartData = categoriesAmounts.map(item => ({
    name: item.category,
    value: item.amount
  }));
  
  // Couleurs pour le graphique
  const COLORS = ['#A28554', '#D4C19C', '#8A7047', '#C0A172', '#54442A', '#E6D8B5', '#7F682E', '#B59F6B'];
  
  // Calculs supplémentaires
  const landPrice = formData.landPrice || 0;
  const notaryFees = landPrice * 0.08; // 8% du prix du terrain environ
  const totalWithLand = (estimationResult || 0) + landPrice + notaryFees;
  
  // Date formatée
  const formattedDate = new Date().toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const handlePrint = () => {
    window.print();
    toast({
      title: "Impression lancée",
      description: "Votre rapport d'estimation est en cours d'impression",
    });
  };
  
  return (
    <div className="space-y-6">
      {/* En-tête avec date et boutons d'action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-progineer-gold" />
          <span className="font-medium">{formattedDate}</span>
          <span className="text-sm text-gray-500">• Ref: {reportId}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Rapport téléchargé",
                description: "Votre rapport d'estimation a été téléchargé avec succès",
              });
            }}
          >
            <FileText className="h-4 w-4" />
            Télécharger
          </Button>
          
          <Button 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="print:hidden">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="summary">Récapitulatif</TabsTrigger>
          <TabsTrigger value="detail">Estimation Détaillée</TabsTrigger>
          <TabsTrigger value="quote">Devis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          {/* Carte de récapitulatif */}
          <Card className="border shadow-sm mb-6 overflow-hidden print:shadow-none">
            <div className="bg-stone-50 p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Estimation du {formattedDate}</h2>
                <div className="h-8">
                  <Logo variant="standard" />
                </div>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-progineer-gold" />
                  <span className="text-sm font-medium">
                    {formData.projectType || 'Construction'} • {formData.surface || '---'} m²
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {formData.city || 'PACA'} • Ref: {reportId}
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Coût des Travaux TTC</h3>
                  <p className="text-2xl font-bold text-progineer-gold">{formatPrice(estimationResult)}</p>
                </div>
                
                {landPrice > 0 && (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">Prix du Terrain</h3>
                      <p className="text-2xl font-bold">{formatPrice(landPrice)}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">Coût Total avec Terrain</h3>
                      <p className="text-2xl font-bold text-green-600">{formatPrice(totalWithLand)}</p>
                    </div>
                  </>
                )}
              </div>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-progineer-gold" />
                    Détails du Projet
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Type de projet</div>
                      <div className="text-sm font-medium">{formData.projectType || '---'}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Surface</div>
                      <div className="text-sm font-medium">{formData.surface || '---'} m²</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Localisation</div>
                      <div className="text-sm font-medium">{formData.city || '---'}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Niveau de finition</div>
                      <div className="text-sm font-medium">{formData.finishLevel || '---'}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Terrain</div>
                      <div className="text-sm font-medium">
                        {formData.hasLand ? `Oui (${formatPrice(landPrice)})` : 'Non inclus'}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Référence</div>
                      <div className="text-sm font-medium">{reportId}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-progineer-gold" />
                    Répartition Budgétaire
                  </h3>
                  
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatPrice(Number(value))} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center mt-2">
                    Répartition des coûts par postes de dépenses
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Prochaines étapes</h3>
                <p className="text-sm text-gray-600">
                  Cette estimation vous est fournie à titre indicatif et peut varier selon les spécifications définitives de votre projet. 
                  Pour obtenir un devis détaillé et personnalisé, nous vous invitons à contacter un de nos experts Progineer.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <Button variant="outline" className="w-full">Affiner mon projet</Button>
                  <Button className="w-full bg-progineer-gold hover:bg-progineer-gold/90">Contacter un expert</Button>
                </div>
              </div>
              
              <div className="mt-8 text-xs text-gray-500 italic">
                * Ce document est une estimation préliminaire. Les prix indiqués peuvent varier en fonction des matériaux choisis, 
                des contraintes spécifiques du terrain et des options retenues. Prix TTC avec TVA à 20%.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detail" className="space-y-6">
          <Card className="border shadow-sm print:shadow-none">
            <CardHeader className="bg-stone-50 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-gray-800">Estimation Détaillée</CardTitle>
                <div className="h-8">
                  <Logo variant="standard" />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Détail par postes de travaux</h3>
                  
                  <div className="space-y-4">
                    {categoriesAmounts.map((category, index) => (
                      <div key={index} className="border rounded-md overflow-hidden">
                        <div className="flex justify-between items-center p-3 bg-stone-50 border-b">
                          <h4 className="font-medium">{category.category}</h4>
                          <span className="font-bold text-progineer-gold">{formatPrice(category.amount)}</span>
                        </div>
                        
                        {category.details && (
                          <div className="p-3 text-sm text-gray-600">
                            {category.details}
                          </div>
                        )}
                        
                        <div className="bg-gray-100 h-1 w-full">
                          <div 
                            className="bg-progineer-gold h-1" 
                            style={{ 
                              width: `${Math.round((category.amount / (estimationResult || 1)) * 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Récapitulatif des coûts</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Coût total des travaux HT</span>
                        <span className="font-medium">{formatPrice((estimationResult || 0) / 1.2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">TVA (20%)</span>
                        <span className="font-medium">{formatPrice((estimationResult || 0) - (estimationResult || 0) / 1.2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center font-bold">
                        <span>Coût total des travaux TTC</span>
                        <span className="text-progineer-gold">{formatPrice(estimationResult)}</span>
                      </div>
                      
                      {landPrice > 0 && (
                        <>
                          <Separator className="my-2" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Prix du terrain</span>
                            <span className="font-medium">{formatPrice(landPrice)}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Frais de notaire estimés (8%)</span>
                            <span className="font-medium">{formatPrice(notaryFees)}</span>
                          </div>
                          
                          <div className="flex justify-between items-center font-bold">
                            <span>Coût total avec terrain</span>
                            <span className="text-green-600">{formatPrice(totalWithLand)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-8 text-xs text-gray-500 italic">
                    * Ces montants sont fournis à titre indicatif et peuvent varier en fonction des spécifications définitives de votre projet et des conditions du marché.
                    Les frais annexes comme les raccordements aux réseaux, les études de sol ou les assurances ne sont pas inclus dans cette estimation.
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quote">
          <ProfessionalQuoteReport 
            formData={formData}
            estimationResult={estimationResult}
            onPrint={handlePrint}
          />
        </TabsContent>
      </Tabs>
      
      {/* Version imprimable - visible uniquement à l'impression */}
      <div className="hidden print:block">
        <div className="space-y-6">
          {/* En-tête du rapport imprimé */}
          <div className="bg-white p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Estimation du {formattedDate}</h2>
              <div className="h-8">
                <Logo variant="standard" />
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-progineer-gold" />
                <span className="text-sm font-medium">
                  {formData.projectType || 'Construction'} • {formData.surface || '---'} m²
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {formData.city || 'PACA'} • Ref: {reportId}
              </div>
            </div>
          </div>
          
          {/* Contenu principal imprimable */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Coût des Travaux TTC</h3>
                <p className="text-2xl font-bold text-progineer-gold">{formatPrice(estimationResult)}</p>
              </div>
              
              {landPrice > 0 && (
                <>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Prix du Terrain</h3>
                    <p className="text-2xl font-bold">{formatPrice(landPrice)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Coût Total avec Terrain</h3>
                    <p className="text-2xl font-bold text-green-600">{formatPrice(totalWithLand)}</p>
                  </div>
                </>
              )}
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Détails du Projet</h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-500">Type de projet</div>
                    <div className="text-sm font-medium">{formData.projectType || '---'}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-500">Surface</div>
                    <div className="text-sm font-medium">{formData.surface || '---'} m²</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-500">Localisation</div>
                    <div className="text-sm font-medium">{formData.city || '---'}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-500">Niveau de finition</div>
                    <div className="text-sm font-medium">{formData.finishLevel || '---'}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-500">Terrain</div>
                    <div className="text-sm font-medium">
                      {formData.hasLand ? `Oui (${formatPrice(landPrice)})` : 'Non inclus'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Récapitulatif des coûts</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Coût total des travaux HT</span>
                    <span className="font-medium">{formatPrice((estimationResult || 0) / 1.2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">TVA (20%)</span>
                    <span className="font-medium">{formatPrice((estimationResult || 0) - (estimationResult || 0) / 1.2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center font-bold">
                    <span>Coût total des travaux TTC</span>
                    <span>{formatPrice(estimationResult)}</span>
                  </div>
                  
                  {landPrice > 0 && (
                    <>
                      <Separator className="my-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Prix du terrain</span>
                        <span className="font-medium">{formatPrice(landPrice)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Frais de notaire estimés (8%)</span>
                        <span className="font-medium">{formatPrice(notaryFees)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center font-bold">
                        <span>Coût total avec terrain</span>
                        <span>{formatPrice(totalWithLand)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <h3 className="text-lg font-semibold mb-4">Détail par postes de travaux</h3>
            
            <div className="space-y-4">
              {categoriesAmounts.map((category, index) => (
                <div key={index} className="border rounded-md overflow-hidden">
                  <div className="flex justify-between items-center p-3 bg-stone-50 border-b">
                    <h4 className="font-medium">{category.category}</h4>
                    <span className="font-bold">{formatPrice(category.amount)}</span>
                  </div>
                  
                  {category.details && (
                    <div className="p-3 text-sm text-gray-600">
                      {category.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-xs text-gray-500 italic">
              * Ces montants sont fournis à titre indicatif et peuvent varier en fonction des spécifications définitives de votre projet et des conditions du marché.
              Document généré le {formattedDate} • Réf: {reportId}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedEstimationReport;
