
import React, { useState } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const BacklinksManager = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);
  const { toast } = useToast();

  // Fonction pour mettre à jour les backlinks
  const generateBacklinks = async () => {
    setIsGenerating(true);
    setProgress(10);
    
    try {
      // Simulation de progression
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.floor(Math.random() * 15);
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 500);
      
      // Appel à la fonction Edge
      const { data, error } = await supabase.functions.invoke('generate-backlinks');
      
      clearInterval(progressInterval);
      
      if (error) {
        setProgress(0);
        toast({
          title: "Erreur de génération",
          description: `Les backlinks n'ont pas pu être générés: ${error.message}`,
          variant: "destructive"
        });
      } else {
        setProgress(100);
        setLastGenerated(new Date().toLocaleString());
        toast({
          title: "Génération réussie",
          description: "Les backlinks ont été générés avec succès.",
        });
        
        // Remettre la progression à zéro après un délai
        setTimeout(() => {
          setProgress(0);
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive"
      });
      setProgress(0);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Gestionnaire de Backlinks IA</CardTitle>
        <CardDescription>
          Générez automatiquement des backlinks entre vos articles pour améliorer le référencement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Génération en cours...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              {lastGenerated && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  <span>Dernière mise à jour: {lastGenerated}</span>
                </div>
              )}
            </div>
            
            <Button 
              onClick={generateBacklinks} 
              disabled={isGenerating}
              className="flex items-center"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? "Génération en cours..." : "Générer les backlinks"}
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-start">
              <AlertTriangle className="mt-0.5 mr-2 h-4 w-4 text-amber-500" />
              <p>
                Cette fonction utilise l'intelligence artificielle pour analyser vos articles et créer 
                des liens pertinents entre eux, améliorant ainsi le référencement de votre site. 
                Le processus s'exécute en arrière-plan et peut prendre quelques minutes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BacklinksManager;
