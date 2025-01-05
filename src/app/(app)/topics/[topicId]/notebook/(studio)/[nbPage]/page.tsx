"use server";

import ErrorView from "@/components/views/ErrorView";
import { getUser } from "@/supabase/auth/user";
import { createSupabaseServerClient } from "@/supabase/server";
import { getNotebookRootPath } from "@/modules/notebook/pages/lib/helpers/names";
import NbPageEditTemplate from "@/modules/notebook/pages/components/pages/NbPageEditTemplate";
import NotebookPageData from "@/modules/notebook/app/supabase/storage/NotebookPageData";

interface Params {
    topicId: string;
    nbPage: string;
}

interface SearchParams {
    viewMode?: string;
}

// export async function generateMetadata({ params }: { params: Promise<Params> }) {
//     const { fileName } = await getRouteData(params);
//     return { title: `${atob(fileName)} - Notebook`, }
// }

export default async function Page({ params }: { params: Promise<Params>, searchParams: Promise<SearchParams> }) {
    const { topicId, nbPage } = await params;
    const fileName = decodeURIComponent(nbPage);
    const user = await getUser();
    const path = getNotebookRootPath(topicId, user.id, fileName) + ".json";

    const supabaseClient = await createSupabaseServerClient(true);
    const [{ data: info, error: infoError }, { data: download, error: downloadError }] = await Promise.all([
        supabaseClient.storage.from("authenticated/notebooks").info(path),
        supabaseClient.storage.from("notebooks").download(path)
    ]);

    if (infoError) return <ErrorView message={infoError.message}/>;
    if (downloadError) return <ErrorView message={downloadError.message}/>;

    // try {
    const rawContent = await download.text();
    const data = JSON.parse(rawContent) as NotebookPageData;

    return <NbPageEditTemplate data={data} file={info} path={path}/>;
    // } catch (e) {
    //     console.log(e)
    //     return <ErrorView message={"Error reading file contents"}/>;
    // }
}