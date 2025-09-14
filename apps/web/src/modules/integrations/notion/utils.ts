import { PageObjectResponse } from "@notionhq/client";
import { NotionPageCache } from "@/modules/notebook/notion/types";

export const getPageTitle = ({ properties }: Pick<PageObjectResponse, "properties">) => Object.values(properties).find(p => p.type === "title")!.title.map(t => t.plain_text).join("")

export function generatePageCache(page: PageObjectResponse): NotionPageCache {
    return {
        object: page,
        title: getPageTitle(page),
        date: page.last_edited_time
    } satisfies NotionPageCache;
}

export function isNotionPageCache(obj: unknown): obj is NotionPageCache {
    return typeof obj === "object" && obj !== null
        && "object" in obj && typeof (obj).object === "object" && (obj).object !== null
        && "title" in obj && typeof (obj).title === "string"
        && "date" in obj && typeof (obj).date === "string";
}