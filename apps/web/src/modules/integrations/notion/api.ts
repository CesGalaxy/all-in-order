import { Client } from "@notionhq/client";
import { User } from "@supabase/supabase-js";
import { NotionCompatAPI } from "notion-compat";

export function getNotionTokenFromUser(user: User) {
    const notionToken = user.app_metadata?.notion_access_token;
    if (!notionToken || typeof notionToken !== "string") return null;
    else return notionToken;
}

export function getNotionClient(token: string) {
    return new Client({ auth: token });
}

export function notionClientFromUser(user: User) {
    const notionToken = getNotionTokenFromUser(user);
    if (!notionToken) return null;
    return getNotionClient(notionToken);
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

// UNOFFICIAL API

export function getNotionXClientFromUser(user: User) {
    const officialNotionClient = notionClientFromUser(user);
    if (!officialNotionClient) return null;

    return new NotionCompatAPI(officialNotionClient);
}