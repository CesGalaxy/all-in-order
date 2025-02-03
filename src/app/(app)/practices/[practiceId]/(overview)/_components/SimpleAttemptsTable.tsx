"use client";

import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { useCallback } from "react";

export interface SimpleAttempt {
    id: number;
    score: number;
    date: number;
    duration: number;
}

const COLUMNS = [
    {
        label: "Score",
        key: "score",
    },
    {
        label: "Duration",
        key: "duration",
    },
    {
        label: "Date",
        key: "date",
    },
]

type ColumnKey = "score" | "duration" | "date";

export interface SimpleAttemptsTableProps {
    practiceId: number;
    attempts: SimpleAttempt[];
    averagePerfection: number;
    averageDuration: number;
}

export default function SimpleAttemptsTable({ practiceId, attempts }: SimpleAttemptsTableProps) {
    const renderCell = useCallback((attempt: SimpleAttempt, columnKey: string | number) => {
        const cellValue = getKeyValue(attempt, columnKey);

        if (columnKey === "score") {
            return <b>{cellValue}%</b>;
        } else if (columnKey === "duration") {
            // Convert to seconds and minutes
            const minutes = Math.floor(cellValue / 60);
            const seconds = cellValue % 60;

            return minutes ? `${minutes}m ${seconds}s` : `${seconds}s`;
        } else {
            const textDate = new Date(cellValue).toLocaleDateString();

            return <time dateTime={cellValue.toString()}>{textDate}</time>;
        }
    }, []);

    return <Table aria-label="Recent attempts" className={`vt-name-[attempts-simple-table]`}>
        <TableHeader columns={COLUMNS}>
            {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={attempts} emptyContent={"You haven't practiced yet!"}>
            {attempt => (
                <TableRow key={attempt.id} href={`/practices/${practiceId}/attempts/${attempt.id}`}
                          className="hover:bg-content2 cursor-pointer">
                    {(columnKey) => <TableCell>{renderCell(attempt, columnKey)}</TableCell>}
                </TableRow>
            )}
        </TableBody>
    </Table>
}