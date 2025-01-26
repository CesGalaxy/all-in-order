import { Button } from "@nextui-org/button";
import { IconArrowBack, IconMaximize, IconPencil } from "@tabler/icons-react";
import { Input } from "@nextui-org/input";
import { Link as TransitionLink } from "next-view-transitions";
import getSupabase from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/auth/user";
import ErrorView from "@/components/views/ErrorView";
import { getDocTypeByExtension } from "@/modules/docs/app/DocType";
import DocViewer from "@/modules/docs/app/DocViewer";

export default async function Page({ params }: { params: Promise<{ topicId: string, docNameEncoded: string }> }) {
    const { topicId, docNameEncoded } = await params;

    const topicPath = "/topics/" + topicId;

    const docLocatorSegments = docNameEncoded.split("-");
    if (docLocatorSegments.length != 2) return <ErrorView message="Invalid document locator"/>;

    const docOwnership = docLocatorSegments[0] === "m" ? (await getUser(topicPath)).id : "_public";
    const docName = atob(decodeURIComponent(docLocatorSegments[1]));

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .storage
        .from("topic_documents")
        .download(`${topicId}/${docOwnership}/${docName}`);

    if (error) redirect(topicPath);

    const content = await data.text();
    const type = getDocTypeByExtension(docName.split(".").pop()!);

    return <div className="w-full h-full flex-grow px-16 pt-8 flex flex-col">
        <div
            className="w-full flex-grow bg-content2 text-content2-foreground flex flex-col rounded-t-3xl relative vt-name-[doc-e-wrapper]">
            <nav className="absolute top-4 right-4 gap-4 flex items-center z-10">
                <Button variant="light" isIconOnly as={TransitionLink} href={topicPath}>
                    <IconArrowBack/>
                </Button>
                <Input
                    placeholder="File name"
                    value={docName}
                    variant="faded"
                    className="vt-name-[doc-name]"
                />
                <Button startContent={<IconPencil/>} color="primary" as={TransitionLink} href="edit">
                    Edit
                </Button>
                <Button isIconOnly>
                    <IconMaximize/>
                </Button>
            </nav>
            <DocViewer type={type} content={content} name={docName}/>
        </div>
    </div>;
}