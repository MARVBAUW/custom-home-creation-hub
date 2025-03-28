
import React from 'react';
import { SearchBar } from './guides/SearchBar';
import { FeaturedGuides } from './guides/FeaturedGuides';
import { CategoryTabs } from './guides/CategoryTabs';
import { ResourceStats } from './guides/ResourceStats';
import { UpdateNotice } from './guides/UpdateNotice';
import { DocumentDialog } from './guides/DocumentDialog';
import PreviewDialog from './guides/PreviewDialog';
import { useGuides } from './guides/useGuides';

const WorkspaceGuides = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    isPreviewOpen,
    setIsPreviewOpen,
    selectedDocument,
    featuredGuides,
    filteredGuides,
    categories,
    guides,
    handleDocumentClick,
    handleDownload,
    handlePreview
  } = useGuides();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Guides pratiques et ressources</h2>
        <p className="text-gray-600">
          Consultez notre bibliothèque de guides et ressources pour vous aider dans vos projets de construction et rénovation.
        </p>
      </div>

      {/* Search bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Featured guides section */}
      {!searchQuery && activeCategory === "all" && (
        <FeaturedGuides 
          featuredGuides={featuredGuides} 
          handleDocumentClick={handleDocumentClick} 
        />
      )}

      {/* Categories tabs */}
      <CategoryTabs 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filteredGuides={filteredGuides}
        handleDocumentClick={handleDocumentClick}
      />

      {/* Resource stats */}
      <ResourceStats guides={guides} />

      {/* Information about updates */}
      <UpdateNotice />

      {/* Document preview dialog */}
      <DocumentDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        selectedDocument={selectedDocument}
        handleDownload={handleDownload}
        handlePreview={handlePreview}
      />

      {/* Document preview panel */}
      <PreviewDialog 
        isOpen={isPreviewOpen}
        setIsOpen={setIsPreviewOpen}
        selectedDocument={selectedDocument}
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default WorkspaceGuides;
