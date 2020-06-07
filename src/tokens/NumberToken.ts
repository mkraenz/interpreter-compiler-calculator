import { BaseToken } from "./BaseToken";
import { TokenType } from "./TokenType";

export class NumberToken extends BaseToken {
    public static instanceof(x: unknown): x is NumberToken {
        return x instanceof NumberToken;
    }

    public static of(pos: number, value: number) {
        return new NumberToken(pos, value);
    }

    protected readonly type = TokenType.Number;

    constructor(public readonly pos: number, public readonly value: number) {
        super(pos);
        if (isNaN(value!)) {
            throw new Error(`TokenError: Unknown literal ${value}.`);
        }
    }
}
