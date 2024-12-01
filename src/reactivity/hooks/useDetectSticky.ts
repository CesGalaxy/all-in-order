import { RefObject, useEffect, useState } from "react";

/**
 * detects when a (CSS) sticky element changes "sticky" state
 * @param {object} ref optional react ref. if not provided, a new one will be used instead.
 * @param {object} observerSettings Observer's settings object
 */
export default function useDetectSticky(ref: RefObject<HTMLElement>, observerSettings: object = { threshold: [1] }) {
    const [isSticky, setIsSticky] = useState(false)

    // mount 
    useEffect(() => {
        if (!ref.current) return;

        const cachedRef = ref.current;
        const observer = new IntersectionObserver(([e]) => setIsSticky(e.intersectionRatio < 1), observerSettings)

        observer.observe(cachedRef);

        return () => observer.unobserve(cachedRef);
    }, [observerSettings, ref])

    return [isSticky, ref, setIsSticky];
}