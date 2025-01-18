"use client";

import authProvider from "@/app/admin/_app/providers/auth/index";
import { createSupabaseClient } from "@/lib/supabase/client";

const authProviderClient = authProvider(createSupabaseClient);
export default authProviderClient;