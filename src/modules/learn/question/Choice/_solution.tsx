import { Chip } from "@heroui/chip";
import { IconCheck, IconX } from "@tabler/icons-react";
import { QuestionChoiceData } from "@/modules/learn/question/Choice";

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