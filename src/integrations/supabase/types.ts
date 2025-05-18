export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_projects: {
        Row: {
          client_id: string
          client_project_id: string | null
          construction_type: string
          created_at: string | null
          description: string | null
          estimated_budget: number | null
          id: string
          location: string | null
          project_title: string
          project_type: string
          status: string | null
          surface: number | null
          timeline: Json | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          client_project_id?: string | null
          construction_type: string
          created_at?: string | null
          description?: string | null
          estimated_budget?: number | null
          id?: string
          location?: string | null
          project_title: string
          project_type: string
          status?: string | null
          surface?: number | null
          timeline?: Json | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          client_project_id?: string | null
          construction_type?: string
          created_at?: string | null
          description?: string | null
          estimated_budget?: number | null
          id?: string
          location?: string | null
          project_title?: string
          project_type?: string
          status?: string | null
          surface?: number | null
          timeline?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_projects_client_project_id_fkey"
            columns: ["client_project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          key_value: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          key_value: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          key_value?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      backlinks_logs: {
        Row: {
          backlinks_generated: number | null
          created_at: string
          id: string
          message: string | null
          new_backlinks: number | null
          status: string
          updated_backlinks: number | null
        }
        Insert: {
          backlinks_generated?: number | null
          created_at?: string
          id?: string
          message?: string | null
          new_backlinks?: number | null
          status: string
          updated_backlinks?: number | null
        }
        Update: {
          backlinks_generated?: number | null
          created_at?: string
          id?: string
          message?: string | null
          new_backlinks?: number | null
          status?: string
          updated_backlinks?: number | null
        }
        Relationships: []
      }
      client_projects: {
        Row: {
          budget: number | null
          construction_type: string
          created_at: string | null
          description: string
          has_basement: boolean | null
          has_garage: boolean | null
          has_pool: boolean | null
          has_solar_panels: boolean | null
          id: string
          location: string
          project_type: string
          status: string | null
          surface: number | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget?: number | null
          construction_type: string
          created_at?: string | null
          description: string
          has_basement?: boolean | null
          has_garage?: boolean | null
          has_pool?: boolean | null
          has_solar_panels?: boolean | null
          id?: string
          location: string
          project_type: string
          status?: string | null
          surface?: number | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget?: number | null
          construction_type?: string
          created_at?: string | null
          description?: string
          has_basement?: boolean | null
          has_garage?: boolean | null
          has_pool?: boolean | null
          has_solar_panels?: boolean | null
          id?: string
          location?: string
          project_type?: string
          status?: string | null
          surface?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          company_name: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          company_name?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          company_name?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      project_phases: {
        Row: {
          color: string | null
          completed: boolean
          created_at: string
          end_date: string | null
          id: string
          notes: string | null
          order_index: number
          project_id: string | null
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          completed?: boolean
          created_at?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          order_index: number
          project_id?: string | null
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          completed?: boolean
          created_at?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          order_index?: number
          project_id?: string | null
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_phases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "admin_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_simulations: {
        Row: {
          content: Json
          created_at: string
          id: string
          is_temporary: boolean
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          is_temporary?: boolean
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          is_temporary?: boolean
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
