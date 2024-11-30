import BaseMessage from "./BaseMessage";

export default class InfoMessage extends BaseMessage {
    constructor(
        public readonly message: string,
    ) {
        super();

    }

    public generateConsoleString(): string {
        
        return this.message;
    }
}