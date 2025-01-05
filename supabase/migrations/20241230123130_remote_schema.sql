

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."EventType" AS ENUM (
    'EVENT',
    'TASK',
    'REMINDER',
    'OTHER'
);


ALTER TYPE "public"."EventType" OWNER TO "postgres";


CREATE TYPE "public"."project_event_type" AS ENUM (
    'TASK',
    'EVENT',
    'REMINDER',
    'PERSONAL_BIRTHDAY',
    'PERSONAL_OTHER',
    'OTHER'
);


ALTER TYPE "public"."project_event_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_owner_to_course"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
  insert into course_members (profile, course, is_admin)
  values (get_my_id(), new.id, true);
  return new;
END$$;


ALTER FUNCTION "public"."add_owner_to_course"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_agenda"("project_id" bigint, "agenda_name" "text", "agenda_slug" "text", "agenda_resume" "text", "agenda_description" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$DECLARE
  new_agenda_id INT;
BEGIN
  BEGIN
    -- Insertar nueva agenda en la tabla agendas
    INSERT INTO agendas (name, slug, resume, description)
    VALUES (agenda_name, agenda_slug, agenda_resume, agenda_description)
    RETURNING id INTO new_agenda_id;

    -- Insertar en la tabla project_agendas con el project_id y new_agenda_id
    INSERT INTO project_agendas (project_id, agenda_id)
    VALUES (project_id, new_agenda_id);
  EXCEPTION
    -- En caso de error, lanzar una excepción y cancelar la transacción
    WHEN OTHERS THEN RAISE EXCEPTION 'Error al insertar en project_agendas. Transacción cancelada.';
  END;
END;$$;


ALTER FUNCTION "public"."create_agenda"("project_id" bigint, "agenda_name" "text", "agenda_slug" "text", "agenda_resume" "text", "agenda_description" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_project_event"("agenda_ids" bigint[], "event_name" "text", "event_type" "public"."project_event_type", "event_starts_at" timestamp with time zone, "event_ends_at" timestamp with time zone DEFAULT NULL::timestamp with time zone, "event_description" "text" DEFAULT NULL::"text") RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    new_event_id INT;
    agenda_id INT;
BEGIN
DECLARE
  new_event_id INT;
  BEGIN
    -- Insert new event into the project_events table
    INSERT INTO project_events (name, type, description, starts_at, ends_at)
    VALUES (event_name, event_type, event_description, event_starts_at, event_ends_at)
    RETURNING id INTO new_event_id;

    -- Iterate over the array of agenda_ids and insert into agenda_events
    FOREACH agenda_id IN ARRAY agenda_ids
    LOOP
        -- Insert into the agenda_events table with the agenda_id and new_event_id
        INSERT INTO agenda_events (agenda_id, event_id)
        VALUES (agenda_id, new_event_id);
    END LOOP;
  --EXCEPTION
    -- In case of error, raise an exception and cancel the transaction
    --WHEN OTHERS THEN RAISE EXCEPTION 'Error inserting into agenda_events. Transaction cancelled.';
  END;

  -- Return the new event
  RETURN new_event_id;
END;
$$;


ALTER FUNCTION "public"."create_project_event"("agenda_ids" bigint[], "event_name" "text", "event_type" "public"."project_event_type", "event_starts_at" timestamp with time zone, "event_ends_at" timestamp with time zone, "event_description" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_my_id"() RETURNS bigint
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN(SELECT id FROM profiles WHERE user_id = (select auth.uid()));
END$$;


ALTER FUNCTION "public"."get_my_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."has_access_to_course"("profile_id" bigint, "course_id" bigint) RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN  (
    (
      EXISTS (
        SELECT 1
        FROM courses
        WHERE (
          (id = course_id) AND (is_public = TRUE)
        )
      )
    ) OR (
      EXISTS (
        SELECT 1
        FROM course_members cm
        WHERE (
          (
            cm.profile = ( SELECT get_my_id() )
          ) AND (
            cm.course = has_access_to_course.course_id
          )
        )
      )
    )
  );
END;$$;


ALTER FUNCTION "public"."has_access_to_course"("profile_id" bigint, "course_id" bigint) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."has_access_to_subject"("profile_id" bigint, "subject_id" bigint) RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN has_access_to_course(
    profile_id,
    (SELECT course_id FROM subjects WHERE id = subject_id)
  );
END;$$;


ALTER FUNCTION "public"."has_access_to_subject"("profile_id" bigint, "subject_id" bigint) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."has_access_to_topic"("profile_id" bigint, "topic_id" bigint) RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN has_access_to_subject(
    profile_id,
    (SELECT subject_id FROM topics WHERE id = topic_id)
  );
END;$$;


ALTER FUNCTION "public"."has_access_to_topic"("profile_id" bigint, "topic_id" bigint) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_course_admin"("profile_id" bigint, "course_id" bigint) RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN EXISTS(
    SELECT 1
    FROM course_members
    WHERE (
      course_members.profile = is_course_admin.profile_id
      AND
      course_members.course = is_course_admin.course_id
      AND
      course_members.is_admin = TRUE
    )
  );
END;$$;


ALTER FUNCTION "public"."is_course_admin"("profile_id" bigint, "course_id" bigint) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_subject_admin"("profile_id" bigint, "subject_id" bigint) RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN is_course_admin(
    profile_id,
    (SELECT course_id FROM subjects WHERE id = subject_id)
  );
END;$$;


ALTER FUNCTION "public"."is_subject_admin"("profile_id" bigint, "subject_id" bigint) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_topic_admin"("profile_id" bigint, "topic_id" bigint) RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN is_subject_admin(
    profile_id,
    (SELECT subject_id FROM topics WHERE id = topic_id)
  );
END;$$;


ALTER FUNCTION "public"."is_topic_admin"("profile_id" bigint, "topic_id" bigint) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."agendas" (
    "id" bigint NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "resume" "text",
    "description" "text",
    "color" integer,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."agendas" OWNER TO "postgres";


ALTER TABLE "public"."agendas" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."agendas_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."course_members" (
    "profile" bigint NOT NULL,
    "course" bigint NOT NULL,
    "is_admin" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."course_members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."courses" (
    "id" bigint NOT NULL,
    "workspace" bigint,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "is_public" boolean DEFAULT false NOT NULL,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."courses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."nb_vocab_areas" (
    "id" bigint NOT NULL,
    "notebook" bigint NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "notes" "text" NOT NULL,
    "color" integer NOT NULL,
    "icon" "text",
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."nb_vocab_areas" OWNER TO "postgres";


ALTER TABLE "public"."nb_vocab_areas" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."nb_vocab_areas_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."nb_vocab_definitions" (
    "id" bigint NOT NULL,
    "notebook" bigint NOT NULL,
    "term" "text" NOT NULL,
    "definition" "text" NOT NULL,
    "notes" "text",
    "area" bigint NOT NULL,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."nb_vocab_definitions" OWNER TO "postgres";


ALTER TABLE "public"."nb_vocab_definitions" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."nb_vocab_definitions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."notebooks" (
    "id" bigint NOT NULL,
    "user" "uuid" NOT NULL,
    "topic" bigint NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "color" integer,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."notebooks" OWNER TO "postgres";


ALTER TABLE "public"."notebooks" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."notebooks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."practice_activities" (
    "practice_id" bigint NOT NULL,
    "activity_id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."practice_activities" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."practice_attempts" (
    "id" bigint NOT NULL,
    "practice_id" bigint NOT NULL,
    "profile_id" bigint NOT NULL,
    "answers" "jsonb"[] NOT NULL,
    "perfection" smallint DEFAULT '0'::smallint NOT NULL,
    "started_at" timestamp with time zone NOT NULL,
    "ended_at" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."practice_attempts" OWNER TO "postgres";


ALTER TABLE "public"."practice_attempts" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."practice_attempts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."practices" (
    "id" bigint NOT NULL,
    "topic_id" bigint NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "created_by" bigint,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."practices" OWNER TO "postgres";


ALTER TABLE "public"."practices" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."practices_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "username" "text" NOT NULL,
    "avatar_url" "text",
    "color" integer,
    "bio" "text",
    "last_online" timestamp with time zone DEFAULT "now"(),
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


ALTER TABLE "public"."profiles" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."profiles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" bigint NOT NULL,
    "pid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "course_id" bigint,
    "tags" "jsonb" NOT NULL,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."projects" OWNER TO "postgres";


ALTER TABLE "public"."projects" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."projects_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."subject_events" (
    "id" bigint NOT NULL,
    "subject_id" bigint NOT NULL,
    "title" "text" NOT NULL,
    "details" "text",
    "type" "public"."EventType" DEFAULT 'OTHER'::"public"."EventType" NOT NULL,
    "starts_at" timestamp with time zone NOT NULL,
    "ends_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."subject_events" OWNER TO "postgres";


ALTER TABLE "public"."subject_events" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."subject_events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."subject_notes" (
    "id" bigint NOT NULL,
    "subject_id" bigint NOT NULL,
    "author_id" bigint NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "color" bigint,
    "tags" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."subject_notes" OWNER TO "postgres";


ALTER TABLE "public"."subject_notes" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."subject_notes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."subjects" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "color" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "course_id" bigint NOT NULL
);


ALTER TABLE "public"."subjects" OWNER TO "postgres";


ALTER TABLE "public"."subjects" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."subjects_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."topic_activities" (
    "id" bigint NOT NULL,
    "topic_id" bigint,
    "data" "jsonb" NOT NULL,
    "tags" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "updated_by" bigint,
    "created_by" bigint,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."topic_activities" OWNER TO "postgres";


ALTER TABLE "public"."topic_activities" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."topic_activities_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."topics" (
    "id" bigint NOT NULL,
    "subject_id" bigint NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."topics" OWNER TO "postgres";


ALTER TABLE "public"."topics" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."topics_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."courses" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."workspace_courses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."workspace_members" (
    "workspace" bigint NOT NULL,
    "user" bigint NOT NULL,
    "is_admin" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."workspace_members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."workspaces" (
    "id" bigint NOT NULL,
    "pid" "uuid" NOT NULL,
    "description" "text" NOT NULL,
    "color" integer,
    "avatar" "text",
    "owner" bigint NOT NULL,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."workspaces" OWNER TO "postgres";


ALTER TABLE "public"."workspaces" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."workspaces_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."agendas"
    ADD CONSTRAINT "agendas_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."agendas"
    ADD CONSTRAINT "agendas_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."agendas"
    ADD CONSTRAINT "agendas_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."course_members"
    ADD CONSTRAINT "course_members_pkey" PRIMARY KEY ("profile", "course");



ALTER TABLE ONLY "public"."nb_vocab_areas"
    ADD CONSTRAINT "nb_vocab_areas_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."nb_vocab_definitions"
    ADD CONSTRAINT "nb_vocab_definitions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notebooks"
    ADD CONSTRAINT "notebooks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."practice_activities"
    ADD CONSTRAINT "practice_activities_pkey" PRIMARY KEY ("practice_id", "activity_id");



ALTER TABLE ONLY "public"."practice_attempts"
    ADD CONSTRAINT "practice_attempts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."practices"
    ADD CONSTRAINT "practices_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_pid_key" UNIQUE ("pid");



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subject_events"
    ADD CONSTRAINT "subject_events_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."subject_events"
    ADD CONSTRAINT "subject_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subject_notes"
    ADD CONSTRAINT "subject_notes_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."subject_notes"
    ADD CONSTRAINT "subject_notes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subjects"
    ADD CONSTRAINT "subjects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."topic_activities"
    ADD CONSTRAINT "topic_activities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."topics"
    ADD CONSTRAINT "topics_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."topics"
    ADD CONSTRAINT "topics_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "workspace_courses_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "workspace_courses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspace_members"
    ADD CONSTRAINT "workspace_members_pkey" PRIMARY KEY ("workspace", "user");



ALTER TABLE ONLY "public"."workspaces"
    ADD CONSTRAINT "workspaces_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."workspaces"
    ADD CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workspaces"
    ADD CONSTRAINT "workspaces_slug_key" UNIQUE ("pid");



CREATE INDEX "notebooks_user_topic_idx" ON "public"."notebooks" USING "btree" ("user", "topic");



CREATE OR REPLACE TRIGGER "add_course_owner" AFTER INSERT ON "public"."courses" FOR EACH ROW EXECUTE FUNCTION "public"."add_owner_to_course"();



ALTER TABLE ONLY "public"."course_members"
    ADD CONSTRAINT "course_members_course_fkey" FOREIGN KEY ("course") REFERENCES "public"."courses"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."course_members"
    ADD CONSTRAINT "course_members_profile_fkey" FOREIGN KEY ("profile") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."nb_vocab_areas"
    ADD CONSTRAINT "nb_vocab_areas_notebook_fkey" FOREIGN KEY ("notebook") REFERENCES "public"."notebooks"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."nb_vocab_definitions"
    ADD CONSTRAINT "nb_vocab_definitions_area_fkey" FOREIGN KEY ("area") REFERENCES "public"."nb_vocab_areas"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."nb_vocab_definitions"
    ADD CONSTRAINT "nb_vocab_definitions_notebook_fkey" FOREIGN KEY ("notebook") REFERENCES "public"."notebooks"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."notebooks"
    ADD CONSTRAINT "notebooks_topic_fkey" FOREIGN KEY ("topic") REFERENCES "public"."topics"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."notebooks"
    ADD CONSTRAINT "notebooks_user_fkey" FOREIGN KEY ("user") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."practice_activities"
    ADD CONSTRAINT "practice_activities_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."topic_activities"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."practice_activities"
    ADD CONSTRAINT "practice_activities_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "public"."practices"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."practice_attempts"
    ADD CONSTRAINT "practice_attempts_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "public"."practices"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."practice_attempts"
    ADD CONSTRAINT "practice_attempts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."practices"
    ADD CONSTRAINT "practices_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."practices"
    ADD CONSTRAINT "practices_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subject_events"
    ADD CONSTRAINT "subject_events_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subject_notes"
    ADD CONSTRAINT "subject_notes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subject_notes"
    ADD CONSTRAINT "subject_notes_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subjects"
    ADD CONSTRAINT "subjects_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."topic_activities"
    ADD CONSTRAINT "topic_activities_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."topic_activities"
    ADD CONSTRAINT "topic_activities_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."topic_activities"
    ADD CONSTRAINT "topic_activities_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."topics"
    ADD CONSTRAINT "topics_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "workspace_courses_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."workspaces"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_members"
    ADD CONSTRAINT "workspace_members_user_fkey" FOREIGN KEY ("user") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspace_members"
    ADD CONSTRAINT "workspace_members_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workspaces"
    ADD CONSTRAINT "workspaces_owner_fkey" FOREIGN KEY ("owner") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Allow all to course admins" ON "public"."courses" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."course_members" "cm"
  WHERE (("cm"."course" = "courses"."id") AND ("cm"."profile" = ( SELECT "public"."get_my_id"() AS "get_my_id")) AND "cm"."is_admin"))));



CREATE POLICY "Allow all to course admins" ON "public"."subject_notes" TO "authenticated" USING ("public"."is_subject_admin"(( SELECT "public"."get_my_id"() AS "get_my_id"), "subject_id"));



CREATE POLICY "Allow all to course admins" ON "public"."subjects" TO "authenticated" USING ("public"."is_course_admin"(( SELECT "public"."get_my_id"() AS "get_my_id"), "course_id"));



CREATE POLICY "Allow all to subject admins" ON "public"."topics" TO "authenticated" USING ("public"."is_subject_admin"(( SELECT "public"."get_my_id"() AS "get_my_id"), "subject_id"));



CREATE POLICY "Allow all to topic admins" ON "public"."practice_activities" TO "authenticated" USING ("public"."is_topic_admin"(( SELECT "public"."get_my_id"() AS "get_my_id"), ( SELECT "practices"."topic_id"
   FROM "public"."practices"
  WHERE ("practices"."id" = "practice_activities"."practice_id"))));



CREATE POLICY "Allow all to topic admins" ON "public"."practices" TO "authenticated" USING ("public"."has_access_to_topic"(( SELECT "public"."get_my_id"() AS "get_my_id"), "topic_id"));



CREATE POLICY "Allow all to topic admins" ON "public"."topic_activities" TO "authenticated" USING ("public"."is_topic_admin"(( SELECT "public"."get_my_id"() AS "get_my_id"), "topic_id"));



CREATE POLICY "Allow all to user notebooks (TODO)" ON "public"."notebooks" TO "authenticated" USING (("user" = "auth"."uid"()));



CREATE POLICY "Allow anon read to public courses" ON "public"."courses" FOR SELECT TO "anon" USING ("is_public");



CREATE POLICY "Allow insert to users" ON "public"."courses" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Allow profile creation" ON "public"."profiles" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Allow read if user has access to the subject" ON "public"."topics" FOR SELECT USING ("public"."has_access_to_subject"(( SELECT "public"."get_my_id"() AS "get_my_id"), "subject_id"));



CREATE POLICY "Allow read if user has access to the topic" ON "public"."practices" FOR SELECT USING ("public"."has_access_to_topic"(( SELECT "public"."get_my_id"() AS "get_my_id"), "topic_id"));



CREATE POLICY "Allow read if user has access to the topic TODO" ON "public"."practice_activities" FOR SELECT USING ("public"."has_access_to_topic"(( SELECT "public"."get_my_id"() AS "get_my_id"), ( SELECT "practices"."topic_id"
   FROM "public"."practices"
  WHERE ("practices"."id" = "practice_activities"."practice_id"))));



CREATE POLICY "Allow read if user has access to thes subject" ON "public"."subject_notes" FOR SELECT USING ("public"."has_access_to_subject"(( SELECT "public"."get_my_id"() AS "get_my_id"), "subject_id"));



CREATE POLICY "Allow read is user has access to the course" ON "public"."subjects" FOR SELECT USING ("public"."has_access_to_course"(( SELECT "public"."get_my_id"() AS "get_my_id"), "course_id"));



CREATE POLICY "Allow read to course members" ON "public"."courses" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."course_members" "cm"
  WHERE (("cm"."course" = "courses"."id") AND ("cm"."profile" = ( SELECT "public"."get_my_id"() AS "get_my_id"))))));



CREATE POLICY "Allow read to topic members" ON "public"."topic_activities" FOR SELECT USING ("public"."has_access_to_topic"(( SELECT "public"."get_my_id"() AS "get_my_id"), "topic_id"));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."agendas" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "TODO All" ON "public"."course_members" USING (true);



CREATE POLICY "TODO All" ON "public"."nb_vocab_areas" TO "authenticated" USING (true);



CREATE POLICY "TODO All" ON "public"."nb_vocab_definitions" TO "authenticated" USING (true);



CREATE POLICY "TODO All" ON "public"."practice_attempts" TO "authenticated" USING (true);



ALTER TABLE "public"."agendas" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_members" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."nb_vocab_areas" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."nb_vocab_definitions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."notebooks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."practice_activities" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."practice_attempts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."practices" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subject_events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subject_notes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subjects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."topic_activities" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."topics" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspace_members" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workspaces" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
































































































































































































GRANT ALL ON FUNCTION "public"."add_owner_to_course"() TO "anon";
GRANT ALL ON FUNCTION "public"."add_owner_to_course"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_owner_to_course"() TO "service_role";



GRANT ALL ON FUNCTION "public"."create_agenda"("project_id" bigint, "agenda_name" "text", "agenda_slug" "text", "agenda_resume" "text", "agenda_description" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."create_agenda"("project_id" bigint, "agenda_name" "text", "agenda_slug" "text", "agenda_resume" "text", "agenda_description" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_agenda"("project_id" bigint, "agenda_name" "text", "agenda_slug" "text", "agenda_resume" "text", "agenda_description" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."create_project_event"("agenda_ids" bigint[], "event_name" "text", "event_type" "public"."project_event_type", "event_starts_at" timestamp with time zone, "event_ends_at" timestamp with time zone, "event_description" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."create_project_event"("agenda_ids" bigint[], "event_name" "text", "event_type" "public"."project_event_type", "event_starts_at" timestamp with time zone, "event_ends_at" timestamp with time zone, "event_description" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_project_event"("agenda_ids" bigint[], "event_name" "text", "event_type" "public"."project_event_type", "event_starts_at" timestamp with time zone, "event_ends_at" timestamp with time zone, "event_description" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_my_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_my_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_my_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."has_access_to_course"("profile_id" bigint, "course_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."has_access_to_course"("profile_id" bigint, "course_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."has_access_to_course"("profile_id" bigint, "course_id" bigint) TO "service_role";



GRANT ALL ON FUNCTION "public"."has_access_to_subject"("profile_id" bigint, "subject_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."has_access_to_subject"("profile_id" bigint, "subject_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."has_access_to_subject"("profile_id" bigint, "subject_id" bigint) TO "service_role";



GRANT ALL ON FUNCTION "public"."has_access_to_topic"("profile_id" bigint, "topic_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."has_access_to_topic"("profile_id" bigint, "topic_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."has_access_to_topic"("profile_id" bigint, "topic_id" bigint) TO "service_role";



GRANT ALL ON FUNCTION "public"."is_course_admin"("profile_id" bigint, "course_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."is_course_admin"("profile_id" bigint, "course_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_course_admin"("profile_id" bigint, "course_id" bigint) TO "service_role";



GRANT ALL ON FUNCTION "public"."is_subject_admin"("profile_id" bigint, "subject_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."is_subject_admin"("profile_id" bigint, "subject_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_subject_admin"("profile_id" bigint, "subject_id" bigint) TO "service_role";



GRANT ALL ON FUNCTION "public"."is_topic_admin"("profile_id" bigint, "topic_id" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."is_topic_admin"("profile_id" bigint, "topic_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_topic_admin"("profile_id" bigint, "topic_id" bigint) TO "service_role";





















GRANT ALL ON TABLE "public"."agendas" TO "anon";
GRANT ALL ON TABLE "public"."agendas" TO "authenticated";
GRANT ALL ON TABLE "public"."agendas" TO "service_role";



GRANT ALL ON SEQUENCE "public"."agendas_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."agendas_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."agendas_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."course_members" TO "anon";
GRANT ALL ON TABLE "public"."course_members" TO "authenticated";
GRANT ALL ON TABLE "public"."course_members" TO "service_role";



GRANT ALL ON TABLE "public"."courses" TO "anon";
GRANT ALL ON TABLE "public"."courses" TO "authenticated";
GRANT ALL ON TABLE "public"."courses" TO "service_role";



GRANT ALL ON TABLE "public"."nb_vocab_areas" TO "anon";
GRANT ALL ON TABLE "public"."nb_vocab_areas" TO "authenticated";
GRANT ALL ON TABLE "public"."nb_vocab_areas" TO "service_role";



GRANT ALL ON SEQUENCE "public"."nb_vocab_areas_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."nb_vocab_areas_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."nb_vocab_areas_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."nb_vocab_definitions" TO "anon";
GRANT ALL ON TABLE "public"."nb_vocab_definitions" TO "authenticated";
GRANT ALL ON TABLE "public"."nb_vocab_definitions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."nb_vocab_definitions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."nb_vocab_definitions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."nb_vocab_definitions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."notebooks" TO "anon";
GRANT ALL ON TABLE "public"."notebooks" TO "authenticated";
GRANT ALL ON TABLE "public"."notebooks" TO "service_role";



GRANT ALL ON SEQUENCE "public"."notebooks_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."notebooks_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."notebooks_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."practice_activities" TO "anon";
GRANT ALL ON TABLE "public"."practice_activities" TO "authenticated";
GRANT ALL ON TABLE "public"."practice_activities" TO "service_role";



GRANT ALL ON TABLE "public"."practice_attempts" TO "anon";
GRANT ALL ON TABLE "public"."practice_attempts" TO "authenticated";
GRANT ALL ON TABLE "public"."practice_attempts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."practice_attempts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."practice_attempts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."practice_attempts_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."practices" TO "anon";
GRANT ALL ON TABLE "public"."practices" TO "authenticated";
GRANT ALL ON TABLE "public"."practices" TO "service_role";



GRANT ALL ON SEQUENCE "public"."practices_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."practices_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."practices_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON SEQUENCE "public"."profiles_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."profiles_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."profiles_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."projects" TO "anon";
GRANT ALL ON TABLE "public"."projects" TO "authenticated";
GRANT ALL ON TABLE "public"."projects" TO "service_role";



GRANT ALL ON SEQUENCE "public"."projects_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."projects_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."projects_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."subject_events" TO "anon";
GRANT ALL ON TABLE "public"."subject_events" TO "authenticated";
GRANT ALL ON TABLE "public"."subject_events" TO "service_role";



GRANT ALL ON SEQUENCE "public"."subject_events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."subject_events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."subject_events_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."subject_notes" TO "anon";
GRANT ALL ON TABLE "public"."subject_notes" TO "authenticated";
GRANT ALL ON TABLE "public"."subject_notes" TO "service_role";



GRANT ALL ON SEQUENCE "public"."subject_notes_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."subject_notes_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."subject_notes_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."subjects" TO "anon";
GRANT ALL ON TABLE "public"."subjects" TO "authenticated";
GRANT ALL ON TABLE "public"."subjects" TO "service_role";



GRANT ALL ON SEQUENCE "public"."subjects_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."subjects_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."subjects_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."topic_activities" TO "anon";
GRANT ALL ON TABLE "public"."topic_activities" TO "authenticated";
GRANT ALL ON TABLE "public"."topic_activities" TO "service_role";



GRANT ALL ON SEQUENCE "public"."topic_activities_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."topic_activities_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."topic_activities_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."topics" TO "anon";
GRANT ALL ON TABLE "public"."topics" TO "authenticated";
GRANT ALL ON TABLE "public"."topics" TO "service_role";



GRANT ALL ON SEQUENCE "public"."topics_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."topics_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."topics_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."workspace_courses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."workspace_courses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."workspace_courses_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."workspace_members" TO "anon";
GRANT ALL ON TABLE "public"."workspace_members" TO "authenticated";
GRANT ALL ON TABLE "public"."workspace_members" TO "service_role";



GRANT ALL ON TABLE "public"."workspaces" TO "anon";
GRANT ALL ON TABLE "public"."workspaces" TO "authenticated";
GRANT ALL ON TABLE "public"."workspaces" TO "service_role";



GRANT ALL ON SEQUENCE "public"."workspaces_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."workspaces_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."workspaces_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
