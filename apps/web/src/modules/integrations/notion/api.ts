import { Client } from "@notionhq/client";

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