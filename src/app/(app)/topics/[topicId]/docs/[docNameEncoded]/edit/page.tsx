import { getTopicDocument, updateTopicDocument } from "@/lib/supabase/storage/topic_documents";
import required from "@/lib/helpers/required";
import ClassicMDEditor from "@/features/markdown/ClassicMDEditor";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getUser } from "@/lib/supabase/auth/user";
import Image from "next/image";
import LogoIcoCol from "@/assets/logo/IcoCol.svg";
import { Link } from "@nextui-org/link";
import { cookies } from "next/headers";
import EditorToolbar
    from "@/app/(app)/topics/[topicId]/docs/[docNameEncoded]/edit/_components/navigation/EditorToolbar";
import EditorConfigBtn
    from "@/app/(app)/topics/[topicId]/docs/[docNameEncoded]/edit/_components/navigation/EditorConfigBtn";
import DocEditorProvider from "@/modules/docs/app/reactivity/providers/DocEditorProvider";
import DocEditor from "@/modules/docs/app/DocEditor";
import { getDocTypeByExtension } from "@/modules/docs/app/DocType";

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

    const editorVersion = (await cookies()).get("md-editor-version")?.name;

    const content = await document.text();

    const docType = getDocTypeByExtension(docName.split(".").pop());

    return <DocEditorProvider name={docName} initialContent={content}
                              saveAction={updateTopicDocument.bind(null, topic.id, docOwnership + "/" + docName)}>
        <div className="w-full grow flex flex-col lg:flex-row">
            <aside
                className="w-full lg:w-16 lg:sticky top-0 flex lg:flex-col justify-between items-center lg:h-dvh">
                <div className="h-16 bottom-full w-full flex items-center justify-center">
                    <Link href="/public">
                        <Image src={LogoIcoCol} alt="All In Order" height={64} priority/>
                    </Link>
                </div>
                <nav className="w-full grow flex lg:flex-col items-center justify-between p-4 lg:pb-3 lg:px-0">
                    <EditorToolbar/>
                    <EditorConfigBtn/>
                </nav>
            </aside>
            {editorVersion === "classic" && docType === "md"
                ? <ClassicMDEditor
                    docName={docName}
                    initialContent={content}
                    saveContent={updateTopicDocument.bind(null, topic.id, docOwnership + "/" + docName)}
                />
                : <DocEditor type={docType}/>}
        </div>
    </DocEditorProvider>;
}