import { BaseToken } from "./BaseToken";
import { TokenType } from "./TokenType";

export class TimesToken extends BaseToken {
    public static instanceof(x: unknown): x is TimesToken {
        return x instanceof TimesToken;
    }

    public static of(pos: number) {
        return new TimesToken(pos);
    }

    protected readonly type = TokenType.Times;
}
