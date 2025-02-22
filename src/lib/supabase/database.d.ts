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
      agendas: {
        Row: {
          color: number | null
          created_at: string
          description: string | null
          id: number
          name: string
          resume: string | null
          slug: string
        }
        Insert: {
          color?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          resume?: string | null
          slug: string
        }
        Update: {
          color?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          resume?: string | null
          slug?: string
        }
        Relationships: []
      }
      ai_conversations: {
        Row: {
          archived: boolean
          created_at: string
          data: Json
          environment: string
          id: string
          messages: Json[]
          summary: string | null
          tags: string[]
          title: string
          updated_at: string | null
          user: string
        }
        Insert: {
          archived?: boolean
          created_at?: string
          data: Json
          environment: string
          id?: string
          messages: Json[]
          summary?: string | null
          tags: string[]
          title: string
          updated_at?: string | null
          user: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          data?: Json
          environment?: string
          id?: string
          messages?: Json[]
          summary?: string | null
          tags?: string[]
          title?: string
          updated_at?: string | null
          user?: string
        }
        Relationships: []
      }
      course_members: {
        Row: {
          course: number
          created_at: string
          is_admin: boolean
          profile: number
        }
        Insert: {
          course: number
          created_at?: string
          is_admin?: boolean
          profile: number
        }
        Update: {
          course?: number
          created_at?: string
          is_admin?: boolean
          profile?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_members_course_fkey"
            columns: ["course"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_members_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string
          id: number
          is_public: boolean
          name: string
          updated_at: string | null
          workspace: number | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          is_public?: boolean
          name: string
          updated_at?: string | null
          workspace?: number | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          is_public?: boolean
          name?: string
          updated_at?: string | null
          workspace?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workspace_courses_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      nb_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          notebook: number
          style: Json
          tags: string[]
          title: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          notebook: number
          style: Json
          tags?: string[]
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          notebook?: number
          style?: Json
          tags?: string[]
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nb_notes_notebook_fkey"
            columns: ["notebook"]
            isOneToOne: false
            referencedRelation: "notebooks"
            referencedColumns: ["id"]
          },
        ]
      }
      nb_notion_pages: {
        Row: {
          created_at: string
          id: string
          name: string
          notebook: number
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          notebook: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notebook?: number
        }
        Relationships: [
          {
            foreignKeyName: "nb_notion_pages_notebook_fkey"
            columns: ["notebook"]
            isOneToOne: false
            referencedRelation: "notebooks"
            referencedColumns: ["id"]
          },
        ]
      }
      nb_vocab_areas: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: number
          name: string
          notebook: number
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: number
          name: string
          notebook: number
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: number
          name?: string
          notebook?: number
        }
        Relationships: [
          {
            foreignKeyName: "nb_vocab_areas_notebook_fkey"
            columns: ["notebook"]
            isOneToOne: false
            referencedRelation: "notebooks"
            referencedColumns: ["id"]
          },
        ]
      }
      nb_vocab_definitions: {
        Row: {
          area: number
          created_at: string
          definition: string
          id: number
          tags: string[]
          term: string
          updated_at: string | null
        }
        Insert: {
          area: number
          created_at?: string
          definition: string
          id?: number
          tags?: string[]
          term: string
          updated_at?: string | null
        }
        Update: {
          area?: number
          created_at?: string
          definition?: string
          id?: number
          tags?: string[]
          term?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nb_vocab_definitions_area_fkey"
            columns: ["area"]
            isOneToOne: false
            referencedRelation: "nb_vocab_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      notebooks: {
        Row: {
          alias: string | null
          created_at: string
          id: number
          is_active: boolean
          topic: number
          updated_at: string | null
          user: string
        }
        Insert: {
          alias?: string | null
          created_at?: string
          id?: number
          is_active?: boolean
          topic: number
          updated_at?: string | null
          user: string
        }
        Update: {
          alias?: string | null
          created_at?: string
          id?: number
          is_active?: boolean
          topic?: number
          updated_at?: string | null
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "notebooks_topic_fkey"
            columns: ["topic"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_activities: {
        Row: {
          activity_id: number
          created_at: string
          practice_id: number
        }
        Insert: {
          activity_id: number
          created_at?: string
          practice_id: number
        }
        Update: {
          activity_id?: number
          created_at?: string
          practice_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "practice_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "topic_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_activities_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_attempts: {
        Row: {
          answers: Json[]
          created_at: string
          ended_at: string
          id: number
          perfection: number
          practice_id: number
          profile_id: number
          started_at: string
        }
        Insert: {
          answers: Json[]
          created_at?: string
          ended_at: string
          id?: number
          perfection?: number
          practice_id: number
          profile_id: number
          started_at: string
        }
        Update: {
          answers?: Json[]
          created_at?: string
          ended_at?: string
          id?: number
          perfection?: number
          practice_id?: number
          profile_id?: number
          started_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_attempts_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_attempts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_stats: {
        Row: {
          count: number
          duration_avg: number | null
          duration_max: number | null
          duration_min: number | null
          durations: number[]
          perfection_avg: number | null
          perfection_max: number | null
          perfection_min: number | null
          perfections: number[]
          practice: number
          start_max: string | null
          start_min: string | null
          starts: string[]
          updated_at: string | null
          user: string
        }
        Insert: {
          count?: number
          duration_avg?: number | null
          duration_max?: number | null
          duration_min?: number | null
          durations: number[]
          perfection_avg?: number | null
          perfection_max?: number | null
          perfection_min?: number | null
          perfections: number[]
          practice: number
          start_max?: string | null
          start_min?: string | null
          starts: string[]
          updated_at?: string | null
          user: string
        }
        Update: {
          count?: number
          duration_avg?: number | null
          duration_max?: number | null
          duration_min?: number | null
          durations?: number[]
          perfection_avg?: number | null
          perfection_max?: number | null
          perfection_min?: number | null
          perfections?: number[]
          practice?: number
          start_max?: string | null
          start_min?: string | null
          starts?: string[]
          updated_at?: string | null
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_stats_practice_fkey"
            columns: ["practice"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
        ]
      }
      practices: {
        Row: {
          created_at: string
          created_by: number | null
          description: string
          id: number
          title: string
          topic_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          description: string
          id?: number
          title: string
          topic_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          description?: string
          id?: number
          title?: string
          topic_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "practices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practices_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          color: number | null
          created_at: string
          id: number
          last_online: string | null
          metadata: Json | null
          name: string
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          color?: number | null
          created_at?: string
          id?: number
          last_online?: string | null
          metadata?: Json | null
          name: string
          user_id: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          color?: number | null
          created_at?: string
          id?: number
          last_online?: string | null
          metadata?: Json | null
          name?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          course_id: number | null
          created_at: string
          description: string
          id: number
          name: string
          pid: string
          tags: Json
          updated_at: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          description: string
          id?: number
          name: string
          pid?: string
          tags: Json
          updated_at?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          description?: string
          id?: number
          name?: string
          pid?: string
          tags?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      subject_events: {
        Row: {
          created_at: string
          details: string | null
          ends_at: string | null
          id: number
          starts_at: string
          subject_id: number
          title: string
          type: Database["public"]["Enums"]["EventType"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          details?: string | null
          ends_at?: string | null
          id?: number
          starts_at: string
          subject_id: number
          title: string
          type?: Database["public"]["Enums"]["EventType"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          details?: string | null
          ends_at?: string | null
          id?: number
          starts_at?: string
          subject_id?: number
          title?: string
          type?: Database["public"]["Enums"]["EventType"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subject_events_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subject_notes: {
        Row: {
          author_id: number
          color: number | null
          content: string
          created_at: string
          id: number
          subject_id: number
          tags: string[] | null
          title: string
        }
        Insert: {
          author_id: number
          color?: number | null
          content: string
          created_at?: string
          id?: number
          subject_id: number
          tags?: string[] | null
          title: string
        }
        Update: {
          author_id?: number
          color?: number | null
          content?: string
          created_at?: string
          id?: number
          subject_id?: number
          tags?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "subject_notes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subject_notes_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          color: number
          course_id: number
          created_at: string
          description: string
          id: number
          name: string
        }
        Insert: {
          color: number
          course_id: number
          created_at?: string
          description: string
          id?: number
          name: string
        }
        Update: {
          color?: number
          course_id?: number
          created_at?: string
          description?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_activities: {
        Row: {
          created_at: string
          created_by: number | null
          data: Json
          id: number
          tags: string[]
          topic_id: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          data: Json
          id?: number
          tags?: string[]
          topic_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          data?: Json
          id?: number
          tags?: string[]
          topic_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "topic_activities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_activities_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_activities_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          created_at: string
          description: string | null
          id: number
          subject_id: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          subject_id: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          subject_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "topics_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          created_at: string
          is_admin: boolean
          user: number
          workspace: number
        }
        Insert: {
          created_at?: string
          is_admin?: boolean
          user: number
          workspace: number
        }
        Update: {
          created_at?: string
          is_admin?: boolean
          user?: number
          workspace?: number
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_members_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          avatar: string | null
          color: number | null
          created_at: string
          description: string
          id: number
          owner: number
          pid: string
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          color?: number | null
          created_at?: string
          description: string
          id?: number
          owner: number
          pid: string
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          color?: number | null
          created_at?: string
          description?: string
          id?: number
          owner?: number
          pid?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workspaces_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      create_agenda: {
        Args: {
          project_id: number
          agenda_name: string
          agenda_slug: string
          agenda_resume: string
          agenda_description: string
        }
        Returns: undefined
      }
      create_project_event: {
        Args: {
          agenda_ids: number[]
          event_name: string
          event_type: Database["public"]["Enums"]["project_event_type"]
          event_starts_at: string
          event_ends_at?: string
          event_description?: string
        }
        Returns: number
      }
      get_my_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      has_access_to_course: {
        Args: {
          profile_id: number
          course_id: number
        }
        Returns: boolean
      }
      has_access_to_subject: {
        Args: {
          profile_id: number
          subject_id: number
        }
        Returns: boolean
      }
      has_access_to_topic: {
        Args: {
          profile_id: number
          topic_id: number
        }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      is_course_admin: {
        Args: {
          profile_id: number
          course_id: number
        }
        Returns: boolean
      }
      is_subject_admin: {
        Args: {
          profile_id: number
          subject_id: number
        }
        Returns: boolean
      }
      is_topic_admin: {
        Args: {
          profile_id: number
          topic_id: number
        }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      EventType: "EVENT" | "TASK" | "REMINDER" | "OTHER"
      project_event_type:
        | "TASK"
        | "EVENT"
        | "REMINDER"
        | "PERSONAL_BIRTHDAY"
        | "PERSONAL_OTHER"
        | "OTHER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
