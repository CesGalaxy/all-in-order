"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function CreateRelationQuestion({ title }: { title: string }) {
    const [relations, setRelations] = useState<[string, string][]>([]);
    const [a, setA] = useState("");
    const [b, setB] = useState("");

    return <div>
        <ul className="flex flex-col gap-4">
            {relations.map(([a, b], i) => <li key={i} className="flex gap-4">
                <Input value={a} onChange={e => {
                    const newRelations = [...relations];
                    newRelations[i] = [e.target.value, b];
                    setRelations(newRelations);
                }}/>
                <Input type="text" value={b} onChange={e => {
                    const newRelations = [...relations];
                    newRelations[i] = [a, e.target.value];
                    setRelations(newRelations);
                }}/>
                <Button onPress={() => {
                    const newRelations = [...relations];
                    newRelations.splice(i, 1);
                    setRelations(newRelations);
                }}>Remove</Button>
            </li>)}
        </ul>
    </div>;
}