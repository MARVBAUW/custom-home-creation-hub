
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
        description="Contactez Progineer pour vos projets de construction et rénovation en PACA. Notre équipe de maîtres d'œuvre vous accompagne dans la réalisation de vos projets immobiliers sur mesure."
        keywords="contact maître d'œuvre PACA, devis construction Marseille, rendez-vous travaux, coordonnées Progineer"
        canonicalUrl="https://progineer.fr/contact"
        structuredData={structuredData}
      />
      
      <main>
        <div className="text-3xl md:text-4xl font-semibold mb-8 text-center pt-32">
          <h1>Contact - Progineer Maître d'œuvre à Marseille et en PACA</h1>
        </div>
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
