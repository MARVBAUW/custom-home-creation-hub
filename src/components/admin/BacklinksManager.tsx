import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Define types for the backlinks logs table
interface BacklinksLog {
  id: string;
  created_at: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  backlinks_generated: number;
  new_backlinks: number;
  updated_backlinks: number;
}

const BacklinksManager = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [stats, setStats] = useState({ created: 0, updated: 0, total: 0 });
  const { toast } = useToast();

  // Récupérer la dernière date de génération au chargement
  useEffect(() => {
    const fetchLastGenerationDate = async () => {
      try {
        const { data, error } = await supabase
          .from('backlinks_logs')
          .select('created_at, status')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (error) {
          console.error("Erreur lors de la récupération des logs de backlinks:", error);
          return;
        }
        
        if (data && data.length > 0 && data[0].status === 'success') {
          setLastGenerated(new Date(data[0].created_at).toLocaleString());
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des logs de backlinks:", error);
      }
    };

    fetchLastGenerationDate();
  }, []);

  // Fonction pour mettre à jour les backlinks
  const generateBacklinks = async () => {
    setIsGenerating(true);
    setProgress(10);
    setStatus('idle');
    
    try {
      // Simulation de progression
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.floor(Math.random() * 15);
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 800);
      
      // Appel à la fonction Edge
      const { data, error } = await supabase.functions.invoke('generate-backlinks');
      
      clearInterval(progressInterval);
      
      if (error) {
        console.error("Error invoking function:", error);
        setProgress(0);
        setStatus('error');
        toast({
          title: "Erreur de génération",
          description: `Les backlinks n'ont pas pu être générés: ${error.message}`,
          variant: "destructive"
        });
      } else {
        setProgress(100);
        setStatus('success');
        setLastGenerated(new Date().toLocaleString());
        
        // Mettre à jour les statistiques si disponibles
        if (data && data.backlinksGenerated) {
          setStats({
            created: data.backlinksGenerated.new || 0,
            updated: data.backlinksGenerated.updated || 0,
            total: data.backlinksGenerated.total || 0
          });
        }
        
        toast({
          title: "Génération réussie",
          description: `${data?.backlinksGenerated?.total || 'Plusieurs'} backlinks ont été générés avec succès.`,
        });
        
        // Remettre la progression à zéro après un délai
        setTimeout(() => {
          setProgress(0);
        }, 2000);
      }
    } catch (error) {
      console.error("Error generating backlinks:", error);
      toast({
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive"
      });
      setProgress(0);
      setStatus('error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-semibold flex items-center">
              Gestionnaire de Backlinks IA
              <Zap className="ml-2 h-5 w-5 text-amber-500" />
            </CardTitle>
            <CardDescription className="mt-1 dark:text-gray-400">
              Générez automatiquement des backlinks entre vos articles pour améliorer le référencement.
            </CardDescription>
          </div>
          <Badge 
            variant={status === 'success' ? 'success' : status === 'error' ? 'destructive' : 'outline'} 
            className={status === 'success' ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" : 
                      status === 'error' ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400" : 
                      "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}
          >
            {status === 'success' ? 'Synchronisé' : status === 'error' ? 'Erreur' : 'En attente'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Génération en cours...</span>
              <span>{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-gray-100 dark:bg-gray-700" 
            />
          </div>
        )}
        
        {status === 'success' && stats.total > 0 && (
          <div className="grid grid-cols-3 gap-4 py-2">
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">{stats.total}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Total</div>
            </div>
            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
              <div className="text-xl font-semibold text-green-600 dark:text-green-400">{stats.created}</div>
              <div className="text-xs text-green-600 dark:text-green-400">Créés</div>
            </div>
            <div className="text-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md">
              <div className="text-xl font-semibold text-amber-600 dark:text-amber-400">{stats.updated}</div>
              <div className="text-xs text-amber-600 dark:text-amber-400">Mis à jour</div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pt-2">
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
      </CardContent>
    </Card>
  );
};

export default BacklinksManager;
