"use server";

import ErrorView from "@/components/views/ErrorView";
import { getUser } from "@/supabase/auth/user";
import getSupabase from "@/supabase/server";
import { getNotebookRootPath } from "@/app/topics/[topicId]/notebook/_feature/helpers/names";
import NbPageNavbar from "@/app/topics/[topicId]/notebook/_feature/components/navigation/NbPageNavbar";

export default async function Page({ params }: { params: Promise<{ topicId: string, nbPage: string }> }) {
    const { topicId, nbPage } = await params;

    const fileName = decodeURIComponent(nbPage);

    const user = await getUser();

    const supabaseClient = await getSupabase();
    const { data: info, error: infoError } = await supabaseClient
        .storage
        .from("authenticated/notebooks")
        .info(getNotebookRootPath(topicId, user.id, fileName) + ".json");

    if (infoError) return <ErrorView message={infoError.message}/>;

    const { data, error } = await supabaseClient
        .storage
        .from("notebooks")
        .download(getNotebookRootPath(topicId, user.id, fileName) + ".json");

    if (error) return <ErrorView message={error.message}/>;

    return <div>
        <NbPageNavbar/>
        <p className="p-4 text-lg">Reading page <b>{fileName}</b> from the notebook of the topic with ID={topicId}.</p>
    </div>
}