
// Mock client data
export const mockClient = {
  id: 'demo-user-1',
  name: 'Marc Dubois',
  email: 'marc.dubois@example.com',
  phone: '06 12 34 56 78',
  address: '123 Avenue des Champs-Élysées, 75008 Paris',
  company: 'Dubois Constructions',
  registrationDate: '2023-10-15T10:30:00.000Z',
  projectDescription: 'Construction d\'une villa contemporaine avec piscine et aménagement paysager. Le projet inclut un espace de vie ouvert, 4 chambres, et un bureau à domicile.',
  projectType: 'residential',
  projectLocation: 'Aix-en-Provence',
  projectBudget: '650 000 €',
  hasProjects: false,
  projects: [] as any[]
};

// Mock projects to associate
export const availableProjects = [
  { id: 'proj-1', title: 'Villa Méditerranée', location: 'Marseille', type: 'Construction neuve', status: 'En attente' },
  { id: 'proj-2', title: 'Rénovation bureaux', location: 'Lyon', type: 'Rénovation', status: 'Planifié' },
  { id: 'proj-3', title: 'Extension maison', location: 'Nice', type: 'Extension', status: 'En attente' }
];
