import { getTopicDocument } from "@/supabase/storage/topic_documents";
import required from "@/lib/helpers/required";
import { Converter } from "showdown";
import { Button } from "@nextui-org/button";
import { IconMaximize, IconPencil } from "@tabler/icons-react";
import { Input } from "@nextui-org/input";
import { Link as TransitionLink } from "next-view-transitions";

export default async function Page({ params: { topicId, docNameEncoded } }: {
    params: { topicId: string, docNameEncoded: string }
}) {
    const docName = atob(decodeURIComponent(docNameEncoded));
    const document = required(await getTopicDocument(parseInt(topicId), docName), "/topics/" + topicId);

    const content = await document.text();

    const converter = new Converter({
        // I'm doing this because of the typo warning
        ["task" + "lists"]: true,
        simplifiedAutoLink: true,
        strikethrough: true,
    });

    const html = converter.makeHtml(content);

    return <div className="w-full h-full flex-grow px-16 pt-8 flex flex-col">
        <div
            className="w-full flex-grow bg-content2 text-content2-foreground flex flex-col rounded-t-3xl relative vt-name-[doc-e-wrapper]">
            <nav className="absolute top-4 right-4 gap-4 flex items-center z-10">
                <Input
                    placeholder="File name"
                    value={docName}
                    variant="faded"
                    className="vt-name-[doc-name]"
                />
                <Button startContent={<IconPencil/>} color="primary" as={TransitionLink}
                        href={`${docNameEncoded}/edit`}>
                    Edit
                </Button>
                <Button isIconOnly>
                    <IconMaximize/>
                </Button>
            </nav>
            <div className="revert-tailwind-only-child flwx-grow overflow-auto px-8 vt-name-[doc-content]"
                 dangerouslySetInnerHTML={{ __html: html }}/>
        </div>
    </div>;
}