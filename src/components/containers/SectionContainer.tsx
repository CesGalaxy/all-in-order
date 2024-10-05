import type { ComponentProps, ReactNode } from "react";

export interface SectionProps extends ComponentProps<"div"> {
    trailing?: ReactNode;
}

export default function SectionContainer({ title, children, trailing, ...props }: SectionProps) {
    return <section {...props}>
        <header className="w-full flex items-center justify-between gap-16">
            <h2 className="text-4xl">{title}</h2>
            {trailing}
        </header>
        <hr/>
        <br/>
        {children}
    </section>;
}