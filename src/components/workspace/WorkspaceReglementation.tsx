
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileCheck, Book, Ruler } from 'lucide-react';
import { DTURecapSection } from './reglementation/DTURecapSection';
import ReglementationHeader from './reglementation/ReglementationHeader';
import NormesEtStandards from './reglementation/NormesEtStandards';
import ArticlesReglementation from './reglementation/ArticlesReglementation';
import DocumentsReference from './reglementation/DocumentsReference';

const WorkspaceReglementation: React.FC = () => {
  return (
    <div className="space-y-8">
      <ReglementationHeader />
      
      <Tabs defaultValue="dtu" className="w-full">
        <TabsList className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="dtu" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>DTU</span>
          </TabsTrigger>
          <TabsTrigger value="normes" className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            <span>Normes et standards</span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Articles techniques</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Documents</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dtu" className="mt-6">
          <DTURecapSection />
        </TabsContent>
        
        <TabsContent value="normes" className="mt-6">
          <NormesEtStandards />
        </TabsContent>
        
        <TabsContent value="articles" className="mt-6">
          <ArticlesReglementation />
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <DocumentsReference />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceReglementation;
