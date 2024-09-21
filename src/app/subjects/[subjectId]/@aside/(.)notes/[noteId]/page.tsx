"use server";

import getSupabase from "@/supabase/server";
import ErrorView from "@/components/Error";
import required from "@/lib/helpers/required";
import AsideModalContainer from "@/components/containers/AsideModal";

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
        .select("*")
        .eq("subject_id", parseInt(subjectId));

    if (error) return <ErrorView message={error.message}/>;

    const notes = required(data);
    const note = notes.find(note => note.id === parseInt(noteId));

    if (note) return <ErrorView message="Note not found"/>;

    return <p>hello</p>
}
