
export const generateSampleData = (file: { title: string }) => {
  // Generates sample data for the spreadsheet preview
  if (file.title.includes('surface')) {
    return [
      ['Pièce', 'Longueur (m)', 'Largeur (m)', 'Surface (m²)', 'Commentaire', 'Status'],
      ['Salon', '5.2', '4.8', '24.96', 'Parquet', 'Validé'],
      ['Cuisine', '3.8', '3.5', '13.3', 'Carrelage', 'Validé'],
      ['Chambre 1', '4.2', '3.6', '15.12', 'Parquet', 'Validé'],
      ['Chambre 2', '3.9', '3.2', '12.48', 'Parquet', 'Validé'],
      ['Salle de bain', '2.8', '2.2', '6.16', 'Carrelage', 'Validé'],
      ['WC', '1.5', '1.2', '1.8', 'Carrelage', 'Validé'],
      ['Entrée', '2.5', '1.8', '4.5', 'Carrelage', 'Validé'],
      ['TOTAL', '', '', '78.32', '', '']
    ];
  } else if (file.title.includes('locative')) {
    return [
      ['Type investissement', 'Prix acquisition', 'Frais notaire', 'Travaux', 'Loyer mensuel', 'Charges', 'Rentabilité'],
      ['Studio 25m²', '120 000 €', '9 600 €', '15 000 €', '650 €', '50 €', '4.92%'],
      ['T2 45m²', '185 000 €', '14 800 €', '22 000 €', '850 €', '80 €', '4.24%'],
      ['T3 65m²', '265 000 €', '21 200 €', '35 000 €', '1 100 €', '120 €', '3.68%'],
      ['T4 85m²', '340 000 €', '27 200 €', '45 000 €', '1 350 €', '150 €', '3.47%'],
      ['Moyenne', '227 500 €', '18 200 €', '29 250 €', '987.5 €', '100 €', '4.08%']
    ];
  } else if (file.title.includes('budget')) {
    return [
      ['Poste', 'Devis 1', 'Devis 2', 'Devis 3', 'Retenu', 'Commentaires'],
      ['Gros œuvre', '45 000 €', '52 000 €', '48 500 €', '48 500 €', 'Entreprise Martin'],
      ['Charpente', '22 000 €', '19 800 €', '23 500 €', '19 800 €', 'Entreprise Dubois'],
      ['Menuiseries', '18 500 €', '22 300 €', '20 100 €', '20 100 €', 'Entreprise Leroy'],
      ['Électricité', '12 800 €', '14 500 €', '11 900 €', '11 900 €', 'Entreprise Électris'],
      ['Plomberie', '9 600 €', '11 200 €', '10 300 €', '10 300 €', 'Entreprise Aquatech'],
      ['Isolation', '14 300 €', '15 800 €', '16 200 €', '15 800 €', 'Entreprise Isotherm'],
      ['Revêtements', '22 500 €', '19 900 €', '21 400 €', '19 900 €', 'Entreprise Déco Plus'],
      ['TOTAL', '144 700 €', '155 500 €', '151 900 €', '146 300 €', '']
    ];
  } else if (file.title.includes('emprunt')) {
    return [
      ['Capital emprunté', 'Taux', 'Durée', 'Mensualité', 'Coût total', 'Taux d\'endettement'],
      ['200 000 €', '3.5%', '20 ans', '1 160 €', '78 400 €', '35%'],
      ['200 000 €', '3.5%', '25 ans', '1 002 €', '100 600 €', '30%'],
      ['250 000 €', '3.5%', '20 ans', '1 450 €', '98 000 €', '43%'],
      ['250 000 €', '3.5%', '25 ans', '1 252 €', '125 600 €', '38%'],
      ['300 000 €', '3.5%', '20 ans', '1 740 €', '117 600 €', '52%'],
      ['300 000 €', '3.5%', '25 ans', '1 503 €', '150 900 €', '45%']
    ];
  } else {
    // Default data for other file types
    return [
      ['Catégorie', 'Valeur 1', 'Valeur 2', 'Valeur 3', 'Résultat', 'Notes'],
      ['Ligne 1', '125', '250', '375', '750', 'Commentaire'],
      ['Ligne 2', '200', '400', '600', '1200', 'Commentaire'],
      ['Ligne 3', '150', '300', '450', '900', 'Commentaire'],
      ['Ligne 4', '175', '350', '525', '1050', 'Commentaire'],
      ['TOTAL', '650', '1300', '1950', '3900', '']
    ];
  }
};

export const getMacroNote = (file: { title: string }) => {
  if (file.title.includes('surface')) {
    return "Ce fichier contient des macros qui calculent automatiquement les surfaces selon la loi Carrez et génèrent un rapport PDF.";
  } else if (file.title.includes('locative')) {
    return "Ce fichier contient des macros qui simulent différents scénarios de rentabilité et créent des graphiques comparatifs.";
  } else if (file.title.includes('budget')) {
    return "Ce fichier contient des macros qui permettent l'analyse comparative automatique des devis et l'export au format PDF.";
  } else if (file.title.includes('emprunt')) {
    return "Ce fichier contient des macros qui simulent différents scénarios d'emprunt et créent des tableaux d'amortissement.";
  } else {
    return "Ce fichier contient des macros avancées pour optimiser votre travail. Téléchargez-le pour accéder à toutes les fonctionnalités.";
  }
};
