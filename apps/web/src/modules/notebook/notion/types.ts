import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionPageCache = {
    object: PageObjectResponse;
    title: string;
    date: string;
}