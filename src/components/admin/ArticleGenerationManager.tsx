
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { supabase } from '@/integrations/supabase/client';

// Article categories
const ARTICLE_CATEGORIES = [
  "Construction",
  "Rénovation",
  "Extension",
  "Design Intérieur",
  "Construction Écologique",
  "Optimisation d'Espace",
  "Projet Immobilier",
  "Maîtrise d'Œuvre",
  "Architecture"
];

const ArticleGenerationManager = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState("Construction");
  const [loading, setLoading] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<any>(null);
  const [autoGeneration, setAutoGeneration] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Fetch the last 5 generation logs on component mount
  React.useEffect(() => {
    fetchGenerationLogs();
  }, []);

  // Fetch generation logs from the database
  const fetchGenerationLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('article_generation_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setGenerationLogs(data || []);
    } catch (error) {
      console.error("Error fetching generation logs:", error);
    }
  };

  // Toggle automatic article generation
  const handleToggleAutoGeneration = async (isEnabled: boolean) => {
    setAutoGeneration(isEnabled);
    try {
      if (isEnabled) {
        // Call the edge function to set up the cron job
        const response = await supabase.functions.invoke('schedule-article-generation');
        
        if (!response.data.success) {
          throw new Error(response.data.error || "Failed to schedule article generation");
        }
        
        toast({
          title: "Génération automatique activée",
          description: "Un nouvel article sera généré chaque semaine (dimanche à 3h00)",
        });
      } else {
        // TODO: Add logic to disable the cron job if needed
        toast({
          title: "Génération automatique désactivée",
          description: "La génération hebdomadaire d'articles a été suspendue",
        });
      }
    } catch (error) {
      console.error("Error toggling auto generation:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
      });
    }
  };

  // Generate an article manually
  const handleGenerateArticle = async () => {
    setLoading(true);
    setGeneratedArticle(null);
    
    try {
      // Parse keywords string into an array
      const keywordsArray = keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);
      
      // Call the generate-article edge function
      const { data, error } = await supabase.functions.invoke('generate-article', {
        body: {
          topic: topic || undefined,
          keywords: keywordsArray.length > 0 ? keywordsArray : undefined,
          category: category,
          isManual: true
        }
      });
      
      if (error || !data.success) {
        throw new Error(error?.message || data?.error || "Article generation failed");
      }
      
      setGeneratedArticle(data.article);
      
      toast({
        title: "Article généré avec succès",
        description: "Vous pouvez maintenant l'enregistrer dans la base de données",
      });
      
    } catch (error) {
      console.error("Error generating article:", error);
      toast({
        variant: "destructive",
        title: "Erreur de génération",
        description: error.message || "Une erreur est survenue lors de la génération de l'article",
      });
    } finally {
      setLoading(false);
    }
  };

  // Save the generated article to the database
  const handleSaveArticle = async () => {
    if (!generatedArticle) return;
    
    try {
      // Check if an article with this slug already exists
      const { data: existingArticle } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', generatedArticle.slug)
        .maybeSingle();
        
      // If article with this slug already exists, modify the slug
      const finalSlug = existingArticle 
        ? `${generatedArticle.slug}-${Date.now().toString().slice(-6)}`
        : generatedArticle.slug;
      
      // Insert the article into the database
      const { data, error } = await supabase
        .from('articles')
        .insert([{
          title: generatedArticle.title,
          slug: finalSlug,
          content: generatedArticle.content,
          meta_description: generatedArticle.meta_description,
          keywords: generatedArticle.keywords,
          description: generatedArticle.description,
          category: generatedArticle.category,
          image: generatedArticle.image || null,
          is_ai_generated: true
        }]);
        
      if (error) {
        throw new Error(`Failed to save article: ${error.message}`);
      }
      
      toast({
        title: "Article enregistré",
        description: "L'article a été ajouté à la base de données et est maintenant visible sur le site",
      });
      
      // Reset the form and generated article after successful save
      setGeneratedArticle(null);
      setTopic("");
      setKeywords("");
      setCategory("Construction");
      
      // Refresh the generation logs
      fetchGenerationLogs();
      
    } catch (error) {
      console.error("Error saving article:", error);
      toast({
        variant: "destructive",
        title: "Erreur d'enregistrement",
        description: error.message || "Une erreur est survenue lors de l'enregistrement de l'article",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Générateur d'Articles SEO par IA</CardTitle>
              <CardDescription>
                Créez automatiquement du contenu optimisé pour le référencement
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500 mr-2">Génération auto</div>
              <Switch
                checked={autoGeneration}
                onCheckedChange={handleToggleAutoGeneration}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="topic">Thème de l'article</Label>
                <Input
                  id="topic"
                  placeholder="Ex: Les avantages de la maîtrise d'œuvre en PACA"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Laissez vide pour un thème généré automatiquement
                </p>
              </div>
              
              <div>
                <Label htmlFor="keywords">Mots-clés (séparés par des virgules)</Label>
                <Input
                  id="keywords"
                  placeholder="Ex: maîtrise d'œuvre, construction, PACA, architecture"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Select 
                  value={category} 
                  onValueChange={setCategory}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {ARTICLE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleGenerateArticle}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Générer un article
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Article preview and save section */}
      {generatedArticle && (
        <Card>
          <CardHeader>
            <CardTitle>Aperçu de l'article généré</CardTitle>
            <CardDescription>
              Vérifiez le contenu avant de l'enregistrer
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div>
                <Badge className="mb-2">{generatedArticle.category}</Badge>
                <h3 className="text-xl font-bold">{generatedArticle.title}</h3>
                <p className="text-sm text-gray-500">{generatedArticle.meta_description}</p>
              </div>
              
              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {generatedArticle.keywords?.map((keyword: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Aperçu du contenu</Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200 max-h-64 overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: generatedArticle.content?.substring(0, 500) + '...' }} />
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSaveArticle}
              variant="default"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Publier l'article
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* History toggle button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => {
            setShowHistory(!showHistory);
            if (!showHistory) {
              fetchGenerationLogs();
            }
          }}
        >
          {showHistory ? "Masquer l'historique" : "Voir l'historique"}
        </Button>
      </div>

      {/* Generation history */}
      {showHistory && (
        <Card>
          <CardHeader>
            <CardTitle>Historique de génération</CardTitle>
            <CardDescription>
              Les 5 dernières générations d'articles
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {generationLogs.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Aucun historique disponible</p>
            ) : (
              <div className="space-y-4">
                {generationLogs.map((log, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          {log.status === 'success' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                          )}
                          <span className="font-medium">
                            {log.article_title || "Génération d'article"}
                          </span>
                        </div>
                        {log.topic && (
                          <p className="text-sm text-gray-600 mt-1">Thème : {log.topic}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant={log.status === 'success' ? "default" : "destructive"}>
                          {log.status === 'success' ? 'Succès' : 'Échec'}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(log.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    {log.error_message && (
                      <p className="text-sm text-red-500 mt-2">{log.error_message}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ArticleGenerationManager;
