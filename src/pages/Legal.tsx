
import React from 'react';
import SEO from '@/components/common/SEO';
import LegalHero from '@/components/legal/LegalHero';
import LegalContent from '@/components/legal/LegalContent';
import { motion } from 'framer-motion';
import { FileText, Info, Database, Server, Shield, Globe, Copyright, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import SEOFooter from '@/components/common/SEOFooter';
import { getBusinessStructuredData } from '@/utils/googleBusiness';

const Legal = () => {
  // Structured data for WebPage using business data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mentions légales",
    "description": "Mentions légales de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région PACA.",
    "publisher": {
      "@type": "Organization",
      "name": "Progineer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://progineer.fr/logo.png"
      }
    },
    "url": "https://progineer.fr/mentions-legales",
    "mainEntity": {
      "@type": "WebPageElement",
      "name": "Mentions légales",
      "text": "Informations légales de Progineer, SARL d'architecture et de maîtrise d'œuvre."
    },
    "isPartOf": getBusinessStructuredData()
  };

  return (
    <>
      <SEO 
        title="Mentions légales | Progineer - Architecte & Maître d'œuvre en PACA"
        description="Mentions légales de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région PACA. Informations légales sur notre société."
        keywords="mentions légales Progineer, informations légales architecte, données juridiques maître d'œuvre PACA"
        canonicalUrl="https://progineer.fr/mentions-legales"
        structuredData={structuredData}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LegalHero title="Mentions légales" />
        
        <LegalContent>
          <div className="space-y-10">
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-progineer-gold">
                <FileText className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">1. Informations légales</h2>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3 text-stone-700">
                <p>
                  Le site web progineer.fr est édité par la société Progineer, SARL au capital de 1 000 euros, 
                  immatriculée au Registre du Commerce et des Sociétés de Marseille sous le numéro SIRET 951 045 509 00015, 
                  dont le siège social est situé à Marseille, France.
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">N° TVA intracommunautaire :</span> FR 24 951045509
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Directeur de la publication :</span> Marvin Bauwens
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Contact :</span> progineer.moe@gmail.com | +33 7 83 76 21 56
                </p>
              </div>
            </section>
            
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-progineer-gold">
                <Server className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">2. Hébergement</h2>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3 text-stone-700">
                <p>
                  Le site progineer.fr est hébergé par la société OVH, SAS au capital de 10 069 020 euros,
                  immatriculée au Registre du Commerce et des Sociétés de Lille Métropole sous le numéro 424 761 419,
                  dont le siège social est situé au 2 rue Kellermann, 59100 Roubaix, France.
                </p>
              </div>
            </section>
            
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-progineer-gold">
                <Copyright className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">3. Propriété intellectuelle</h2>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3 text-stone-700">
                <p>
                  L'ensemble des éléments constituant le site progineer.fr (textes, graphismes, logiciels, photographies, 
                  images, vidéos, sons, plans, logos, marques, etc.) ainsi que le site lui-même, sont la propriété exclusive 
                  de Progineer ou de ses partenaires. Ces éléments sont protégés par les lois françaises et internationales 
                  relatives à la propriété intellectuelle.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments 
                  du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable 
                  de Progineer.
                </p>
              </div>
            </section>
            
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-progineer-gold">
                <Database className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">4. Données personnelles</h2>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3 text-stone-700">
                <p>
                  Les informations recueillies sur le site progineer.fr font l'objet d'un traitement informatique destiné à 
                  répondre à vos demandes d'information, de devis ou de contact. Les destinataires des données sont les 
                  services commerciaux et techniques de Progineer.
                </p>
                <p>
                  Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée, et au Règlement Général sur la 
                  Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression, de 
                  limitation et d'opposition au traitement de vos données personnelles. Vous pouvez exercer ces droits 
                  en nous contactant à l'adresse : progineer.moe@gmail.com
                </p>
              </div>
            </section>
            
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-progineer-gold">
                <Shield className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">5. Cookies</h2>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3 text-stone-700">
                <p>
                  Le site progineer.fr peut utiliser des cookies pour améliorer l'expérience de navigation des utilisateurs.
                  Un cookie est un fichier de petite taille stocké sur le disque dur de l'utilisateur. Ces cookies ne 
                  contiennent aucune information permettant d'identifier personnellement l'utilisateur.
                </p>
                <p>
                  Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti lorsqu'un cookie est envoyé.
                </p>
              </div>
            </section>
            
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-progineer-gold">
                <AlertTriangle className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">6. Responsabilité</h2>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3 text-stone-700">
                <p>
                  Progineer s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations 
                  diffusées sur son site. Toutefois, Progineer ne peut garantir l'exactitude, la précision ou l'exhaustivité 
                  des informations mises à disposition sur le site.
                </p>
                <p>
                  Progineer décline toute responsabilité concernant les éventuels virus pouvant infecter le matériel 
                  informatique de l'utilisateur après utilisation ou consultation du site.
                </p>
              </div>
            </section>
            
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-progineer-gold">
                <Globe className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">7. Liens hypertextes</h2>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3 text-stone-700">
                <p>
                  Le site progineer.fr peut contenir des liens hypertextes vers d'autres sites internet. Progineer n'exerce 
                  aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
              </div>
            </section>
            
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-progineer-gold">
                <Info className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">8. Droit applicable et juridiction compétente</h2>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3 text-stone-700">
                <p>
                  Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français 
                  seront seuls compétents.
                </p>
              </div>
            </section>

            <div className="pt-6 mt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic">
                Dernière mise à jour : 28 janvier 2025
              </p>
            </div>
          </div>
        </LegalContent>
      </motion.div>

      <SEOFooter text="Mentions légales de Progineer. Retrouvez toutes les informations juridiques concernant notre société de maîtrise d'œuvre et d'architecture basée en région PACA. Nous intervenons à Marseille, Nice, Toulon, Cannes et dans toute la région pour vos projets de construction, rénovation et extension." />
    </>
  );
};

export default Legal;
