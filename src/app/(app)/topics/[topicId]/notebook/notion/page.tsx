import { getUser } from "@/lib/supabase/auth/user";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import getNotionClient from "@/modules/notebook/notion/lib/getNotionClient";
import NotionPagesList from "@/modules/notebook/notion/components/NotionPagesList";

const NOTION_API_URL = "https://api.notion.com/v1/oauth/authorize?client_id=178d872b-594c-8089-9682-00378b143de0";

export default async function Page({ params }: { params: Promise<{ topicId: string }>, }) {
    const { topicId } = await params;
    const user = await getUser();

    const cookieStore = await cookies();
    const notionToken = cookieStore.get("notion_token")?.value;

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

    const notion = await getNotionClient();

    return <div>
        <button onClick={async () => {
            "use server";
            const cookieStore = await cookies();
            cookieStore.delete("notion_token");
            revalidatePath("/", "layout");
        }}>Unlink Notion
        </button>
        <NotionPagesList topicId={parseInt(topicId)}/>
    </div>
}