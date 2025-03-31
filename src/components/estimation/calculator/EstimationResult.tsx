
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Download, Send, Share } from 'lucide-react';
import { FormData, EstimationResponseData } from './types';
import { formatCurrency } from '@/utils/formatters';
import EstimationPDFExport from './EstimationPDFExport';
import EstimationBreakdown from './EstimationBreakdown';
import EstimationTimeline from './EstimationTimeline';
import { sendEstimationEmail } from './services/emailService';

interface EstimationResultProps {
  estimation: EstimationResponseData;
  formData: FormData;
}

const EstimationResult: React.FC<EstimationResultProps> = ({ estimation, formData }) => {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [email, setEmail] = useState(formData.email || '');
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async () => {
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const success = await sendEstimationEmail(formData, estimation, email);
      if (success) {
        toast({
          title: "Succès",
          description: "L'estimation a été envoyée à votre adresse email.",
        });
        setEmailDialogOpen(false);
      } else {
        throw new Error("Échec de l'envoi");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Estimation Progineer',
        text: `Estimation de mon projet: ${formatCurrency(estimation.totalAmount)} - Progineer.fr`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      setEmailDialogOpen(true);
    }
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-2xl font-bold text-gray-800">Résultats de l'estimation</CardTitle>
          <CardDescription>
            Estimation détaillée du coût et du calendrier prévisionnel de votre projet
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 px-6">
          <div className="mb-6 p-4 bg-khaki-50 border border-khaki-200 rounded-lg">
            <h3 className="text-xl font-semibold text-khaki-800 mb-2">Estimation totale</h3>
            <p className="text-3xl font-bold text-khaki-900">
              {formatCurrency(estimation.totalAmount)}
            </p>
            <p className="text-sm text-khaki-600 mt-1">
              TVA incluse • Honoraires inclus • Frais annexes inclus
            </p>
          </div>

          <Tabs defaultValue="breakdown">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="breakdown">Répartition des coûts</TabsTrigger>
              <TabsTrigger value="timeline">Calendrier</TabsTrigger>
            </TabsList>
            
            <TabsContent value="breakdown" className="pt-2">
              <EstimationBreakdown estimation={estimation} />
            </TabsContent>
            
            <TabsContent value="timeline" className="pt-2">
              <EstimationTimeline timeline={estimation.timeline} />
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-4">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={handleShareClick}
          >
            <Share className="h-4 w-4 mr-2" />
            Partager
          </Button>
          
          <EstimationPDFExport 
            formData={formData} 
            estimation={estimation} 
          />
        </CardFooter>
      </Card>

      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recevoir l'estimation par email</DialogTitle>
            <DialogDescription>
              L'estimation détaillée sera envoyée à l'adresse email fournie.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="votre@email.com"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendEmail} disabled={isSending}>
              {isSending ? 'Envoi en cours...' : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EstimationResult;
