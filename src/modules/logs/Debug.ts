export interface DebugMessage {
}

export interface DBRequestEvent extends DebugMessage {
    table: string;
    query: string;
    filters: string[];
}
