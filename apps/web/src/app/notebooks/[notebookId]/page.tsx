import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@repo/ui/components/breadcrumb";
import { NotebookPage } from "@/modules/app/notebook/components/notebook-page";

export default function Page() {
    const breadcrumb = <>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                        {"Notebook"}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    </>;

    return <NotebookPage breadcrumb={breadcrumb}>
        Hello world!
    </NotebookPage>
}