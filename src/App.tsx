
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "./components/theme/ThemeProvider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './hooks/useAuth';
import AdminDashboard from './components/admin/AdminDashboard';
import { UserRegistrationNotificationsContainer } from './components/admin/notifications/UserRegistrationNotification';

// Import pages from pages directory
import Workspace from './pages/Workspace';
import Contact from './pages/Contact';
import Estimation from './pages/Estimation';
import FAQ from './pages/FAQ';

// Import client area pages
import ClientArea from './pages/client/ClientArea';
import ClientProjects from './pages/client/ClientProjects';
import ClientOnboarding from './pages/client/ClientOnboarding';
import AdminProjectCreation from './pages/client/AdminProjectCreation';
import AdminProjectsOverview from './pages/client/AdminProjectsOverview';
import AdminProjects from './pages/client/AdminProjects';
import AdminProjectDetail from './pages/client/AdminProjectDetail';
import AdminAssignClient from './pages/client/AdminAssignClient';

// Create a custom Home component until the actual one is implemented
const Home = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Progineer - Accueil</h1>
    <p className="mb-4">Bienvenue sur le site de Progineer.</p>
    <div className="flex space-x-4 mt-8">
      <a href="/workspace" className="bg-khaki-600 hover:bg-khaki-700 text-white px-4 py-2 rounded">
        Espace de travail
      </a>
      <a href="/contact" className="bg-khaki-600 hover:bg-khaki-700 text-white px-4 py-2 rounded">
        Contact
      </a>
    </div>
  </div>
);

// Create temporary placeholder components for missing pages
const LegalNotice = () => <div className="p-8"><h1 className="text-2xl">Mentions Légales</h1></div>;
const PrivacyPolicy = () => <div className="p-8"><h1 className="text-2xl">Politique de confidentialité</h1></div>;
const CGU = () => <div className="p-8"><h1 className="text-2xl">Conditions Générales d'Utilisation</h1></div>;
const Sitemap = () => <div className="p-8"><h1 className="text-2xl">Plan du site</h1></div>;
const SignIn = () => <div className="p-8"><h1 className="text-2xl">Connexion</h1></div>;
const ClientProjectDetail = () => <div className="p-8"><h1 className="text-2xl">Détail du projet</h1></div>;

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="progineer-theme">
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <UserRegistrationNotificationsContainer />
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/estimation" element={<Estimation />} />
                <Route path="/legal-notice" element={<LegalNotice />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cgu" element={<CGU />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/client-onboarding" element={<ClientOnboarding />} />
                
                {/* Client Area Routes */}
                <Route path="/workspace/client-area" element={<ClientArea />} />
                <Route path="/workspace/client-area/projects" element={<ClientProjects />} />
                <Route path="/workspace/client-area/projects/:projectId" element={<ClientProjectDetail />} />
                
                {/* Admin Routes */}
                <Route path="/workspace/client-area/admin" element={<AdminDashboard />} />
                <Route path="/workspace/client-area/admin/projects" element={<AdminProjects />} />
                <Route path="/workspace/client-area/admin/projects/:projectId" element={<AdminProjectDetail />} />
                <Route path="/workspace/client-area/admin/projects/:projectId/assign-client" element={<AdminAssignClient />} />
                <Route path="/workspace/client-area/admin/projects/create" element={<AdminProjectCreation />} />
                <Route path="/workspace/client-area/admin/planning" element={<AdminProjectsOverview />} />
              </Routes>
            </Router>
            <Toaster />
          </AuthProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
