"use server";

import "server-only";
import { S3Client } from '@aws-sdk/client-s3'
import getSupabase from "@/lib/supabase/server";

export async function createS3Client() {
    const sb = await getSupabase();

    const { data: { session }, error } = await sb.auth.getSession();

    if (!session) return { s3: null, error };

    const client = new S3Client({
        forcePathStyle: true,
        region: process.env.SUPABASE_STORAGE_REGION,
        endpoint: process.env.SUPABASE_STORAGE_ENDPOINT,
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF!,
            secretAccessKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            sessionToken: session.access_token,
        },
    });

    return { s3: client, error: null };
}