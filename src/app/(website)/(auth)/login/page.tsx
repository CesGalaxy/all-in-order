"use server";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { redirect } from "next/navigation";
import { getMaybeUser } from "@/lib/supabase/auth/user";
import { getTranslations } from "next-intl/server";
import { Link } from "@heroui/link";
import { login } from "@/modules/user/auth/actions";

export interface SearchParams {
    redirectUrl?: string;
}

export default async function Page(props: { searchParams: Promise<SearchParams> }) {
    const { redirectUrl = "/app" } = await props.searchParams;

    const t = await getTranslations();
    const maybeUser = await getMaybeUser();

    if (maybeUser) redirect(redirectUrl);

    return <div className="flex items-center justify-center w-full h-full flex-grow flex-col gap-8">
        <Card className="p-8">
            <CardHeader>
                <h1 className="text-4xl font-bold uppercase">{t("Auth.login")}</h1>
            </CardHeader>
            <CardBody as="form" action={login.bind(null, redirectUrl)}>
                <Input isRequired label={t("Global.email")} placeholder={t("Auth.email_example")} type="email"
                       name="email"/>
                <br/>
                <Input isRequired label={t("Global.password")} type="password" name="password"/>
                <br/>
                <Button color="primary" className="w-full" type="submit">{t("Auth.login")}</Button>
            </CardBody>
        </Card>
        <Link href="/register">Don&#39;t have an account?</Link>
    </div>
}