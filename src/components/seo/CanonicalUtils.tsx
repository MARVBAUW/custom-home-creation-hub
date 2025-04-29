
import React from 'react';
import { Helmet } from 'react-helmet-async';

// Helper function to detect similar content based on page path
export const detectSimilarContent = (path: string): string | null => {
  // Define groups of pages with similar content
  const similarContentGroups = [
    // City-specific service pages with similar content
    {
      primary: '/prestations-maitre-oeuvre/construction-neuve',
      variants: [
        '/prestations-maitre-oeuvre/construction-neuve/marseille',
        '/prestations-maitre-oeuvre/construction-neuve/aix-en-provence',
        '/prestations-maitre-oeuvre/construction-neuve/toulon'
      ]
    },
    {
      primary: '/prestations-maitre-oeuvre/renovation',
      variants: [
        '/prestations-maitre-oeuvre/renovation/marseille',
        '/prestations-maitre-oeuvre/renovation/aix-en-provence',
        '/prestations-maitre-oeuvre/renovation/toulon'
      ]
    },
    // Add more groups as needed
  ];

  // Check if current path is in one of the variant groups
  for (const group of similarContentGroups) {
    if (group.variants.includes(path)) {
      return group.primary; // Return the primary canonical URL
    }
  }

  return null; // No similar content detected
};

// Component to generate appropriate canonical URL
export const generateCanonicalUrl = (
  path: string,
  explicitUrl?: string
): string => {
  if (explicitUrl) {
    return explicitUrl;
  }
  
  const similarContentUrl = detectSimilarContent(path);
  if (similarContentUrl) {
    return `https://progineer.fr${similarContentUrl}`;
  }
  
  return `https://progineer.fr${path}`;
};

// Enhanced SEO helper functions
export const generateLocalBusinessSchema = (
  name: string,
  description: string,
  city: string = "Marseille",
  region: string = "PACA"
) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": region,
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city === "Marseille" ? "43.296482" : "43.5",
      "longitude": city === "Marseille" ? "5.369780" : "5.5"
    },
    "url": `https://progineer.fr`,
    "telephone": "+33783762156",
    "priceRange": "€€€"
  };
};

// Component to generate breadcrumb schema
export const generateBreadcrumbSchema = (
  items: Array<{name: string, url: string}>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};
