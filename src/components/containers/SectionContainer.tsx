import type { ComponentProps, ReactNode } from "react";

export interface SectionProps extends ComponentProps<"div"> {
    trailing?: ReactNode;
}

export default function SectionContainer({ title, children, trailing, ...props }: SectionProps) {
    return <section {...props}>
        <header
            className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between gap-2 md:gap-16">
            <h2 className="text-4xl">{title}</h2>
            {trailing}
        </header>
        <hr className="mt-2 md:mt-1"/>
        <br/>
        {children}
    </section>;
}