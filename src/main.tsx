
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
import { AuthProvider } from './hooks/useAuth';

// Create a client
const queryClient = new QueryClient();

// Configure development mode logging for authentication
if (import.meta.env.DEV) {
  console.log('Supabase authentification est configurée et prête à être utilisée');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <App />
            </AuthProvider>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
