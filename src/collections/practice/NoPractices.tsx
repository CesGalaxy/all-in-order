import addPracticeImage from "@/assets/pictures/add_practice.svg";
import Blank from "@/components/views/Blank";
import CreatePracticeButton from "@/collections/practice/CreatePracticeButton";
import CreatePracticeModal from "@/collections/practice/CreatePracticeModal";
import { Button } from "@nextui-org/button";
import { IconSparkles } from "@tabler/icons-react";
import getSupabase from "@/supabase/server";
import { getMyProfile } from "@/supabase/models/Profile";
import { redirect } from "next/navigation";

export default function NoPractices({ topicId }: { topicId: number }) {
    async function createPracticeAction(title: string, description: string) {
        "use server";

        const { id } = await getMyProfile();

        const { data, error } = await getSupabase()
            .from("practices")
            .insert({ topic_id: topicId, title, description, created_by: id })
            .select("id")
            .maybeSingle();

        if (error) return error.message;

        redirect("/practices/" + data!.id);
    }

    return <Blank title={"No practices found"} image={addPracticeImage} alt="">
        <nav className="flex flex-col gap-2">
            <CreatePracticeButton>
                <CreatePracticeModal action={createPracticeAction}/>
            </CreatePracticeButton>
            <Button startContent={<IconSparkles/>}>Make with AI</Button>
        </nav>
    </Blank>;
}