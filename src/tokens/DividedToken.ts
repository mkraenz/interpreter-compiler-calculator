import { BaseToken } from "./BaseToken";
import { TokenType } from "./TokenType";

export class DividedToken extends BaseToken {
    public static instanceof(x: unknown): x is DividedToken {
        return x instanceof DividedToken;
    }

    public static of(pos: number) {
        return new DividedToken(pos);
    }

    protected readonly type = TokenType.Divided;
}
