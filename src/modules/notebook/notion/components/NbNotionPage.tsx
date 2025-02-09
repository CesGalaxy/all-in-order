"use client";

import 'react-notion-x/src/styles.css'

import type { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from 'next/dynamic';

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then(m => m.Code))
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then(m => m.Collection))
const Equation = dynamic(() => import('react-notion-x/build/third-party/equation').then(m => m.Equation))
const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf').then(m => m.Pdf), { ssr: false })
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then(m => m.Modal), { ssr: false })

export default function NbNotionPage({ page }: { page: ExtendedRecordMap }) {
    // const str = useMemo(() => JSON.stringify(page), [page]);
    // const chars = useMemo(() => str.length, [str]);
    // const kb = useMemo(() => Math.round(chars / 1024), [chars]);

    return <div>
        <NotionRenderer
            recordMap={page}
            components={{
                Code,
                Collection,
                Equation,
                Modal,
                Pdf
            }}
        />
    </div>
}