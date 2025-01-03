"use client";

import { IconSearch } from "@tabler/icons-react";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NbNotesPageSearchbar() {
    const [query, setQuery] = useState("");

    return <nav className="w-fit relative">
        <Input
            startContent={<IconSearch/>}
            isClearable
            placeholder="Search..."
            className="w-96 z-10"
            value={query}
            onValueChange={setQuery}
            defaultValue="hello world"
            variant="faded"
        />
        <AnimatePresence>
            {query && <motion.div
                key="search-box"
                className="absolute -top-2 -left-2 w-[calc(100%+16px)] bg-content2 px-4 pt-14 pb-2 rounded-2xl shadow"
                initial={{ opacity: 0, scale: .9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .9 }}
            >
                {query.length} results
            </motion.div>}
        </AnimatePresence>
    </nav>;
}