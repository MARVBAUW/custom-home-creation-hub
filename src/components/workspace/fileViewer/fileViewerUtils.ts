
/**
 * Utility functions for file viewer component
 */

// Generate sample data for file preview tables
export const generateSampleData = (file: any) => {
  // Default data if no specific file is provided
  if (!file) {
    return [
      ['Colonne 1', 'Colonne 2', 'Colonne 3'],
      ['Donnée 1', 'Donnée A', 'Valeur X'],
      ['Donnée 2', 'Donnée B', 'Valeur Y'],
      ['Donnée 3', 'Donnée C', 'Valeur Z'],
    ];
  }

  // Generate specific data based on file type or name
  if (file.filename.includes('rentabilite')) {
    return [
      ['Désignation', 'Prix acquisition', 'Loyer mensuel', 'Rentabilité'],
      ['Studio 25m²', '120 000 €', '450 €', '4.5%'],
      ['T2 45m²', '185 000 €', '650 €', '4.2%'],
      ['T3 65m²', '240 000 €', '850 €', '4.3%'],
      ['T4 85m²', '320 000 €', '1 100 €', '4.1%'],
    ];
  }

  if (file.filename.includes('cout') || file.filename.includes('devis')) {
    return [
      ['Poste', 'Quantité', 'Unité', 'Prix Unitaire', 'Total HT'],
      ['Gros œuvre', '1', 'Forfait', '45 000,00 €', '45 000,00 €'],
      ['Charpente/Couverture', '120', 'm²', '180,00 €', '21 600,00 €'],
      ['Menuiseries', '8', 'Unité', '850,00 €', '6 800,00 €'],
      ['Électricité', '90', 'm²', '90,00 €', '8 100,00 €'],
    ];
  }

  // Default generic data
  return [
    ['Référence', 'Description', 'Valeur'],
    ['REF001', 'Description élément 1', 'Valeur 1'],
    ['REF002', 'Description élément 2', 'Valeur 2'],
    ['REF003', 'Description élément 3', 'Valeur 3'],
  ];
};

// Get note about macros based on file type
export const getMacroNote = (file: any): string => {
  if (!file) return '';

  if (file.filename.endsWith('.xlsx') || file.filename.endsWith('.xls')) {
    return "Ce fichier Excel peut contenir des macros. Pour une utilisation optimale, téléchargez-le et ouvrez-le avec Microsoft Excel.";
  }
  
  if (file.filename.endsWith('.docx') || file.filename.endsWith('.doc')) {
    return "Ce document peut contenir des éléments de mise en forme avancés. Pour une meilleure expérience, téléchargez-le et ouvrez-le avec Microsoft Word.";
  }
  
  return '';
};
