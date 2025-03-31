
export interface DTU {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdate: string;
  selected?: boolean;
  rules: {
    title: string;
    content: string;
    type: "standard" | "warning" | "tip" | "alert";
  }[];
  sections?: {
    title: string;
    content: string;
  }[];
  schemas?: DTUSchema[];
}

export interface DTUSchema {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}
