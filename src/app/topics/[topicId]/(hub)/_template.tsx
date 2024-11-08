"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return <motion.div
        key={pathname}
        className="w-full h-full flex flex-col overflow-y-auto absolute t-0 l-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        {children}
    </motion.div>;
}