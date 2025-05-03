
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SocialMediaTagsProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
}

/**
 * Composant pour générer les balises Open Graph et Twitter Cards
 */
const SocialMediaTags: React.FC<SocialMediaTagsProps> = ({
  url,
  title,
  description,
  image = 'https://progineer.fr/images/progineer-social-card.jpg',
  imageAlt = 'Progineer - Maître d\'œuvre en PACA',
  type = 'website',
  twitterCard = 'summary_large_image',
  twitterSite = '@progineer',
  twitterCreator = '@progineer'
}) => {
  return (
    <Helmet>
      {/* Open Graph / Facebook */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content="Progineer" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
};

export default SocialMediaTags;
