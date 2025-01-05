export interface QuestionOverviewCardProps {
    question: {
        id: string;
        data: {
            title: string;
            details?: string;
            type: string;
        };
        tags: string[];
    };
    topicId: string;
}

export default function QuestionOverviewCard({}: QuestionOverviewCardProps) {
    return <p>This is a card</p>;
}