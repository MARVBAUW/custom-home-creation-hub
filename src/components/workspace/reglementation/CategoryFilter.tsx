
import React from 'react';
import { FileText, Receipt, Search, Building, HardHat, Shield, Bookmark, Landmark, Ruler, FileWarning } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
}

// Helper function to get icon for each category
const getCategoryIcon = (category: string) => {
  switch(category) {
    case "réglementation": return <FileText className="h-4 w-4" />;
    case "financement": return <Receipt className="h-4 w-4" />;
    case "diagnostic": return <Search className="h-4 w-4" />;
    case "fiscalité": return <Receipt className="h-4 w-4" />;
    case "urbanisme": return <Building className="h-4 w-4" />;
    case "construction": return <HardHat className="h-4 w-4" />;
    case "sécurité": return <Shield className="h-4 w-4" />;
    case "profession": return <Bookmark className="h-4 w-4" />;
    case "juridique": return <Landmark className="h-4 w-4" />;
    case "environnement": return <Ruler className="h-4 w-4" />;
    case "innovation": return <Ruler className="h-4 w-4" />;
    case "santé": return <FileWarning className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

// Function to translate category names
const translateCategory = (category: string) => {
  const translations = {
    "tous": "Toutes catégories",
    "réglementation": "Réglementation",
    "financement": "Financement",
    "diagnostic": "Diagnostic",
    "fiscalité": "Fiscalité",
    "urbanisme": "Urbanisme",
    "construction": "Construction",
    "sécurité": "Sécurité",
    "profession": "Profession",
    "juridique": "Juridique",
    "environnement": "Environnement",
    "innovation": "Innovation",
    "santé": "Santé"
  };
  return translations[category] || category;
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, categoryFilter, setCategoryFilter }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 flex-nowrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCategoryFilter(category)}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
            categoryFilter === category 
              ? 'bg-khaki-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {getCategoryIcon(category)}
          <span className="ml-1.5">{translateCategory(category)}</span>
        </button>
      ))}
    </div>
  );
};
