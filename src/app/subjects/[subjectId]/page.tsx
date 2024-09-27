import required from "@/lib/helpers/required";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link as NextLink } from "@nextui-org/link";
import { getTranslations } from "next-intl/server";
import SectionContainer from "@/components/containers/SectionContainer";
import MonthCalendar from "@/features/calendar/components/MonthCalendar";
import NoTopics from "@/collections/topic/NoTopics";
import PageContainer from "@/components/containers/Page";
import ErrorView from "@/components/views/Error";
import NoNotes from "@/collections/note/NoNotes";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link as TransitionLink } from "next-view-transitions";
import { getSubject } from "@/app/subjects/[subjectId]/query";
import { Divider } from "@nextui-org/divider";
import getSupabase from "@/supabase/server";
import { getMyProfile } from "@/supabase/models/Profile";
import { revalidatePath } from "next/cache";
import CreateNoteButton from "@/collections/note/CreateNoteButton";
import NoteOptions from "@/app/subjects/[subjectId]/_NoteOptions";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const profile = await getMyProfile();
    const { data, error } = await getSubject(subjectId);

    if (error) return <ErrorView message={error.message}/>;

    const { topics, notes, ...subject } = required(data);

    const t = await getTranslations();

    async function createNote(title: string, content: string) {
        "use server";

        const { error } = await getSupabase()
            .from("subject_notes")
            .insert({ title, content, subject_id: subject.id, author_id: profile.id });

        if (error) return error.message;

        revalidatePath(`/subjects/${subject.id}`);
    }

    return <PageContainer
        className="w-full h-full flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 gap-x-8 gap-y-16 xl:gap-8 auto-rows-max">
        <SectionContainer title={t('App.tasks')}>
        </SectionContainer>
        <SectionContainer
            title={"Notes"}
            trailing={notes && <CreateNoteButton action={createNote}/>}
            className="w-full h-full flex flex-col"
        >
            {notes.length > 0
                ? <ul className="w-full h-full overflow-y-auto">
                    {
                        notes.map(note => note.id < 3 && <Card key={note.id}>
                            {note.title && <>
                                <CardHeader><h2 className="font-bold text-xl">{note.title}</h2></CardHeader>
                                <Divider/>
                            </>}
                            <CardBody><small className="text-default-500">{note.content}</small></CardBody>
                            <CardFooter as={ButtonGroup}>
                                <Button
                                    as={TransitionLink}
                                    href={`/subjects/${subject.id}/notes/${note.id}`}
                                    scroll={false}
                                >
                                    View more
                                </Button>
                                <NoteOptions/>
                            </CardFooter>
                        </Card>)
                    }
                </ul>
                : <NoNotes subjectId={subject.id}/>}
        </SectionContainer>
        <SectionContainer title={t('App.calendar')} className="w-full h-full flex flex-col col-span-2 row-span-2">
            <MonthCalendar/>
        </SectionContainer>
        <SectionContainer title={t('App.topics')} className="w-full h-full col-span-2 order-first xl:order-none">
            {topics.length > 0
                ? <ul className="flex flex-col items-stretch justify-start gap-8 px-4">
                    {topics.map(topic => <Card as="li" key={topic.id}>
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
                    </Card>)}
                </ul>
                : <NoTopics subjectId={subject.id}/>}
        </SectionContainer>
    </PageContainer>
}