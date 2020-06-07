import { TokenType } from "./TokenType";

export abstract class BaseToken {
    /** for testing so that chai can distinguish objects */
    protected abstract readonly type: TokenType;

    constructor(public readonly pos: number) {}
}
