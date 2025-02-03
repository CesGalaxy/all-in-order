"use client";

import PageContainer from "@/components/containers/PageContainer";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Spinner } from "@heroui/spinner";

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

export default function Page(props: { params: Promise<{ practiceId: string }> }) {
    return <PageContainer>
        <Table aria-label="Recent attempts" className={`vt-name-[attempts-simple-table]`}>
            <TableHeader columns={COLUMNS}>
                {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={[]} loadingState="loading" loadingContent={<Spinner/>}>
                {(item) => (
                    <TableRow key={item}>
                        {(columnKey) => <TableCell>error</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </PageContainer>
}