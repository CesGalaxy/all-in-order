import { getTopicDocument, updateTopicDocument } from "@/lib/supabase/storage/topic_documents";
import required from "@/lib/helpers/required";
import ClassicMDEditor from "@/features/markdown/classic/ClassicMDEditor";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getUser } from "@/lib/supabase/auth/user";
import Image from "next/image";
import LogoIcoCol from "@/assets/logo/IcoCol.svg";
import { Link } from "@nextui-org/link";
import { cookies } from "next/headers";
import NovelEditor from "@/features/markdown/NovelEditor";
import EditorToolbar
    from "@/app/(app)/topics/[topicId]/docs/[docNameEncoded]/edit/_components/navigation/EditorToolbar";
import EditorConfigBtn
    from "@/app/(app)/topics/[topicId]/docs/[docNameEncoded]/edit/_components/navigation/EditorConfigBtn";

export default async function Page(
    props: {
        params: Promise<{ topicId: string, docNameEncoded: string }>
    }
) {
    const params = await props.params;

    const {
        topicId,
        docNameEncoded
    } = params;

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

    return <div className="w-full h-full flex-grow flex">
        <aside
            className="w-16 sticky top-16 flex flex-col justify-between items-center h-[calc(100vh-64px)] flex-none">
            <div className="h-16 absolute bottom-full w-full flex items-center justify-center">
                <Link href="/public">
                    <Image src={LogoIcoCol} alt="All In Order" height={64} priority/>
                </Link>
            </div>
            <nav className="w-full h-full flex flex-col items-center justify-between pt-4 pb-3">
                <EditorToolbar/>
                <EditorConfigBtn/>
            </nav>
        </aside>
        {editorVersion === "classic"
            ? <ClassicMDEditor
                docName={docName}
                initialContent={await document.text()}
                saveContent={updateTopicDocument.bind(null, topic.id, docName)}
            />
            : <NovelEditor/>}
    </div>;
}