import { Chip } from "@nextui-org/chip";
import { QuestionTrueOrFalseAttempt } from "@/features/beta_question/QuestionTrueOrFalse";
import { IconQuestionMark } from "@tabler/icons-react";

export default function PreviewTrueOrFalseQuestion({ question }: { question: QuestionTrueOrFalseAttempt }) {
    return <ul className="flex items-center gap-4 flex-wrap">
        {question.rows.map(
            (question, index) => <Chip
                as="li"
                key={index}
                startContent={<IconQuestionMark/>}
            >
                {question}
            </Chip>
        )}
    </ul>
}