
import React from 'react';
import { FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuideCategory, GuideDocument } from './types';
import { GuideCard } from './GuideCard';

interface CategoryTabsProps {
  categories: GuideCategory[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filteredGuides: GuideDocument[];
  handleDocumentClick: (document: GuideDocument) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  filteredGuides,
  handleDocumentClick
}) => {
  return (
    <Tabs defaultValue="tous" value={activeCategory} onValueChange={setActiveCategory}>
      <TabsList className="bg-muted mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {categories.map(category => {
          const IconComponent = category.icon;
          return (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center">
              <IconComponent className="h-4 w-4" />
              <span className="ml-2">{category.name}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {categories.map(category => (
        <TabsContent key={category.id} value={category.id} className="space-y-4">
          {filteredGuides.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-500">Aucun document trouvé</h3>
              <p className="text-gray-400 mt-2">
                Essayez de modifier votre recherche ou de changer de catégorie
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGuides.map(document => (
                <GuideCard 
                  key={document.id} 
                  document={document} 
                  onClick={handleDocumentClick} 
                />
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
