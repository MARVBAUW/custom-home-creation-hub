
export interface DTURule {
  title: string;
  content: string;
  type: 'standard' | 'warning' | 'tip';
}

export interface DTUSchema {
  id: string;
  title: string;
  imageUrl?: string;
  description: string;
}

export interface DTU {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdate: string;
  rules: DTURule[];
  sections: {
    title: string;
    content: string;
  }[];
  schemas?: DTUSchema[];
  selected?: boolean;
}
