"use client";

import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createWorkspace } from "@/modules/app/workspace/actions";
import { CREATE_WORKSPACE_SCHEMA } from "@/modules/app/workspace/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";

export function CreateWorkspaceForm({
                                        className,
    name,
                                        ...props
                                    }: React.ComponentProps<"div"> & {name: string}) {

    const { form, action, handleSubmitWithAction } = useHookFormAction(
        createWorkspace,
        zodResolver(CREATE_WORKSPACE_SCHEMA),
        {
            actionProps: {
                onError: ({error: {validationErrors, serverError}}) => {
                    if (validationErrors?._errors) validationErrors._errors.forEach(e => toast.error(e, {richColors: true}));
                    if (serverError) toast.error(serverError, {richColors: true});
                }
            },
            formProps: {mode: "all", defaultValues: {name: name + "'s Workspace"}},
            errorMapProps: {},
        }
    );

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={handleSubmitWithAction}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <a
                                href="#"
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="flex size-8 items-center justify-center rounded-md">
                                    <GalleryVerticalEnd className="size-6"/>
                                </div>
                                <span className="sr-only">Acme Inc.</span>
                            </a>
                            <h1 className="text-2xl font-bold text-center">
                                Let&#39;s get started by creating your first&nbsp;
                                <span className="bg-gradient-to-r from-primary to-brand-pink bg-clip-text text-transparent">workspace</span>
                                !
                            </h1>
                            {/*<div className="text-center text-sm">*/}
                            {/*    Don&apos;t have an account?{" "}*/}
                            {/*    <a href="#" className="underline underline-offset-4">*/}
                            {/*        Sign up*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                        </div>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder={name + "'s Workspace"} autoComplete="off" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary via-primary to-brand-pink bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] shadow-lg hover:shadow-[0_0_40px_10px] hover:shadow-brand-pink/25" disabled={action.isPending}>
                                Let&#39;s go!
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
