import { Chip } from "@nextui-org/chip";
import { IconCheck, IconX } from "@tabler/icons-react";
import { QuestionTrueOrFalseData } from "@aio/db/features/questions/TrueOrFalse";

export default function TrueOrFalseQuestionSolution({ question }: { question: QuestionTrueOrFalseData }) {
    return <ul className="flex items-center gap-4 flex-wrap">
        {Object.entries(question.rows).map(
            ([question, correct], index) => <Chip
                as="li"
                key={index}
                color={correct ? 'success' : 'danger'}
                startContent={correct ? <IconCheck size={16}/> : <IconX size={16}/>}
            >
                {question}
            </Chip>
        )}
    </ul>
}