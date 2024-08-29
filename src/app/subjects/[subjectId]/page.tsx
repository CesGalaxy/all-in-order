import required from "@/lib/helpers/required";
import { getSubjectById } from "@/lib/supabase/models/Subject";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { getTopicsBySubjectId } from "@/lib/supabase/models/Topic";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const subject = required(await getSubjectById(parseInt(subjectId)), "/");
    const topics = required(await getTopicsBySubjectId(subject.id), "/");

    return <div className="w-full h-full grid grid-cols-4 gap-8 px-16 py-8">
        <div className="w-full h-full">
            <h2 className="text-4xl">Resources</h2>
            <hr/>
            <br/>
            <ul className="flex flex-col items-stretch justify-start gap-8">
                {topics.map(topic => <li key={topic.id}>
                    <Card as={Link} href={"/topics/" + topic.id}>
                        <CardHeader className="flex-col items-start">
                            <h2 className="font-bold text-3xl">{topic.title}</h2>
                            {topic.description && <small className="text-default-500">{topic.description}</small>}
                        </CardHeader>
                        <CardFooter>
                            <Link className="text-primary hover:underline" href={`/topics/${topic.id}/ai/chat`}>
                                Chat with AI
                            </Link>
                        </CardFooter>
                    </Card>
                </li>)}
            </ul>
        </div>
        <div className="w-full h-full">
            <h2 className="text-4xl">Tasks</h2>
            <hr/>
            <br/>
        </div>
        <div className="w-full h-full col-span-2">
            <h2 className="text-4xl">Calendar</h2>
            <hr/>
            <br/>
        </div>
    </div>
}