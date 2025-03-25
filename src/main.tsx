
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import App from './App';
import './index.css';

// Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_YWJsZS1zcGlkZXItNjUuY2xlcmsuYWNjb3VudHMuZGV2JA";

// Create a client
const queryClient = new QueryClient();

if (!PUBLISHABLE_KEY) {
  console.error("Missing Clerk Publishable Key!");
}

// Configure development mode logging for authentication
if (import.meta.env.DEV) {
  console.log('Clerk authentication is set up with the following configuration:');
  console.log('- publishableKey:', PUBLISHABLE_KEY ? PUBLISHABLE_KEY : 'missing');
  console.log('- signInUrl: /workspace/sign-in');
  console.log('- signUpUrl: /workspace/sign-up');
  console.log('- afterSignInUrl: /workspace/client-area');
  console.log('- afterSignUpUrl: /workspace/client-area');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/workspace/sign-in"
      signUpUrl="/workspace/sign-up"
      afterSignInUrl="/workspace/client-area"
      afterSignUpUrl="/workspace/client-area"
      afterSignOutUrl="/workspace"
    >
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <App />
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);
