import { QuestionRelationData } from "@/modules/learn/question/Relation/index";

export default function RelationQuestionSolution({ question }: { question: QuestionRelationData }) {
    return <ul className="list-disc list-inside">
        {Object.entries(question.pairs).map(([key, value], index) => <li key={index}>
            <b>{key}:</b> {value}
        </li>)}
    </ul>
}