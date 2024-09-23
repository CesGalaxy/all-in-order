import required from "@/lib/helpers/required";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link as NextLink } from "@nextui-org/link";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";
import MonthCalendar from "@/features/calendar/components/MonthCalendar";
import NoTopics from "@/components/NoTopics";
import PageContainer from "@/components/containers/Page";
import ErrorView from "@/components/Error";
import NoNotes from "@/components/NoNotes";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconChevronDown } from "@tabler/icons-react";
import { Link as TransitionLink } from "next-view-transitions";
import { getSubject } from "@/app/subjects/[subjectId]/query";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const { data, error } = await getSubject(subjectId);

    if (error) return <ErrorView message={"error.message"}/>;

    const { topics, notes, ...subject } = required(data);

    const t = await getTranslations();

    return <PageContainer className="w-full flex flex-col xl:grid xl:grid-cols-2 gap-8">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <Section title={t('App.tasks')}>
            </Section>
            <Section title={"Notes"}>
                {notes.length > 0
                    ? notes.map(note => note.id < 3 && <Card key={note.id}>
                        {note.title && <CardHeader><h2 className="font-bold text-3xl">{note.title}</h2></CardHeader>}
                        <CardBody><small className="text-default-500">{note.content}</small></CardBody>
                        <CardFooter as={ButtonGroup}>
                            <Button
                                as={TransitionLink}
                                href={`/subjects/${subject.id}/notes/${note.id}`}
                                scroll={false}
                            >
                                View more
                            </Button>
                            <Button isIconOnly>
                                <IconChevronDown/>
                            </Button>
                        </CardFooter>
                    </Card>)
                    : <NoNotes subjectId={subject.id}/>}
            </Section>
            <Section title={t('App.topics')} className="w-full h-full md:col-span-2">
                <ul className="flex flex-col items-stretch justify-start gap-8 px-4">
                    {topics.length > 0
                        ? topics.map(topic => <Card as="li" key={topic.id}>
                            <CardHeader as={NextLink} className="flex-col items-start" href={"/topics/" + topic.id}>
                                <h2 className="font-bold text-3xl">{topic.title}</h2>
                                {topic.description &&
                                    <small className="text-default-500">{topic.description}</small>}
                            </CardHeader>
                            <CardFooter>
                                <NextLink className="text-primary hover:underline" href={`/topics/${topic.id}/ai/chat`}>
                                    {t('AI.chat_with')}
                                </NextLink>
                            </CardFooter>
                        </Card>)
                        : <NoTopics subjectId={subject.id}/>}
                </ul>
            </Section>
        </div>
        <Section title={t('App.calendar')} className="w-full h-full flex flex-col">
            <MonthCalendar/>
        </Section>
    </PageContainer>
}