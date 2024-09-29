"use client";

import { Button } from "@nextui-org/button";
import { IconArrowBack } from "@tabler/icons-react";
import { useTransitionRouter } from "next-view-transitions";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function AsideModalContainer({ children, closeUrl, title, className, actions }: {
    children: ReactNode,
    closeUrl?: string,
    title?: string,
    className?: string,
    actions?: ReactNode,
}) {
    const router = useTransitionRouter();

    const close = () => closeUrl ? router.push(closeUrl) : router.back();

    return <>
        <div className="fixed w-full h-full top-0 left-0 bg-black/50 z-40" onClick={close}/>
        <aside className={twMerge(
            "bg-content2 text-content2-foreground max-w-full z-50 fixed",
            "w-full h-full top-0 right-0",
            "sm:mx-8 sm:w-[calc(100%-64px)] sm:h-[calc(100%-32px)] sm:rounded-xl",
            "md:m-0 md:min-w-80 md:w-min md:rounded-none",
            className
        )}>
            <header
                className="p-2 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4 bg-content3 text-content3-foreground">
                <nav className="flex items-center justify-start gap-4">
                    <Button isIconOnly onPress={close}>
                        <IconArrowBack/>
                    </Button>
                    {title && <h2 className="text-xl font-bold">{title}</h2>}
                </nav>
                {actions && <div className="flex items-center justify-end gap-4">
                    {actions}
                </div>}
            </header>
            {children}
        </aside>
    </>;
}