import { getTopicDocumentByName } from "@/lib/supabase/storage/topic_documents";
import required from "@/lib/helpers/required";
import UserLocationInDashboard from "@/app/app/_UserLocationInDashboard";
import { getTopicByIdWithSubjectAndCourse } from "@/lib/supabase/models/Topic";
import { Link } from "@nextui-org/link";
import { Link as TransitionLink } from "next-view-transitions";

export default async function Page({ params: { topicId, docNameEncoded } }: {
    params: { topicId: string, docNameEncoded: string }
}) {
    const docName = atob(decodeURIComponent(docNameEncoded));
    const topic = required(await getTopicByIdWithSubjectAndCourse(parseInt(topicId)), "/topics/" + topicId);
    const document = required(await getTopicDocumentByName(parseInt(topicId), docName), "/topics/" + topicId);

    return <div className="w-full h-full flex flex-col items-stretch justify-stretch">
        <UserLocationInDashboard items={[
            { href: "/app", children: "Dashboard" },
            { href: "/app", children: topic.subject.course.name },
            { href: `/subjects/${topic.subject.id}`, children: topic.subject.name },
            { href: `/topics/${topic.id}`, children: topic.title },
            { children: docName }
        ]}/>
        <div className="w-full h-full flex-grow grid grid-cols-2 gap-8 px-16 py-8">
            <div className="w-full h-full">
                <h2 className="text-4xl">{docName}</h2>
                <hr/>
                <br/>
                <Link as={TransitionLink} href={`/topics/${topicId}/docs/${docNameEncoded}/edit`}>
                    Edit
                </Link>
            </div>
        </div>
    </div>
}