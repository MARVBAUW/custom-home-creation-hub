
import React, { useState } from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from '@/hooks/use-media-query';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const Estimation = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Enhanced structured data with more detailed information
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Estimation gratuite de projet de construction ou rénovation en PACA",
    "description": "Obtenez une estimation gratuite et détaillée pour votre projet de construction, rénovation ou extension avec Progineer, maître d'œuvre expert en région PACA - Marseille, Nice, Toulon.",
    "url": "https://progineer.fr/estimation",
    "mainEntity": {
      "@type": "Service",
      "name": "Estimation de projet de construction et rénovation",
      "description": "Service d'estimation personnalisée de projet de construction, rénovation ou extension proposé par Progineer en région PACA. Devis détaillé gratuit en 24h.",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Progineer",
        "telephone": "+33783762156",
        "email": "progineer.moe@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Marseille",
          "addressRegion": "PACA",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "43.296482",
          "longitude": "5.369780"
        }
      },
      "areaServed": ["Marseille", "Nice", "Toulon", "Cannes", "Fréjus", "Aix-en-Provence", "PACA"],
      "serviceType": "Estimation de projet immobilier",
      "audience": {
        "@type": "Audience",
        "audienceType": "Particuliers et professionnels"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "description": "Estimation gratuite sans engagement"
      }
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://progineer.fr/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Estimation de projet",
          "item": "https://progineer.fr/estimation"
        }
      ]
    }
  };

  // Determine which component to show based on screen size
  const FormModal = () => {
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Estimer gratuitement mon projet</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] h-[80vh]">
            <iframe
              title="Formulaire d'estimation de projet"
              src="https://tally.so/r/nGB6KO"
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              style={{ height: "calc(80vh - 80px)" }}
            ></iframe>
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>Estimer gratuitement mon projet</Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh]">
          <iframe
            title="Formulaire d'estimation de projet mobile"
            src="https://tally.so/r/nGB6KO"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            style={{ height: "calc(80vh - 80px)" }}
          ></iframe>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <>
      <SEO 
        title="Estimation Gratuite de Projet de Construction & Rénovation | Progineer PACA"
        description="Estimez gratuitement et sans engagement votre projet de construction, rénovation ou extension avec Progineer, maître d'œuvre expert en région PACA. Devis personnalisé en 24h. Marseille, Nice, Toulon."
        keywords="estimation projet construction PACA, devis travaux Marseille, prix maison sur mesure, estimation rénovation Nice, coût extension maison Toulon, budget construction appartement, estimation travaux gratuite, devis architecte PACA"
        canonicalUrl="https://progineer.fr/estimation"
        structuredData={structuredData}
        ogType="website"
        ogImage="https://progineer.fr/estimation-projet-construction.jpg"
      >
        {/* Additional meta tags for better indexing */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="geo.region" content="FR-PAC" />
        <meta name="geo.placename" content="Provence-Alpes-Côte d'Azur" />
        <link rel="alternate" hrefLang="fr-fr" href="https://progineer.fr/estimation" />
      </SEO>

      {/* Enhanced Hero section with more SEO-friendly content */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Estimation Gratuite
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Estimez gratuitement votre projet de construction en PACA
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 speakable">
              Notre outil d'estimation vous donne une idée précise du budget nécessaire pour votre projet 
              de construction, rénovation ou extension en région PACA. Recevez un devis détaillé en 24h.
            </p>
            <FormModal />
          </div>
        </Container>
      </section>

      {/* Key benefits section - helps with SEO and conversions */}
      <section className="py-16 bg-white">
        <Container size="md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">
            Pourquoi demander une estimation à Progineer ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-stone-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Estimation précise</h3>
              <p>Nos experts analysent en détail votre projet pour vous fournir un chiffrage réaliste et transparent.</p>
            </div>
            
            <div className="bg-stone-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Réponse rapide</h3>
              <p>Recevez votre estimation détaillée sous 24h pour avancer rapidement dans la réalisation de votre projet.</p>
            </div>
            
            <div className="bg-stone-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Sans engagement</h3>
              <p>Notre service d'estimation est totalement gratuit et ne vous engage à rien. Vous restez libre de votre décision.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <FormModal />
          </div>
        </Container>
      </section>

      {/* Trust signals section */}
      <section className="py-16 bg-stone-50">
        <Container size="md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
            Notre expertise en chiffres
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <div className="text-center p-4">
              <p className="text-4xl font-bold text-khaki-700 mb-2">+300</p>
              <p className="text-gray-600">Projets réalisés</p>
            </div>
            
            <div className="text-center p-4">
              <p className="text-4xl font-bold text-khaki-700 mb-2">98%</p>
              <p className="text-gray-600">Clients satisfaits</p>
            </div>
            
            <div className="text-center p-4">
              <p className="text-4xl font-bold text-khaki-700 mb-2">15+</p>
              <p className="text-gray-600">Années d'expérience</p>
            </div>
            
            <div className="text-center p-4">
              <p className="text-4xl font-bold text-khaki-700 mb-2">+20</p>
              <p className="text-gray-600">Villes couvertes</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
              Faites confiance à notre équipe d'experts pour vous accompagner dans votre projet de construction ou de rénovation en région PACA.
            </p>
            <FormModal />
          </div>
        </Container>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-16 bg-white">
        <Container size="md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">
            Questions fréquentes sur nos estimations
          </h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-medium mb-2">Comment est calculée l'estimation de mon projet ?</h3>
              <p className="text-gray-600">Notre équipe utilise des données précises du marché immobilier en PACA et prend en compte tous les aspects de votre projet : surface, matériaux, complexité, localisation, etc. pour vous fournir une estimation réaliste.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-medium mb-2">Combien de temps faut-il pour recevoir mon estimation ?</h3>
              <p className="text-gray-600">Vous recevrez votre estimation détaillée sous 24h ouvrées après réception de votre demande complète.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-medium mb-2">L'estimation est-elle vraiment gratuite ?</h3>
              <p className="text-gray-600">Oui, notre service d'estimation est 100% gratuit et sans engagement. C'est notre façon de vous aider à mieux planifier votre projet.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-medium mb-2">Dans quelles villes intervenez-vous en PACA ?</h3>
              <p className="text-gray-600">Nous intervenons dans toutes les principales villes de la région PACA : Marseille, Nice, Toulon, Aix-en-Provence, Cannes, Antibes, Fréjus, Saint-Raphaël, et bien d'autres.</p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <FormModal />
          </div>
        </Container>
      </section>

      {/* Local cities section for SEO */}
      <section className="py-12 bg-stone-50">
        <Container>
          <h2 className="text-xl font-medium mb-6 text-center text-gray-700">
            Zones d'intervention pour vos projets de construction et rénovation
          </h2>
          
          <div className="text-sm text-gray-600 text-center max-w-4xl mx-auto columns-2 md:columns-4 gap-8">
            <p className="mb-2">Marseille</p>
            <p className="mb-2">Nice</p>
            <p className="mb-2">Toulon</p>
            <p className="mb-2">Aix-en-Provence</p>
            <p className="mb-2">Cannes</p>
            <p className="mb-2">Antibes</p>
            <p className="mb-2">Fréjus</p>
            <p className="mb-2">Saint-Raphaël</p>
            <p className="mb-2">La Ciotat</p>
            <p className="mb-2">Hyères</p>
            <p className="mb-2">Martigues</p>
            <p className="mb-2">Aubagne</p>
            <p className="mb-2">Cagnes-sur-Mer</p>
            <p className="mb-2">Salon-de-Provence</p>
            <p className="mb-2">La Seyne-sur-Mer</p>
            <p className="mb-2">Istres</p>
          </div>
        </Container>
      </section>

      {/* SEO Footer */}
      <section className="py-8 bg-stone-50 border-t border-stone-200">
        <Container>
          <div className="text-sm text-stone-500">
            <h2 className="text-base font-medium mb-2 text-stone-700">Estimation de projets de construction en PACA</h2>
            <p>
              Progineer, ingénieur et maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Estimation précise de vos projets par nos architectes et ingénieurs. Nous intervenons à Marseille, Nice, Toulon, Cannes, Saint-Tropez et dans toute la région PACA pour vous proposer un devis détaillé et personnalisé. Confiez-nous votre projet de construction neuve, d'extension ou de rénovation pour bénéficier d'un accompagnement sur-mesure par des professionnels expérimentés.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Estimation;
