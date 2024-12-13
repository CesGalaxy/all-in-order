"use server";

import ErrorView from "@/components/views/ErrorView";
import { getUser } from "@/supabase/auth/user";
import getSupabase, { createSupabaseServerClient } from "@/supabase/server";
import { getNotebookRootPath } from "@/app/topics/[topicId]/notebook/_feature/helpers/names";
import { JSONContent } from "novel";
import { cache } from "react";
import NbPageEditTemplate from "@/app/topics/[topicId]/notebook/_feature/components/templates/NbPageEditTemplate";

const getDocInfo = cache(async (path: string) => {
    const supabaseClient = await getSupabase();
    return await supabaseClient
        .storage
        .from("authenticated/notebooks")
        .info(path);
});

interface Params {
    topicId: string;
    nbPage: string;
}

interface SearchParams {
    viewMode?: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const { topicId, nbPage } = await params;

    const fileName = decodeURIComponent(nbPage);

    const user = await getUser();

    const path = getNotebookRootPath(topicId, user.id, fileName) + ".json";
    const { data, error } = await getDocInfo(path);

    if (error) return {};

    return {
        title: `${atob(fileName)} - Notebook`,
    }
}

export default async function Page({ params }: { params: Promise<Params>, searchParams: Promise<SearchParams> }) {
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

    const rawContent = await data.text();

    async function save(content: JSONContent) {
        "use server";
        const supabaseClient = await createSupabaseServerClient();
        const { error } = await supabaseClient
            .storage
            .from("notebooks")
            .update(path, JSON.stringify(content));
        return !error;
    }

    try {
        const content = JSON.parse(rawContent) as JSONContent;

        return <NbPageEditTemplate content={content} saveAction={save} file={info}/>;
    } catch (e) {
        console.log(e)
        return <ErrorView message={"Error reading file contents"}/>;
    }
}