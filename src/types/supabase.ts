
export interface Profile {
  id: string;
  full_name?: string | null;
  avatar_url?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  company_name?: string | null;
  username?: string | null;
  updated_at?: string | null;
}

export interface ClientProject {
  id: string;
  user_id: string;
  title: string;
  project_type: string;
  construction_type: string;
  description: string;
  location: string;
  surface: number;
  budget: number;
  has_pool: boolean;
  has_solar_panels: boolean;
  has_garage: boolean;
  has_basement: boolean;
  created_at: string;
  updated_at?: string;
  status: string;
}

export interface AdminProject {
  id: string;
  client_project_id?: string;
  client_id: string;
  project_title: string;
  project_type: string;
  construction_type: string;
  description?: string;
  location?: string;
  estimated_budget: number;
  surface: number;
  status: string;
  created_at: string;
  updated_at?: string;
}
