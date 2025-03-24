
import React from 'react';
import SEO from '@/components/common/SEO';
import Container from '@/components/common/Container';

const CGV = () => {
  // Structured data for WebPage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Conditions Générales de Vente",
    "description": "Conditions Générales de Vente de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région PACA.",
    "publisher": {
      "@type": "Organization",
      "name": "Progineer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://progineer.fr/logo.png"
      }
    },
    "url": "https://progineer.fr/cgv",
    "mainEntity": {
      "@type": "WebPageElement",
      "name": "Conditions Générales de Vente",
      "text": "Les présentes Conditions Générales de Vente (CGV) constituent le socle de la relation commerciale entre la société Progineer (ci-après \"le Prestataire\") et ses clients professionnels ou particuliers (ci-après \"le Client\")."
    }
  };

  return (
    <>
      <SEO 
        title="Conditions Générales de Vente | Progineer - Architecte & Maître d'œuvre en PACA"
        description="Conditions Générales de Vente de Progineer, entreprise d'architecture et de maîtrise d'œuvre en région PACA. Découvrez les modalités de nos prestations."
        keywords="CGV Progineer, conditions générales vente architecte, CGV maître d'œuvre PACA, contrat architecture, conditions prestation construction"
        canonicalUrl="https://progineer.fr/cgv"
        structuredData={structuredData}
      />

      <section className="pt-32 pb-16">
        <Container size="md">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Conditions Générales de Vente</h1>
          
          <div className="prose prose-stone max-w-none">
            <h2>Article 1 - Objet et champ d'application</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) constituent le socle de la relation commerciale entre 
              la société Progineer (ci-après "le Prestataire") et ses clients professionnels ou particuliers (ci-après "le Client").
            </p>
            <p>
              Elles s'appliquent à toutes les prestations de services conclues par le Prestataire auprès des Clients, 
              quelles que soient les clauses pouvant figurer sur les documents du Client, et notamment ses conditions générales d'achat.
            </p>
            <p>
              Conformément à la réglementation en vigueur, ces CGV sont systématiquement communiquées à tout Client 
              qui en fait la demande, pour lui permettre de passer commande auprès du Prestataire.
            </p>
            
            <h2>Article 2 - Prestations de services</h2>
            <p>
              Les prestations de services proposées par le Prestataire sont les suivantes :
            </p>
            <ul>
              <li>Maîtrise d'œuvre</li>
              <li>Conception architecturale</li>
              <li>Suivi de chantier</li>
              <li>Construction sur mesure</li>
              <li>Rénovation énergétique</li>
              <li>Extension & agrandissement</li>
              <li>Optimisation d'espace</li>
              <li>Design d'espace</li>
              <li>Montage administratif & réglementaire</li>
            </ul>
            
            <h2>Article 3 - Formation du contrat</h2>
            <p>
              Les devis établis par le Prestataire sont valables pendant une durée de trois (3) mois à compter de leur date d'émission.
            </p>
            <p>
              Le contrat est formé lors de l'acceptation, sans réserve, du devis par le Client. L'acceptation peut prendre 
              la forme d'une signature du devis avec la mention "Bon pour accord", d'un acompte ou de toute autre forme écrite.
            </p>
            
            <h2>Article 4 - Prix</h2>
            <p>
              Les prix des services sont ceux en vigueur au jour de la passation de la commande. Ils sont libellés en euros 
              et calculés hors taxes. Par voie de conséquence, ils seront majorés du taux de TVA et des frais de transport 
              applicables au jour de la commande.
            </p>
            <p>
              Le Prestataire se réserve le droit de modifier ses prix à tout moment. Cependant, il s'engage à facturer les 
              prestations commandées aux prix indiqués lors de l'enregistrement de la commande.
            </p>
            
            <h2>Article 5 - Modalités de paiement</h2>
            <p>
              Un acompte de 30% du montant total TTC est exigé lors de la passation de la commande. Le solde est payable 
              selon l'échéancier défini dans le contrat ou dans le devis.
            </p>
            <p>
              Les paiements peuvent être effectués par chèque, virement bancaire ou tout autre moyen convenu entre les parties.
            </p>
            <p>
              En cas de retard de paiement, des pénalités correspondant à trois fois le taux d'intérêt légal en vigueur 
              seront appliquées. Ces pénalités sont exigibles de plein droit, sans qu'un rappel soit nécessaire.
            </p>
            
            <h2>Article 6 - Délais d'exécution</h2>
            <p>
              Les délais d'exécution des prestations sont donnés à titre indicatif et ne constituent pas un engagement 
              du Prestataire. Tout retard raisonnable dans l'exécution des prestations ne pourra donner lieu au profit 
              du Client à une indemnisation, à l'annulation de la commande ou à l'application de pénalités de retard.
            </p>
            
            <h2>Article 7 - Obligations du Prestataire</h2>
            <p>
              Le Prestataire est tenu à une obligation de moyens dans l'exécution de ses prestations. Il s'engage à 
              mettre en œuvre tous les moyens nécessaires à la bonne exécution des prestations qui lui sont confiées.
            </p>
            <p>
              Le Prestataire est tenu au respect du secret professionnel et s'engage à ne divulguer aucune information 
              dont il aurait connaissance dans le cadre de l'exécution de ses prestations.
            </p>
            
            <h2>Article 8 - Obligations du Client</h2>
            <p>
              Le Client s'engage à collaborer activement avec le Prestataire en lui fournissant dans les meilleurs délais 
              toutes les informations et documents nécessaires à la bonne exécution des prestations.
            </p>
            <p>
              Le Client est responsable de la véracité et de l'exactitude des informations qu'il communique au Prestataire.
            </p>
            
            <h2>Article 9 - Réception des travaux</h2>
            <p>
              À l'achèvement des travaux, il sera procédé à une réception contradictoire en présence du Client ou de son 
              représentant et du Prestataire. Cette réception fera l'objet d'un procès-verbal signé par les deux parties.
            </p>
            <p>
              Toute réserve devra être signalée lors de la réception des travaux et mentionnée dans le procès-verbal de réception.
            </p>
            
            <h2>Article 10 - Garanties</h2>
            <p>
              Le Prestataire est assuré pour sa responsabilité civile professionnelle auprès d'une compagnie notoirement solvable.
            </p>
            <p>
              Le Prestataire garantit le Client contre tout défaut de conformité des prestations et tout vice caché, 
              provenant d'un défaut de conception ou de réalisation des prestations fournies.
            </p>
            
            <h2>Article 11 - Résiliation</h2>
            <p>
              En cas de manquement par l'une des parties à l'une quelconque de ses obligations, l'autre partie pourra 
              résilier le contrat après mise en demeure adressée par lettre recommandée avec accusé de réception 
              demeurée infructueuse pendant un délai de quinze (15) jours.
            </p>
            
            <h2>Article 12 - Force majeure</h2>
            <p>
              La responsabilité du Prestataire ne pourra pas être mise en œuvre si la non-exécution ou le retard dans 
              l'exécution de l'une de ses obligations décrites dans les présentes conditions générales de vente découle 
              d'un cas de force majeure. À ce titre, la force majeure s'entend de tout événement extérieur, imprévisible 
              et irrésistible au sens de l'article 1218 du Code civil.
            </p>
            
            <h2>Article 13 - Droit applicable et juridiction compétente</h2>
            <p>
              Les présentes CGV sont soumises au droit français. Tous les litiges auxquels les opérations d'achat et de 
              vente conclues en application des présentes CGV pourraient donner lieu, concernant tant leur validité, leur 
              interprétation, leur exécution, leur résiliation, leurs conséquences et leurs suites et qui n'auraient pu 
              être résolus entre le Prestataire et le Client seront soumis aux tribunaux compétents dans les conditions de droit commun.
            </p>
            
            <h2>Article 14 - Acceptation du Client</h2>
            <p>
              Les présentes CGV sont expressément agréées et acceptées par le Client, qui déclare et reconnaît en avoir 
              une parfaite connaissance, et renonce, de ce fait, à se prévaloir de tout document contradictoire.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CGV;
