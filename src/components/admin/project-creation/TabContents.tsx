
import React from 'react';
import ProjectGeneralForm from '../forms/ProjectGeneralForm';
import ProjectPhaseForm from '../forms/ProjectPhaseForm';
import ProjectDateForm from '../forms/ProjectDateForm';
import ProjectTeamForm from '../forms/ProjectTeamForm';
import ProjectExecutionForm from '../forms/ProjectExecutionForm';
import ProjectTechnicalForm from '../forms/ProjectTechnicalForm';
import { TabsContent } from "@/components/ui/tabs";

export const GeneralTabContent = () => (
  <TabsContent value="general">
    <ProjectGeneralForm />
  </TabsContent>
);

export const PhasesTabContent = () => (
  <TabsContent value="phases">
    <ProjectPhaseForm />
  </TabsContent>
);

export const DatesTabContent = () => (
  <TabsContent value="dates">
    <ProjectDateForm />
  </TabsContent>
);

export const TeamTabContent = () => (
  <TabsContent value="team">
    <ProjectTeamForm />
  </TabsContent>
);

export const ExecutionTabContent = () => (
  <TabsContent value="execution">
    <ProjectExecutionForm />
  </TabsContent>
);

export const TechnicalTabContent = () => (
  <TabsContent value="technical">
    <ProjectTechnicalForm />
  </TabsContent>
);
