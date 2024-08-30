import { getTopicDocument } from "@/lib/supabase/storage/topic_documents";
import required from "@/lib/helpers/required";
import UserLocationInDashboard from "@/app/app/_UserLocationInDashboard";
import { getTopicByIdWithSubjectAndCourse } from "@/lib/supabase/models/Topic";
import { Converter } from "showdown";
import { Button } from "@nextui-org/button";
import { IconMaximize, IconPencil } from "@tabler/icons-react";
import { Input } from "@nextui-org/input";
import { Link as TransitionLink } from "next-view-transitions";

export default async function Page({ params: { topicId, docNameEncoded } }: {
    params: { topicId: string, docNameEncoded: string }
}) {
    const docName = atob(decodeURIComponent(docNameEncoded));
    const topic = required(await getTopicByIdWithSubjectAndCourse(parseInt(topicId)), "/topics/" + topicId);
    const document = required(await getTopicDocument(topic.id, docName), "/topics/" + topicId);

    const content = await document.text();

    const converter = new Converter({
        tasklists: true,
        simplifiedAutoLink: true,
        strikethrough: true,
    });

    const html = converter.makeHtml(content);

    return <div className="w-full h-full flex flex-col items-stretch justify-stretch">
        <UserLocationInDashboard items={[
            { href: "/app", children: "Dashboard" },
            { href: "/app", children: topic.subject.course.name },
            { href: `/subjects/${topic.subject.id}`, children: topic.subject.name },
            { href: `/topics/${topic.id}`, children: topic.title },
            { children: docName }
        ]}/>
        <div className="w-full h-full flex-grow px-16 pt-8 flex flex-col">
            <div className="w-full flex-grow bg-content2 text-content2-foreground flex flex-col rounded-t-3xl relative">
                <nav className="absolute top-4 right-4 gap-4 flex items-center">
                    <Input
                        placeholder="File name"
                        value={docName}
                        variant="faded"
                    />
                    <Button startContent={<IconPencil />} color="primary" as={TransitionLink} href={`${docNameEncoded}/edit`}>
                        Edit
                    </Button>
                    <Button isIconOnly>
                        <IconMaximize />
                    </Button>
                </nav>
                <div className="revert-tailwind-only-child flwx-grow overflow-auto px-8" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    </div>
}