"use client";

import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import * as React from "react";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { CREATE_NOTEBOOK_SCHEMA } from "@/modules/notebook/app/schemas";
import { createNotebook } from "@/modules/notebook/app/actions";
import { Textarea } from "@repo/ui/components/textarea";

export default function CreateNotebookForm({ workspaceId, className }: {workspaceId: string} & React.ComponentProps<"form">) {
    const { form, action, handleSubmitWithAction } = useHookFormAction(
        createNotebook.bind(null, workspaceId),
        zodResolver(CREATE_NOTEBOOK_SCHEMA),
        {
            actionProps: {
                onError: ({error: {validationErrors, serverError}}) => {
                    if (validationErrors?._errors) validationErrors._errors.forEach(e => toast.error(e, {richColors: true}));
                    if (serverError) toast.error(serverError, {richColors: true});
                }
            },
            formProps: {mode: "all", defaultValues: {name: "", details: ""}},
            errorMapProps: {},
        }
    );

    return <Form {...form}>
        <form className={cn("grid items-start gap-6", className)} onSubmit={handleSubmitWithAction}>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder={"My notebook"} autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            /><FormField
            control={form.control}
            name="details"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Details</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Tell us a bit about your notebook" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
            <Button type="submit" disabled={action.isPending}>Create Notebook</Button>
        </form>
    </Form>
}