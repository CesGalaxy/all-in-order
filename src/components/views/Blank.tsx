import Image, { StaticImageData } from "next/image";
import React from "react";

export interface BlankViewProps {
    title?: React.ReactNode;
    content?: React.ReactNode;
    image: StaticImageData;
    alt: string;
    children?: React.ReactNode;
    small?: boolean;
}

const COLUMN_CLASSNAME = "w-full h-full flex flex-col @2xl:flex-row old-md-flex-row items-center justify-center gap-x-16";

export default function Blank({ title, content, image, alt, children, small }: BlankViewProps) {
    return <div className="@container w-full h-full px-2 group" data-small={small}>
        <div className={COLUMN_CLASSNAME + " " + (small ? "gap-y-8" : "gap-y-16")}>
            <Image src={image} alt={alt} width={small ? 128 : 256}/>
            <section>
                {title && <h1 className="text-3xl group-data-[small=true]:text-2xl font-bold">{title}</h1>}
                {content && <p className="group-data-[small=true]:text-sm text-default-500">{content}</p>}
                {(title || content) && <br/>}
                {children}
            </section>
        </div>
    </div>;
}