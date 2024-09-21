import Image, { StaticImageData } from "next/image";
import React from "react";

export interface BlankViewProps {
    title: React.ReactNode;
    content: React.ReactNode;
    image: StaticImageData;
    alt: string;
    children?: React.ReactNode;
}

export default function BlankView({ title, content, image, alt, children }: BlankViewProps) {
    return <div className="@container w-full h-full">
        <div className="w-full h-full flex flex-col @2xl:flex-row old-md-flex-row items-center justify-center gap-16">
            <Image src={image} alt={alt} width={256}/>
            <section>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-default-500">{content}</p>
                <br/>
                {children}
            </section>
        </div>
    </div>;
}