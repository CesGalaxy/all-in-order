"use server";

import { Navigation } from "@/modules/web/globals/navigation";
import { getMyWorkspaces } from "@/modules/app/workspace/queries";
import ErrorCard from "@repo/ui/components/molecules/error-card";
import WorkspaceCard from "@/modules/app/workspace/components/workspace-card";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;

    const {data, error} = await getMyWorkspaces();

    console.log(data, error);

    // if (data && data.length === 0) redirect("/welcome");

    return <>
        <Navigation/>
        {error
            ? <ErrorCard title="Error loading workspaces" message={error.message} className="max-w-lg mx-auto my-16"/>
            : <ul className="mx-auto max-w-3xl grid sm:grid-cols-1 md:grid-cols-2 gap-6 px-2 py-4 md:px-4 md:py-16">
                {data?.map(workspace => (
                    <li key={workspace.id}>
                        <WorkspaceCard {...workspace}/>
                    </li>
                ))}
            </ul>}
    </>;
}