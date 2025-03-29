
import React, { useState } from 'react';
import { useReglementation } from './reglementation/useReglementation';
import { ReglementationHeader } from './reglementation/ReglementationHeader';
import { LastUpdateInfo } from './reglementation/LastUpdateInfo';
import { SearchFilterSection } from './reglementation/SearchFilterSection';
import { ArticleList } from './reglementation/ArticleList';
import WorkspaceArticleDetail from './WorkspaceArticleDetail';
import { DTURecapSection } from './reglementation/DTURecapSection';
import { IncendieRecapSection } from './reglementation/IncendieRecapSection';
import { AccessibiliteRecapSection } from './reglementation/AccessibiliteRecapSection';
import { UrbanismeRecapSection } from './reglementation/UrbanismeRecapSection';
import { EurocodeRecapSection } from './reglementation/EurocodeRecapSection';
import { AcoustiqueRecapSection } from './reglementation/AcoustiqueRecapSection';
import { ThermiqueRecapSection } from './reglementation/ThermiqueRecapSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, FileCheck, Flame, Accessibility, Building, Calculator, Volume, Thermometer } from 'lucide-react';

const WorkspaceReglementation = () => {
  const {
    page,
    setPage,
    filteredArticles,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    lastUpdate,
    nextScheduledUpdate,
    selectedArticle,
    isArticleOpen,
    handleArticleClick,
    handleCloseArticle,
    categories,
    itemsPerPage
  } = useReglementation();

  const [activeTab, setActiveTab] = useState<string>("articles");

  return (
    <div className="space-y-6">
      <ReglementationHeader />
      
      <LastUpdateInfo lastUpdate={lastUpdate} nextScheduledUpdate={nextScheduledUpdate} />
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Articles réglementaires</span>
          </TabsTrigger>
          <TabsTrigger value="dtu" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Fiches DTU</span>
          </TabsTrigger>
          <TabsTrigger value="incendie" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            <span>Sécurité Incendie</span>
          </TabsTrigger>
          <TabsTrigger value="accessibilite" className="flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            <span>Accessibilité</span>
          </TabsTrigger>
          <TabsTrigger value="urbanisme" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Urbanisme</span>
          </TabsTrigger>
          <TabsTrigger value="eurocode" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Eurocodes</span>
          </TabsTrigger>
          <TabsTrigger value="acoustique" className="flex items-center gap-2">
            <Volume className="h-4 w-4" />
            <span>Acoustique</span>
          </TabsTrigger>
          <TabsTrigger value="thermique" className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            <span>Thermique</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles" className="space-y-6">
          <SearchFilterSection 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categories={categories}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          
          <ArticleList 
            filteredArticles={filteredArticles}
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            handleArticleClick={handleArticleClick}
          />
        </TabsContent>
        
        <TabsContent value="dtu" className="space-y-6">
          <DTURecapSection />
        </TabsContent>
        
        <TabsContent value="incendie" className="space-y-6">
          <IncendieRecapSection />
        </TabsContent>
        
        <TabsContent value="accessibilite" className="space-y-6">
          <AccessibiliteRecapSection />
        </TabsContent>
        
        <TabsContent value="urbanisme" className="space-y-6">
          <UrbanismeRecapSection />
        </TabsContent>
        
        <TabsContent value="eurocode" className="space-y-6">
          <EurocodeRecapSection />
        </TabsContent>
        
        <TabsContent value="acoustique" className="space-y-6">
          <AcoustiqueRecapSection />
        </TabsContent>
        
        <TabsContent value="thermique" className="space-y-6">
          <ThermiqueRecapSection />
        </TabsContent>
      </Tabs>
      
      {/* Article Detail Dialog */}
      {selectedArticle && (
        <WorkspaceArticleDetail 
          article={selectedArticle}
          isOpen={isArticleOpen}
          onClose={handleCloseArticle}
        />
      )}
    </div>
  );
};

export default WorkspaceReglementation;
