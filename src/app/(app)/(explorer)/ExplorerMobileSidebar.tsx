"use client";

import { ReactNode, useState } from "react";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";

export default function ExplorerMobileSidebar({ children, isMobile }: { children?: ReactNode, isMobile: boolean }) {
    const [show, setShow] = useState(true);

    return isMobile ? <>
        <Button radius="none" onPress={() => setShow(!show)}>{show ? "Hide" : "Show"} sidebar</Button>
        {show && children}
        {show && <Divider className="md:hidden"/>}
    </> : children;
}