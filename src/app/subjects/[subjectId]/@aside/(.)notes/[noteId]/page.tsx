"use server";

import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import AsideModalContainer from "@/components/containers/AsideModal";
import ShareButton from "@/app/subjects/[subjectId]/@aside/(.)notes/[noteId]/_ShareButton";
import EditButton from "@/app/subjects/[subjectId]/@aside/(.)notes/[noteId]/_EditButton";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

interface PageProps {
    params: { subjectId: string, noteId: string }
}

export default async function Page(props: PageProps) {
    return <AsideModalContainer closeUrl={"/subjects/" + props.params.subjectId}>
        <_Page {...props}/>
    </AsideModalContainer>;
}

async function _Page({ params: { subjectId, noteId } }: PageProps) {
    const { data, error } = await getSupabase()
        .from("subject_notes")
        .select()
        .eq("subject_id", parseInt(subjectId));

    if (error) return <ErrorView message={error.message}/>;

    const notes = required(data);
    const note = notes.find(note => note.id === parseInt(noteId));

    const t = await getTranslations();

    if (!note) return <ErrorView message={t("Dash.Note.not_found")}/>;

    async function editNote(title: string, content: string) {
        "use server";

        const { error } = await getSupabase()
            .from("subject_notes")
            .update({ title, content })
            .eq("id", parseInt(noteId));

        if (error) return error.message;

        revalidatePath("/subjects/" + subjectId);
    }

    return <div className="px-4">
        {note.title && <>
            <h1 className="text-3xl font-medium">{note.title}</h1>
            <hr/>
        </>}
        <p className="text-xl">{note.content}</p>
        <br/>
        <nav className="flex items-center gap-4">
            <EditButton note={note} action={editNote}/>
            {/* `undefined` makes sure the title isn't used when "" */}
            <ShareButton title={note.title || undefined} content={note.content}/>
        </nav>
    </div>;
}
