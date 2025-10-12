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
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: Database['public']['Enums']['user_role_enum']
          subscription_status:
            | Database['public']['Enums']['subscription_status_enum']
            | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          role?: Database['public']['Enums']['user_role_enum']
          subscription_status?:
            | Database['public']['Enums']['subscription_status_enum']
            | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: Database['public']['Enums']['user_role_enum']
          subscription_status?:
            | Database['public']['Enums']['subscription_status_enum']
            | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_status_enum: 'free' | 'pro' | 'inactive'
      user_role_enum: 'user' | 'admin'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
