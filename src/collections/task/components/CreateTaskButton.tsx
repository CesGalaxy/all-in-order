"use client";

import { Button } from "@heroui/button";
import { toast } from "react-toastify";

export default function CreateTaskButton() {
    return <>
        <Button color="primary" onPress={() => toast("Coming soon")}>
            Create task
        </Button>
    </>
}