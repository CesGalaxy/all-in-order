"use server";

import ErrorView from "@/components/views/ErrorView";
import { getUser } from "@/supabase/auth/user";
import getSupabase, { createSupabaseServerClient } from "@/supabase/server";
import { getNotebookRootPath } from "@/app/topics/[topicId]/notebook/_feature/helpers/names";
import NbPageNavbar from "@/app/topics/[topicId]/notebook/_feature/components/navigation/NbPageNavbar";
import NotebookPageProvider from "@/app/topics/[topicId]/notebook/_feature/reactivity/providers/NotebookPageProvider";
import NbPageEditor from "@/app/topics/[topicId]/notebook/_feature/app/NbPageEditor";
import { JSONContent } from "novel";
import { cache } from "react";

const getDocInfo = cache(async (path: string) => {
    const supabaseClient = await getSupabase();
    return await supabaseClient
        .storage
        .from("authenticated/notebooks")
        .info(path);
});

export async function generateMetadata({ params }: { params: { topicId: string, nbPage: string } }) {
    const { topicId, nbPage } = params;

    const fileName = decodeURIComponent(nbPage);

    const user = await getUser();

    const path = getNotebookRootPath(topicId, user.id, fileName) + ".json";
    const { data, error } = await getDocInfo(path);

    if (error) return {};

    return {
        title: `${atob(fileName)} - Notebook`,
    }
}

export default async function Page({ params }: { params: Promise<{ topicId: string, nbPage: string }> }) {
    const { topicId, nbPage } = await params;

    const fileName = decodeURIComponent(nbPage);

    const user = await getUser();

    const path = getNotebookRootPath(topicId, user.id, fileName) + ".json";

    const supabaseClient = await getSupabase();
    const [{ data: info, error: infoError }, { data, error }] = await Promise.all([
        getDocInfo(path),
        supabaseClient
            .storage
            .from("notebooks")
            .download(path)
    ]);

    if (infoError) return <ErrorView message={infoError.message}/>;
    if (error) return <ErrorView message={error.message}/>;

    async function save(content: JSONContent) {
        "use server";
        const supabaseClient = await createSupabaseServerClient();
        const { error } = await supabaseClient
            .storage
            .from("notebooks")
            .update(path, JSON.stringify(content));
        return !error;
    }

    const rawContent = await data.text();

    try {
        const content = JSON.parse(rawContent) as JSONContent;

        return <NotebookPageProvider
            initialContent={content}
            saveAction={save}
        >
            <div className="w-full h-full flex flex-col items-stretch">
                <NbPageNavbar/>
                {/*<p className="p-4 text-lg">*/}
                {/*    Reading page <b>{fileName}</b> from the notebook of the topic with ID={topicId}...*/}
                {/*</p>*/}
                <NbPageEditor/>
            </div>
        </NotebookPageProvider>
    } catch (e) {
        console.log(e)
        return <ErrorView message={"Error reading file contents"}/>;
    }
}