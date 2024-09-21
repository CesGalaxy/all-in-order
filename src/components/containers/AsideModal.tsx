"use client";

import { Button } from "@nextui-org/button";
import { IconArrowBack } from "@tabler/icons-react";
import { useTransitionRouter } from "next-view-transitions";

export default function AsideModalContainer({ children, closeUrl, title }: {
    children: React.ReactNode,
    closeUrl?: string,
    title?: string
}) {
    const router = useTransitionRouter();

    const close = () => closeUrl ? router.push(closeUrl) : router.back();

    return <>
        <div className="fixed w-full h-full top-0 left-0 bg-black/50 z-40" onClick={close}/>
        <aside
            className="fixed top-0 right-0 w-full sm:w-80 h-full bg-content2 text-content2-foreground z-50 max-w-full">
            <header className="p-2">
                <Button isIconOnly onPress={close}>
                    <IconArrowBack/>
                </Button>
            </header>
            {children}
        </aside>
    </>;
}