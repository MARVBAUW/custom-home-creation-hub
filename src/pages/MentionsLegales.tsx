
import React from 'react';
import { useNavigate, useEffect } from 'react-router-dom';
import Legal from './Legal';

/**
 * Composant MentionsLegales qui redirige vers la page Legal
 * mais conserve l'URL pour les liens externes
 */
const MentionsLegales = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("MentionsLegales monté, contenu identique à Legal");
  }, []);
  
  return <Legal />;
};

export default MentionsLegales;
