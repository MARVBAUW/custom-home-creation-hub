
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { GuideDocument } from './types';
import { guideDocuments, guideCategories } from './guidesData';

export const useGuides = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<GuideDocument | null>(null);

  // Featured guides
  const featuredGuides = guideDocuments.filter(guide => guide.featured);

  // Filter guides based on active category and search query
  const filteredGuides = guideDocuments.filter(guide => {
    const matchesCategory = activeCategory === "tous" || guide.categoryId === activeCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle document view/download
  const handleDocumentClick = (document: GuideDocument) => {
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };

  // Handle document download
  const handleDownload = (url: string, title: string) => {
    // Simulation de téléchargement
    toast({
      title: "Téléchargement démarré",
      description: `Le document "${title}" a commencé à se télécharger.`,
      duration: 5000
    });
    
    // Dans une vraie application, on utiliserait window.open(url) ou une autre méthode
    const link = document.createElement('a');
    link.href = url;
    link.download = title.replace(/\s+/g, '-').toLowerCase() + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsDialogOpen(false);
  };

  // Handle document preview
  const handlePreview = (document: GuideDocument) => {
    setSelectedDocument(document);
    setIsPreviewOpen(true);
  };

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    isPreviewOpen,
    setIsPreviewOpen,
    selectedDocument,
    setSelectedDocument,
    featuredGuides,
    filteredGuides,
    categories: guideCategories,
    guides: guideDocuments,
    handleDocumentClick,
    handleDownload,
    handlePreview
  };
};
