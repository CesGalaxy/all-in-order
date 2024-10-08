import { getTopicDocument, updateTopicDocument } from "@/supabase/storage/topic_documents";
import required from "@/lib/helpers/required";
import { getTopicWithSubjectAndCourse } from "@/supabase/models/Topic";
import MDEditor from "@/features/markdown/MDEditor";

export default async function Page({ params: { topicId, docNameEncoded } }: {
    params: { topicId: string, docNameEncoded: string }
}) {
    const docName = atob(decodeURIComponent(docNameEncoded));
    const topic = required(await getTopicWithSubjectAndCourse(parseInt(topicId)), "/topics/" + topicId);
    const document = required(await getTopicDocument(topic.id, docName), "/topics/" + topicId);

    return <MDEditor
        docName={docName}
        initialContent={await document.text()}
        saveContent={updateTopicDocument.bind(null, topic.id, docName)}
    />;
}