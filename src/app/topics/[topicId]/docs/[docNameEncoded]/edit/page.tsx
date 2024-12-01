import { getTopicDocument, updateTopicDocument } from "@/supabase/storage/topic_documents";
import required from "@/lib/helpers/required";
import MDEditor from "@/features/markdown/MDEditor";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getUser } from "@/supabase/auth/user";
import Image from "next/image";
import LogoIcoCol from "@/assets/logo/IcoCol.svg";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { IconFolders, IconList, IconSearch, IconSparkles } from "@tabler/icons-react";

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

    return <div className="w-full h-full flex-grow flex">
        <aside className="w-16 sticky top-16 flex flex-col justify-between items-center h-fit">
            <div className="h-16 absolute bottom-full w-full flex items-center justify-center">
                <Link href="/">
                    <Image src={LogoIcoCol} alt="All In Order" height={64} priority/>
                </Link>
            </div>
            <ul className="w-full flex flex-col items-center gap-4 py-4">
                <li><Button isIconOnly radius="full"><IconList/></Button></li>
                <li><Button isIconOnly radius="full"><IconFolders/></Button></li>
                <li><Button isIconOnly radius="full"><IconSearch/></Button></li>
                <li>
                    <Button
                        isIconOnly
                        radius="full"
                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                    >
                        <IconSparkles/>
                    </Button>
                </li>
            </ul>
        </aside>
        <MDEditor
            docName={docName}
            initialContent={await document.text()}
            saveContent={updateTopicDocument.bind(null, topic.id, docName)}
        />
    </div>;
}