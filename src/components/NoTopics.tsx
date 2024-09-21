import BlankView from "@/components/BlankView";
import noDataImage from "@/assets/pictures/no_data.svg";
import CreateTopicButton from "@/components/CreateTopicButton";
import getSupabase from "@/supabase/server";
import { redirect } from "next/navigation";

export default function NoTopics({ subjectId }: { subjectId: number }) {
    async function createTopicAction(title: string, description: string) {
        "use server";
        
        const { data, error } = await getSupabase()
            .from("topics")
            .insert({ title, description, subject_id: subjectId })
            .select("id")
            .maybeSingle();

        if (error) return error.message;
        if (!data) return "Unknown error!";

        redirect(`/topics/${data.id}`);
    }

    return <BlankView
        title={"No topics found"}
        content={"Create a new topic for storing all the material"}
        image={noDataImage}
        alt=""
    >
        <CreateTopicButton createTopicAction={createTopicAction}/>
    </BlankView>
}