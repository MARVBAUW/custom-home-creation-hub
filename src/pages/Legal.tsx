
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';

const Legal = () => {
  return (
    <>
      <Helmet>
        <title>Mentions légales | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Mentions légales de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région PACA." />
      </Helmet>

      <section className="pt-32 pb-16">
        <Container size="md">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Mentions légales</h1>
          
          <div className="prose prose-stone max-w-none">
            <h2>1. Informations légales</h2>
            <p>
              Le site web progineer.fr est édité par la société Progineer, SARL au capital de 10 000 euros, 
              immatriculée au Registre du Commerce et des Sociétés de Marseille sous le numéro 123 456 789, 
              dont le siège social est situé au 123 Avenue de la Liberté, 13001 Marseille.
            </p>
            <p>
              N° TVA intracommunautaire : FR 12 345 678 910
            </p>
            <p>
              Directeur de la publication : Marvin Bauwens
            </p>
            <p>
              Contact : progineer.moe@gmail.com | +33 7 83 76 21 56
            </p>
            
            <h2>2. Hébergement</h2>
            <p>
              Le site progineer.fr est hébergé par la société OVH, SAS au capital de 10 069 020 euros,
              immatriculée au Registre du Commerce et des Sociétés de Lille Métropole sous le numéro 424 761 419,
              dont le siège social est situé au 2 rue Kellermann, 59100 Roubaix, France.
            </p>
            
            <h2>3. Propriété intellectuelle</h2>
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
            
            <h2>4. Données personnelles</h2>
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
            
            <h2>5. Cookies</h2>
            <p>
              Le site progineer.fr peut utiliser des cookies pour améliorer l'expérience de navigation des utilisateurs.
              Un cookie est un fichier de petite taille stocké sur le disque dur de l'utilisateur. Ces cookies ne 
              contiennent aucune information permettant d'identifier personnellement l'utilisateur.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti lorsqu'un cookie est envoyé.
            </p>
            
            <h2>6. Responsabilité</h2>
            <p>
              Progineer s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations 
              diffusées sur son site. Toutefois, Progineer ne peut garantir l'exactitude, la précision ou l'exhaustivité 
              des informations mises à disposition sur le site.
            </p>
            <p>
              Progineer décline toute responsabilité concernant les éventuels virus pouvant infecter le matériel 
              informatique de l'utilisateur après utilisation ou consultation du site.
            </p>
            
            <h2>7. Liens hypertextes</h2>
            <p>
              Le site progineer.fr peut contenir des liens hypertextes vers d'autres sites internet. Progineer n'exerce 
              aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
            
            <h2>8. Droit applicable et juridiction compétente</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français 
              seront seuls compétents.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Legal;
