import required from "@/lib/helpers/required";
import { getAllTopicDocuments } from "@/supabase/storage/topic_documents";
import { getTranslations } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;

    // Fetch the topic data, documents, and translations
    const docsRequest = getAllTopicDocuments(parseInt(topicId));
    const t = await getTranslations();

    // Handle the received documents
    const docs = required(await docsRequest, "/topic/" + topicId);

    return <div
        className="w-full xl:h-full flex-grow flex flex-col xl:flex-row overflow-auto items-stretch gap-4 md:p-4 xl:p-8">
        <main
            className="bg-content1 text-content1-foreground w-full xl:h-full flex-grow rounded-xl border-content2 border-2">
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
        </main>
        <aside className="md:bg-content1 md:text-content1-foreground min-w-64 xl:h-full rounded-xl">
            hi
        </aside>
    </div>;
}