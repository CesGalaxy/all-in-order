import { NotebookEntity } from "@/modules/notebook/app/supabase/db/NotebookData";
import { Card, CardHeader } from "@heroui/card";
import { Topic } from "@/lib/supabase/entities";
import { Link } from "@heroui/link";

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