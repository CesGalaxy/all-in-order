"use client";

import { ActionErrors, ActionResponse, FailedActionResponse, SuccessfulActionResponse } from "@/lib/helpers/form";
import { type ReactNode, useCallback } from "react";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import useActionFunction from "@/reactivity/hooks/useActionFunction";
import ErrorListView from "@/components/views/ErrorListView";

export interface ModalFormProps<T, E extends string> {
    title: ReactNode;
    action: () => (Promise<ActionResponse<T, E | "submit">> | ActionErrors<E> | undefined | null | string);
    buttonLabel?: ReactNode;
    buttonIcon?: ReactNode;
    isFormValid: boolean;
    handleResponse?: (response: ActionResponse<T, E>, onClose: () => void) => void;
    handleSuccess?: "close" | ((response: SuccessfulActionResponse<T>, onClose: () => void) => void);
    handleError?: (error: FailedActionResponse<E>, onClose: () => void) => void;
    children: ReactNode;
}

function ModalForm<
    T,
    E extends string,
>({
      title, action, buttonLabel, buttonIcon, isFormValid, handleResponse, handleSuccess, handleError, children,
  }: ModalFormProps<T, E>) {
    const handleSubmit = useCallback(async () => {
        const act = action();

        if (typeof act === "string") {
            return {
                ok: false,
                errors: { submit: [act] } as ActionErrors<E | "submit">
            } satisfies FailedActionResponse<E | "submit">;
        } else if (act instanceof Promise) {
            return await act;
        } else if (
            typeof act === "object"
            && act !== null
            && Object.values(act).every(Array.isArray)
            && Object.values(act).flat().every((v) => typeof v === "string")
        ) {
            return { ok: false, errors: act } satisfies FailedActionResponse<E>;
        } else {
            return {
                ok: false,
                errors: { submit: ["Invalid action"] } as ActionErrors<E | "submit">
            } satisfies FailedActionResponse<E | "submit">;
        }
    }, [action]);

    const [loading, result, formAction] = useActionFunction(handleSubmit);

    return <ModalContent as="form">
        {onClose => <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
                {children}
                {result?.ok === false && result.errors && <ErrorListView errors={result.errors}/>}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose} type="button">
                    Cancel
                </Button>
                <Button
                    color="primary"
                    startContent={buttonIcon}
                    isDisabled={!isFormValid}
                    isLoading={loading}
                    type="submit"
                    formAction={async () => {
                        const response = await formAction();

                        if (handleResponse) handleResponse(response, onClose);

                        if (response.ok) {
                            if (handleSuccess === "close") onClose();
                            else if (handleSuccess) handleSuccess(response, onClose);
                        } else if (handleError) {
                            handleError(response, onClose);
                        }
                    }}
                >
                    {buttonLabel || "Ok"}
                </Button>
            </ModalFooter>
        </>}
    </ModalContent>
}

export default ModalForm;