"use server";

import addNotesImage from "@/assets/pictures/add_notes.svg";
import Blank, { BlankViewProps } from "@/components/views/Blank";
import CreateNoteButton from "@/collections/note/components/CreateNoteButton";
import { getMaybeMyProfile } from "@/supabase/auth/profile";
import { createNoteAction } from "@/collections/note/action";
import { CreateNoteModalAction } from "@/collections/note/components/modals/CreateNoteModal";

export default async function NoNotes({ subjectId, extraViewProps, action = createNoteAction.bind(null, subjectId) }: {
    subjectId: number,
    extraViewProps?: Partial<BlankViewProps>,
    action?: CreateNoteModalAction
}) {
    const maybeProfile = await getMaybeMyProfile();

    const viewProps = { image: addNotesImage, alt: "", title: "No notes found", ...extraViewProps };

    // FIXME: This is shit
    return <Blank {...viewProps}>
        {maybeProfile && <nav className="flex items-center justify-center">
            <CreateNoteButton action={action}/>
        </nav>}
    </Blank>;
}