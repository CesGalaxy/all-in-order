"use server";

import { NotionCompatAPI } from "notion-compat";
import getNotionClient from "@/modules/notebook/notion/lib/getNotionClient";
import NbNotionPage from "@/modules/notebook/notion/components/NbNotionPage";

// TODO: ToC and size

export default async function Page({ params }: { params: Promise<{ topicId: string, pageId: string }> }) {
    const { pageId } = await params;

    const notion = new NotionCompatAPI(await getNotionClient());
    const page = await notion.getPage(pageId);
    return <div className="py-4">
        <NbNotionPage page={page}/>
    </div>
}