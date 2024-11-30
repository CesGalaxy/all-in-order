import { IconFilePlus, IconUpload } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";
import ModalButton from "@/components/utils/ModalButton";
import CreateDocModal from "@/collections/docs/components/modals/CreateDocModal";

export default function CreateDocButton({ topicId }: { topicId: number }) {
    const t = useTranslations();

    return <nav className="flex flex-wrap gap-2">
        <ModalButton modal={<CreateDocModal action={topicId}/>} startContent={<IconFilePlus/>} color="primary">
            {t("Dash.Topic.create_doc_new")}
        </ModalButton>
        <Button startContent={<IconUpload/>}>{t("Dash.Topic.upload_doc")}</Button>
    </nav>;
}