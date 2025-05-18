
import React from 'react';
import { Link } from 'react-router-dom';

// Mapping des mots clés vers leurs pages correspondantes
const keywordPageMapping: Record<string, string> = {
  'construction maison': '/prestations-maitre-oeuvre/construction-neuve',
  'construction neuve': '/prestations-maitre-oeuvre/construction-neuve',
  'maître d\'œuvre': '/',
  'maitre d\'oeuvre': '/',
  'rénovation': '/prestations-maitre-oeuvre/renovation',
  'renovation': '/prestations-maitre-oeuvre/renovation',
  'extension': '/prestations-maitre-oeuvre/extension',
  'agrandissement': '/prestations-maitre-oeuvre/extension',
  'design d\'intérieur': '/prestations-maitre-oeuvre/design-interieur',
  'optimisation d\'espace': '/prestations-maitre-oeuvre/optimisation-espace',
  'marseille': '/',
  'paca': '/',
  'aix-en-provence': '/prestations-maitre-oeuvre/construction-neuve/aix-en-provence',
  'toulon': '/prestations-maitre-oeuvre/construction-neuve/marseille'
};

/**
 * Transforme un texte en y ajoutant des liens internes pour les mots-clés définis
 * @param text Le texte à transformer
 * @param maxOccurrences Nombre maximum d'occurrences à transformer (défaut: 2)
 * @returns Le texte avec liens internes
 */
export const InternalLinkText: React.FC<{ text: string; maxOccurrences?: number }> = ({ 
  text, 
  maxOccurrences = 2 
}) => {
  if (!text) return null;

  let remainingText = text;
  const elements: JSX.Element[] = [];
  const occurrencesCount: Record<string, number> = {};

  // Initialiser le compteur d'occurrences
  Object.keys(keywordPageMapping).forEach(keyword => {
    occurrencesCount[keyword] = 0;
  });

  // Trouver toutes les occurrences de mots-clés
  let lastIndex = 0;
  let foundKeyword = false;

  Object.keys(keywordPageMapping).forEach(keyword => {
    if (occurrencesCount[keyword] >= maxOccurrences) return;

    const lowercaseText = remainingText.toLowerCase();
    const keywordIndex = lowercaseText.indexOf(keyword.toLowerCase(), lastIndex);

    if (keywordIndex !== -1 && occurrencesCount[keyword] < maxOccurrences) {
      // Ajouter le texte avant le mot-clé
      if (keywordIndex > lastIndex) {
        elements.push(<span key={`text-${lastIndex}`}>{remainingText.substring(lastIndex, keywordIndex)}</span>);
      }

      // Ajouter le mot-clé avec lien
      const actualKeyword = remainingText.substring(keywordIndex, keywordIndex + keyword.length);
      elements.push(
        <Link 
          key={`link-${keywordIndex}`} 
          to={keywordPageMapping[keyword]}
          className="text-progineer-gold hover:underline"
        >
          {actualKeyword}
        </Link>
      );

      // Mettre à jour les indices
      lastIndex = keywordIndex + keyword.length;
      occurrencesCount[keyword]++;
      foundKeyword = true;
    }
  });

  // Ajouter le reste du texte
  if (lastIndex < remainingText.length) {
    elements.push(<span key={`text-end`}>{remainingText.substring(lastIndex)}</span>);
  }

  // Si aucun mot-clé n'a été trouvé, retourner le texte d'origine
  return foundKeyword ? <>{elements}</> : <>{text}</>;
};
