"use client";

import { IconShare } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";

export default function ShareButton({ title, content }: { title?: string, content: string }) {
    return <Button
        startContent={<IconShare/>}
        onPress={() => navigator.share({
            title,
            text: content,
            url: location.href
        })}
    >
        Share
    </Button>;
}