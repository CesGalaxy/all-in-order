"use server";
import 'react-notion-x/src/styles.css';
import { getNotebook, getNotebookPage, getNotebookPageERM } from "@/modules/notebook/app/queries";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getMyUser } from "@/modules/user/auth/server";
import { notionClientFromUser } from "@/modules/integrations/notion/api";
import { Alert, AlertTitle } from "@repo/ui/components/alert";
import { updatePageCache } from "@/modules/notebook/app/server";
import { ClientNotionRenderer } from "@/app/notebooks/[notebookId]/p/[pageId]/ClientNotionRenderer";
import Image from "next/image";
import NotebookPageLayout from "@/modules/notebook/notion/components/notebook-page-layout";
import { generatePageCache, isNotionPageCache } from "@/modules/integrations/notion/utils";
import { after } from "next/server";
import { NotionPageCache } from "@/modules/notebook/notion/types";

export default async function Page({ params }: { params: Promise<{ notebookId: string, pageId: string }> }) {
    const { notebookId, pageId } = await params;

    // Get the user
    const {data: { user }, error: userError} = await getMyUser();
    if (userError || !user) redirect("/#unauthorized");

    // Get the Notion API client
    const notionClient = notionClientFromUser(user);
    if (!notionClient) return <Alert variant="destructive" className="max-w-sm mx-auto mt-16">
        <AlertTitle>
            You need to connect your Notion account to access this page.
        </AlertTitle>
    </Alert>;

    // Fetch: page data (DB), notebook data (DB), page data (Notion)
    const [{data: pData, error: pError}, {data: nbData, error: nbError}, pageDetails] = await Promise.all([
        getNotebookPage(pageId),
        getNotebook(notebookId),
        notionClient.pages.retrieve({ page_id: pageId }).then(o => "properties" in o ? o : null).catch(() => null)
    ]);

    if (nbError) return <p>Error loading notebook</p>;
    if (pError) return <p>Error loading page</p>;
    if (!nbData) notFound();
    if (!pData) notFound();
    if (!pageDetails) notFound();

    // Validate & read the page cache
    // TypeScript should have automatically inferred cache will only be NotionPageCache
    let cache: NotionPageCache = pData.cache as unknown as NotionPageCache;
    if (!isNotionPageCache(cache) || pageDetails.last_edited_time !== cache.date) {
        // Refresh the cache if the page was edited since the last cache update, or if it is missing/invalid
        console.log("Refreshing Notion page cache for", pageId);
        cache = generatePageCache(pageDetails);
        after(updatePageCache(pageId, pageDetails)); // Will be awaited after the response is sent
    }

    // The title is either the alias (if set) or cached from the last fetch
    const title = pData.alias || cache.title;

    // Fetch the page content from Notion
    const {data: content, error: contentError} = await getNotebookPageERM(pageId);
    if (contentError) return <p>Error loading page content: {contentError.message}</p>;

    return <NotebookPageLayout notebookData={nbData} pageData={pData} pageTitle={title}>
        <ClientNotionRenderer
            recordMap={content}
            className="--prose"
            components={{
                nextImage: Image,
                nextLink: Link
            }}
        />
    </NotebookPageLayout>
}