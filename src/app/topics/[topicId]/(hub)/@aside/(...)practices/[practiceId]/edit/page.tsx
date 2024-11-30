"use server";

import getSupabase from "@/supabase/server";
import AsideModalContainer from "@/components/containers/AsideModal";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import EditPracticeForm from "@/app/topics/[topicId]/(hub)/@aside/(...)practices/[practiceId]/edit/_EditPracticeForm";
import { Divider } from "@nextui-org/divider";
import PracticePreviewTabs from "@/app/topics/[topicId]/(hub)/_components/navigation/PracticePreviewTabs";

export default async function Page({ params: { topicId, practiceId } }: {
    params: { topicId: string, practiceId: string }
}) {
    const { data, error } = await getSupabase()
        .from("practices")
        .select("id, title, description")
        .eq("id", parseInt(practiceId))
        .maybeSingle();

    const topicPath = "/topics/" + topicId;

    if (error) return <AsideModalContainer closeUrl={topicPath}>
        <ErrorView message={error.message}/>
    </AsideModalContainer>;

    const { id, title, description } = required(data, topicPath);

    async function editPractice(title: string, description: string) {
        "use server";
        return undefined;
    }

    return <AsideModalContainer
        title={title}
        className="md:w-1/2 md:min-w-96"
        closeUrl={topicPath}
        actions={<PracticePreviewTabs currentTab="edit" practiceId={id}/>}
    >
        <div className="p-4">
            <h1 className="text-3xl font-medium">Edit practice</h1>
            <Divider/>
            <br/>
            <EditPracticeForm practiceTitle={title} practiceDescription={description} action={editPractice}/>
        </div>
    </AsideModalContainer>;
}