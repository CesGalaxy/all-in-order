import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link as TransitionLink } from "next-view-transitions";
import NoteOptions from "@/collections/note/components/navigation/NoteOptions";
import { Divider } from "@nextui-org/divider";
import { SubjectNote } from "@aio/db/entities";

const NoteCard = ({ note }: { note: SubjectNote }) => <Card key={note.id} as="li" shadow="sm" radius="sm">
    <CardHeader className="justify-between flex-wrap gap-4">
        <h2 className="font-bold text-xl">{note.title}</h2>
        <ButtonGroup>
            <Button
                as={TransitionLink}
                href={`/subjects/${note.subject_id}/notes/${note.id}`}
                scroll={false}
                size="sm"
            >
                {'t("Global.viewMore")'}
            </Button>
            <NoteOptions/>
        </ButtonGroup>
    </CardHeader>
    <Divider/>
    <CardBody className="text-default-500">{note.content}</CardBody>
</Card>;

export default NoteCard;