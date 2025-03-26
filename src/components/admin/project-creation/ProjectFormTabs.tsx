
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectFormTabs = () => {
  return (
    <TabsList className="mb-6 grid grid-cols-3 lg:grid-cols-6">
      <TabsTrigger value="general">Générales</TabsTrigger>
      <TabsTrigger value="phases">Phases</TabsTrigger>
      <TabsTrigger value="dates">Dates</TabsTrigger>
      <TabsTrigger value="team">Équipe</TabsTrigger>
      <TabsTrigger value="execution">Exécution</TabsTrigger>
      <TabsTrigger value="technical">Technique</TabsTrigger>
    </TabsList>
  );
};

export default ProjectFormTabs;
