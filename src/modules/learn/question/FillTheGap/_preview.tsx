import { QuestionFillTheGapAttempt } from "@/modules/learn/question/FillTheGap";
import { Chip } from "@nextui-org/chip";
import { IconChevronUp } from "@tabler/icons-react";
import { Tooltip } from "@nextui-org/tooltip";

export default function PreviewFillTheGapQuestion({ attempt }: { attempt: QuestionFillTheGapAttempt }) {
    return <ul className="flex items-center gap-1 flex-wrap">
        {attempt.segments.map(
            (segment, index) => typeof segment === "string"
                ? <span key={index}>{segment}</span>
                : <Tooltip
                    key={index}
                    isDisabled={segment.type === "text"}
                    content={segment.type === "choice"
                        ? <ul className="flex items-center justify-center gap-2 flex-wrap max-w-max">
                            {segment.answers.map(choice => <Chip as="li" key={choice}>{choice}</Chip>)}
                        </ul>
                        : undefined}
                >
                    <Chip
                        as="li"
                        key={index}
                        radius="sm"
                        className="min-w-16 text-center"
                        aria-label={segment.answers.join(", ")}
                        endContent={
                            segment.type === "choice"
                                ? <IconChevronUp/>
                                : undefined
                        }
                    >
                        {segment.hint}
                    </Chip>
                </Tooltip>
        )}
    </ul>;
}