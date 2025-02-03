"use client";

import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";

const COLUMNS = [
    { key: "term", label: "Term" },
    { key: "definition", label: "Definition" },
]

export interface NbVocabDefinitionsTableProps {
    definitions: {
        id: number,
        term: string,
        definition: string,
    }[];
}

export default function NbVocabDefinitionsTable({ definitions }: NbVocabDefinitionsTableProps) {
    return <Table aria-label="Definitions table">
        <TableHeader columns={COLUMNS}>
            {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={definitions} emptyContent={"No definitions to display."}>
            {definition => <TableRow key={definition.id}>
                {columnKey => <TableCell>{getKeyValue(definition, columnKey)}</TableCell>}
            </TableRow>}
        </TableBody>
    </Table>
}