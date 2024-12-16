import NbVocabPageNavbar
    from "@/app/topics/[topicId]/notebook/vocabulary/_feature/components/navigation/NbVocabPageNavbar";

export interface NbVocabPageProps {
    area: {
        id: number;
        icon: string | null;
        name: string;
    }
}

export default function NbVocabPage({ area }: NbVocabPageProps) {
    return <div>
        <NbVocabPageNavbar area={area}/>
    </div>
}