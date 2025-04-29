
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { GuideDocument } from './types';
import { guides as guideDocuments, guideCategories } from './guidesData';

export const useGuides = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<GuideDocument | null>(null);

  // Featured guides
  const featuredGuides = guideDocuments.filter(guide => guide.isFeatured);

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
    // Check if the URL is valid
    if (!url || url === '#') {
      toast({
        title: "Téléchargement indisponible",
        description: `Le document "${title}" n'est pas disponible au téléchargement pour le moment.`,
        duration: 3000
      });
      return;
    }
    
    toast({
      title: "Téléchargement démarré",
      description: `Le document "${title}" a commencé à se télécharger.`,
      duration: 5000
    });
    
    // Téléchargement du document
    let fileExtension = 'pdf';
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // For YouTube videos, open in a new tab instead
      window.open(url, '_blank');
      return;
    } else if (url.endsWith('.pdf')) {
      fileExtension = 'pdf';
    } else if (url.endsWith('.docx')) {
      fileExtension = 'docx';
    } else if (url.endsWith('.xlsx')) {
      fileExtension = 'xlsx';
    }
    
    const link = document.createElement('a');
    link.href = url;
    link.download = title.replace(/\s+/g, '-').toLowerCase() + '.' + fileExtension;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsDialogOpen(false);
  };

  // Handle document preview
  const handlePreview = (document: GuideDocument) => {
    setSelectedDocument(document);
    setIsPreviewOpen(true);
    setIsDialogOpen(false);
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
