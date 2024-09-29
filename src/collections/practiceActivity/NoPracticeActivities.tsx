import addPracticeImage from "@/assets/pictures/add_practice.svg";
import Blank from "@/components/views/Blank";
import { Button } from "@nextui-org/button";
import { IconRecycle, IconSparkles } from "@tabler/icons-react";
import CreatePracticeActivityButton from "@/collections/practiceActivity/CreatePracticeActivityButton";
import CreatePracticeActivityModal from "@/collections/practiceActivity/CreatePracticeActivityModal";
import createPracticeActivity from "@/collections/practiceActivity/actions";

export default function NoPracticeActivities({ practiceId, topicId }: { practiceId: number, topicId: number }) {
    return <Blank title="No activities found" image={addPracticeImage} alt="No activities">
        <nav className="flex flex-col gap-2">
            <CreatePracticeActivityButton>
                <CreatePracticeActivityModal action={createPracticeActivity.bind(null, topicId, practiceId)}/>
            </CreatePracticeActivityButton>
            <Button startContent={<IconRecycle/>}>Use existent activity</Button>
            <Button startContent={<IconSparkles/>}>Generate with AI</Button>
        </nav>
    </Blank>;
}