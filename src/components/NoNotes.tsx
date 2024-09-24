import addNotesImage from "@/assets/pictures/add_notes.svg";
import BlankView from "@/components/BlankView";
import getSupabase from "@/supabase/server";
import { getMyProfile } from "@/supabase/models/Profile";
import { revalidatePath } from "next/cache";
import CreateNoteButton from "@/components/CreateNoteButton";

export default function NoNotes({ subjectId }: { subjectId: number }) {
    async function createNoteAction(content: string, title?: string) {
        "use server";

        const { id } = await getMyProfile();

        const { error } = await getSupabase()
            .from("subject_notes")
            .insert({ title, content, subject_id: subjectId, author_id: id });

        if (error) return error.message;

        revalidatePath("/subjects/" + subjectId);
    }

    return <BlankView title={"No notes found"} image={addNotesImage} alt="">
        <nav className="flex items-center justify-center">
            <CreateNoteButton action={createNoteAction}/>
        </nav>
    </BlankView>;
}