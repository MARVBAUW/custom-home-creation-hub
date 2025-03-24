
import React from 'react';
import SEO from '@/components/common/SEO';
import { getContactStructuredData } from '@/components/contact/ContactPageData';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import ContactLocationMap from '@/components/contact/ContactLocationMap';
import SEOFooter from '@/components/common/SEOFooter';
import Container from '@/components/common/Container';

const Contact = () => {
  const structuredData = getContactStructuredData();

  return (
    <>
      <SEO 
        title="Contact | Progineer - Architecte & Maître d'œuvre en PACA"
        description="Contactez Progineer, votre architecte et maître d'œuvre pour vos projets de construction, rénovation et extension en région PACA - Marseille, Nice, Toulon, Cannes."
        keywords="contact architecte Marseille, contact maître d'œuvre PACA, devis travaux, rendez-vous architecte, contact entreprise construction PACA"
        canonicalUrl="https://progineer.fr/contact"
        structuredData={structuredData}
        ogType="website"
        ogImage="https://progineer.fr/images/progineer-contact.jpg"
      >
        {/* Additional meta tags for better indexing */}
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="FR-PAC" />
        <meta name="geo.placename" content="Provence-Alpes-Côte d'Azur" />
        <link rel="alternate" hrefLang="fr-fr" href="https://progineer.fr/contact" />
      </SEO>

      <ContactHero />

      {/* Contact content */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ContactInfo />
            
            {/* Contact Form */}
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <ContactLocationMap />

      {/* SEO Footer */}
      <SEOFooter 
        text="Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Contactez nos architectes et ingénieurs pour votre projet dans la région Provence-Alpes-Côte d'Azur. Notre équipe intervient à Marseille, Nice, Toulon, Cannes, Saint-Tropez et dans toute la région PACA pour vous accompagner dans la réalisation de votre projet de construction, rénovation ou extension."
      />
    </>
  );
};

export default Contact;
