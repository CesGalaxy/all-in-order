"use client";

import { Button } from "@heroui/button";
import type { PropsWithChildren, ReactNode } from "react";

export const ShareButton = ({ icon, children, ...s }: PropsWithChildren<ShareData & { icon?: ReactNode }>) =>
    <Button startContent={icon} onPress={() => navigator.share(s)}>{children}</Button>;