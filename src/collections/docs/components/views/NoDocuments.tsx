import { useTranslations } from "next-intl";
import CreateDocButton from "@/collections/docs/components/CreateDocButton";

export default function NoDocuments({ topicId }: { topicId: number }) {
    const t = useTranslations('Dash.Topic');

    return <div className="w-full h-full flex-grow flex flex-col items-center justify-center gap-4">
        <h3 className="text-2xl">{t('no_documents')}</h3>
        <p>{t("no_documents_yet")}</p>
        <CreateDocButton topicId={topicId}/>
    </div>;
}