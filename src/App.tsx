
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from './hooks/useAuth';
import { UserRegistrationNotificationsContainer } from './components/admin/notifications/UserRegistrationNotification';
import { routes } from './routes';

const queryClient = new QueryClient();

const App = () => {
  const routeElements = useRoutes(routes);

  return (
    <ThemeProvider defaultTheme="light" storageKey="progineer-theme">
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <div className="w-full max-w-[100vw] overflow-x-hidden">
              <UserRegistrationNotificationsContainer />
              {routeElements}
              <Toaster />
            </div>
          </AuthProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
