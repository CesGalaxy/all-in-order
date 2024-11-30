import { getTopicDocument, updateTopicDocument } from "@/supabase/storage/topic_documents";
import required from "@/lib/helpers/required";
import MDEditor from "@/features/markdown/MDEditor";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getUser } from "@/supabase/auth/user";

export default async function Page({ params: { topicId, docNameEncoded } }: {
    params: { topicId: string, docNameEncoded: string }
}) {
    const topicUrl = "/topics/" + topicId;

    const docLocatorSegments = docNameEncoded.split("-");
    if (docLocatorSegments.length != 2) return "Error: Invalid URL";

    const docOwnership = docLocatorSegments[0] === "m" ? (await getUser(topicUrl)).id : "_public";
    const docName = atob(decodeURIComponent(docLocatorSegments[1]));

    const { data, error } = await getSupabase()
        .from("topics")
        .select("id")
        .eq("id", topicId)
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;

    const topic = required(data, topicUrl);

    const document = required(await getTopicDocument(topic.id, docOwnership + "/" + docName), topicUrl);

    return <MDEditor
        docName={docName}
        initialContent={await document.text()}
        saveContent={updateTopicDocument.bind(null, topic.id, docName)}
    />;
}