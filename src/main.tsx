
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import App from './App';
import './index.css';

// Create a client
const queryClient = new QueryClient();

// Clerk publishable key - using a fallback to prevent errors if env is not set
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Configure development mode logging for authentication
if (import.meta.env.DEV) {
  console.log('Clerk authentication is set up with the following configuration:');
  console.log('- publishableKey:', PUBLISHABLE_KEY || 'Not configured - authentication required');
}

// Render application with Clerk provider only if a valid key is available
const renderApp = () => {
  // Remove any existing demo mode flag
  if (typeof window !== 'undefined') {
    (window as any).__DEMO_MODE__ = false;
  }
  
  return (
    <React.StrictMode>
      {PUBLISHABLE_KEY ? (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} clerkJSVersion="5.56.0-snapshot.v20250312225817">
          <ClerkLoading>
            <AppWithFallback loading={true} />
          </ClerkLoading>
          <ClerkLoaded>
            <AppWithFallback loading={false} />
          </ClerkLoaded>
        </ClerkProvider>
      ) : (
        // If no valid key is available, show application without Clerk but with auth required
        <AppWithFallback loading={false} />
      )}
    </React.StrictMode>
  );
};

// Wrapper component to handle loading states
const AppWithFallback = ({ loading }: { loading: boolean }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {loading ? (
            <div className="flex h-screen items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement de l'application...</p>
              </div>
            </div>
          ) : (
            <App />
          )}
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

// Initialize the app
ReactDOM.createRoot(document.getElementById('root')!).render(renderApp());
