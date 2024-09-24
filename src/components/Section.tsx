export interface SectionProps {
    title: string;
    children?: React.ReactNode;
    trailing?: React.ReactNode;
    className?: string;
}

export default function Section({ title, children, trailing, className }: SectionProps) {
    return <section className={className || "w-full h-full"}>
        <header className="w-full flex items-center justify-between gap-16">
            <h2 className="text-4xl">{title}</h2>
            {trailing}
        </header>
        <hr/>
        <br/>
        {children}
    </section>;
}