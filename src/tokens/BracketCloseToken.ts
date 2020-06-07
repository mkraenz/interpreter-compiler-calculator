import { TokenType } from "./TokenType";

export class BracketCloseToken {
    public static instanceof(x: unknown): x is BracketCloseToken {
        return x instanceof BracketCloseToken;
    }

    constructor(readonly type: TokenType.BracketClose, readonly pos: number) {}
}
