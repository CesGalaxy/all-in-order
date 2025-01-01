import { NotebookEntity } from "@/app/(app)/topics/[topicId]/notebook/_feature/lib/db/NotebookData";
import { Card, CardHeader } from "@nextui-org/card";
import { Topic } from "@aio/db/entities";
import { Link } from "@nextui-org/link";

export interface NotebookCardProps {
    notebook: Pick<NotebookEntity, "alias"> & { topic: Pick<Topic, "id" | "title"> };
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
    const name = notebook.alias || notebook.topic.title;

    return <Card className="bg-black" isPressable as={Link} href={"/topics/" + notebook.topic.id}>
        <CardHeader>
            {name}
        </CardHeader>
    </Card>;
}