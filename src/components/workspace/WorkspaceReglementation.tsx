
import React from 'react';
import { useReglementation } from './reglementation/useReglementation';
import { ReglementationHeader } from './reglementation/ReglementationHeader';
import { LastUpdateInfo } from './reglementation/LastUpdateInfo';
import { SearchFilterSection } from './reglementation/SearchFilterSection';
import { ArticleList } from './reglementation/ArticleList';
import WorkspaceArticleDetail from './WorkspaceArticleDetail';

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

  return (
    <div className="space-y-6">
      <ReglementationHeader />
      
      <LastUpdateInfo lastUpdate={lastUpdate} nextScheduledUpdate={nextScheduledUpdate} />
      
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
