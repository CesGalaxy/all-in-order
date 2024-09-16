import required from "@/lib/helpers/required";
import { getSubjectById } from "@/supabase/models/Subject";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { getTopicsBySubjectId } from "@/supabase/models/Topic";
import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";
import MonthCalendar from "@/features/calendar/components/MonthCalendar";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const subject = required(await getSubjectById(parseInt(subjectId)), "/");
    const topics = required(await getTopicsBySubjectId(subject.id), "/");

    const t = await getTranslations();

    return <div className="w-full h-full grid grid-cols-4 gap-8 px-16 py-8">
        <Section title={t('App.topics')}>
            <ul className="flex flex-col items-stretch justify-start gap-8">
                {topics.map(topic => <Card as="li" key={topic.id}>
                    <CardHeader as={Link} className="flex-col items-start" href={"/topics/" + topic.id}>
                        <h2 className="font-bold text-3xl">{topic.title}</h2>
                        {topic.description && <small className="text-default-500">{topic.description}</small>}
                    </CardHeader>
                    <CardFooter>
                        <Link className="text-primary hover:underline" href={`/topics/${topic.id}/ai/chat`}>
                            {t('AI.chat_with')}
                        </Link>
                    </CardFooter>
                </Card>)}
            </ul>
        </Section>
        <Section title={t('App.tasks')}>
        </Section>
        <Section title={t('App.calendar')} className="col-span-2 w-full h-full flex flex-col">
            <MonthCalendar/>
        </Section>
    </div>
}