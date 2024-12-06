import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { ButtonGroup } from "@nextui-org/button";
import { Link as TransitionLink } from "next-view-transitions";
import NoteOptions from "@/collections/note/components/navigation/NoteOptions";
import { Divider } from "@nextui-org/divider";
import { SubjectNote } from "@aio/db/entities";
import ModalButton from "@/components/utils/ModalButton";
import NoteModal from "@/collections/note/components/modals/NoteModal";

const NoteCard = ({ note }: { note: SubjectNote }) => {
    return <Card key={note.id} as="section" shadow="sm" radius="sm">
        <CardHeader className="justify-between flex-wrap gap-4">
            <h2 className="font-bold text-xl">{note.title}</h2>
            <ButtonGroup>
                <ModalButton
                    modal={<NoteModal/>}
                    as={TransitionLink}
                    href="#"
                    size="sm"
                    modalProps={{ size: "xl" }}
                >
                    {'t("Global.viewMore")'}
                </ModalButton>
                <NoteOptions/>
            </ButtonGroup>
        </CardHeader>
        <Divider/>
        <CardBody className="text-default-500">{note.content}</CardBody>
    </Card>
};

export default NoteCard;