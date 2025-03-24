
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'white' | 'gold' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  className,
  withTagline = false
}) => {
  // Fonction pour rendre le logo en SVG
  const renderSvgLogo = () => {
    // Déterminer la couleur selon la variante
    const goldColor = variant === 'white' ? "#FFFFFF" : "#c8a86d";
    const darkColor = variant === 'white' ? "#FFFFFF" : "#4b4b3b";
    
    if (variant === 'icon') {
      // Logo en version icône uniquement
      return (
        <svg viewBox="0 0 941 512" xmlns="http://www.w3.org/2000/svg" className={getSizeClasses()}>
          <defs>
            <linearGradient id="goldToDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={goldColor}/>
              <stop offset="100%" stopColor={darkColor}/>
            </linearGradient>
          </defs>
          <polygon points="500,228 605,312 604,465 500,465 500,228" fill="url(#goldToDark)" />
          <polygon points="707,0 773,76 770,237 940,292 940,465 704,465" fill="url(#goldToDark)" />
          <rect x="0" y="465" width="940" height="2" fill={variant === 'white' ? "#FFFFFF" : "#2a2a2a"} />
        </svg>
      );
    }

    // Logo complet
    return (
      <svg viewBox="0 0 941 512" xmlns="http://www.w3.org/2000/svg" className={getSizeClasses()}>
        <defs>
          <linearGradient id="goldToDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={goldColor}/>
            <stop offset="100%" stopColor={darkColor}/>
          </linearGradient>
        </defs>

        {/* Triangle gauche */}
        <polygon points="0,196 364,94 361,465 234,465 234,305 357,267 0,510"
                fill="url(#goldToDark)" />

        {/* Triangle haut centre */}
        <polygon points="707,0 500,59 500,228 707,0"
                fill="url(#goldToDark)" />

        {/* Ligne médiane vers droite */}
        <polygon points="361,267 707,33 707,0 361,267"
                fill="url(#goldToDark)" />

        {/* Volume central (milieu corrigé) */}
        <polygon points="500,228 605,312 604,465 500,465 500,228"
                fill="url(#goldToDark)" />

        {/* Bâtiment droit avec toit incliné */}
        <polygon points="707,0 773,76 770,237 940,292 940,465 704,465"
                fill="url(#goldToDark)" />

        {/* Sol */}
        <rect x="0" y="465" width="940" height="2" fill={variant === 'white' ? "#FFFFFF" : "#2a2a2a"} />
      </svg>
    );
  };

  // Déterminer les classes CSS en fonction de la taille
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return variant === 'icon' ? 'h-6 w-auto' : 'h-8 w-auto';
      case 'lg':
        return variant === 'icon' ? 'h-10 w-auto' : 'h-14 w-auto';
      default:
        // md
        return variant === 'icon' ? 'h-8 w-auto' : 'h-10 w-auto';
    }
  };

  return <Link to="/" className={cn("flex flex-col items-center no-underline", className)}>
      <div className={cn(getSizeClasses(), variant === 'icon' ? 'logo-icon' : 'logo', 'object-contain transition-all duration-300 hover:scale-105')}>
        {renderSvgLogo()}
      </div>
      {withTagline && <span className={cn("text-xs mt-1 font-medium tracking-wider", variant === 'white' ? 'text-white/90' : 'text-progineer-gold')}>
          MAITRISE D'OEUVRE
        </span>}
    </Link>;
};

export default Logo;
