import { BaseToken } from "./BaseToken";
import { TokenType } from "./TokenType";

export class MinusToken extends BaseToken {
    public static instanceof(x: unknown): x is MinusToken {
        return x instanceof MinusToken;
    }

    public static of(pos: number) {
        return new MinusToken(pos);
    }

    protected readonly type = TokenType.Minus;
}
