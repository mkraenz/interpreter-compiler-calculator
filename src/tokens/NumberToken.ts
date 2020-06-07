import { TokenType } from "./TokenType";

export class NumberToken {
    public static instanceof(x: unknown): x is NumberToken {
        return x instanceof NumberToken;
    }

    constructor(
        readonly type: TokenType.Number,
        readonly pos: number,
        readonly value: number
    ) {
        if (type === TokenType.Number && isNaN(value!)) {
            throw new Error(`TokenError: Unknown literal ${value}.`);
        }
    }
}
