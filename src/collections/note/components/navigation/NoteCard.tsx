import { Card, CardBody, CardHeader } from "@heroui/card";
import NoteCardButtons from "@/collections/note/components/navigation/NoteCardButtons";
import { Divider } from "@heroui/divider";
import { SubjectNote } from "@/lib/supabase/entities";
import { useTranslations } from "next-intl";

export default function NoteCard({ note, subjectId }: { note: SubjectNote, subjectId?: number }) {
    const t = useTranslations();

    return <Card key={note.id} as="section" shadow="sm">
        <CardHeader className="justify-between flex-wrap gap-4">
            <h2 className="font-bold text-xl">{note.title}</h2>
            <NoteCardButtons subjectId={subjectId} id={note.id}/>
        </CardHeader>
        <Divider/>
        <CardBody className="text-default-500">{note.content}</CardBody>
    </Card>
};
