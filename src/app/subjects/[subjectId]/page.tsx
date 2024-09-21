import required from "@/lib/helpers/required";
import { getSubject } from "@/supabase/models/Subject";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { getTopicsBySubject } from "@/supabase/models/Topic";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";
import MonthCalendar from "@/features/calendar/components/MonthCalendar";
import NoTopics from "@/components/NoTopics";
import PageContainer from "@/components/containers/Page";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const subject = required(await getSubject(parseInt(subjectId)), "/");
    const topics = required(await getTopicsBySubject(subject.id), "/");

    const t = await getTranslations();

    return <PageContainer className="w-full flex flex-col xl:grid xl:grid-cols-2 gap-8">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <Section title={t('App.tasks')}>
            </Section>
            <Section title={"Notes"}>
            </Section>
            <Section title={t('App.topics')} className="w-full h-full md:col-span-2 overflow-y-auto">
                <ul className="flex flex-col items-stretch justify-start gap-8 px-4">
                    {topics.length > 0
                        ? topics.map(topic => <Card as="li" key={topic.id}>
                            <CardHeader as={Link} className="flex-col items-start" href={"/topics/" + topic.id}>
                                <h2 className="font-bold text-3xl">{topic.title}</h2>
                                {topic.description &&
                                    <small className="text-default-500">{topic.description}</small>}
                            </CardHeader>
                            <CardFooter>
                                <Link className="text-primary hover:underline" href={`/topics/${topic.id}/ai/chat`}>
                                    {t('AI.chat_with')}
                                </Link>
                            </CardFooter>
                        </Card>)
                        : <NoTopics subjectId={subject.id}/>
                    }
                </ul>
            </Section>
        </div>
        <Section title={t('App.calendar')} className="w-full h-full flex flex-col">
            <MonthCalendar/>
        </Section>
    </PageContainer>
}