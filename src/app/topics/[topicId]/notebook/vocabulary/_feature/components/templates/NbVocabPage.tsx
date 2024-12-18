import NbVocabPageNavbar
    from "@/app/topics/[topicId]/notebook/vocabulary/_feature/components/navigation/NbVocabPageNavbar";
import NbVocabDefinitionsTable
    from "@/app/topics/[topicId]/notebook/vocabulary/_feature/components/data/NbVocabDefinitionsTable";
import PageContainer from "@/components/containers/PageContainer";
import { IconPencilPlus } from "@tabler/icons-react";
import ModalButton from "@/components/utils/ModalButton";
import NbAddDefinitionsModal from "@/app/topics/[topicId]/notebook/_feature/components/modals/NbAddDefinitionsModal";

export interface NbVocabPageProps {
    area: {
        id: number;
        icon: string | null;
        name: string;
        definitions: {
            id: number,
            term: string,
            definition: string,
        }[]
    }
}

export default function NbVocabPage({ area }: NbVocabPageProps) {
    return <div className="w-full h-full flex-grow flex flex-col">
        <NbVocabPageNavbar area={area}/>
        <PageContainer className="h-full flex-grow overflow-y-auto">
            <NbVocabDefinitionsTable definitions={area.definitions}/>
        </PageContainer>
        <ModalButton
            modal={<NbAddDefinitionsModal/>}
            color="primary"
            radius="none"
            size="lg"
            startContent={<IconPencilPlus/>}
        >
            New definition
        </ModalButton>
    </div>
}