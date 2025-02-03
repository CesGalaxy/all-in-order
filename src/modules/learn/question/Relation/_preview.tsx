import { QuestionRelationAttempt } from "@/modules/learn/question/Relation/index";

export default function PreviewRelationQuestion({ attempt }: { attempt: QuestionRelationAttempt }) {
    return <div className="grid grid-cols-2 gap-8">
        <ul className="list-disc list-inside">
            {attempt.terms.map(term => <li key={term}>{term}</li>)}
        </ul>
        <ul className="list-disc list-inside">
            {attempt.definitions.map((definition, i) => <li key={i}>{definition}</li>)}
        </ul>
    </div>
}