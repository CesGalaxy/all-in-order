import required from "@/lib/helpers/required";
import { getAllTopicDocuments } from "@/supabase/storage/topic_documents";
import CreateDocButton from "@/collections/docs/CreateDocButton";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconEdit, IconEye, IconPlayerPlay, IconTrash } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
import SectionContainer from "@/components/containers/SectionContainer";
import PageContainer from "@/components/containers/Page";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import NoPractices from "@/collections/practice/NoPractices";
import CreateTestButton from "@/app/topics/[topicId]/_CreateTestButton";

export default async function Page({ params: { topicId } }: { params: { topicId: string } }) {
    const topicRequest = getSupabase()
        .from("topics")
        .select()
        .eq("id", parseInt(topicId))
        .maybeSingle();

    const practicesRequest = getSupabase()
        .from("practices")
        .select()
        .eq("topic_id", parseInt(topicId));

    const t = await getTranslations();

    const { data: topicData, error: topicError } = await topicRequest;
    if (topicError) return <ErrorView message={topicError.message}/>;
    const topic = required(topicData);

    const { data: practicesData, error: practicesError } = await practicesRequest;
    if (practicesError) return <ErrorView message={practicesError.message}/>;
    const practices = required(practicesData);

    const tests: any[] = [] as const;

    const docs = required(await getAllTopicDocuments(topic.id), "/topic/" + topic.id);

    return <PageContainer className="flex-grow grid grid-cols-2 gap-8">
        <SectionContainer title={t("App.documents")}>
            {!docs || docs.length === 0
                ? <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <h3 className="text-2xl">{t('Dash.Topic.no_documents')}</h3>
                    <p>{t("Dash.Topic.no_documents_yet")}</p>
                    <CreateDocButton topicId={topic.id}/>
                </div>
                : <div className="grid grid-cols-3 gap-4">
                    {docs.map(doc => <Card key={doc.id}>
                        <CardHeader className="items-end gap-2" as={Link}
                                    href={`/topics/${topic.id}/docs/${btoa(doc.name)}`}>
                            <h3 className="text-xl text-foreground">{doc.name.replace(/\.[a-z0-9]+$/i, "")}</h3>
                            <small
                                className="text-focus">{doc.name.match(/\.[a-z0-9]+$/i)?.[0].slice(1).toUpperCase()}</small>
                        </CardHeader>
                        <CardFooter>
                            <ButtonGroup className="w-full">
                                <Button color="primary" className="w-full" as={Link}
                                        href={`/topics/${topic.id}/docs/${btoa(doc.name)}`} startContent={<IconEdit/>}>
                                    {t("Global.edit")}
                                </Button>
                                <Button color="danger" isIconOnly>
                                    <IconTrash/>
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>)}
                </div>
            }
        </SectionContainer>
        <SectionContainer title="Practice">
            {practices.length === 0
                ? <NoPractices topicId={topic.id}/>
                : <ul className="grid grid-cols-3">
                    {practices.map(practice => <Card key={practice.id} as="li">
                        <CardHeader className="items-end gap-2" as={Link} href={`/practices/${practice.id}`}>
                            <h3 className="text-xl text-foreground">{practice.title}</h3>
                        </CardHeader>
                        {practice.description && <CardBody>
                            <p>{practice.description}</p>
                        </CardBody>}
                        <CardFooter>
                            <ButtonGroup className="w-full">
                                <Button color="primary" className="w-full" startContent={<IconPlayerPlay/>}>
                                    {t("Global.start")}
                                </Button>
                                <Button isIconOnly as={Link} href={`/practices/${practice.id}`}>
                                    <IconEye/>
                                </Button>
                                <Button color="danger" isIconOnly>
                                    <IconTrash/>
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>)}
                </ul>
            }
        </SectionContainer>
        <SectionContainer title={t("App.tests")} className="w-full h-full col-span-2">
            {!tests || tests.length === 0
                ? <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <h3 className="text-2xl">{t("Dash.Topic.no_tests")}</h3>
                    <p>{t("Dash.Topic.no_tests_details")}</p>
                    <CreateTestButton topicId={topic.id}/>
                </div>
                : <ul className="grid grid-cols-3 gap-4">
                    {tests.map(test => <Card key={test.id} as="li">
                        <CardHeader className="items-end gap-2" as={Link} href={`/tests/${test.id}`}>
                            <h3 className="text-xl text-foreground">{test.name}</h3>
                        </CardHeader>
                        {test.description && <CardBody>
                            <p>{test.description}</p>
                        </CardBody>}
                        <CardFooter>
                            <ButtonGroup className="w-full">
                                <Button color="primary" className="w-full" startContent={<IconPlayerPlay/>}>
                                    {t("Global.start")}
                                </Button>
                                <Button isIconOnly as={Link} href={`/tests/${test.id}`}>
                                    <IconEye/>
                                </Button>
                                <Button color="danger" isIconOnly>
                                    <IconTrash/>
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>)}
                </ul>
            }
        </SectionContainer>
        <SectionContainer title={t("AI.tools")} className="w-full h-full col-span-2 hidden">
            <i/>
        </SectionContainer>
    </PageContainer>;
}