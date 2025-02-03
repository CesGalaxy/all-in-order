import React from "react";

import { IconMasksTheater, IconShieldExclamation, IconWand } from "@tabler/icons-react";
import AIChatFeatureCard from "@/modules/ai/chat/components/AIChatFeatureCard";

const featuresCategories = [
    {
        key: "examples",
        title: "Examples",
        icon: IconMasksTheater,
        descriptions: [
            "Explain quantum computing in simple terms",
            "Got any creative ideas for a 10 year old' birthday?",
            "How do I make an HTTP request in Javascript?",
        ],
    },
    {
        key: "capabilities",
        title: "Capabilities",
        icon: IconWand,
        descriptions: [
            "Remembers what user said earlier in the conversation",
            "Allows user to provide follow-up corrections",
            "Trained to decline inappropriate requests",
        ],
    },
    {
        key: "limitations",
        title: "Limitations",
        icon: IconShieldExclamation,
        descriptions: [
            "May occasionally generate incorrect information",
            "May occasionally produce harmful instructions or biased information.",
            "Limited knowledge of world and events after April 2023",
        ],
    },
];

export default function AIChatFeatures() {
    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {featuresCategories.map(({ key, descriptions, title, icon: Icon }) => (
            <AIChatFeatureCard
                key={key}
                descriptions={descriptions}
                icon={<Icon width={40}/>}
                title={title}
            />
        ))}
    </div>;
}
