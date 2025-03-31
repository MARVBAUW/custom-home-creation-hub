
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Mail, ArrowLeft, Share2 } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { FormData } from "../types";
import EstimationPDFExport from "../EstimationPDFExport";
import EstimationBreakdown from "../EstimationBreakdown";
import EstimationTimeline from "../EstimationTimeline";
import { calculateEstimation } from "../calculationUtils";
import { toast } from "@/components/ui/use-toast";
import { sendEstimationEmail } from "../services/emailService";

interface EstimationResultsProps {
  formData: FormData;
  goToPreviousStep: () => void;
  isLoading?: boolean;
}

const EstimationResults: React.FC<EstimationResultsProps> = ({
  formData,
  goToPreviousStep,
  isLoading = false,
}) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailAddress, setEmailAddress] = useState(formData.email || "");

  // Calculate the estimation result based on form data
  const estimation = calculateEstimation(formData);

  const handleSendEmail = async () => {
    if (!emailAddress || !emailAddress.includes('@')) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);
    try {
      const success = await sendEstimationEmail(formData, estimation, emailAddress);
      if (success) {
        toast({
          title: "Email envoyé",
          description: "L'estimation a été envoyée à votre adresse email.",
        });
        setShowEmailForm(false);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'email.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: "Estimation de projet Progineer",
        text: `Mon estimation de projet: ${formatCurrency(estimation.totalAmount)}`,
        url: window.location.href,
      }).catch((error) => console.log("Error sharing", error));
    } else {
      setShowEmailForm(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600 mb-4"></div>
        <p className="text-gray-600">Calcul de l'estimation en cours...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={goToPreviousStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareClick}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
        </div>
      </div>

      <Card className="bg-khaki-50 border-khaki-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-khaki-800">Estimation totale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-khaki-900">
            {formatCurrency(estimation.totalAmount)}
          </div>
          <p className="text-sm text-khaki-600 mt-1">
            TVA incluse • Honoraires inclus • Frais annexes inclus
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="breakdown" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="breakdown">Répartition des coûts</TabsTrigger>
          <TabsTrigger value="timeline">Calendrier</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakdown" className="pt-4">
          <EstimationBreakdown estimation={estimation} />
        </TabsContent>
        
        <TabsContent value="timeline" className="pt-4">
          <EstimationTimeline timeline={estimation.timeline} />
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => setShowEmailForm(true)}
        >
          <Mail className="mr-2 h-4 w-4" />
          Recevoir par email
        </Button>
        
        <EstimationPDFExport 
          formData={formData} 
          estimation={estimation} 
        />
      </div>

      {showEmailForm && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Recevoir par email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Adresse email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowEmailForm(false)}
                >
                  Annuler
                </Button>
                <Button 
                  onClick={handleSendEmail} 
                  disabled={isSendingEmail}
                >
                  {isSendingEmail ? "Envoi..." : "Envoyer"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EstimationResults;
