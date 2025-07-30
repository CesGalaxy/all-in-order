import { Client } from "@notionhq/client";
import { User } from "@supabase/supabase-js";

export function notionClientFromUser(user: User) {
    const notionToken = user.app_metadata.notion_access_token;
    if (!notionToken || typeof notionToken !== "string") return null;
    return new Client({ auth: notionToken });
}

export function getNotionClient(token: string) {
    return new Client({ auth: token, fetch: fetch });
}

export function getNotionPages(client: Client) {
    return client.search({
        sort: {
            direction: "descending",
            timestamp: "last_edited_time",
        },
        filter: {
            property: "object",
            value: "page",
        },
        page_size: 100,
    });
}