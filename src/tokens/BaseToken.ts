import { TokenType } from "./TokenType";

export abstract class BaseToken {
    protected abstract readonly type: TokenType; // for testing

    constructor(public readonly pos: number) {}
}
