"use client";

import { useRef, useState } from "react";

export default function useInitialWait(time?: number | null) {
    const [waiting, setWaiting] = useState(Boolean(time));

    const timeout = useRef<null | number>(null);

    if (!timeout.current && time) timeout.current = setTimeout(() => setWaiting(false), time) as unknown as number;

    return waiting;
}