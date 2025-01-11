import { getUser } from "@/supabase/auth/user";
import getSupabase from "@/supabase/server";
import { redirect } from "next/navigation";
import ErrorView from "@/components/views/ErrorView";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function Page({ params }: { params: Promise<{ topicId: string }>, }) {
    const { topicId } = await params;
    const user = await getUser();

    const hasNotionIdentity = user.identities?.some(identity => identity.provider === "notion");

    if (!hasNotionIdentity) {
        const notebookPath = `/topics/${topicId}/notebook`;

        // Get the domain or (error) redirect to the notebook page
        const headersList = await headers();
        const host = headersList.get("host") || redirect(notebookPath);

        const redirectTo = (host.includes("localhost:") ? "http://" : "https://") + host + notebookPath + "/notion/callback";

        // Link the Notion identity
        const supabaseClient = await getSupabase();
        const { data, error } = await supabaseClient.auth.linkIdentity({
            provider: "notion",
            options: {
                queryParams: {
                    // state: `notebook-${topicId}`,
                },
                redirectTo,
            },
        })

        if (error) return <ErrorView message={error.message}/>
        redirect(data.url);
    }

    return <div>
        <button onClick={async () => {
            "use server";
            const supabaseClient = await getSupabase();
            const { data } = await supabaseClient.auth.getUserIdentities();
            const notionIdentity = data!.identities.find(identity => identity.provider === "notion");
            if (notionIdentity) await supabaseClient.auth.unlinkIdentity(notionIdentity);
            revalidatePath("/", "layout");
        }}>Unlink Notion
        </button>
        <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
}