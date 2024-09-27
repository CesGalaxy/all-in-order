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
      agenda_events: {
        Row: {
          agenda_id: number
          created_at: string
          event_id: number
        }
        Insert: {
          agenda_id: number
          created_at?: string
          event_id: number
        }
        Update: {
          agenda_id?: number
          created_at?: string
          event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "agenda_events_agenda_id_fkey"
            columns: ["agenda_id"]
            isOneToOne: false
            referencedRelation: "agendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agenda_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "project_events"
            referencedColumns: ["id"]
          },
        ]
      }
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
      course_members: {
        Row: {
          course_id: number
          is_admin: boolean
          joined_at: string
          profile_id: number
        }
        Insert: {
          course_id: number
          is_admin?: boolean
          joined_at?: string
          profile_id: number
        }
        Update: {
          course_id?: number
          is_admin?: boolean
          joined_at?: string
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_members_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_members_profile_id_fkey"
            columns: ["profile_id"]
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
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          is_public?: boolean
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          is_public?: boolean
          name?: string
        }
        Relationships: []
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
          name?: string
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_agendas: {
        Row: {
          agenda_id: number
          category: string | null
          created_at: string
          private: boolean | null
          project_id: number
        }
        Insert: {
          agenda_id: number
          category?: string | null
          created_at?: string
          private?: boolean | null
          project_id: number
        }
        Update: {
          agenda_id?: number
          category?: string | null
          created_at?: string
          private?: boolean | null
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_agendas_agenda_id_fkey"
            columns: ["agenda_id"]
            isOneToOne: false
            referencedRelation: "agendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_agendas_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_events: {
        Row: {
          created_at: string
          description: string | null
          ends_at: string | null
          id: number
          name: string
          starts_at: string
          type: Database["public"]["Enums"]["project_event_type"] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: number
          name: string
          starts_at: string
          type?: Database["public"]["Enums"]["project_event_type"] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: number
          name?: string
          starts_at?: string
          type?: Database["public"]["Enums"]["project_event_type"] | null
        }
        Relationships: []
      }
      project_members: {
        Row: {
          joined_at: string
          profile_id: number
          project_id: number
          role: Database["public"]["Enums"]["ProjectMemberRole"] | null
          role_since: string | null
        }
        Insert: {
          joined_at?: string
          profile_id: number
          project_id: number
          role?: Database["public"]["Enums"]["ProjectMemberRole"] | null
          role_since?: string | null
        }
        Update: {
          joined_at?: string
          profile_id?: number
          project_id?: number
          role?: Database["public"]["Enums"]["ProjectMemberRole"] | null
          role_since?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_notes: {
        Row: {
          author: number
          color: number | null
          content: string | null
          created_at: string
          id: number
          project_id: number
          tags: string[] | null
          title: string | null
        }
        Insert: {
          author: number
          color?: number | null
          content?: string | null
          created_at?: string
          id?: number
          project_id: number
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          author?: number
          color?: number | null
          content?: string | null
          created_at?: string
          id?: number
          project_id?: number
          tags?: string[] | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_notes_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_notes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tasks: {
        Row: {
          created_at: string
          created_by: number | null
          description: string | null
          id: number
          pending_date: string | null
          project_id: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          description?: string | null
          id?: number
          pending_date?: string | null
          project_id: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: number | null
          description?: string | null
          id?: number
          pending_date?: string | null
          project_id?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          avatar_url: string | null
          color: number | null
          comments: string[] | null
          created_at: string
          description: string | null
          heading_url: string | null
          id: number
          name: string
          owner: number
          resume: string | null
          route: string | null
          slug: string
          space_id: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          color?: number | null
          comments?: string[] | null
          created_at?: string
          description?: string | null
          heading_url?: string | null
          id?: number
          name: string
          owner: number
          resume?: string | null
          route?: string | null
          slug: string
          space_id: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          color?: number | null
          comments?: string[] | null
          created_at?: string
          description?: string | null
          heading_url?: string | null
          id?: number
          name?: string
          owner?: number
          resume?: string | null
          route?: string | null
          slug?: string
          space_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "proyects_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proyects_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_members: {
        Row: {
          joined_at: string
          profile_id: number
          role: Database["public"]["Enums"]["SpaceMemberRole"] | null
          role_since: string | null
          space_id: number
        }
        Insert: {
          joined_at?: string
          profile_id: number
          role?: Database["public"]["Enums"]["SpaceMemberRole"] | null
          role_since?: string | null
          space_id: number
        }
        Update: {
          joined_at?: string
          profile_id?: number
          role?: Database["public"]["Enums"]["SpaceMemberRole"] | null
          role_since?: string | null
          space_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "space_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_members_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          avatar_url: string | null
          color: number | null
          created_at: string
          description: string | null
          id: number
          name: string
          owner: number
          slug: string
        }
        Insert: {
          avatar_url?: string | null
          color?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          owner: number
          slug: string
        }
        Update: {
          avatar_url?: string | null
          color?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          owner?: number
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "spaces_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      topic_test_attempts: {
        Row: {
          answers: Json[]
          ended_at: string
          id: number
          profile_id: number
          score: number
          started_at: string
          test_id: number
        }
        Insert: {
          answers: Json[]
          ended_at?: string
          id?: number
          profile_id: number
          score: number
          started_at: string
          test_id: number
        }
        Update: {
          answers?: Json[]
          ended_at?: string
          id?: number
          profile_id?: number
          score?: number
          started_at?: string
          test_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "topic_test_attempts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_test_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "topic_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_tests: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          questions: Json[]
          topic_id: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          questions?: Json[]
          topic_id: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          questions?: Json[]
          topic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "topic_tests_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
      projecteventtypetype:
        | "TASK"
        | "EVENT"
        | "REMINDER"
        | "PERSONAL_BIRTHDAY"
        | "PERSONAL_OTHER"
        | "OTHER"
      ProjectMemberRole: "ADMIN" | "EDITOR" | "GUEST"
      SpaceMemberRole: "ADMIN" | "EDITOR" | "MOD" | "MEMBER"
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
