
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
        title="Contact | Maître d'œuvre Progineer à Marseille et en PACA"
        description="Contactez Progineer, votre maître d'œuvre pour vos projets de construction, rénovation et extension en PACA. Devis gratuit, rendez-vous et conseils personnalisés."
        keywords="contact maître d'œuvre PACA, devis travaux Marseille, rendez-vous construction, téléphone Progineer, adresse entreprise bâtiment"
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

      <main>
        <h1 className="sr-only">Contact - Progineer Maître d'œuvre à Marseille et en PACA</h1>
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
      </main>

      {/* SEO Footer */}
      <SEOFooter 
        text="Contactez votre maître d'œuvre à Marseille et en PACA pour tous vos projets de construction, rénovation et extension. Notre équipe intervient à Marseille, Nice, Toulon, Cannes et dans toute la région PACA pour vous accompagner dans la réalisation de votre projet immobilier."
        additionalKeywords={[
          "formulaire contact maître d'œuvre", 
          "demande devis construction", 
          "prise rendez-vous travaux", 
          "coordonnées Progineer PACA", 
          "contact projet rénovation"
        ]}
      />
    </>
  );
};

export default Contact;
