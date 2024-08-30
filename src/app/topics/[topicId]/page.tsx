import required from "@/lib/helpers/required";
import { getTopicByIdWithSubjectAndCourse } from "@/lib/supabase/models/Topic";
import UserLocationInDashboard from "@/app/app/_UserLocationInDashboard";
import { getAllTopicDocuments } from "@/lib/supabase/storage/topic_documents";
import CreateDocumentButton from "@/app/topics/[topicId]/_CreateDocumentButton";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconEye, IconPencil, IconPlayerPlay, IconTrash } from "@tabler/icons-react";
import { getAllTopicTests } from "@/lib/supabase/models/TopicTest";
import CreateTestButton from "@/app/topics/[topicId]/_CreateTestButton";

export default async function Page({ params: { topicId } }: { params: { topicId: string } }) {
    const topic = required(await getTopicByIdWithSubjectAndCourse(parseInt(topicId)));
    const docs = required(await getAllTopicDocuments(topic.id), "/topic/" + topic.id);
    const tests = required(await getAllTopicTests(topic.id), "/topic/" + topic.id);

    return <div className="w-full h-full flex flex-col items-stretch justify-stretch">
        <UserLocationInDashboard items={[
            { href: "/app", children: "Dashboard" },
            { href: "/app", children: topic.subject.course.name },
            { href: `/subjects/${topic.subject.id}`, children: topic.subject.name },
            { children: topic.title }
        ]} />
        <div className="w-full h-full flex-grow grid grid-cols-2 gap-8 px-16 py-8">
            <div className="w-full h-full">
                <h2 className="text-4xl">Documents</h2>
                <hr/>
                <br/>
                {!docs || docs.length === 0
                    ? <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                        <h3 className="text-2xl">No documents found.</h3>
                        <p>There are no documents available for this topic yet.</p>
                        <CreateDocumentButton topicId={topic.id} />
                    </div>
                    : <div className="grid grid-cols-3 gap-4">
                        {docs.map(doc => <Card key={doc.id}>
                            <CardHeader className="items-end gap-2" as={Link} href={`/topics/${topic.id}/docs/${btoa(doc.name)}`}>
                                <h3 className="text-xl text-foreground">{doc.name.replace(/\.[a-z0-9]+$/i, "")}</h3>
                                <small className="text-focus">{doc.name.match(/\.[a-z0-9]+$/i)?.[0].slice(1).toUpperCase()}</small>
                            </CardHeader>
                            <CardFooter>
                                <ButtonGroup className="w-full">
                                    <Button color="primary" className="w-full" as={Link} href={`/topics/${topic.id}/docs/${btoa(doc.name)}`}>
                                        Open
                                    </Button>
                                    <Button color="danger" isIconOnly>
                                        <IconTrash />
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>)}
                    </div>
                }
            </div>
            <div className="w-full h-full">
                <h2 className="text-4xl">Tests</h2>
                <hr/>
                <br/>
                {!tests || tests.length === 0
                    ? <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                        <h3 className="text-2xl">No tests found.</h3>
                        <p>There are no tests available for this topic yet.</p>
                        <CreateTestButton topicId={topic.id} />
                    </div>
                    : <div className="grid grid-cols-3 gap-4">
                        {tests.map(test => <Card key={test.id}>
                            <CardHeader className="items-end gap-2" as={Link} href={`/tests/${test.id}`}>
                                <h3 className="text-xl text-foreground">{test.name}</h3>
                            </CardHeader>
                            {test.description && <CardBody>
                                <p>{test.description}</p>
                            </CardBody>}
                            <CardFooter>
                                <ButtonGroup className="w-full">
                                    <Button color="primary" className="w-full" startContent={<IconPlayerPlay />}>
                                        Start
                                    </Button>
                                    <Button isIconOnly as={Link} href={`/tests/${test.id}`}>
                                        <IconEye />
                                    </Button>
                                    <Button isIconOnly as={Link} href={`/tests/${test.id}/edit`}>
                                        <IconPencil />
                                    </Button>
                                    <Button color="danger" isIconOnly>
                                        <IconTrash />
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>)}
                    </div>
                }
            </div>
            <div className="w-full h-full col-span-2">
                <h2 className="text-4xl">AI Tools</h2>
                <hr/>
                <br/>
            </div>
        </div>
    </div>
}