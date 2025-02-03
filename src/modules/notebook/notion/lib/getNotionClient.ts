"use server";

import { Client } from "@notionhq/client";
import { cache } from "react";
import { unauthorized } from "next/navigation";
import { cookies } from "next/headers";
import "server-only";

const getNotionClient = cache(async () => {
    const cookieStore = await cookies();
    const notionToken = cookieStore.get("notion_token")?.value;

    if (!notionToken) unauthorized();

    // const { results: pages } = await notion.search({
    //     // filter: {
    //     //     property: "object",
    //     //     value: "database",
    //     // },
    // })
    return new Client({ auth: notionToken });
});

export default getNotionClient;