import addPracticeImage from "@/assets/pictures/add_practice.svg";
import Blank from "@/components/views/Blank";
import { Button } from "@nextui-org/button";
import { IconSparkles } from "@tabler/icons-react";
import CreatePracticeActivityButton from "@/collections/practiceActivity/CreatePracticeActivityButton";
import CreatePracticeActivityModal from "@/collections/practiceActivity/CreatePracticeActivityModal";
import createActivityAction from "@/collections/practiceActivity/actions/createActivityAction";

export default function NoPracticeActivities({ practiceId }: { practiceId: number }) {
    return <Blank title="No activities found" image={addPracticeImage} alt="No activities">
        <nav className="flex flex-col gap-2">
            <CreatePracticeActivityButton>
                <CreatePracticeActivityModal action={createActivityAction.bind(null, practiceId)}/>
            </CreatePracticeActivityButton>
            <Button startContent={<IconSparkles/>}>Generate with AI</Button>
        </nav>
    </Blank>;
}