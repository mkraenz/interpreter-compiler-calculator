import { BaseToken } from "./BaseToken";
import { TokenType } from "./TokenType";

export class BracketCloseToken extends BaseToken {
    public static instanceof(x: unknown): x is BracketCloseToken {
        return x instanceof BracketCloseToken;
    }

    public static of(pos: number) {
        return new BracketCloseToken(pos);
    }

    protected readonly type = TokenType.BracketClose;
}
