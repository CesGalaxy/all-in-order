import NbVocabPageNavbar
    from "@/app/topics/[topicId]/notebook/vocabulary/_feature/components/navigation/NbVocabPageNavbar";
import NbVocabDefinitionsTable
    from "@/app/topics/[topicId]/notebook/vocabulary/_feature/components/data/NbVocabDefinitionsTable";
import PageContainer from "@/components/containers/PageContainer";

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
    return <div>
        <NbVocabPageNavbar area={area}/>
        <PageContainer>
            <NbVocabDefinitionsTable definitions={area.definitions}/>
        </PageContainer>
    </div>
}