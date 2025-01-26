import { getTranslations } from "next-intl/server";
import ErrorView from "@/components/views/ErrorView";
import { getAllTopicDocs } from "@/collections/docs/query";

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;

    // Fetch the topic data, documents, and translations
    const t = await getTranslations();

    const { data, error } = await getAllTopicDocs(parseInt(topicId));
    if (error) return <ErrorView message={error.message}/>;

    return <div
        className="w-full xl:h-full flex-grow flex flex-col xl:flex-row overflow-auto items-stretch gap-4 md:p-4 xl:p-8">
        <main
            className="bg-content1 text-content1-foreground w-full xl:h-full flex-grow rounded-xl border-content2 border-2">
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </main>
        <aside className="md:bg-content1 md:text-content1-foreground min-w-64 xl:h-full rounded-xl">
            hi
        </aside>
    </div>;
}