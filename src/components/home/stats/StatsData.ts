
export interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  color: string;
  icon: 'award' | 'map' | 'star';
}

export const statsData: StatItem[] = [
  {
    value: 5,
    prefix: '+',
    label: "Années d'expérience",
    description: "Dans la conception et réalisation",
    color: "from-amber-500 to-orange-500",
    icon: 'award'
  },
  {
    value: 2,
    prefix: '',
    label: "Régions couvertes",
    description: "PACA et Auvergne-Rhône-Alpes",
    color: "from-emerald-500 to-teal-500",
    icon: 'map'
  },
  {
    value: 100,
    prefix: '',
    suffix: '%',
    label: "Satisfaction client",
    description: "Notre priorité absolue",
    color: "from-sky-500 to-blue-500",
    icon: 'star'
  }
];
