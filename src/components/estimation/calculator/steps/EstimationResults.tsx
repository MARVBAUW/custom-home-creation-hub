
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, CheckCircle, CheckSquare } from 'lucide-react';
import { FormData } from '../types';
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { saveEstimationToUser } from '../calculationUtils';
import { useAuth } from '@/hooks/useAuth';
import EstimationPDFExport from '../EstimationPDFExport';
import { formatCurrency } from '@/utils/formatters';

interface EstimationResultsProps {
  estimation: number | null;
  formData: FormData;
  goToPreviousStep: () => void;
  isLoading?: boolean;
}

const EstimationResults: React.FC<EstimationResultsProps> = ({
  estimation,
  formData,
  goToPreviousStep,
  isLoading = false
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [projectName, setProjectName] = useState(formData.projectName || "Mon projet");
  const [email, setEmail] = useState(formData.contactEmail || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Fonction pour sauvegarder l'estimation
  const handleSaveEstimation = async () => {
    if (!estimation) return;
    
    if (user) {
      // Si l'utilisateur est connecté, sauvegarder directement
      setIsSaving(true);
      try {
        const result = await saveEstimationToUser(user.id, formData, estimation);
        if (result.success) {
          toast({
            title: "Estimation sauvegardée",
            description: "Votre estimation a été sauvegardée avec succès",
          });
          setSaved(true);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder l'estimation",
          variant: "destructive"
        });
      } finally {
        setIsSaving(false);
      }
    } else {
      // Si l'utilisateur n'est pas connecté, montrer la boîte de dialogue
      setShowSaveDialog(true);
    }
  };
  
  // Fonction pour sauvegarder et créer un compte
  const handleSaveAndCreateAccount = () => {
    if (!email || !projectName) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }
    
    // Sauvegarder les données dans le localStorage pour les récupérer après création de compte
    localStorage.setItem('savedEstimation', JSON.stringify({
      projectName,
      email,
      formData,
      estimation,
      date: new Date().toISOString()
    }));
    
    toast({
      title: "Données sauvegardées",
      description: "Vous allez être redirigé vers la page d'inscription",
    });
    
    // Rediriger vers la page d'inscription
    setTimeout(() => {
      window.location.href = '/auth/signup?email=' + encodeURIComponent(email);
    }, 1500);
  };
  
  // Calcul de la TVA et du total TTC
  const vat = estimation ? estimation * 0.2 : 0;
  const totalTTC = estimation ? estimation + vat : 0;
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h3 className="text-lg font-medium">Calcul de votre estimation en cours...</h3>
        <p className="text-muted-foreground">Nous analysons les détails de votre projet pour vous fournir un chiffrage précis.</p>
      </div>
    );
  }
  
  return (
    <div>
      <Card className="border-green-200 bg-green-50/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-green-800 flex items-center">
            <CheckCircle className="mr-2 h-6 w-6 text-green-600" />
            Estimation de votre projet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-green-700 mb-2">
              {formatCurrency(estimation || 0)}
            </div>
            <p className="text-gray-600">Montant hors taxes estimé pour votre projet</p>
            
            <div className="mt-6 grid grid-cols-2 gap-4 text-left bg-white p-4 rounded-lg border border-green-100">
              <div>
                <p className="text-sm text-gray-500">TVA (20%)</p>
                <p className="font-semibold">{formatCurrency(vat)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total TTC</p>
                <p className="font-semibold">{formatCurrency(totalTTC)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-green-100 mb-6">
            <h3 className="font-semibold mb-2 text-green-700">Détails du projet</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <p className="text-gray-500">Type de projet</p>
                <p>{formData.projectType || "Construction"}</p>
              </div>
              <div>
                <p className="text-gray-500">Surface</p>
                <p>{formData.surface || "N/A"} m²</p>
              </div>
              {formData.location && (
                <div>
                  <p className="text-gray-500">Localisation</p>
                  <p>{formData.location}</p>
                </div>
              )}
              {formData.projectName && (
                <div>
                  <p className="text-gray-500">Nom du projet</p>
                  <p>{formData.projectName}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <EstimationPDFExport 
              formData={formData} 
              estimationResult={estimation} 
            />
            
            {!saved && (
              <Button
                onClick={handleSaveEstimation}
                className="w-full flex items-center justify-center bg-khaki-600 hover:bg-khaki-700"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sauvegarde en cours...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder cette estimation
                  </>
                )}
              </Button>
            )}
            
            {saved && (
              <div className="flex items-center justify-center p-2 bg-green-100 text-green-800 rounded-md">
                <CheckSquare className="mr-2 h-4 w-4" />
                Estimation sauvegardée
              </div>
            )}
            
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              className="w-full flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Modifier mon estimation
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sauvegarder votre estimation</DialogTitle>
            <DialogDescription>
              Donnez un nom à votre projet et renseignez votre email pour créer un compte et sauvegarder votre estimation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="text-right">
                Nom du projet
              </Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="col-span-3"
                placeholder="Maison rue des Lilas"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="votre@email.com"
                type="email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowSaveDialog(false)}>
              Annuler
            </Button>
            <Button type="button" onClick={handleSaveAndCreateAccount} className="bg-khaki-600 hover:bg-khaki-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Sauvegarder et créer un compte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EstimationResults;
