import required from "@/lib/helpers/required";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { getTranslations } from "next-intl/server";
import SectionContainer from "@/components/containers/SectionContainer";
import MonthCalendar from "@/features/calendar/components/MonthCalendar";
import NoTopics from "@/collections/topic/NoTopics";
import PageContainer from "@/components/containers/Page";
import ErrorView from "@/components/views/ErrorView";
import { getSubject } from "@/app/subjects/[subjectId]/query";
import getSupabase from "@/supabase/server";
import { getMaybeMyProfile } from "@/supabase/models/Profile";
import { revalidatePath } from "next/cache";
import NotesSection from "@/app/subjects/[subjectId]/_components/NotesSection";
import { Divider } from "@nextui-org/divider";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const maybeProfilePromise = getMaybeMyProfile();
    const tPromise = getTranslations();

    const { data, error } = await getSubject(subjectId);

    if (error) return <ErrorView message={error.message}/>;

    const { topics, notes, ...subject } = required(data);

    async function createNote(profileId: number, title: string, content: string) {
        "use server";

        const { error } = await getSupabase()
            .from("subject_notes")
            .insert({ title, content, subject_id: subject.id, author_id: profileId });

        if (error) return error.message;

        revalidatePath(`/subjects/${subject.id}`);
    }

    const [maybeProfile, t] = await Promise.all([maybeProfilePromise, tPromise]);

    return <PageContainer
        className="w-full h-full flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 gap-x-8 gap-8 auto-rows-max">
        <SectionContainer title={t('App.tasks')}>
        </SectionContainer>
        <NotesSection
            notes={notes}
            createNoteAction={maybeProfile && createNote.bind(null, maybeProfile.id)}
            subjectId={subject.id}
        />
        <SectionContainer title={t('App.calendar')} className="w-full h-full flex flex-col col-span-2 row-span-2">
            <MonthCalendar/>
        </SectionContainer>
        <SectionContainer title={t('App.topics')} className="w-full h-full col-span-2 order-first xl:order-none">
            {topics.length > 0
                ? <ul className="grid grid-cols-2 items-stretch justify-start gap-8 px-4">
                    {topics.map(topic => <Card as="li" key={topic.id}>
                        <CardHeader as={Link} className="flex-col items-start" href={"/topics/" + topic.id}>
                            <h2 className="font-bold text-3xl">{topic.title}</h2>
                            {topic.description && <small className="text-default-500">{topic.description}</small>}
                        </CardHeader>
                        <Divider/>
                        <CardFooter>
                            <Link className="text-primary hover:underline" href={`/topics/${topic.id}/ai/chat`}
                                  showAnchorIcon isDisabled>
                                {t('AI.chat_with')}
                            </Link>
                        </CardFooter>
                    </Card>)}
                </ul>
                : <NoTopics subjectId={subject.id}/>}
        </SectionContainer>
    </PageContainer>
}