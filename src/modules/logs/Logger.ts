import { Message, MessageSeverity } from "@/modules/logs/Message";
import { DebugMessage } from "@/modules/logs/Debug";
import chalk from "chalk";

export default class Logger {
    static _instance: Logger;

    private constructor() {
    }

    static get instance(): Logger {
        if (!Logger._instance) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    }

    public log(message: Message) {
        const consoleOutput = this.mountConsoleOutput(message);

        Logger.severityLoggers[message.severity](consoleOutput);
    }

    public debug(message: DebugMessage) {
        console.debug(message);
    }

    private mountConsoleOutput(message: Message) {
        const timestamp = this.mountTimestampConsoleOutput();
        const severity = this.mountSeverityConsoleOutput(message.severity);
        
        return `${timestamp} ${severity} ${message.message}`;
    }

    private mountSeverityConsoleOutput(severity: MessageSeverity) {
        return Logger.severityConsoleColor[severity](severity.toUpperCase());
    }

    private mountTimestampConsoleOutput() {
        return chalk.gray(new Date().toISOString());
    }

    static severityConsoleColor = {
        info: chalk.blue,
        warn: chalk.yellow,
        error: chalk.red,
        danger: chalk.bgYellow,
        fatal: chalk.bgRed
    };

    static messageConsoleColor = {
        info: chalk.white,
        warn: chalk.yellow,
        error: chalk.red,
        danger: chalk.yellow.bold,
        fatal: chalk.red.bold
    };

    static severityLoggers = {
        info: console.info,
        warn: console.warn,
        error: console.error,
        danger: console.error,
        fatal: console.error
    };

    public dbRequest(table: string, query: string, response: any) {
        console.log(`At ${table} requested ${query}: ${response}`);
    }
}