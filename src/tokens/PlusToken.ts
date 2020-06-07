import { TokenType } from "./TokenType";

export class PlusToken {
    public static instanceof(x: unknown): x is PlusToken {
        return x instanceof PlusToken;
    }

    constructor(readonly type: TokenType.Plus) {}
}
