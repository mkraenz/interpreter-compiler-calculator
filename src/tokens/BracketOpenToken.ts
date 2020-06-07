import { BaseToken } from "./BaseToken";
import { TokenType } from "./TokenType";

export class BracketOpenToken extends BaseToken {
    public static instanceof(x: unknown): x is BracketOpenToken {
        return x instanceof BracketOpenToken;
    }

    public static of(pos: number) {
        return new BracketOpenToken(pos);
    }

    protected readonly type = TokenType.BracketOpen; // for testing
}
