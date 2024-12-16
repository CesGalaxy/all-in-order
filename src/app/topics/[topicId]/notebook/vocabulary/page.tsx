import getNotebook from "@/app/topics/[topicId]/notebook/_feature/cache/getNotebook";
import ErrorView from "@/components/views/ErrorView";

interface Params {
    topicId: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
    const { topicId } = await params;

    const nb = await getNotebook(topicId)

    if ("error" in nb) return <ErrorView message={"Unknown error: " + nb.error}/>;
    const { files } = nb;

    return <p>Vocab</p>
}