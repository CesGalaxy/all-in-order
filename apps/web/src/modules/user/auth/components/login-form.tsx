"use client";

import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import Image from "next/image";
import LogoNameCol from "@/assets/logo/NameColMargin.svg";
import { login } from "@/modules/user/auth/actions";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { LOGIN_SCHEMA } from "@/modules/user/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const { form, action, handleSubmitWithAction } = useHookFormAction(
        login,
        zodResolver(LOGIN_SCHEMA),
        {
            actionProps: {
                onError: ({error: {validationErrors, serverError}}) => {
                    if (validationErrors?._errors) validationErrors._errors.forEach(e => toast.error(e, {richColors: true}));
                    if (serverError) toast.error(serverError, {richColors: true});
                }
            },
            formProps: {mode: "all", defaultValues: {email: "", password: ""}},
            errorMapProps: {},
        }
    );

    return (
        <div className={cn("flex flex-col gap-6 max-w-sm", className)} {...props}>
            <Link href="/" className="flex items-center gap-2 self-center font-medium w-fit">
                <Image src={LogoNameCol} alt="All In Order" width={199} priority/>
            </Link>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Apple or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-4">
                            <Button variant="outline" className="w-full" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                        fill="currentColor"
                                    />
                                </svg>
                                Login with Apple
                            </Button>
                            <Button variant="outline" className="w-full" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Login with Google
                            </Button>
                        </div>
                        <div
                            className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                  Or continue with
                                </span>
                        </div>
                        <Form {...form}>
                            <form onSubmit={handleSubmitWithAction} className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="me@example.com" autoComplete="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center">
                                                <FormLabel>Password</FormLabel>
                                                <a
                                                    href="#"
                                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                                >
                                                    Forgot your password?
                                                </a>
                                            </div>
                                            <FormControl>
                                                <Input type="password" autoComplete="current-password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={action.isPending}>
                                    Login
                                </Button>
                            </form>
                        </Form>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {/*{errors && (*/}
            {/*    <ul className="list-disc text-red-500">*/}
            {/*        {Object.entries(errors.fieldErrors).map(([key, value]) => (*/}
            {/*            <li key={key}><b>{key}:&nbsp;</b>{value?.join("; ")}</li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*)}*/}
            <div
                className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                By clicking continue, you agree to our <a href="/tos">Terms of Service</a>{" "}
                and <a href="/privacy">Privacy Policy</a>.
            </div>
        </div>
    )
}
