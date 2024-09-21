import { BaseQuestion } from "@/features/question/Question";

export interface RelationQuestion extends BaseQuestion {
    type: "relation",
    relations: [string, string][],
    extra_a: string[],
    extra_b: string[]
    game: boolean
}

export interface RelationQuestionAnswer {
    selected_relations: [string, string][]
}

export function RelationQuestionTooltip({ relations, extra_a, extra_b }: RelationQuestion) {
    return <div>
        <ul>
            {relations.map(([a, b], index) => <li key={index} className="grid grid-cols-2">
                <span>{a}</span>
                <span>{b}</span>
            </li>)}
        </ul>
        {extra_a && <ul>
            {extra_a.map((a, index) => <li key={index}>{a}</li>)}
        </ul>}
        {extra_b && <ul>
            {extra_b.map((b, index) => <li key={index}>{b}</li>)}
        </ul>}
    </div>;
}
