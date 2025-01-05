import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface SectionContainerProps extends ComponentProps<"div"> {
    trailing?: ReactNode;
    growClassName?: string;
    expanded?: boolean;
}

export default function SectionContainer({
                                             title,
                                             children,
                                             trailing,
                                             expanded,
                                             growClassName: gcn,
                                             ...props
                                         }: SectionContainerProps) {

    if (expanded) props.className = twMerge("w-full flex flex-col", props.className);

    return <section {...props}>
        <header
            className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between gap-2 md:gap-12">
            <h2 className="text-4xl">{title}</h2>
            {trailing}
        </header>
        <hr className="mt-2 md:mt-1"/>
        <br/>
        {expanded
            ? <div className={twMerge("w-full h-full flex-grow flex-col overflow-hidden", gcn)}>{children}</div>
            : children
        }
    </section>;
}