import { getUser } from "@/lib/supabase/auth/user";
import { notFound, redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import NotionPagesList from "@/modules/notebook/notion/components/NotionPagesList";
import PageContainer from "@/components/containers/PageContainer";
import { Button } from "@heroui/button";
import { IconArrowBack, IconUnlink } from "@tabler/icons-react";
import Image from "next/image";
import tasksImage from "@/assets/pictures/tasks.svg";
import { Tooltip } from "@heroui/tooltip";
import { Link } from "@heroui/link";
import { Suspense } from "react";
import LoadingSpinnerPage from "@/components/pages/LoadingSpinnerPage";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";

const NOTION_API_URL = "https://api.notion.com/v1/oauth/authorize?client_id=178d872b-594c-8089-9682-00378b143de0";

export default async function Page({ params }: { params: Promise<{ topicId: string }>, }) {
    const { topicId } = await params;
    const user = await getUser();

    const notionToken = user.user_metadata?.notion_token;

    if (!notionToken) {
        const notebookPath = `/topics/${topicId}/notebook`;

        // Get the domain or (error) redirect to the notebook page
        const headersList = await headers();
        const host = headersList.get("host") || redirect(notebookPath);
        const hostAndProtocol = (host.includes("localhost:") ? "http://" : "https://") + host;

        const state = encodeURIComponent(hostAndProtocol + notebookPath + "/notion");
        const redirectTo = encodeURIComponent(hostAndProtocol + "/api/notion/callback");

        // Link the Notion identity
        redirect(`${NOTION_API_URL}&response_type=code&owner=user&redirect_uri=${redirectTo}&state=${state}`);
    }

    const sb = await getSupabase();
    const { data, error } = await sb
        .from("notebooks")
        .select("id")
        .eq("topic", parseInt(topicId))
        .eq("user", user.id)
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;
    if (!data) return notFound();

    return <PageContainer className="flex flex-col lg:flex-row gap-4">
        <aside className="bg-content2 rounded-xl p-4 h-fit lg:sticky top-20 left-0 w-full lg:w-96 shrink-0 space-y-8">
            <header>
                <h1 className="text-4xl font-medium text-pretty">Live sync your Notion pages</h1>
            </header>
            <div className="flex justify-center">
                <Image src={tasksImage} alt="" width={300}/>
            </div>
            <footer className="flex items-center gap-2 flex-wrap">
                <Button
                    color="danger"
                    startContent={<IconUnlink/>}
                    onPress={async () => {
                        "use server";
                        const cookieStore = await cookies();
                        cookieStore.delete("notion_token");
                        revalidatePath("/", "layout");
                    }}
                >Unlink Notion</Button>
                <Tooltip content={"Go back to the notebook"}>
                    <Button as={Link} href={`/topics/${topicId}/notebook`} isIconOnly><IconArrowBack/></Button>
                </Tooltip>
            </footer>
        </aside>
        <div className="flex-grow">
            <Suspense fallback={<LoadingSpinnerPage/>}>
                <NotionPagesList notebookId={data.id}/>
            </Suspense>
        </div>
    </PageContainer>
}