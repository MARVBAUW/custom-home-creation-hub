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
    if (variant === 'icon') {
      // Logo icon (juste le symbole du bâtiment)
      return <svg viewBox="0 0 200 200" className={getSizeClasses()}>
          <path d="M0 150 L200 150 M40 40 L100 40 L120 70 L140 40 L180 40 L180 150 L140 150 L140 70 L120 100 L100 70 L60 70 L60 150 L20 150 L20 40 Z" fill="none" stroke="#996515" strokeWidth="8" />
        </svg>;
    }

    // Couleur du logo selon la variante
    const strokeColor = variant === 'white' ? "#FFFFFF" : variant === 'gold' ? "#996515" : "#996515";

    // Logo complet avec texte et symbole
    return <svg viewBox="0 0 600 200" className="<div class=\"flex justify-center items-center bg-white p-8\">\n  <svg viewBox=\"0 0 941 512\" xmlns=\"http://www.w3.org/2000/svg\"\n       class=\"w-full max-w-md h-auto transition-all duration-500 hover:scale-105 hover:drop-shadow-xl\">\n    <defs>\n      <linearGradient id=\"goldToDark\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n        <stop offset=\"0%\" stop-color=\"#c8a86d\"/>\n        <stop offset=\"100%\" stop-color=\"#4b4b3b\"/>\n      </linearGradient>\n    </defs>\n\n    <!-- Triangle gauche -->\n    <polygon points=\"0,196 364,94 361,465 234,465 234,305 357,267 0,510\"\n             fill=\"url(#goldToDark)\" />\n\n    <!-- Triangle haut centre -->\n    <polygon points=\"707,0 500,59 500,228 707,0\"\n             fill=\"url(#goldToDark)\" />\n\n    <!-- Ligne m\xE9diane vers droite -->\n    <polygon points=\"361,267 707,33 707,0 361,267\"\n             fill=\"url(#goldToDark)\" />\n\n    <!-- Volume central (milieu corrig\xE9) -->\n    <polygon points=\"500,228 605,312 604,465 500,465 500,228\"\n             fill=\"url(#goldToDark)\" />\n\n    <!-- B\xE2timent droit avec toit inclin\xE9 -->\n    <polygon points=\"707,0 773,76 770,237 940,292 940,465 704,465\"\n             fill=\"url(#goldToDark)\" />\n\n    <!-- Sol -->\n    <rect x=\"0\" y=\"465\" width=\"940\" height=\"2\" fill=\"#2a2a2a\" />\n  </svg>\n</div>\n">
        {/* Le symbole du bâtiment */}
        <g transform="translate(200, 20) scale(0.5)">
          <path d="M0 150 L200 150 M40 40 L100 40 L120 70 L140 40 L180 40 L180 150 L140 150 L140 70 L120 100 L100 70 L60 70 L60 150 L20 150 L20 40 Z" fill="none" stroke={strokeColor} strokeWidth="8" />
        </g>
        
        {/* Le texte PROGINEER */}
        <g transform="translate(40, 180)">
          {/* P */}
          <path d="M0 0 Q0 -50 25 -50 Q50 -50 50 -25 Q50 0 25 0 L0 0 L0 -80" fill="none" stroke={strokeColor} strokeWidth="5" />
          
          {/* R */}
          <path d="M70 0 L70 -80 Q120 -80 120 -55 Q120 -30 95 -30 L70 -30 M95 -30 L120 0" fill="none" stroke={strokeColor} strokeWidth="5" />
          
          {/* O */}
          <circle cx="160" cy="-40" r="40" fill="none" stroke={strokeColor} strokeWidth="5" />
          
          {/* G */}
          <path d="M240 -40 Q240 -80 280 -80 Q320 -80 320 -40 Q320 0 280 0 Q240 0 240 -40 M320 -40 L280 -40" fill="none" stroke={strokeColor} strokeWidth="5" />
          
          {/* I */}
          <path d="M340 0 L340 -80" fill="none" stroke={strokeColor} strokeWidth="5" />
          
          {/* N */}
          <path d="M360 0 L360 -80 L420 0 L420 -80" fill="none" stroke={strokeColor} strokeWidth="5" />
          
          {/* E's (stylisés avec 3 traits horizontaux) */}
          <path d="M440 -20 L470 -20 M440 -40 L470 -40 M440 -60 L470 -60" fill="none" stroke={strokeColor} strokeWidth="5" />
          
          {/* E's (stylisés avec 3 traits horizontaux) */}
          <path d="M490 -20 L520 -20 M490 -40 L520 -40 M490 -60 L520 -60" fill="none" stroke={strokeColor} strokeWidth="5" />
          
          {/* R */}
          <path d="M540 0 L540 -80 Q590 -80 590 -55 Q590 -30 565 -30 L540 -30 M565 -30 L590 0" fill="none" stroke={strokeColor} strokeWidth="5" />
        </g>
      </svg>;
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
      <div className={cn(getSizeClasses(), variant === 'icon' ? 'logo-icon' : 'logo', 'object-contain')}>
        {renderSvgLogo()}
      </div>
      {withTagline && <span className={cn("text-xs mt-1 font-medium tracking-wider", variant === 'white' ? 'text-white/90' : 'text-progineer-gold')}>
          MAITRISE D'OEUVRE
        </span>}
    </Link>;
};
export default Logo;