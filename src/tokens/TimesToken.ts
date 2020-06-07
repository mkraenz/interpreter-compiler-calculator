import { TokenType } from "./TokenType";

export class TimesToken {
    public static instanceof(x: unknown): x is TimesToken {
        return x instanceof TimesToken;
    }

    constructor(readonly type: TokenType.Times) {}
}
