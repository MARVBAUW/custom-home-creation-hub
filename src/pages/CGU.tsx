
import React from 'react';
import SEO from '../components/common/SEO';
import LegalHero from '../components/legal/LegalHero';
import LegalContent from '../components/legal/LegalContent';
import { motion } from 'framer-motion';
import SEOFooter from '../components/common/SEOFooter';
import { getBusinessStructuredData } from '../utils/googleBusiness';

const CGU = () => {
  // Structured data for WebPage with business data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Conditions Générales d'Utilisation",
    "description": "Conditions Générales d'Utilisation du site Progineer, entreprise d'architecture et de maîtrise d'œuvre en région PACA.",
    "publisher": {
      "@type": "Organization",
      "name": "Progineer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://progineer.fr/logo.png"
      }
    },
    "url": "https://progineer.fr/cgu",
    "mainEntity": {
      "@type": "WebPageElement",
      "name": "Conditions Générales d'Utilisation",
      "text": "Conditions d'utilisation du site web Progineer."
    },
    "isPartOf": getBusinessStructuredData()
  };

  return (
    <>
      <SEO 
        title="Conditions Générales d'Utilisation | Maître d'œuvre Progineer PACA"
        description="Consultez les Conditions Générales d'Utilisation du site Progineer, maître d'œuvre en région PACA. Règles d'utilisation et droits des utilisateurs."
        keywords="CGU site maître d'œuvre, conditions utilisation Progineer, règles site PACA, droits utilisateurs, propriété intellectuelle"
        canonicalUrl="https://progineer.fr/cgu"
        structuredData={structuredData}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <main>
          <h1 className="sr-only">Conditions Générales d'Utilisation - Progineer, Maître d'œuvre en PACA</h1>
          <LegalHero title="Conditions Générales d'Utilisation" />
          
          <LegalContent>
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Préambule</h2>
                <p>
                  Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les 
                  modalités et conditions d'utilisation du site Progineer, ainsi que de définir les 
                  droits et obligations des parties dans ce cadre.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Acceptation des conditions</h2>
                <p>
                  L'accès et l'utilisation du site impliquent l'acceptation sans réserve des présentes CGU. 
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
                <p>
                  L'ensemble des éléments constituant le site (textes, graphismes, logiciels, images, etc.) 
                  sont la propriété exclusive de Progineer et sont protégés par le droit de la propriété intellectuelle.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Responsabilité</h2>
                <p>
                  Progineer s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour 
                  des informations diffusées sur son site, dont elle se réserve le droit de corriger le contenu à tout moment.
                </p>
              </section>
            </div>
          </LegalContent>
        </main>
      </motion.div>

      <SEOFooter text="Conditions Générales d'Utilisation du site Progineer. Ces CGU définissent les règles d'usage de notre site internet. Notre cabinet de maîtrise d'œuvre intervient dans toute la région PACA pour vos projets de construction, rénovation et extension." 
      additionalKeywords={["règles utilisation site maître d'œuvre", "droits utilisateurs site construction", "mentions légales site web", "propriété intellectuelle contenu", "responsabilité éditeur PACA"]}
      />
    </>
  );
};

export default CGU;
