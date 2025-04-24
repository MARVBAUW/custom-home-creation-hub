
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Mail, Share2, Printer } from 'lucide-react';
import { EstimationResponseData } from './calculator/types/estimationTypes';
import { formatCurrency } from './calculator/utils/typeConversions';
import { FormData } from './calculator/types/formTypes';
import PDFGenerator from './calculator/components/PDFGenerator';
import { sendEstimationByEmail } from './calculator/services/emailService';
import { useToast } from '@/hooks/use-toast';

interface EstimationResultProps {
  formData: FormData;
  estimationResult: EstimationResponseData;
  onBack: () => void;
}

const EstimationResult: React.FC<EstimationResultProps> = ({
  formData,
  estimationResult,
  onBack
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(formData.email || '');
  const { toast } = useToast();

  const handleSendEmail = async () => {
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await sendEstimationByEmail(email, formData, estimationResult);
      if (result.success) {
        toast({
          title: "Succès",
          description: result.message,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'email.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Estimation de votre projet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-6 bg-green-50 rounded-lg border border-green-200 text-center">
            <h3 className="text-xl font-semibold mb-2">Coût total estimé</h3>
            <p className="text-3xl font-bold text-green-700">
              {formatCurrency(estimationResult.totalAmount)}
            </p>
            <p className="text-sm mt-2">
              {estimationResult.projectDetails.surface ? `${Math.round(estimationResult.estimatedCost.perSquareMeter)} €/m²` : ''}
            </p>
          </div>

          <Tabs defaultValue="summary">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="summary">Résumé</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="timeline">Calendrier</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Type de projet</h4>
                  <p>{estimationResult.projectType}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Surface</h4>
                  <p>{estimationResult.projectDetails.surface} m²</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Localisation</h4>
                  <p>{estimationResult.projectDetails.city || estimationResult.projectDetails.location}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Type de construction</h4>
                  <p>{estimationResult.projectDetails.constructionType}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-4">
                {estimationResult.categories.map((category, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>{category.name}</span>
                    <div className="text-right">
                      <span className="font-medium">{formatCurrency(category.cost)}</span>
                      <span className="text-sm text-gray-500 ml-2">({Math.round(category.percentage)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Phase de conception</h4>
                  <p>{estimationResult.timeline.design} mois</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Phase d'autorisation</h4>
                  <p>{estimationResult.timeline.permits} mois</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Phase de construction</h4>
                  <p>{estimationResult.timeline.construction} mois</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium mb-2">Durée totale estimée</h4>
                  <p className="font-semibold">{estimationResult.timeline.totalMonths} mois</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Télécharger ou partager votre estimation</h3>
            <div className="flex flex-wrap gap-3">
              <PDFGenerator formData={formData} estimation={estimationResult} />
              
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="px-3 py-2 border rounded-md flex-1"
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleSendEmail}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    {isLoading ? 'Envoi...' : 'Envoyer'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">
              Cette estimation est fournie à titre indicatif et peut varier en fonction des détails spécifiques de votre projet.
              Pour une estimation plus précise, n'hésitez pas à prendre rendez-vous avec l'un de nos experts Progineer.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour à l'estimation
        </Button>
        <Button href="/contact" className="bg-khaki-700 hover:bg-khaki-800">
          Prendre rendez-vous
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EstimationResult;
