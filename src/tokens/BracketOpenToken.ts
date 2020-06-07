import { TokenType } from "./TokenType";

export class BracketOpenToken {
    public static instanceof(x: unknown): x is BracketOpenToken {
        return x instanceof BracketOpenToken;
    }

    constructor(readonly type: TokenType.BracketOpen, readonly pos: number) {}
}
