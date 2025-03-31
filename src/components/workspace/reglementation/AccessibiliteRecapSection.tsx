
import React, { useState } from 'react';
import { accessibiliteDTUs } from './data/dtu/accessibilite';
import { SearchAndFilterBar } from './dtu/SearchAndFilterBar';
import { DTUGridList } from './dtu/DTUGridList';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { useDTUSearch } from './dtu/useDTUSearch';
import { DTU } from './dtu/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Building, Home, Store, School, Accessibility, Calendar, CalendarDays, Ruler, FileText } from 'lucide-react';

export const AccessibiliteRecapSection = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    categories, 
    filteredDTUs 
  } = useDTUSearch(accessibiliteDTUs);
  
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [accessibiliteTab, setAccessibiliteTab] = useState("general");
  
  const handleDTUClick = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDetailOpen(true);
  };

  // Filtrer les DTUs par type
  const erpDTUs = filteredDTUs.filter(dtu => dtu.id.includes('erp'));
  const logementDTUs = filteredDTUs.filter(dtu => dtu.id.includes('logement'));
  const dimensionnementDTUs = filteredDTUs.filter(dtu => dtu.id.includes('dimension'));
  const adApDTUs = filteredDTUs.filter(dtu => dtu.id.includes('adap'));
  const specificDTUs = filteredDTUs.filter(dtu => dtu.id.includes('specifiques'));

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <h3 className="text-blue-800 font-medium flex items-center gap-2 mb-2">
          <Accessibility className="h-5 w-5" />
          Réglementation Accessibilité
        </h3>
        <p className="text-blue-700 text-sm">
          Cette section présente les normes d'accessibilité applicables aux différents types de bâtiments.
          Consultez les règles à respecter pour garantir l'accessibilité aux personnes à mobilité réduite.
        </p>
      </div>

      <SearchAndFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />
      
      <Tabs value={accessibiliteTab} onValueChange={setAccessibiliteTab} className="mt-6">
        <TabsList className="mb-6 bg-blue-50 flex flex-wrap">
          <TabsTrigger value="general" className="data-[state=active]:bg-white">
            <FileText className="h-4 w-4 mr-2" />
            <span>Vue générale</span>
          </TabsTrigger>
          <TabsTrigger value="erp" className="data-[state=active]:bg-white">
            <Store className="h-4 w-4 mr-2" />
            <span>ERP</span>
          </TabsTrigger>
          <TabsTrigger value="logement" className="data-[state=active]:bg-white">
            <Home className="h-4 w-4 mr-2" />
            <span>Logement</span>
          </TabsTrigger>
          <TabsTrigger value="dimensions" className="data-[state=active]:bg-white">
            <Ruler className="h-4 w-4 mr-2" />
            <span>Règles dimensionnelles</span>
          </TabsTrigger>
          <TabsTrigger value="adap" className="data-[state=active]:bg-white">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>Agenda Ad'AP</span>
          </TabsTrigger>
          <TabsTrigger value="specifiques" className="data-[state=active]:bg-white">
            <Building className="h-4 w-4 mr-2" />
            <span>ERP Spécifiques</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="erp" className="space-y-6">
          <DTUGridList 
            dtus={erpDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="logement" className="space-y-6">
          <DTUGridList 
            dtus={logementDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="dimensions" className="space-y-6">
          <DTUGridList 
            dtus={dimensionnementDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="adap" className="space-y-6">
          <DTUGridList 
            dtus={adApDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="specifiques" className="space-y-6">
          <DTUGridList 
            dtus={specificDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>
      </Tabs>
      
      <DTUDetailDialog 
        dtu={selectedDTU} 
        isOpen={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
        searchTerm={searchTerm}
      />
    </div>
  );
};
