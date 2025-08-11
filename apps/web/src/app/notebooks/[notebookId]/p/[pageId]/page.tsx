"use server";
import 'react-notion-x/src/styles.css';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@repo/ui/components/breadcrumb";
import { NotebookPage } from "@/modules/notebook/app/components/notebook-page";
import { getNotebook, getNotebookPage, getNotebookPageContent } from "@/modules/notebook/app/queries";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getMyUser } from "@/modules/user/auth/server";
import { notionClientFromUser } from "@/modules/integrations/notion/api";
import { Alert, AlertTitle } from "@repo/ui/components/alert";
import { getPageName } from "@/modules/notebook/app/server";
import { ClientNotionRenderer } from "@/app/notebooks/[notebookId]/p/[pageId]/ClientNotionRenderer";
import Image from "next/image";

export default async function Page({ params }: { params: Promise<{ notebookId: string, pageId: string }> }) {
    const { notebookId, pageId } = await params;

    const {data: { user }, error: userError} = await getMyUser();

    if (userError || !user) redirect("/#unauthorized");

    const [{data: pData, error: pError}, {data: nbData, error: nbError}] = await Promise.all([getNotebookPage(pageId), getNotebook(notebookId)]);

    if (nbError) return <p>Error loading notebook</p>;
    if (pError) return <p>Error loading page</p>;
    if (!nbData) notFound();
    if (!pData) notFound();

    const notionClient = notionClientFromUser(user);
    if (!notionClient) return <Alert>
        <AlertTitle>
            You need to connect your Notion account to access this page.
        </AlertTitle>
    </Alert>;

    const title = await getPageName(notionClient, pData as never);
    if (!title) return <p>Error loading page title</p>; // a133ad7a-0a99-48c4-93d2-64d87eb9ae15

    const {data: content, error: contentError} = await getNotebookPageContent(pageId);
    // console.log("================================")
    // console.log(contentError);
    // console.log(contentError?.stack)
    if (contentError) return <p>Error loading page content: {contentError.message}</p>;

    const breadcrumb = <>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={"/w/" + nbData.workspace.id}>
                            {nbData.workspace.name}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={"/notebooks/" + nbData.id}>
                            {nbData.name}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        {title}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    </>;

    return <NotebookPage breadcrumb={breadcrumb}>
        <ClientNotionRenderer
            recordMap={content}
            className="--prose"
            components={{
                nextImage: Image, // or nextLegacyImage: LegacyImage,
                nextLink: Link
            }}
        />
    </NotebookPage>
}