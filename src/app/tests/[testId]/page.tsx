import required from "@/lib/helpers/required";
import { getAllTopicTests, getTopicTestByIdWithQuestions } from "@/lib/supabase/models/TopicTest";
import TestSelector from "@/app/tests/[testId]/_TestSelector";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
    IconChevronDown,
    IconPencil,
    IconPlayerPlay,
    IconSparkles,
    IconTrash
} from "@tabler/icons-react";
import CreateQuestionButton from "@/app/tests/[testId]/_CreateQuestionButton";
import { createTopicTestQuestion } from "@/lib/supabase/models/TopicTestQuestion";
import QuestionSimpleCard from "@/app/tests/[testId]/_QuestionSimpleCard";

export default async function Page({ params: { testId } }: { params: { testId: string } }) {
    const test = required(await getTopicTestByIdWithQuestions(parseInt(testId)));
    const tests = required(await getAllTopicTests(test.topic_id), "/topic/" + test.topic_id);

    const createAction = createTopicTestQuestion.bind(null, test.id, test.questions.length);

    return <div className="w-full h-full flex flex-col items-stretch justify-stretch pt-4 gap-4">
        <header className="px-16 w-full flex items-center gap-8">
            <TestSelector tests={tests} testId={testId}/>
            <ButtonGroup>
                <Button color="primary" startContent={<IconPlayerPlay/>}>Start test</Button>
                <Button startContent={<IconPencil/>}>Edit</Button>
                <Button color="danger" startContent={<IconTrash/>}>Delete</Button>
            </ButtonGroup>
            <div>
                <CreateQuestionButton create={createAction}/>
            </div>
            <ButtonGroup>
                <Button startContent={<IconSparkles/>}>Ask to AI</Button>
                <Button isIconOnly><IconChevronDown/></Button>
            </ButtonGroup>
        </header>
        <div className="w-full h-full flex-grow px-16 grid grid-cols-4 gap-8">
            <div className="w-full h-full col-span-3">
                <h2 className="text-4xl">Questions</h2>
                <hr/>
                <br/>
                {!test.questions || test.questions.length === 0
                    ? <div className="w-full py-8 flex flex-col items-center justify-center gap-4">
                        <h3 className="text-2xl">No questions found.</h3>
                        <p>There are no questions available for this test yet.</p>
                        <nav className="flex items-center gap-4">
                            <CreateQuestionButton create={createAction}/>
                            <Button startContent={<IconSparkles/>}>Ask to AI</Button>
                        </nav>
                    </div>
                    : <div className="grid grid-cols-4 gap-4">
                        {test.questions.map(question => <QuestionSimpleCard key={question.id} question={question}/>)}
                    </div>}
            </div>
            {test.name}
        </div>
    </div>
}