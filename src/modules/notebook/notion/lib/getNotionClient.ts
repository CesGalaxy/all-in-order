"use server";

import { Client } from "@notionhq/client";
import { cache } from "react";
import { unauthorized } from "next/navigation";
import "server-only";
import { getUser } from "@/lib/supabase/auth/user";

const getNotionClient = cache(async () => {
    const user = await getUser();
    const notionToken = user.user_metadata?.notion_token;

    if (!notionToken) unauthorized();

    return new Client({ auth: notionToken });
});

export default getNotionClient;