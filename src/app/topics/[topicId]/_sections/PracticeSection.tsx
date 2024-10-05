import CreatePracticeIconButton from "@/collections/practice/CreatePracticeIconButton";
import CreatePracticeModal from "@/collections/practice/CreatePracticeModal";
import NoPractices from "@/collections/practice/NoPractices";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import PracticeButton from "@/app/topics/[topicId]/_PracticeButton";
import SectionContainer from "@/components/containers/SectionContainer";

const LIST_CLASSNAME = "flex sm:w-full overflow-x-auto sm:overflow-x-visible " +
    "-mx-4 sm:mx-0 px-4 sm:px-0 sm:grid gap-4 -my-4 py-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3";

export interface PracticeSectionProps {
    practices: {
        id: number;
        title: string;
        description: string;
        attempts: { perfection: number }[];
    }[];
    createPracticeAction: (title: string, description: string) => Promise<string | undefined>;
    topicId: number;
    cls?: string;
}

export default function PracticeSection({ practices, createPracticeAction, topicId, cls }: PracticeSectionProps) {
    return <SectionContainer title="Practice" trailing={practices.length > 0 && <CreatePracticeIconButton>
        <CreatePracticeModal action={createPracticeAction}/>
    </CreatePracticeIconButton>}>
        {practices.length === 0
            ? <NoPractices topicId={topicId}/>
            : <ul className={LIST_CLASSNAME}>
                {practices.map(practice =>
                    <PracticeCard key={practice.id} practice={practice}/>)}
            </ul>
        }
    </SectionContainer>;
}

function PracticeCard({ practice }: { practice: PracticeSectionProps["practices"][any] }) {
    return <Card
        key={practice.id}
        as="li"
        className="min-w-64 sm:min-w-fit"
    >
        <CardHeader className="items-end gap-2" as={Link} href={`/practices/${practice.id}`}>
            <h3 className="text-xl text-foreground">{practice.title}</h3>
            {practice.description && <p>{practice.description}</p>}
        </CardHeader>
        <CardBody className="w-full flex-row items-center justify-evenly px-0">
            <div className="w-fit flex flex-col items-center">
                <Link href={`/practices/${practice.id}/attempts`}
                      className="text-default-500 text-xs uppercase">SCORE</Link>
                <b>
                    {practice.attempts.reduce((acc, attempt) => acc + attempt.perfection, 0)
                        / practice.attempts.length || '--'}
                    %
                </b>
            </div>
            <div className="w-fit flex flex-col items-center">
                <Link href={`/practices/${practice.id}/attempts`}
                      className="text-default-500 text-xs uppercase">ATTEMPTS</Link>
                <b>{practice.attempts.length}</b>
            </div>
        </CardBody>
        <CardFooter>
            <PracticeButton practiceId={practice.id}/>
        </CardFooter>
    </Card>;
}