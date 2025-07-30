"use server";

import { WorkspacePage } from "@/modules/app/workspace/components/workspace-page";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@repo/ui/components/breadcrumb";
import { getWorkspace } from "@/modules/app/workspace/queries";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ workspaceID: string }> }) {
    const { workspaceID } = await params;

    const { data, error } =await getWorkspace(workspaceID);

    if (error) return <p>Error loading workspace</p>;
    if (!data) notFound();

    const breadcrumb = <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                    {data.name}
                </BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>;

    return <WorkspacePage breadcrumb={breadcrumb}>
        Hello world!
    </WorkspacePage>
}