import { Chip } from "@heroui/chip";
import { QuestionChoiceAttempt } from "@/modules/learn/question/Choice";

export default function PreviewChoiceQuestion({ attempt }: { attempt: QuestionChoiceAttempt }) {
    return <ul className="flex items-center gap-4 flex-wrap">
        {attempt.choices.map(
            (choice, index) => <Chip as="li" key={index}>
                {choice}
            </Chip>
        )}
    </ul>
}