
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Realisations from './pages/Realisations';
import Prestations from './pages/Prestations';
import Estimation from './pages/Estimation';
import Equipe from './pages/Equipe';
import Legal from './pages/Legal';
import CGV from './pages/CGV';
import FAQ from './pages/FAQ';
import Partenaires from './pages/Partenaires'; 
import Parrainage from './pages/Parrainage';
import Workspace from './pages/Workspace';
import ClientArea from './pages/client/ClientArea';
import ClientDocuments from './pages/client/ClientDocuments';
import ClientProjects from './pages/client/ClientProjects';
import ClientMessages from './pages/client/ClientMessages';
import ClientDocumentation from './pages/client/ClientDocumentation';
import ClientGallery from './pages/client/ClientGallery';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/realisations-architecte-maison" element={<Realisations />} />
        <Route path="/prestations-maitre-oeuvre" element={<Prestations />} />
        <Route path="/estimation" element={<Estimation />} />
        <Route path="/equipe-maitrise-oeuvre" element={<Equipe />} />
        <Route path="/mentions-legales" element={<Legal />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/devenir-partenaire" element={<Partenaires />} />
        <Route path="/parrainage-travaux" element={<Parrainage />} />
        
        {/* Workspace routes */}
        <Route path="/workspace" element={<Workspace />} />
        
        {/* Client Area routes */}
        <Route path="/workspace/client-area" element={<ClientArea />} />
        <Route path="/workspace/client-area/documents" element={<ClientDocuments />} />
        <Route path="/workspace/client-area/projects" element={<ClientProjects />} />
        <Route path="/workspace/client-area/messages" element={<ClientMessages />} />
        <Route path="/gallery" element={<ClientGallery />} />
        
        {/* Client Documentation route */}
        <Route path="/workspace/client-documentation" element={<ClientDocumentation />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
