import { BaseToken } from "./BaseToken";
import { TokenType } from "./TokenType";

export class PlusToken extends BaseToken {
    public static instanceof(x: unknown): x is PlusToken {
        return x instanceof PlusToken;
    }

    public static of(pos: number) {
        return new PlusToken(pos);
    }

    protected readonly type = TokenType.Plus; // for testing
}
