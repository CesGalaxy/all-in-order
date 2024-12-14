"use server";

import ErrorView from "@/components/views/ErrorView";
import getNotebookVocabulary from "@/app/topics/[topicId]/notebook/_feature/cache/getNotebookVocabulary";

interface Params {
    topicId: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
    const { topicId } = await params;

    const { data, error } = await getNotebookVocabulary(topicId);

    if (error) return <ErrorView message={error.message}/>;

    return <p>Hello world</p>
}