export type MessageSeverity = 'info' | 'warn' | 'error' | 'danger' | 'fatal';

export interface Message {
    severity: MessageSeverity;
    message: string;
    attachments?: any[];
}
