import { Card, CardDescription, CardHeader, CardTitle } from "../card";
import * as React from "react";
import { cn } from "../../lib/utils";

export default function ErrorCard({title, message, className, ...props}: React.ComponentProps<"div"> & {
    title?: string;
    message?: string;
}) {
    return <Card
        className={cn(
            "bg-red-500/5 border-red-800 text-red-800",
            className
        )}
        {...props}
    >
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
            {/*<CardAction>Card Action</CardAction>*/}
        </CardHeader>
    </Card>;
}