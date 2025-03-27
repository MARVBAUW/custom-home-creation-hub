import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Estimation from './pages/Estimation';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CGU from './pages/CGU';
import FAQ from './pages/FAQ';
import Sitemap from './pages/Sitemap';
import Workspace from './pages/Workspace';
import ClientArea from './pages/client/ClientArea';
import ClientProjects from './pages/client/ClientProjects';
import ClientProjectDetail from './pages/client/ClientProjectDetail';
import ClientOnboarding from './pages/client/ClientOnboarding';
import SignIn from './pages/SignIn';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from "@/components/ui/toaster"
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProjectCreation from './pages/client/AdminProjectCreation';
import AdminProjectsOverview from './pages/client/AdminProjectsOverview';
import AdminProjects from './pages/client/AdminProjects';
import AdminProjectDetail from './pages/client/AdminProjectDetail';
import AdminAssignClient from './pages/client/AdminAssignClient';
import { UserRegistrationNotificationsContainer } from './components/admin/notifications/UserRegistrationNotification';

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
