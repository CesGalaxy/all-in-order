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
import { Tooltip } from "@nextui-org/tooltip";

const FLEX_AND_GRID = "flex w-[calc(100%,16px)] sm:w-full overflow-x-auto sm:overflow-x-visible -mx-4 sm:mx-0 px-4 sm:px-0 sm:grid gap-4";

export default async function Page({ params: { topicId } }: { params: { topicId: string } }) {
    const dbRequest = getSupabase()
        .from("topics")
        .select("*, practices(*, activities:topic_activities(count))")
        .eq("id", parseInt(topicId))
        .maybeSingle();

    const docsRequest = getAllTopicDocuments(parseInt(topicId));

    const t = await getTranslations();

    const { data, error } = await dbRequest;
    if (error) return <ErrorView message={error.message}/>;
    const { practices, ...topic } = required(data);

    const tests: any[] = [] as const;

    const docs = required(await docsRequest, "/topic/" + topic.id);

    return <PageContainer className="flex-grow flex flex-col lg:grid lg:grid-cols-2 gap-8">
        <SectionContainer title={t("App.documents")}>
            {!docs || docs.length === 0
                ? <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <h3 className="text-2xl">{t('Dash.Topic.no_documents')}</h3>
                    <p>{t("Dash.Topic.no_documents_yet")}</p>
                    <CreateDocButton topicId={topic.id}/>
                </div>
                : <ul className="grid grid-cols-3 gap-4">
                    {docs.map(doc => <Card key={doc.id} as="li">
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
                </ul>
            }
        </SectionContainer>
        <SectionContainer title="Practice">
            {practices.length === 0
                ? <NoPractices topicId={topic.id}/>
                :
                <ul className={FLEX_AND_GRID + " md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"}>
                    {practices.map(practice => <Card
                        key={practice.id}
                        as="li"
                        className="min-w-64 sm:min-w-fit"
                    >
                        <CardHeader className="items-end gap-2" as={Link} href={`/practices/${practice.id}`}>
                            <h3 className="text-xl text-foreground">{practice.title}</h3>
                            {practice.description && <p>{practice.description}</p>}
                        </CardHeader>
                        <CardBody className="w-full flex-row items-center justify-evenly px-0">
                            <div className="w-fit flex flex-col items-center">
                                <span className="text-default-500 text-xs uppercase">SCORE</span>
                                <b>100%</b>
                            </div>
                            <div className="w-fit flex flex-col items-center">
                                <span className="text-default-500 text-xs uppercase">ATTEMPTS</span>
                                <b>8</b>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <ButtonGroup className="w-full">
                                <Tooltip content={practice.activities[0]!.count + " questions"} placement="bottom">
                                    <Button color="primary" className="w-full" startContent={<IconPlayerPlay/>}>
                                        {t("Global.start")}
                                    </Button>
                                </Tooltip>
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
        <SectionContainer title={t("App.tests")} className="w-full h-full lg:col-span-2">
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