"use client";

import ModalForm from "@/components/utils/ModalForm";
import { Input, Textarea } from "@nextui-org/input";

export default function NbAddDefinitionsModal() {
    return <ModalForm
        title={"New definition"}
        isFormValid={true}
    >
        <Input
            label={"Term"}
            placeholder="e.g. 'Hypotenuse'"
            required
        />
        <Textarea
            label={"Definition"}
            placeholder="e.g. 'The longest side of a right-angled triangle, opposite the right angle.'"
            required
        />
    </ModalForm>
}