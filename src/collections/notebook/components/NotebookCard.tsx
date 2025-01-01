import { NotebookEntity } from "@/app/(app)/topics/[topicId]/notebook/_feature/lib/db/NotebookData";
import { Card, CardHeader } from "@nextui-org/card";
import { Topic } from "@aio/db/entities";

export interface NotebookCardProps {
    notebook: NotebookEntity & { topic: Topic };
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
    const name = notebook.alias || notebook.topic.title;
    return <Card className="bg-black">
        <CardHeader>
            {name}
        </CardHeader>
    </Card>;
}