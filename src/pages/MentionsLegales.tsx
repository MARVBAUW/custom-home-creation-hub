
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MentionsLegales = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Legal page that handles mentions légales
    navigate('/mentions-legales', { replace: true });
  }, [navigate]);

  return <div>Redirection...</div>;
};

export default MentionsLegales;
