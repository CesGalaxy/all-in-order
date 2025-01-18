"use server";

import { getUser } from "@/lib/supabase/auth/user";
import { getNotebookRootPath } from "@/modules/notebook/pages/lib/helpers/names";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import ContentGallery from "@/components/navigation/ContentGallery";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default async function TopicRecentNbPagesSection({ topicId }: { topicId: number }) {
    const user = await getUser();

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .storage
        .from("notebooks")
        .list(getNotebookRootPath(topicId, user.id));

    if (error) return <ErrorView message={error.message}/>;

    // Short by last_accessed_at
    const shorted = data.sort((a, b) => {
        if (a.last_accessed_at < b.last_accessed_at) return 1;
        if (a.last_accessed_at > b.last_accessed_at) return -1;
        return 0;
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    return <ContentGallery
        className="flex gap-4 w-full overflow-x-auto"
        items={shorted}
        getItemKey={page => page.id}
        renderItem={page => <Button
            as={Link}
            href={`/topics/${topicId}/notebook/${page.name.replace(".json", "")}`}
            size="lg"
            showAnchorIcon
            className=""
        >
            {atob(page.name.replace(".json", ""))}
        </Button>}
    />;
}