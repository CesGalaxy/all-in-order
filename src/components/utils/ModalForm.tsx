"use client";

import { ActionErrors, ActionResponse, FailedActionResponse, SuccessfulActionResponse } from "@/lib/helpers/form";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button, ButtonProps } from "@nextui-org/button";
import useActionFunction from "@/reactivity/hooks/useActionFunction";
import ErrorListView from "@/components/views/ErrorListView";

export type ModalFormAction<T, E extends string> = (formData: FormData) => (
    | Promise<ActionResponse<T, E | "submit">>
    | ActionErrors<E>
    | undefined
    | null
    | string);

export interface ModalFormProps<T, E extends string> {
    title: ReactNode;
    action?: ModalFormAction<T, E>;
    buttonLabel?: ReactNode;
    buttonIcon?: ReactNode;
    buttonProps?: Omit<ButtonProps, "children" | "startContent" | "isDisabled" | "isLoading" | "formAction" | "type">;
    buttonInitialWait?: number;
    buttonRequireConfirmation?: boolean;
    buttonConfirmationTimeout?: number;
    isFormValid: boolean;
    handleResponse?: (response: ActionResponse<T, E>, onClose: () => void) => void;
    handleSuccess?: "close" | ((response: SuccessfulActionResponse<T>, onClose: () => void) => void);
    handleError?: (error: FailedActionResponse<E>, onClose: () => void) => void;
    hideCancelButton?: boolean;
    children?: ReactNode;
}

function ModalForm<
    T,
    E extends string,
>({
      title,
      action,
      buttonLabel = "Ok",
      buttonIcon,
      buttonProps,
      buttonInitialWait,
      buttonRequireConfirmation,
      buttonConfirmationTimeout = 5000,
      isFormValid,
      handleResponse,
      handleSuccess,
      handleError,
      hideCancelButton = false,
      children,
  }: ModalFormProps<T, E>) {
    const handleSubmit = useCallback(async (formData: FormData) => {
        if (!action) return {
            ok: false,
            errors: { submit: ["No action provided. This is probably an internal error"] } as ActionErrors<E | "submit">
        } satisfies FailedActionResponse<E | "submit">;

        const act = action(formData);

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
            && act !== undefined
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
    const [waiting, setWaiting] = useState(Boolean(buttonInitialWait));
    const [pendingConfirmation, setPendingConfirmation] = useState(false);

    useEffect(() => {
        if (buttonInitialWait && waiting) setTimeout(() => setWaiting(false), buttonInitialWait);
    }, [buttonInitialWait, waiting]);

    useEffect(() => {
        if (pendingConfirmation) setTimeout(() => setPendingConfirmation(false), buttonConfirmationTimeout);
    }, [buttonConfirmationTimeout, pendingConfirmation]);

    return <ModalContent as="form">
        {onClose => <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            {(children || (result?.ok === false && result.errors)) && <ModalBody>
                {children}
                {result?.ok === false && result.errors && <ErrorListView errors={result.errors}/>}
            </ModalBody>}
            <ModalFooter>
                {!hideCancelButton && <Button color="danger" variant="flat" onPress={onClose} type="button">
                    Cancel
                </Button>}
                <Button
                    color="primary"
                    startContent={buttonIcon}
                    isDisabled={!isFormValid}
                    isLoading={loading || waiting}
                    type="submit"
                    formAction={async (formData) => {
                        if (buttonRequireConfirmation && !pendingConfirmation) {
                            setPendingConfirmation(true);
                            return;
                        }

                        setPendingConfirmation(false);

                        const response = await formAction(formData);

                        if (handleResponse) handleResponse(response, onClose);

                        if (response.ok) {
                            if (handleSuccess === "close") onClose();
                            else if (handleSuccess) handleSuccess(response, onClose);
                        } else if (handleError) {
                            handleError(response, onClose);
                        }
                    }}
                    {...buttonProps}
                >
                    {pendingConfirmation
                        ? "Confirm"
                        : waiting
                            ? `Please wait ${Math.round(buttonInitialWait! / 1000)}s`
                            : buttonLabel}
                </Button>
            </ModalFooter>
        </>}
    </ModalContent>
}

export default ModalForm;