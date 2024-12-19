"use server";

import ErrorView from "@/components/views/ErrorView";
import { getUser } from "@/supabase/auth/user";
import getSupabase, { createSupabaseServerClient } from "@/supabase/server";
import { getNotebookRootPath } from "@/app/topics/[topicId]/notebook/_feature/helpers/names";
import { cache } from "react";
import NbPageEditTemplate from "@/app/topics/[topicId]/notebook/_feature/components/templates/NbPageEditTemplate";
import NotebookPageData from "@/app/topics/[topicId]/notebook/_feature/lib/storage/NotebookPageData";

const getRouteData = cache(async (params: Promise<Params>) => {
    const [{ topicId, nbPage }, user] = await Promise.all([params, getUser()]);
    const fileName = decodeURIComponent(nbPage);
    const path = getNotebookRootPath(topicId, user.id, fileName) + ".json";
    return { topicId, nbPage, user, fileName, path };
});

const getDocInfo = cache(async (path: string) => {
    const supabaseClient = await getSupabase();
    return await supabaseClient.storage.from("authenticated/notebooks").info(path);
});

interface Params {
    topicId: string;
    nbPage: string;
}

interface SearchParams {
    viewMode?: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const { fileName } = await getRouteData(params);
    return { title: `${atob(fileName)} - Notebook`, }
}

export default async function Page({ params }: { params: Promise<Params>, searchParams: Promise<SearchParams> }) {
    const { path } = await getRouteData(params);

    const supabaseClient = await getSupabase();
    const [{ data: info, error: infoError }, { data: download, error: downloadError }] = await Promise.all([
        getDocInfo(path),
        supabaseClient.storage.from("notebooks").download(path)
    ]);

    if (infoError) return <ErrorView message={infoError.message}/>;
    if (downloadError) return <ErrorView message={downloadError.message}/>;

    async function save(path: string, data: string) {
        "use server";
        const supabaseClient = await createSupabaseServerClient();
        return await supabaseClient.storage.from("notebooks").update(path, data).then(r => !r.error);
    }

    try {
        const rawContent = await download.text();
        const data = JSON.parse(rawContent) as NotebookPageData;

        return <NbPageEditTemplate data={data} saveAction={save.bind(null, path)} file={info}/>;
    } catch (e) {
        console.log(e)
        return <ErrorView message={"Error reading file contents"}/>;
    }
}