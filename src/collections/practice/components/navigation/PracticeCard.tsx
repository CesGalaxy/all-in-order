import { useTranslations } from "next-intl";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import PracticeButton from "@/collections/practice/components/navigation/PracticeButton";

export default function PracticeCard({ practice }: {
    practice: {
        created_at: string
        created_by: number | null
        description: string
        id: number
        title: string
        topic_id: number
        updated_at: string | null
        activities: { count: number }[]
        attempts: { perfection: number }[]
    }
}) {
    const t = useTranslations();

    const avg = practice.attempts.reduce((acc, attempt) => acc + attempt.perfection, 0) / practice.attempts.length;

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
                <b>{Math.round(avg) || '--'}%</b>
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