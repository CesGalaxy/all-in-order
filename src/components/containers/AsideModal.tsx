"use client";

import { Button } from "@nextui-org/button";
import { IconArrowBack } from "@tabler/icons-react";
import { useTransitionRouter } from "next-view-transitions";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function AsideModalContainer({ children, closeUrl, title, className }: {
    children: ReactNode,
    closeUrl?: string,
    title?: string,
    className?: string
}) {
    const router = useTransitionRouter();

    const close = () => closeUrl ? router.push(closeUrl) : router.back();

    return <>
        <div className="fixed w-full h-full top-0 left-0 bg-black/50 z-40" onClick={close}/>
        <aside className={twMerge(
            "fixed top-0 right-0 w-full sm:min-w-80 sm:w-min h-full bg-content2 text-content2-foreground z-50 max-w-full",
            className
        )}>
            <header className="p-2 flex items-center justify-start gap-4 bg-content3 text-content3-foreground">
                <Button isIconOnly onPress={close}>
                    <IconArrowBack/>
                </Button>
                {title && <h2 className="text-xl font-bold">{title}</h2>}
            </header>
            {children}
        </aside>
    </>;
}