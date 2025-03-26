
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryFilterProps {
  categories: string[];
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  categoryFilter, 
  setCategoryFilter 
}) => {
  const formatCategory = (category: string) => {
    if (category === "tous") return "Toutes les catégories";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <div className="w-full md:w-auto">
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-full md:w-[200px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 focus:ring-offset-gray-900">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
          {categories.map((category) => (
            <SelectItem 
              key={category} 
              value={category}
              className="dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {formatCategory(category)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
