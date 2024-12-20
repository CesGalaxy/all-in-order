import { useTranslations } from "next-intl";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import PracticeButton from "@/collections/practice/components/navigation/PracticeButton";
import { PracticeSectionProps } from "@/app/topics/[topicId]/(hub)/_components/organisms/TopicRecentPracticesSection";

export default function PracticeCard({ practice }: { practice: PracticeSectionProps["practices"][any] }) {
    const t = useTranslations();

    return <Card
        key={practice.id}
        as="li"
        className="min-w-64 sm:min-w-fit"
        shadow="none"
    >
        <CardHeader className="items-end gap-2" as={Link} href={`/practices/${practice.id}`}>
            <h3 className="text-xl text-foreground">{practice.title}</h3>
            {practice.description && <p>{practice.description}</p>}
        </CardHeader>
        <CardBody className="w-full flex-row items-center justify-evenly px-0">
            <div className="w-fit flex flex-col items-center">
                <Link href={`/practices/${practice.id}/attempts`}
                      className="text-default-500 text-xs uppercase">{t("App.score")}</Link>
                <b>
                    {practice.attempts.reduce((acc, attempt) => acc + attempt.perfection, 0)
                        / practice.attempts.length || '--'}
                    %
                </b>
            </div>
            <div className="w-fit flex flex-col items-center">
                <Link href={`/practices/${practice.id}/attempts`}
                      className="text-default-500 text-xs uppercase">{t("App.attempts")}</Link>
                <b>{practice.attempts.length}</b>
            </div>
        </CardBody>
        <CardFooter>
            <PracticeButton practiceId={practice.id} ready={practice.activities[0].count > 0}/>
        </CardFooter>
    </Card>;
}