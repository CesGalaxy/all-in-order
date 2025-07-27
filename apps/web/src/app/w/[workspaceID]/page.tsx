import { WorkspacePage } from "@/modules/app/workspace/components/workspace-page";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@repo/ui/components/breadcrumb";

export default function Page() {
    const breadcrumb = <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                    {"Workspace"}
                </BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>;

    return <WorkspacePage breadcrumb={breadcrumb}>
        Hello world!
    </WorkspacePage>
}