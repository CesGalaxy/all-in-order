import { IconCheck, IconX } from "@tabler/icons-react";
import { BaseQuestion } from "@/features/question/Question";

export interface FillTheGapQuestion extends BaseQuestion {
    type: "fill_the_gap";
    segments: FillTheGapQuestionSegment[];
}

export type FillTheGapQuestionSegment = string | FillTheGapQuestionGap;

export type FillTheGapQuestionGap = {
    hint?: string;
} & (
    { type: "text", answers: string[] }
    | { type: "choice", choices: [string, boolean][] }
    );

export interface FillTheGapQuestionAnswer {
    answers: string[];
}

export function FillTheGapQuestionAnswerTooltip({ question }: { question: FillTheGapQuestion }) {
    return <ul className="flex items-start gap-2">
        {question.segments.map((segment, index) => <li key={index} className="not-mb-4">
            {typeof segment === "string" ? segment.trim() : <FillTheGapQuestionGapTooltip gap={segment}/>}
        </li>)}
    </ul>;
}

function FillTheGapQuestionGapTooltip({ gap }: { gap: FillTheGapQuestionGap }) {
    return <div>
        {/*{gap.hint && <p className="text-info">{gap.hint}</p>}*/}
        {gap.type === "text" ? <FillTheGapQuestionTextGapTooltip answers={gap.answers}/> : <FillTheGapQuestionChoiceGapTooltip choices={gap.choices}/>}
    </div>;
}

function FillTheGapQuestionTextGapTooltip({ answers }: { answers: string[] }) {
    return <ul className="bg-content2 text-content2-foreground px-1">
        {answers.map((answer, index) => <li key={index} className="flex items-center gap-1">
            <IconCheck size={16}/>
            {answer}
        </li>)}
    </ul>;
}

function FillTheGapQuestionChoiceGapTooltip({ choices }: { choices: [string, boolean][] }) {
    return <ul className="bg-content2 text-content2-foreground px-1">
        {choices.map(([choice, correct], index) => <li key={index} className="flex items-center gap-1">
            {correct ? <IconCheck size={16} /> : <IconX size={16} />}
            {choice}
        </li>)}
    </ul>;
}
