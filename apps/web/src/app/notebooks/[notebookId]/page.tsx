"use server";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@repo/ui/components/breadcrumb";
import { NotebookPage } from "@/modules/app/notebook/components/notebook-page";
import { getNotebook } from "@/modules/app/notebook/queries";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ notebookId: string }> }) {
    const { notebookId } = await params;

    const {data, error} = await getNotebook(notebookId);

    if (error) return <p>Error loading notebook</p>;
    if (!data) notFound();

    const breadcrumb = <>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={"/w/" + data.workspace.id}>
                            {data.workspace.name}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        {data.name}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    </>;

    return <NotebookPage breadcrumb={breadcrumb}>
        Hello world!
    </NotebookPage>
}