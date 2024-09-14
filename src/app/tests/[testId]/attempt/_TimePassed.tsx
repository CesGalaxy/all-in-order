"use client";

import { useEffect, useState } from "react";

export default function TimePassed({ startedAt }: { startedAt: number }) {
    const [timePassed, setTimePassed] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimePassed(Date.now() - startedAt);
        }, 1000);

        return () => clearInterval(interval);
    }, [startedAt]);

    return Math.floor(timePassed / 1000 / 60) + ":" + (Math.floor(timePassed / 1000) % 60).toString().padStart(2, "0");
}