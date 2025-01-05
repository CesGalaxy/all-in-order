import { QuestionFillTheGapData, QuestionFillTheGapDataGap as Gap } from "@/modules/learn/question/FillTheGap";

export default function FillTheGapQuestionSolution({ question }: { question: QuestionFillTheGapData }) {
    const solvedSegments: (string | Gap)[] = [];
    let currentTextSegment = "";

    // Check for each char
    for (let i = 0; i < question.text.length; i++) {
        // Add the char to the current text segment buffer
        currentTextSegment += question.text[i];

        // Check for each gap
        for (let j = 0; j < question.gaps.length; j++) {
            const gap = question.gaps[j];

            if (gap.position === i) {
                // Add the text segment (just the first time
                if (currentTextSegment) {
                    solvedSegments.push(currentTextSegment);
                    currentTextSegment = "";
                }

                solvedSegments.push(gap)
            }
        }
    }

    solvedSegments.push(currentTextSegment);

    return <p className="flex items-center gap-1 flex-wrap">
        {solvedSegments.map((segment, index) => typeof segment === "string"
            ? <span key={index}>{segment}</span>
            : <span key={index} className="bg-gray-200 p-1 rounded-md">
                {segment.correctValues.join(", ")}
            </span>
        )}
    </p>;
}