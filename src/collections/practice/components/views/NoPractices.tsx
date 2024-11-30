import addPracticeImage from "@/assets/pictures/add_practice.svg";
import Blank from "@/components/views/Blank";
import CreatePracticeButton from "@/collections/practice/components/CreatePracticeButton";
import { Button } from "@nextui-org/button";
import { IconSparkles } from "@tabler/icons-react";

export interface NoPracticesProps {
    topicId: number;
    createPracticeAction: (title: string, description: string) => Promise<string | undefined>;
}

export default function NoPractices({ topicId, createPracticeAction }: NoPracticesProps) {
    return <Blank title={"No practices found"} image={addPracticeImage} alt="">
        <nav className="flex flex-col gap-2">
            <CreatePracticeButton action={createPracticeAction}/>
            <Button startContent={<IconSparkles/>}>Make with AI</Button>
        </nav>
    </Blank>;
}