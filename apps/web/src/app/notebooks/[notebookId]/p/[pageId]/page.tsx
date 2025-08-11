"use server";
import 'react-notion-x/src/styles.css';
import { getNotebook, getNotebookPage, getNotebookPageContent } from "@/modules/notebook/app/queries";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getMyUser } from "@/modules/user/auth/server";
import { notionClientFromUser } from "@/modules/integrations/notion/api";
import { Alert, AlertTitle } from "@repo/ui/components/alert";
import { getPageName } from "@/modules/notebook/app/server";
import { ClientNotionRenderer } from "@/app/notebooks/[notebookId]/p/[pageId]/ClientNotionRenderer";
import Image from "next/image";
import NotebookPageLayout from "@/modules/notebook/notion/components/notebook-page-layout";

export default async function Page({ params }: { params: Promise<{ notebookId: string, pageId: string }> }) {
    // return <Loading/>
    const { notebookId, pageId } = await params;

    const {data: { user }, error: userError} = await getMyUser();

    if (userError || !user) redirect("/#unauthorized");

    const [{data: pData, error: pError}, {data: nbData, error: nbError}] = await Promise.all([getNotebookPage(pageId), getNotebook(notebookId)]);

    if (nbError) return <p>Error loading notebook</p>;
    if (pError) return <p>Error loading page</p>;
    if (!nbData) notFound();
    if (!pData) notFound();

    const notionClient = notionClientFromUser(user);
    if (!notionClient) return <Alert variant="destructive" className="max-w-sm mx-auto mt-16">
        <AlertTitle>
            You need to connect your Notion account to access this page.
        </AlertTitle>
    </Alert>;

    const title = await getPageName(notionClient, pData as never);
    if (!title) return <p>Error loading page title</p>;

    const {data: content, error: contentError} = await getNotebookPageContent(pageId);
    // console.log("================================")
    // console.log(contentError);
    // console.log(contentError?.stack)
    if (contentError) return <p>Error loading page content: {contentError.message}</p>;

    return <NotebookPageLayout notebookData={nbData} pageData={pData} pageTitle={title}>
        <ClientNotionRenderer
            recordMap={content}
            className="--prose"
            components={{
                nextImage: Image, // or nextLegacyImage: LegacyImage,
                nextLink: Link
            }}
        />
    </NotebookPageLayout>
}