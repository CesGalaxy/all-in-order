"use client";

import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";
import { deleteCourseAction, DeleteCourseActionResponse } from "@/collections/course/actions";
import ConfirmActionModal from "@/components/modals/ConfirmActionModal";

export type DeleteCourseModalAction = () => Promise<DeleteCourseActionResponse>;

function DeleteCourseModal({ action }: { action: number | DeleteCourseModalAction }) {
    const deleteCourse = useCallback(() => typeof action === "number"
        ? deleteCourseAction(action)
        : action(), [action]);

    return <ConfirmActionModal
        title={"Are you sure?"}
        onConfirm={deleteCourse}
        confirmText="Yes, delete"
        confirmIcon={<IconTrash/>}
        initialWait={5000}
        requireConfirmation
    >
        This action cannot be undone
    </ConfirmActionModal>
}

export default DeleteCourseModal;
