
import React, { useState } from 'react';
import { useReglementation } from './reglementation/useReglementation';
import { ReglementationHeader } from './reglementation/ReglementationHeader';
import { LastUpdateInfo } from './reglementation/LastUpdateInfo';
import { SearchFilterSection } from './reglementation/SearchFilterSection';
import { ArticleList } from './reglementation/ArticleList';
import WorkspaceArticleDetail from './WorkspaceArticleDetail';
import { DTURecapSection } from './reglementation/DTURecapSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, FileCheck } from 'lucide-react';

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

  const [activeTab, setActiveTab] = useState<"articles" | "dtu">("articles");

  return (
    <div className="space-y-6">
      <ReglementationHeader />
      
      <LastUpdateInfo lastUpdate={lastUpdate} nextScheduledUpdate={nextScheduledUpdate} />
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "articles" | "dtu")}>
        <TabsList className="mb-4">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Articles réglementaires</span>
          </TabsTrigger>
          <TabsTrigger value="dtu" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Fiches DTU</span>
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
