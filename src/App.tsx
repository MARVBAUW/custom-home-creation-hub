
import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from './hooks/auth/AuthProvider';
import { UserRegistrationNotificationsContainer } from './components/admin/notifications/UserRegistrationNotification';
import { routes } from './routes';

const queryClient = new QueryClient();

// Loading fallback for suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    <span className="ml-3 text-lg text-gray-700">Chargement de l'application...</span>
  </div>
);

const App = () => {
  const routeElements = useRoutes(routes);

  return (
    <ThemeProvider defaultTheme="light" storageKey="progineer-theme">
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <UserRegistrationNotificationsContainer />
            <Suspense fallback={<LoadingFallback />}>
              {routeElements}
            </Suspense>
            <Toaster />
          </AuthProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
