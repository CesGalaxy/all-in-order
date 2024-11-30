import { QuestionChoiceAttempt } from "@aio/db/features/questions/Choice";
import { Chip } from "@nextui-org/chip";

export default function PreviewChoiceQuestion({ question }: { question: QuestionChoiceAttempt }) {
    return <ul className="flex items-center gap-4 flex-wrap">
        {question.choices.map(
            (choice, index) => <Chip as="li" key={index}>
                {choice}
            </Chip>
        )}
    </ul>
}