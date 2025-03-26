import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Realisations from './pages/Realisations';
import Prestations from './pages/Prestations';
import Estimation from './pages/Estimation';
import Equipe from './pages/Equipe';
import Legal from './pages/Legal';
import MentionsLegales from './pages/MentionsLegales';
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
import AdminProjectsOverview from './pages/client/AdminProjectsOverview';
import AdminQuotes from './pages/client/AdminQuotes';
import ProjectDetails from './pages/client/ProjectDetails';
import { ThemeProvider } from './hooks/use-theme';

// Composant de chargement pendant le chargement asynchrone des pages
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-progineer-gold"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/realisations-architecte-maison" element={<Realisations />} />
              <Route path="/prestations-maitre-oeuvre" element={<Prestations />} />
              <Route path="/estimation" element={<Estimation />} />
              <Route path="/equipe-maitrise-oeuvre" element={<Equipe />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
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
            
            {/* Admin routes */}
            <Route path="/workspace/client-area/admin/projects-overview" element={<AdminProjectsOverview />} />
            <Route path="/workspace/client-area/admin/quotes" element={<AdminQuotes />} />
            <Route path="/workspace/client-area/projects/:projectId" element={<ProjectDetails />} />
            
            {/* Client Documentation route */}
            <Route path="/workspace/client-documentation" element={<ClientDocumentation />} />
            
            {/* Route pour gérer les URLs non trouvées */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-4xl font-bold mb-4">Page non trouvée</h1>
                <p className="mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
                <a href="/" className="btn-primary">Retour à l'accueil</a>
              </div>
            } />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
