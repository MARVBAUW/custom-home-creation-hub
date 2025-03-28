
export interface GuideCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface GuideDocument {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'text';
  fileSize?: string;
  duration?: string;
  lastUpdated: string;
  url: string;
  categoryId: string;
  featured?: boolean;
  isNew?: boolean;
  content?: string;
}
