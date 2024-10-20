import { SubjectNote } from "@/supabase/entities";
import CreateNoteButton from "@/collections/note/CreateNoteButton";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link as TransitionLink } from "next-view-transitions";
import NoteOptions from "@/app/subjects/[subjectId]/_components/NoteOptions";
import NoNotes from "@/collections/note/NoNotes";
import SectionContainer from "@/components/containers/SectionContainer";
import { useTranslations } from "next-intl";

type RequiredNote = Pick<SubjectNote, "id" | "title" | "content">;

export interface NotesSectionProps {
    notes: RequiredNote[];
    createNoteAction?: ((title: string, content: string) => Promise<string | undefined>) | null;
    subjectId: number;
}

export default function SubjectPageNotesSection({ notes, createNoteAction, subjectId }: NotesSectionProps) {
    const t = useTranslations();

    return <SectionContainer
        title={t("App.notes")}
        trailing={(notes.length !== 0) && createNoteAction && <CreateNoteButton action={createNoteAction}/>}
        className="w-full h-full flex flex-col"
    >
        {notes.length > 0
            ? <ul className="w-full h-full overflow-y-auto">
                {notes.map(note => <Card key={note.id} as="li">
                    {note.title && <>
                        <CardHeader><h2 className="font-bold text-xl">{note.title}</h2></CardHeader>
                        <Divider/>
                    </>}
                    <CardBody><small className="text-default-500">{note.content}</small></CardBody>
                    <CardFooter as={ButtonGroup}>
                        <Button
                            as={TransitionLink}
                            href={`/subjects/${subjectId}/notes/${note.id}`}
                            scroll={false}
                        >
                            {t("Global.viewMore")}
                        </Button>
                        <NoteOptions/>
                    </CardFooter>
                </Card>)}
            </ul>
            : <NoNotes subjectId={subjectId} extraViewProps={{ small: true }}/>}
    </SectionContainer>;
}