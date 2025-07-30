import { PageObjectResponse } from "@notionhq/client";

export const getPageTitle = ({ properties }: Pick<PageObjectResponse, "properties">) => Object.values(properties).find(p => p.type === "title")!.title.map(t => t.plain_text).join("")