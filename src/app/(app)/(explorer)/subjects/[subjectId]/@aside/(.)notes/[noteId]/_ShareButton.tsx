"use client";

import { IconShare } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";

export default function ShareButton({ title, content }: { title?: string, content: string }) {
    const t = useTranslations();

    return <Button
        startContent={<IconShare/>}
        onPress={() => navigator.share({
            title,
            text: content,
            url: location.href
        })}
    >
        {t('Global.share')}
    </Button>;
}