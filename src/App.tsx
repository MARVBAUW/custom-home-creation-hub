
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import SignIn from './pages/client/SignIn';
import Prestations from './pages/Prestations';
import Realisations from './pages/Realisations';
import Equipe from './pages/Equipe';

// Import client area pages
import ClientArea from './pages/client/ClientArea';
import ClientProjects from './pages/client/ClientProjects';
import ClientOnboarding from './pages/client/ClientOnboarding';
import AdminProjectCreation from './pages/client/AdminProjectCreation';
import AdminProjectsOverview from './pages/client/AdminProjectsOverview';
import AdminProjects from './pages/client/AdminProjects';
import AdminProjectDetail from './pages/client/AdminProjectDetail';
import AdminAssignClient from './pages/client/AdminAssignClient';
import AdminClients from './pages/client/AdminClients';
import AdminClientDetail from './pages/client/AdminClientDetail';
import EstimationTravaux from './pages/client/EstimationTravaux';
import DevisHonoraires from './pages/client/DevisHonoraires';

// Import protected route component
import ProtectedRoute from './components/auth/ProtectedRoute';

// Import layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Create temporary placeholder components for missing pages
const LegalNotice = () => <div className="p-8"><h1 className="text-2xl">Mentions Légales</h1></div>;
const PrivacyPolicy = () => <div className="p-8"><h1 className="text-2xl">Politique de confidentialité</h1></div>;
const CGU = () => <div className="p-8"><h1 className="text-2xl">Conditions Générales d'Utilisation</h1></div>;
const Sitemap = () => <div className="p-8"><h1 className="text-2xl">Plan du site</h1></div>;
const ClientProjectDetail = () => <div className="p-8"><h1 className="text-2xl">Détail du projet</h1></div>;

const queryClient = new QueryClient();

const App = () => {
  // Wrap routes that need the standard layout (with navbar and footer)
  const StandardLayout = ({ children }: { children: React.ReactNode }) => (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );

  return (
    <ThemeProvider defaultTheme="light" storageKey="progineer-theme">
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <UserRegistrationNotificationsContainer />
            <Routes>
              <Route path="/" element={
                <StandardLayout>
                  <Index />
                </StandardLayout>
              } />
              <Route path="/contact" element={
                <StandardLayout>
                  <Contact />
                </StandardLayout>
              } />
              <Route path="/estimation" element={
                <StandardLayout>
                  <Estimation />
                </StandardLayout>
              } />
              <Route path="/legal-notice" element={
                <StandardLayout>
                  <LegalNotice />
                </StandardLayout>
              } />
              <Route path="/privacy-policy" element={
                <StandardLayout>
                  <PrivacyPolicy />
                </StandardLayout>
              } />
              <Route path="/cgu" element={
                <StandardLayout>
                  <CGU />
                </StandardLayout>
              } />
              <Route path="/faq" element={
                <StandardLayout>
                  <FAQ />
                </StandardLayout>
              } />
              <Route path="/sitemap" element={
                <StandardLayout>
                  <Sitemap />
                </StandardLayout>
              } />
              
              {/* Add the missing routes for Prestations, Realisations, and Equipe */}
              <Route path="/prestations-maitre-oeuvre" element={
                <StandardLayout>
                  <Prestations />
                </StandardLayout>
              } />
              <Route path="/realisations-architecte-maison" element={
                <StandardLayout>
                  <Realisations />
                </StandardLayout>
              } />
              <Route path="/equipe-maitrise-oeuvre" element={
                <StandardLayout>
                  <Equipe />
                </StandardLayout>
              } />
              
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/workspace/sign-in" element={<SignIn />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/client-onboarding" element={<ClientOnboarding />} />
              
              {/* Client Area Routes */}
              <Route path="/workspace/client-area" element={
                <ProtectedRoute>
                  <ClientArea />
                </ProtectedRoute>
              } />
              <Route path="/workspace/client-area/projects" element={
                <ProtectedRoute>
                  <ClientProjects />
                </ProtectedRoute>
              } />
              <Route path="/workspace/client-area/projects/:projectId" element={
                <ProtectedRoute>
                  <ClientProjectDetail />
                </ProtectedRoute>
              } />
              <Route path="/workspace/client-area/estimation-travaux" element={
                <ProtectedRoute>
                  <EstimationTravaux />
                </ProtectedRoute>
              } />
              <Route path="/workspace/client-area/devis-honoraires" element={
                <ProtectedRoute>
                  <DevisHonoraires />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/workspace/client-area/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/workspace/client-area/admin/projects" element={
                <ProtectedRoute>
                  <AdminProjects />
                </ProtectedRoute>
              } />
              <Route path="/workspace/client-area/admin/projects/:projectId" element={
                <ProtectedRoute>
                  <AdminProjectDetail />
                </ProtectedRoute>
              } />
              <Route path="/workspace/client-area/admin/projects/:projectId/assign-client" element={
                <ProtectedRoute>
                  <AdminAssignClient />
                </ProtectedRoute>
              } />
              <Route path="/workspace/client-area/admin/projects/create" element={
                <ProtectedRoute>
                  <AdminProjectCreation />
                </ProtectedRoute>
              } />
              <Route path="/workspace/client-area/admin/planning" element={
                <ProtectedRoute>
                  <AdminProjectsOverview />
                </ProtectedRoute>
              } />
              
              {/* Admin Client Routes */}
              <Route path="/workspace/client-area/admin/clients" element={
                <ProtectedRoute>
                  <AdminClients />
                </ProtectedRoute>
              } />
              <Route path="/workspace/client-area/admin/clients/:clientId" element={
                <ProtectedRoute>
                  <AdminClientDetail />
                </ProtectedRoute>
              } />

              {/* Redirect index route to home page */}
              <Route path="/index" element={<Navigate to="/" replace />} />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
