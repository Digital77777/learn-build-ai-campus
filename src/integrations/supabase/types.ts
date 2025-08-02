export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_roles: {
        Row: {
          created_at: string | null
          id: number
          permissions: Json | null
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          permissions?: Json | null
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: never
          permissions?: Json | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "is_admin"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string | null
          is_active: boolean | null
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          is_active?: boolean | null
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          is_active?: boolean | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "is_admin"
            referencedColumns: ["user_id"]
          },
        ]
      }
      error_log: {
        Row: {
          error_context: Json | null
          error_message: string | null
          error_timestamp: string | null
          id: number
        }
        Insert: {
          error_context?: Json | null
          error_message?: string | null
          error_timestamp?: string | null
          id?: number
        }
        Update: {
          error_context?: Json | null
          error_message?: string | null
          error_timestamp?: string | null
          id?: number
        }
        Relationships: []
      }
      marketplace_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_favorites: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_favorites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "marketplace_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "is_admin"
            referencedColumns: ["user_id"]
          },
        ]
      }
      marketplace_listings: {
        Row: {
          category_id: string | null
          created_at: string
          currency: string | null
          delivery_time: number | null
          description: string
          id: string
          images: string[] | null
          is_featured: boolean | null
          listing_type: string
          price: number | null
          requirements: string | null
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          currency?: string | null
          delivery_time?: number | null
          description: string
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          listing_type: string
          price?: number | null
          requirements?: string | null
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          currency?: string | null
          delivery_time?: number | null
          description?: string
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          listing_type?: string
          price?: number | null
          requirements?: string | null
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "marketplace_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "is_admin"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: number
          is_read: boolean | null
          message: string
          metadata: Json | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: never
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "is_admin"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "is_admin"
            referencedColumns: ["user_id"]
          },
        ]
      }
      seller_profiles: {
        Row: {
          address: Json | null
          business_name: string
          business_type: string | null
          commission_rate: number | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          id: number
          payout_method: Json | null
          status: string | null
          tax_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: Json | null
          business_name: string
          business_type?: string | null
          commission_rate?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: never
          payout_method?: Json | null
          status?: string | null
          tax_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: Json | null
          business_name?: string
          business_type?: string | null
          commission_rate?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: never
          payout_method?: Json | null
          status?: string | null
          tax_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seller_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "is_admin"
            referencedColumns: ["user_id"]
          },
        ]
      }
      seller_verification_tasks: {
        Row: {
          created_at: string | null
          document_types_required: Json | null
          id: number
          required_documents: Json | null
          reviewed_by: string | null
          reviewer_notes: string | null
          seller_profile_id: number
          status: string
          submitted_documents: Json | null
          updated_at: string | null
          uploaded_documents: Json | null
        }
        Insert: {
          created_at?: string | null
          document_types_required?: Json | null
          id?: never
          required_documents?: Json | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          seller_profile_id: number
          status?: string
          submitted_documents?: Json | null
          updated_at?: string | null
          uploaded_documents?: Json | null
        }
        Update: {
          created_at?: string | null
          document_types_required?: Json | null
          id?: never
          required_documents?: Json | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          seller_profile_id?: number
          status?: string
          submitted_documents?: Json | null
          updated_at?: string | null
          uploaded_documents?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "seller_verification_tasks_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "is_admin"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "seller_verification_tasks_seller_profile_id_fkey"
            columns: ["seller_profile_id"]
            isOneToOne: false
            referencedRelation: "seller_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          created_at: string | null
          description: string
          id: string
          name: string
          owner_id: string | null
          price: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          name: string
          owner_id?: string | null
          price: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          name?: string
          owner_id?: string | null
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "tools_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "is_admin"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      is_admin: {
        Row: {
          email: string | null
          is_admin: boolean | null
          role: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_admin_user: {
        Args:
          | { p_user_id: string; p_role: string }
          | { user_email: string; user_role: string }
        Returns: undefined
      }
      check_user_seller_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          has_seller_profile: boolean
          profile_status: string
        }[]
      }
      create_notification: {
        Args:
          | { p_user_id: number; p_message: string }
          | {
              p_user_id: string
              p_type: string
              p_message: string
              p_metadata?: Json
            }
        Returns: number
      }
      create_seller_verification_task: {
        Args: { p_seller_profile_id: number; p_required_documents?: Json }
        Returns: number
      }
      get_sellers_for_review: {
        Args: { p_status?: string; p_page?: number; p_page_size?: number }
        Returns: {
          seller_profile_id: number
          user_id: string
          business_name: string
          business_type: string
          status: string
          created_at: string
          verification_task_id: number
          uploaded_documents: Json
        }[]
      }
      log_error: {
        Args: { p_error_message: string; p_error_context?: Json }
        Returns: undefined
      }
      raise_application_error: {
        Args: { p_error_code: number; p_error_message: string }
        Returns: undefined
      }
      review_seller_profile: {
        Args:
          | {
              p_verification_task_id: number
              p_status: string
              p_reviewer_notes?: string
            }
          | { seller_id: number; review_text: string }
        Returns: undefined
      }
      safe_user_creation: {
        Args: { p_email: string; p_full_name: string }
        Returns: string
      }
      secure_function_template: {
        Args: { param1: string }
        Returns: string
      }
      update_required_document_types: {
        Args: { p_seller_profile_id: number; p_document_types: Json }
        Returns: undefined
      }
      upload_seller_documents: {
        Args: { p_seller_profile_id: number; p_documents: Json }
        Returns: Json
      }
      upsert_seller_profile: {
        Args: {
          p_business_name: string
          p_business_type?: string
          p_description?: string
          p_contact_email?: string
          p_contact_phone?: string
          p_address?: Json
          p_tax_id?: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
