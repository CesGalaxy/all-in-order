"use server";

import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import EditPracticeForm from "@/app/(app)/@aside/(.)practices/[practiceId]/edit/_form";
import { Divider } from "@heroui/divider";

export default async function Page({ params }: { params: Promise<{ topicId: string, practiceId: string }> }) {
    const { topicId, practiceId } = await params;

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("practices")
        .select("id, title, description")
        .eq("id", parseInt(practiceId))
        .maybeSingle();

    const topicPath = "/topics/" + topicId;

    if (error) return <ErrorView message={error.message}/>;

    const { title, description } = required(data, topicPath);

    async function editPractice(title: string, description: string) {
        "use server";
        return undefined;
    }

    return <div className="p-4">
        <h1 className="text-3xl font-medium">Edit practice</h1>
        <Divider/>
        <br/>
        <EditPracticeForm practiceTitle={title} practiceDescription={description} action={editPractice}/>
    </div>;
}