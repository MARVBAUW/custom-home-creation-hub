
// Types pour les données acoustiques
export interface AcoustiqueRule {
  title: string;
  content: string;
  type: 'standard' | 'warning' | 'tip';
}

export interface AcoustiqueSection {
  id: string;
  title: string;
  description: string;
  rules: AcoustiqueRule[];
}

export interface AcoustiqueData {
  type: 'logement' | 'erp' | 'education' | 'bureau';
  title: string;
  subtitle: string;
  description: string;
  sections: AcoustiqueSection[];
  lastUpdate: string;
}

// Données acoustiques pour les logements
export const logementAcoustiqueData: AcoustiqueData = {
  type: 'logement',
  title: 'Nouvelle Réglementation Acoustique (NRA)',
  subtitle: 'Arrêté du 30 juin 1999 - Logements neufs',
  description: 'Réglementation acoustique applicable aux bâtiments d\'habitation neufs',
  lastUpdate: '2023-09-15',
  sections: [
    {
      id: 'isolation-exterieur',
      title: 'Isolation aux bruits aériens extérieurs',
      description: 'Exigences d\'isolation vis-à-vis des bruits provenant de l\'extérieur',
      rules: [
        {
          title: 'DnT,A,tr ≥ 30 dB',
          content: 'Exigence minimale pour les zones d\'exposition au bruit standard',
          type: 'standard'
        },
        {
          title: 'DnT,A,tr ≥ 35 dB',
          content: 'Exigence pour les bâtiments situés le long de voies routières importantes',
          type: 'standard'
        },
        {
          title: 'DnT,A,tr ≥ 38 dB',
          content: 'Exigence pour les bâtiments situés le long de voies ferrées importantes',
          type: 'standard'
        }
      ]
    },
    {
      id: 'isolation-interieur',
      title: 'Isolation entre logements',
      description: 'Exigences d\'isolation acoustique entre logements adjacents',
      rules: [
        {
          title: 'DnT,A ≥ 53 dB',
          content: 'Isolement acoustique standardisé pondéré entre logements',
          type: 'standard'
        },
        {
          title: 'L\'nT,w ≤ 58 dB',
          content: 'Niveau de bruit de choc standardisé entre logements',
          type: 'standard'
        },
        {
          title: 'Attention aux ponts phoniques',
          content: 'Les boîtiers électriques et passages de gaines peuvent créer des ponts phoniques qui dégradent l\'isolement acoustique',
          type: 'warning'
        }
      ]
    },
    {
      id: 'equipements',
      title: 'Équipements du bâtiment',
      description: 'Niveau de bruit maximal généré par les équipements',
      rules: [
        {
          title: 'LnAT ≤ 30 dB(A)',
          content: 'Niveau de pression acoustique normalisé pour les équipements individuels d\'un logement (VMC, chauffage, etc.)',
          type: 'standard'
        },
        {
          title: 'LnAT ≤ 35 dB(A)',
          content: 'Niveau de pression acoustique normalisé pour les équipements collectifs (ascenseurs, chaufferie, etc.)',
          type: 'standard'
        },
        {
          title: 'Désolidarisation des équipements',
          content: 'Tous les équipements techniques doivent être désolidarisés de la structure pour limiter la transmission des vibrations',
          type: 'tip'
        }
      ]
    }
  ]
};

// Données acoustiques pour les ERP
export const erpAcoustiqueData: AcoustiqueData = {
  type: 'erp',
  title: 'Réglementation ERP',
  subtitle: 'Établissements recevant du public',
  description: 'Exigences acoustiques pour les établissements recevant du public',
  lastUpdate: '2023-09-15',
  sections: [
    {
      id: 'exigences-generales',
      title: 'Exigences générales',
      description: 'Exigences acoustiques générales applicables aux ERP',
      rules: [
        {
          title: 'Isolation de façade',
          content: 'Selon zone d\'exposition, entre 30 et 45 dB d\'isolement requis',
          type: 'standard'
        },
        {
          title: 'Aires d\'accueil',
          content: 'Temps de réverbération adapté à l\'usage, généralement entre 0.6s et 1.2s',
          type: 'standard'
        },
        {
          title: 'Isolement entre locaux',
          content: 'Variable selon la destination des locaux, de 38 à 55 dB',
          type: 'standard'
        }
      ]
    },
    {
      id: 'hotellerie',
      title: 'Hôtellerie',
      description: 'Exigences spécifiques pour les hôtels',
      rules: [
        {
          title: 'DnT,A ≥ 50 dB',
          content: 'Isolement acoustique standardisé pondéré entre chambres d\'hôtel',
          type: 'standard'
        },
        {
          title: 'DnT,A ≥ 38 dB',
          content: 'Isolement entre chambre et circulation',
          type: 'standard'
        },
        {
          title: 'L\'nT,w ≤ 60 dB',
          content: 'Niveau de bruit de choc standardisé entre chambres',
          type: 'standard'
        }
      ]
    }
  ]
};

// Données acoustiques pour les établissements d'enseignement
export const educationAcoustiqueData: AcoustiqueData = {
  type: 'education',
  title: 'Établissements d\'enseignement',
  subtitle: 'Arrêté du 25 avril 2003',
  description: 'Réglementation acoustique applicable aux établissements d\'enseignement',
  lastUpdate: '2023-09-15',
  sections: [
    {
      id: 'exigences-isolement',
      title: 'Exigences d\'isolement',
      description: 'Exigences d\'isolement acoustique entre locaux',
      rules: [
        {
          title: 'DnT,A ≥ 43 dB',
          content: 'Isolement acoustique standardisé pondéré entre salles de classe',
          type: 'standard'
        },
        {
          title: 'DnT,A ≥ 53 dB',
          content: 'Isolement entre salle et local bruyant (salle de musique, atelier)',
          type: 'standard'
        },
        {
          title: 'DnT,A ≥ 30 à 40 dB',
          content: 'Isolement avec circulation selon le type de local',
          type: 'standard'
        }
      ]
    },
    {
      id: 'bruits-choc',
      title: 'Bruits de choc',
      description: 'Exigences relatives aux bruits de choc',
      rules: [
        {
          title: 'L\'nT,w ≤ 60 dB',
          content: 'Niveau de bruit de choc standardisé en réception dans une salle de classe',
          type: 'standard'
        }
      ]
    },
    {
      id: 'reverberation',
      title: 'Temps de réverbération',
      description: 'Exigences relatives au temps de réverbération',
      rules: [
        {
          title: 'Salles de classe',
          content: 'Temps de réverbération compris entre 0.4s et 0.8s selon le volume',
          type: 'standard'
        },
        {
          title: 'Circulations',
          content: 'Temps de réverbération inférieur ou égal à 1.2s + 0.1s',
          type: 'standard'
        },
        {
          title: 'Restauration',
          content: 'Temps de réverbération inférieur ou égal à 1.2s + 0.1s',
          type: 'standard'
        }
      ]
    }
  ]
};

// Données acoustiques pour les bureaux
export const bureauAcoustiqueData: AcoustiqueData = {
  type: 'bureau',
  title: 'Immeubles de bureaux',
  subtitle: 'Recommandations acoustiques',
  description: 'Recommandations acoustiques pour les immeubles de bureaux',
  lastUpdate: '2023-09-15',
  sections: [
    {
      id: 'isolation-bureau',
      title: 'Isolation entre bureaux',
      description: 'Exigences d\'isolation acoustique entre bureaux',
      rules: [
        {
          title: 'DnT,A ≥ 35 dB',
          content: 'Isolement acoustique standardisé pondéré entre bureaux standards',
          type: 'standard'
        },
        {
          title: 'DnT,A ≥ 40 à 45 dB',
          content: 'Isolement pour bureaux confidentiels',
          type: 'standard'
        }
      ]
    },
    {
      id: 'open-space',
      title: 'Open space',
      description: 'Recommandations pour les espaces ouverts',
      rules: [
        {
          title: 'Décroissance spatiale',
          content: 'D2,S entre 7 et 9 dB(A) pour une bonne intelligibilité',
          type: 'standard'
        },
        {
          title: 'Rayon de distraction',
          content: 'rD inférieur à 5m recommandé pour limiter les nuisances entre postes de travail',
          type: 'tip'
        }
      ]
    },
    {
      id: 'bruit-fond',
      title: 'Bruit de fond',
      description: 'Recommandations sur le bruit de fond',
      rules: [
        {
          title: 'NR 30-35',
          content: 'Niveau de bruit recommandé pour les bureaux individuels',
          type: 'standard'
        },
        {
          title: 'NR 35-40',
          content: 'Niveau de bruit recommandé pour les open spaces',
          type: 'standard'
        }
      ]
    }
  ]
};

// Exporter toutes les données acoustiques regroupées
export const acoustiqueData = {
  logement: logementAcoustiqueData,
  erp: erpAcoustiqueData,
  education: educationAcoustiqueData,
  bureau: bureauAcoustiqueData
};
