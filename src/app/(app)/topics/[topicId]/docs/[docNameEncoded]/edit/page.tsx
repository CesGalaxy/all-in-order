import { getTopicDocument, updateTopicDocument } from "@/lib/supabase/storage/topic_documents";
import required from "@/lib/helpers/required";
import ClassicMDEditor from "@/features/markdown/ClassicMDEditor";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getUser } from "@/lib/supabase/auth/user";
import { cookies } from "next/headers";
import DocEditor from "@/modules/docs/app/DocEditor";
import DocType, { getDocTypeByExtension } from "@/modules/docs/app/DocType";

export default async function Page({ params }: { params: Promise<{ topicId: string, docNameEncoded: string }> }) {
    const { topicId, docNameEncoded } = await params;

    const topicUrl = "/topics/" + topicId;

    const docLocatorSegments = docNameEncoded.split("-");
    if (docLocatorSegments.length != 2) return "Error: Invalid URL";
    const docOwnership = docLocatorSegments[0] === "m" ? (await getUser(topicUrl)).id : "_public";
    const docName = atob(decodeURIComponent(docLocatorSegments[1]));

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient.from("topics").select("id").eq("id", parseInt(topicId)).maybeSingle();
    if (error) return <ErrorView message={error.message}/>;
    const topic = required(data, topicUrl);

    const document = required(await getTopicDocument(topic.id, docOwnership + "/" + docName), topicUrl);

    const { data: s, error: signedUrlError } = await supabaseClient
        .storage
        .from('topic_documents')
        .createSignedUrl(topic.id + "/" + docOwnership + "/" + docName, 600);

    if (signedUrlError) return <ErrorView message={signedUrlError.message}/>;

    const editorVersion = (await cookies()).get("md-editor-version")?.name;

    const content = await document.text();

    const docType = getDocTypeByExtension(docName.split(".").pop());

    const save = updateTopicDocument.bind(null, topic.id, docOwnership + "/" + docName);

    const editor = editorVersion === "classic" && docType === DocType.MD
        ? <ClassicMDEditor docName={docName} initialContent={content} saveContent={save}/>
        : <DocEditor type={docType} name={docName} initialContent={content} saveAction={save} signedUrl={s.signedUrl}/>;

    return <div className="w-full grow">{editor}</div>;
}