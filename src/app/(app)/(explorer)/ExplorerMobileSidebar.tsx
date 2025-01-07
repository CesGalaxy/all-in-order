"use client";

import { ReactNode, useState } from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

export default function ExplorerMobileSidebar({ children }: { children?: ReactNode }) {
    const [show, setShow] = useState(true);

    return <>
        <Button radius="none" onPress={() => setShow(!show)}>{show ? "Hide" : "Show"} sidebar</Button>
        {show && children}
        {show && <Divider className="md:hidden"/>}
    </>
}