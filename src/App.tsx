
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Index from "./pages/Index";
import Estimation from "./pages/Estimation";
import Prestations from "./pages/Prestations";
import Realisations from "./pages/Realisations";
import Equipe from "./pages/Equipe";
import Workspace from "./pages/Workspace";
import Partenaires from "./pages/Partenaires";
import Parrainage from "./pages/Parrainage";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import CGV from "./pages/CGV";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/estimation" element={<Estimation />} />
                <Route path="/prestations-maitre-oeuvre" element={<Prestations />} />
                <Route path="/realisations-architecte-maison" element={<Realisations />} />
                <Route path="/equipe-maitrise-oeuvre" element={<Equipe />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/devenir-partenaire" element={<Partenaires />} />
                <Route path="/parrainage-travaux" element={<Parrainage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mentions-legales" element={<Legal />} />
                <Route path="/cgv" element={<CGV />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
