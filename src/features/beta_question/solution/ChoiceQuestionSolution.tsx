import { QuestionChoiceData } from "@aio/db/features/questions/Choice";
import { Chip } from "@nextui-org/chip";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function ChoiceQuestionSolution({ question }: { question: QuestionChoiceData }) {
    return <ul className="flex items-center gap-4 flex-wrap">
        {Object.entries(question.choices).map(
            ([choice, correct], index) => <Chip
                as="li"
                key={index}
                color={correct ? 'success' : 'danger'}
                startContent={correct ? <IconCheck size={16}/> : <IconX size={16}/>}
            >
                {choice}
            </Chip>
        )}
    </ul>
}