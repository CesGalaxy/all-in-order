import { CreateWorkspaceForm } from "@/modules/app/workspace/components/create-workspace-form";
import { getMyProfile } from "@/modules/user/auth/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const {data, error} = await getMyProfile();

    if (error) redirect("/login");

    return <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
            <CreateWorkspaceForm name={data.name} />
        </div>
    </div>
}