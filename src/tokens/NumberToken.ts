import { TokenType } from "./TokenType";

export class NumberToken {
    constructor(readonly type: TokenType.Number, readonly value: number) {
        if (type === TokenType.Number && isNaN(value!)) {
            throw new Error(`TokenError: Unknown literal ${value}.`);
        }
    }
}
