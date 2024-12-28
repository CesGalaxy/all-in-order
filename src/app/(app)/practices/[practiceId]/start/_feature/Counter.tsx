"use client";

import { Chip } from "@nextui-org/chip";
import { useExam } from "@/app/(app)/practices/[practiceId]/start/_feature/ExamContext";
import { useEffect, useState } from "react";
import { IconClock } from "@tabler/icons-react";

export default function Counter() {
    const { startedAt } = useExam();

    const [secondsPassed, setSecondsPassed] = useState(0);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsPassed(Math.floor((Date.now() - startedAt) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [startedAt]);

    const hours = Math.floor(secondsPassed / 3600);
    const minutes = Math.floor((secondsPassed % 3600) / 60);
    const seconds = secondsPassed % 60

    return <>
        <Chip
            className="text-xl font-medium font-mono gap-2 data-[h=true]:absolute data-[h=true]:-top-4 data-[h=true]:left-8 data-[h=true]:-translate-x-1/2 transition-all"
            size="lg"
            startContent={<IconClock/>}
            onClick={() => setHidden(!hidden)}
            data-h={hidden}
            classNames={{ base: hidden ? "px-1" : "", content: hidden ? "hidden" : "" }}
        >
            {!hidden && <span>
                {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </span>}
        </Chip>
        {hidden && <i/>}
    </>;
}