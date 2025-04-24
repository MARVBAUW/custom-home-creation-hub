
export interface Testimonial {
  quote: string;
  author: string;
  date: string;
  location: string;
  project: string;
  rating: number;
  source: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Entreprise à l'écoute, réactive et sérieuse. Une équipe disponible et franche : du bon travail.",
    author: "Marine Lenhard",
    date: "il y a 2 mois",
    location: "Marseille",
    project: "Visité en janvier",
    rating: 5,
    source: "Google"
  },
  {
    quote: "Marvin et Maël sont vraiment à l'écoute de votre projet et font tout pour y répondre.",
    author: "Mael Le Coz",
    date: "il y a un jour",
    location: "Marseille",
    project: "Visité en avril",
    rating: 5,
    source: "Google"
  },
  {
    quote: "Entrepreneurs sérieux et très réactifs.",
    author: "lenhard Valérie",
    date: "il y a un jour",
    location: "Marseille",
    project: "Visité en avril",
    rating: 5,
    source: "Google"
  }
];
