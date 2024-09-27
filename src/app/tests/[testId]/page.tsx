import required from "@/lib/helpers/required";
import TestSelector from "@/app/tests/[testId]/_TestSelector";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconPencil, IconPlayerPlay, IconSparkles, IconTrash } from "@tabler/icons-react";
import CreateQuestionButton from "@/app/tests/[testId]/_CreateQuestionButton";
import QuestionSimpleCard from "@/app/tests/[testId]/_QuestionSimpleCard";
import { Link } from "@nextui-org/link";
import AskToAIButton from "@/app/tests/[testId]/_AskToAiButton";
import SectionContainer from "@/components/containers/SectionContainer";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import PageContainer from "@/components/containers/Page";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";

export default async function Page({ params: { testId } }: { params: { testId: string } }) {
    const testRequest = getSupabase()
        .from("topic_tests")
        .select()
        .eq("id", testId)
        .maybeSingle();

    const attemptsRequest = getSupabase()
        .from("topic_test_attempts")
        .select()
        .eq("test_id", testId);

    async function addQuestion() {
        "use server";
        return undefined;
    }

    const { data: testData, error: testError } = await testRequest;
    if (testError) return <ErrorView message={testError.message}/>;
    const test = required(testData, "/topic_tests/" + testId);

    const { data: attemptsData, error: attemptsError } = await attemptsRequest;
    if (attemptsError) return <ErrorView message={attemptsError.message}/>;
    const attempts = required(attemptsData, "/topic/" + test.topic_id);

    return <PageContainer className="flex flex-col items-stretch justify-stretch gap-4">
        <header className="w-full flex items-center gap-8">
            <TestSelector tests={[test]} testId={testId}/>
            <ButtonGroup>
                <Button color="primary" startContent={<IconPlayerPlay/>} as={Link} href={test.id + "/attempt"}>
                    Start test
                </Button>
                <Button startContent={<IconPencil/>}>Edit</Button>
                <Button color="danger" startContent={<IconTrash/>}>Delete</Button>
            </ButtonGroup>
            <div>
                <CreateQuestionButton action={addQuestion}/>
            </div>
            <AskToAIButton test={test}/>
        </header>
        <div className="w-full h-full flex-grow grid grid-cols-4 gap-8">
            <div className="w-full h-full col-span-3">
                <h2 className="text-4xl">Questions</h2>
                <hr/>
                <br/>
                {!test.questions || test.questions.length === 0
                    ? <div className="w-full py-8 flex flex-col items-center justify-center gap-4">
                        <h3 className="text-2xl">No questions found.</h3>
                        <p>There are no questions available for this test yet.</p>
                        <nav className="flex items-center gap-4">
                            <CreateQuestionButton action={addQuestion}/>
                            <Button startContent={<IconSparkles/>}>Ask to AI</Button>
                        </nav>
                    </div>
                    : <div className="grid grid-cols-4 gap-4">
                        {test.questions.map(question => <QuestionSimpleCard key={question.id} question={question}/>)}
                    </div>}
            </div>
            <SectionContainer title="Recent attempts">
                <ul>
                    {attempts.map(attempt => <Card as="li" key={attempt.id}
                                                   className="w-full flex items-center gap-4 flex-row">
                        <CardHeader className="flex-col w-min flex-grow items-start">
                            <h3>Score: {attempt.score}</h3>
                            <time dateTime={new Date(attempt.started_at).toISOString()}>
                                {new Date(attempt.started_at).toLocaleString()}
                            </time>
                        </CardHeader>
                        <CardFooter className="w-min">
                            <ButtonGroup>
                                <Button startContent={<IconPlayerPlay/>} as={Link}
                                        href={test.id + "/attempt/" + attempt.id}>
                                    Review
                                </Button>
                                <Button isIconOnly color="danger"><IconTrash/></Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>)}
                </ul>
            </SectionContainer>
        </div>
    </PageContainer>
}