import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button, ButtonGroup } from "@heroui/button";
import { Link as TransitionLink } from "next-view-transitions";
import NoteOptions from "@/collections/note/components/navigation/NoteOptions";
import { Divider } from "@heroui/divider";
import { SubjectNote } from "@/lib/supabase/entities";
import ModalButton from "@/components/utils/ModalButton";
import NoteModal from "@/collections/note/components/modals/NoteModal";
import { useTranslations } from "next-intl";

export default function NoteCard({ note, subjectId }: { note: SubjectNote, subjectId?: string | number }) {
    const t = useTranslations();

    return <Card key={note.id} as="section" shadow="sm">
        <CardHeader className="justify-between flex-wrap gap-4">
            <h2 className="font-bold text-xl">{note.title}</h2>
            <ButtonGroup>
                {subjectId
                    ? <Button
                        as={TransitionLink}
                        href={`/subjects/${subjectId}/notes/${note.id}`}
                        size="sm"
                    >
                        {t("Global.viewMore")}
                    </Button>
                    : <ModalButton
                        modal={<NoteModal/>}
                        href="#"
                        size="sm"
                        modalProps={{ size: "xl" }}
                    >
                        {t("Global.viewMore")}
                    </ModalButton>}
                <NoteOptions/>
            </ButtonGroup>
        </CardHeader>
        <Divider/>
        <CardBody className="text-default-500">{note.content}</CardBody>
    </Card>
};
