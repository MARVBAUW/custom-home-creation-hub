
import React from 'react';
import { ArrowLeft, Calendar, FileText, Link2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Button from '@/components/common/Button';
import { useToast } from "@/components/ui/use-toast";

interface ArticleDetailProps {
  article: {
    id: number;
    title: string;
    description: string;
    content: string;
    date: string;
    category: string;
    source: string;
    readTime: string;
    keywords: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkspaceArticleDetail = ({ article, isOpen, onClose }: ArticleDetailProps) => {
  const { toast } = useToast();
  
  if (!article) return null;

  // Format the date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Generate a random number of views for the article
  const getRandomViews = () => {
    return Math.floor(Math.random() * 400) + 100;
  };
  
  // Handle clicks on resource links
  const handleResourceClick = (resourceName: string) => {
    toast({
      title: "Ressource disponible prochainement",
      description: `La ressource "${resourceName}" sera disponible dans une prochaine mise à jour.`,
      duration: 3000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <button 
            onClick={onClose} 
            className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-khaki-600 mb-2">
            <FileText className="h-4 w-4" />
            <span className="capitalize">{article.category}</span>
            <span className="text-gray-400">•</span>
            <span>{article.readTime} de lecture</span>
            <span className="text-gray-400">•</span>
            <span>{getRandomViews()} vues</span>
          </div>
          <DialogTitle className="text-2xl font-semibold">{article.title}</DialogTitle>
          <DialogDescription className="text-base font-medium text-gray-700 mt-2">
            {article.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 border-y border-gray-200 py-3">
          <Calendar className="h-4 w-4" />
          <span>Publié le {formatDate(article.date)}</span>
          <span className="text-gray-400">•</span>
          <span>Source: {article.source}</span>
        </div>

        <div className="my-6 text-gray-800 prose prose-khaki max-w-none">
          {/* Article full content - split into paragraphs */}
          {article.content.split('. ').map((paragraph, index) => (
            <p key={index} className={index === 0 ? "font-medium text-lg" : ""}>
              {paragraph}.
            </p>
          ))}

          {/* Add some extra filler content to make the article seem more complete */}
          <h3 className="text-xl font-semibold mt-6 mb-3">Implications pour les professionnels</h3>
          <p>
            Les professionnels du secteur de la construction et de l'immobilier doivent s'adapter rapidement à ces 
            évolutions réglementaires. Une veille juridique constante et une formation continue sont désormais 
            indispensables pour rester conformes aux exigences légales.
          </p>
          <p>
            Les maîtres d'œuvre et architectes sont particulièrement concernés, car ils doivent intégrer ces 
            nouvelles dispositions dès la phase de conception des projets pour éviter des modifications coûteuses 
            ultérieurement.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Ressources complémentaires</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-khaki-600" />
              <button 
                onClick={() => handleResourceClick("Guide complet sur la réglementation")}
                className="text-khaki-600 hover:underline cursor-pointer"
              >
                Guide complet sur la réglementation
              </button>
            </li>
            <li className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-khaki-600" />
              <button 
                onClick={() => handleResourceClick("Webinaire explicatif (replay)")}
                className="text-khaki-600 hover:underline cursor-pointer"
              >
                Webinaire explicatif (replay)
              </button>
            </li>
            <li className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-khaki-600" />
              <button 
                onClick={() => handleResourceClick("Texte intégral de la réglementation")}
                className="text-khaki-600 hover:underline cursor-pointer"
              >
                Texte intégral de la réglementation
              </button>
            </li>
          </ul>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.keywords.map((keyword, idx) => (
              <span key={idx} className="inline-block bg-khaki-50 text-khaki-700 text-xs px-2.5 py-1 rounded-full">
                #{keyword}
              </span>
            ))}
          </div>
          <Button onClick={onClose} variant="outline" className="w-full">
            Retour à la veille réglementaire
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceArticleDetail;
