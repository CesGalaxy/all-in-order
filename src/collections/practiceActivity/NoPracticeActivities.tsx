import addPracticeImage from "@/assets/pictures/add_practice.svg";
import Blank from "@/components/views/Blank";
import { Button } from "@nextui-org/button";
import { IconSparkles } from "@tabler/icons-react";
import CreatePracticeActivityButton from "@/collections/practiceActivity/CreatePracticeActivityButton";
import CreatePracticeActivityModal from "@/collections/practiceActivity/CreatePracticeActivityModal";

export default function NoPracticeActivities({ practiceId }: { practiceId: number }) {
    async function createActivityAction(title: string, details: string) {
        "use server";
        return undefined;
    }

    return <Blank title={"No activities found"} image={addPracticeImage} alt="">
        <nav className="flex flex-col gap-2">
            <CreatePracticeActivityButton>
                <CreatePracticeActivityModal action={createActivityAction}/>
            </CreatePracticeActivityButton>
            <Button startContent={<IconSparkles/>}>Generate with AI</Button>
        </nav>
    </Blank>;
}