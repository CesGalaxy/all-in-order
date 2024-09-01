import required from "@/lib/helpers/required";
import { getTopicTestByIdWithQuestions } from "@/lib/supabase/models/TopicTest";
import { redirect } from "next/navigation";
import Exam from "@/app/tests/[testId]/attempt/_Exam";

export default async function Page({ params: { testId } }: { params: { testId: string } }) {
    const test = required(await getTopicTestByIdWithQuestions(parseInt(testId)));

    if (test.questions.length === 0) redirect("/tests/" + testId);

    const startTime = Date.now();
    const randomSeeds = Array.from({ length: test.questions.length }, (_, i) => Math.random() * i);

    return <div className="w-full h-full pt-4">
        <Exam
            testName={test.name}
            testDescription={test.description}
            questions={test.questions.map(question => question.data)}
            randomSeeds={randomSeeds}
        />
    </div>;
}