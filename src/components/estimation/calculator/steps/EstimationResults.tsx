
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Printer, Mail, ArrowLeft } from 'lucide-react';

interface EstimationResultsProps {
  estimation: any;
  formData: FormData;
  animationDirection?: 'forward' | 'backward';
  goToPreviousStep?: () => void;
}

const EstimationResults: React.FC<EstimationResultsProps> = ({ 
  estimation, 
  formData,
  animationDirection,
  goToPreviousStep
}) => {
  const [activeTab, setActiveTab] = React.useState<string>('summary');
  
  if (!estimation) {
    return (
      <div className="text-center py-8">
        <p>Calcul en cours...</p>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  // Convertir la surface en nombre si c'est une chaîne
  const surfaceValue = formData.surface ? 
    (typeof formData.surface === 'string' ? parseFloat(formData.surface) : formData.surface) : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-600">Estimation de votre projet</h2>
        <p className="text-gray-500 mt-2">
          Basée sur les informations fournies pour un projet de {formData.projectType} de {surfaceValue} m².
        </p>
      </div>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6 pb-6 text-center">
          <div className="text-sm text-gray-500">Estimation totale (TTC)</div>
          <div className="text-3xl font-bold text-blue-600 mt-1">
            {formatPrice(estimation)}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            soit environ {formatPrice(estimation / (surfaceValue || 1))} /m²
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Résumé</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="next-steps">Prochaines étapes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Résumé du projet</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="text-sm text-gray-500">Type de projet</div>
                  <div className="font-medium">{formData.projectType}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="text-sm text-gray-500">Surface</div>
                  <div className="font-medium">{surfaceValue} m²</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="text-sm text-gray-500">Ville</div>
                  <div className="font-medium">{formData.city}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="text-sm text-gray-500">Finition</div>
                  <div className="font-medium">{formData.finishingLevel || formData.finishLevel}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Détail de l'estimation</h3>
            
            <div className="space-y-2">
              {/* Simuler des catégories de coûts basées sur l'estimation totale */}
              <Card>
                <CardContent className="pt-4 pb-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Gros œuvre</div>
                    <div className="text-xs text-gray-500">
                      Fondations, murs porteurs
                    </div>
                  </div>
                  <div className="text-blue-600 font-medium">
                    {formatPrice(estimation * 0.3)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4 pb-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Charpente et toiture</div>
                    <div className="text-xs text-gray-500">
                      Structure, couverture
                    </div>
                  </div>
                  <div className="text-blue-600 font-medium">
                    {formatPrice(estimation * 0.15)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4 pb-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Second œuvre</div>
                    <div className="text-xs text-gray-500">
                      Isolation, cloisons, plomberie, électricité
                    </div>
                  </div>
                  <div className="text-blue-600 font-medium">
                    {formatPrice(estimation * 0.25)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4 pb-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Menuiseries</div>
                    <div className="text-xs text-gray-500">
                      Fenêtres, portes
                    </div>
                  </div>
                  <div className="text-blue-600 font-medium">
                    {formatPrice(estimation * 0.1)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4 pb-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Finitions</div>
                    <div className="text-xs text-gray-500">
                      Sols, peintures, sanitaires
                    </div>
                  </div>
                  <div className="text-blue-600 font-medium">
                    {formatPrice(estimation * 0.2)}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4 pb-4 flex justify-between items-center">
                <div className="font-medium">Total HT</div>
                <div className="text-blue-600 font-medium">
                  {formatPrice(estimation / 1.2)}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4 pb-4 flex justify-between items-center">
                <div className="font-medium">TVA (20%)</div>
                <div className="text-blue-600 font-medium">
                  {formatPrice(estimation - (estimation / 1.2))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4 pb-4 flex justify-between items-center">
                <div className="font-bold">Total TTC</div>
                <div className="text-blue-600 font-bold">
                  {formatPrice(estimation)}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="next-steps" className="pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Prochaines étapes</h3>
            
            <p className="text-gray-600">
              Notre équipe d'experts est à votre disposition pour affiner cette estimation et vous accompagner dans votre projet.
            </p>
            
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Button className="flex items-center justify-center gap-2 w-full">
                <Download className="h-4 w-4" />
                Télécharger PDF
              </Button>
              
              <Button className="flex items-center justify-center gap-2 w-full">
                <Printer className="h-4 w-4" />
                Imprimer
              </Button>
              
              <Button className="flex items-center justify-center gap-2 w-full">
                <Mail className="h-4 w-4" />
                Recevoir par email
              </Button>
            </div>
            
            <Card>
              <CardContent className="pt-6 pb-6">
                <h4 className="font-medium mb-2">Prendre rendez-vous</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Un consultant Progineer peut vous contacter pour discuter de votre projet en détail.
                </p>
                <Button className="w-full">Prendre rendez-vous</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {goToPreviousStep && (
        <div className="flex justify-start mt-4">
          <Button 
            variant="outline" 
            onClick={goToPreviousStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
      )}
    </div>
  );
};

export default EstimationResults;
