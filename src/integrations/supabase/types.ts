export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
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
        Relationships: []
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
        Relationships: []
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
        ]
      }
      marketplace_listings: {
        Row: {
          category_id: string | null
          created_at: string
          creation_link: string | null
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
          videos: string[] | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          creation_link?: string | null
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
          videos?: string[] | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          creation_link?: string | null
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
          videos?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "marketplace_categories"
            referencedColumns: ["id"]
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
      }
    }
    Views: {
      is_admin_secure: {
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
          | { p_role: string; p_user_id: string }
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
          | {
              p_message: string
              p_metadata?: Json
              p_type: string
              p_user_id: string
            }
          | { p_message: string; p_user_id: number }
        Returns: number
      }
      create_seller_verification_task: {
        Args: { p_required_documents?: Json; p_seller_profile_id: number }
        Returns: number
      }
      get_admin_info: {
        Args: Record<PropertyKey, never>
        Returns: {
          email: string
          is_admin: boolean
          role: string
          user_id: string
        }[]
      }
      get_sellers_for_review: {
        Args: { p_page?: number; p_page_size?: number; p_status?: string }
        Returns: {
          business_name: string
          business_type: string
          created_at: string
          seller_profile_id: number
          status: string
          uploaded_documents: Json
          user_id: string
          verification_task_id: number
        }[]
      }
      log_error: {
        Args: { p_error_context?: Json; p_error_message: string }
        Returns: undefined
      }
      raise_application_error: {
        Args: { p_error_code: number; p_error_message: string }
        Returns: undefined
      }
      review_seller_profile: {
        Args:
          | {
              p_reviewer_notes?: string
              p_status: string
              p_verification_task_id: number
            }
          | { review_text: string; seller_id: number }
        Returns: boolean
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
        Args: { p_document_types: Json; p_seller_profile_id: number }
        Returns: undefined
      }
      upload_seller_documents: {
        Args: { p_documents: Json; p_seller_profile_id: number }
        Returns: Json
      }
      upsert_seller_profile: {
        Args: {
          p_address?: Json
          p_business_name: string
          p_business_type?: string
          p_contact_email?: string
          p_contact_phone?: string
          p_description?: string
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
