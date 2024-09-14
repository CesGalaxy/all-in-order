export interface SectionProps {
    title: string;
    children?: React.ReactNode;
    className?: string;
}

export default function Section({ title, children, className }: SectionProps) {
    return <section className={className || "w-full h-full"}>
        <header className="w-full">
            <h2 className="text-4xl">{title}</h2>
            <hr/>
        </header>
        <br/>
        {children}
    </section>;
}