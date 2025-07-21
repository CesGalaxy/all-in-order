import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import * as React from "react";

export default function CreateNotebookForm({ className }: React.ComponentProps<"form">) {
    return <form className={cn("grid items-start gap-6", className)}>
        <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" defaultValue="shadcn@example.com" />
        </div>
        <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@shadcn" />
        </div>
        <Button type="submit">Save changes</Button>
    </form>;
}