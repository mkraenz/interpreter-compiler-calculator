export class ParserError extends Error {
    constructor(at: number, message: string) {
        super(`at position ${at}: ${message}`);
        this.name = "ParserError";
    }
}
