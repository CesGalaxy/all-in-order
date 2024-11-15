"use client";

import ModalForm from "@/components/utils/ModalForm";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";
import { deleteCourseAction, DeleteCourseActionResponse } from "@/collections/course/actions";

export type DeleteCourseModalAction = () => Promise<DeleteCourseActionResponse>;

function DeleteCourseModal({ action }: { action: number | DeleteCourseModalAction }) {
    const deleteCourse = useCallback(() => typeof action === "number"
        ? deleteCourseAction(action)
        : action(), [action]);

    return <ModalForm
        title={"Are you sure?"}
        action={deleteCourse}
        isFormValid={true}
        handleSuccess="close"
        buttonLabel="Yes, delete"
        buttonIcon={<IconTrash/>}
        buttonProps={{ color: "danger", variant: "shadow" }}
        buttonInitialWait={5000}
        buttonRequireConfirmation
    >
        This action cannot be undone
    </ModalForm>
}

export default DeleteCourseModal;
