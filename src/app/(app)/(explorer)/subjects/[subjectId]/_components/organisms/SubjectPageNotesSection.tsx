import { SubjectNote } from "@aio/db/entities";
import NoNotes from "@/collections/note/components/views/NoNotes";
import SectionContainer from "@/components/containers/SectionContainer";
import { useTranslations } from "next-intl";
import ModalButton from "@/components/utils/ModalButton";
import CreateNoteModal, { CreateNoteModalAction } from "@/collections/note/components/modals/CreateNoteModal";
import ContentGallery from "@/components/navigation/ContentGallery";
import NoteCard from "@/collections/note/components/navigation/NoteCard";

export interface NotesSectionProps {
    notes: SubjectNote[];
    createNoteAction?: CreateNoteModalAction;
    subjectId: number;
}

export default function SubjectPageNotesSection({ notes, createNoteAction, subjectId }: NotesSectionProps) {
    const t = useTranslations();

    return <SectionContainer
        title={t("App.notes")}
        trailing={(notes.length !== 0) && createNoteAction && <ModalButton
            modal={<CreateNoteModal action={createNoteAction}/>}
            color="primary"
            size="sm"
            radius="full"
            variant="flat"
        >
            {t("Dash.Note.create")}
        </ModalButton>}
        className="w-full flex flex-col"
    >
        <ContentGallery
            items={notes}
            getItemKey={note => note.id}
            renderItem={note => <NoteCard note={note} subjectId={subjectId}/>}
            emptyView={<NoNotes subjectId={subjectId} extraViewProps={{ small: true }} action={createNoteAction}/>}
        />
    </SectionContainer>;
}