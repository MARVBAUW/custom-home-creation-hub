
import { LucideIcon } from 'lucide-react';

export interface GuideCategory {
  id: string;
  name: string;
  icon: LucideIcon;
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
