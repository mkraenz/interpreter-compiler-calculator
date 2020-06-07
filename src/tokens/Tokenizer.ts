import { BracketCloseToken } from "./BracketCloseToken";
import { BracketOpenToken } from "./BracketOpenToken";
import { DividedToken } from "./DividedToken";
import { MinusToken } from "./MinusToken";
import { NumberToken } from "./NumberToken";
import { PlusToken } from "./PlusToken";
import { TimesToken } from "./TimesToken";
import { TokenType } from "./TokenType";

// aka Lexer, Lexical Analyzer
export class Tokenizer {
    public static read(s: string) {
        const sanitized = s.trim();
        const chars = sanitized.split(" ");
        return chars.map(Tokenizer.of);
    }

    private static of(x: string, pos: number) {
        switch (x) {
            case TokenType.Plus:
                return PlusToken.of(pos);
            case TokenType.Minus:
                return MinusToken.of(pos);
            case TokenType.Times:
                return TimesToken.of(pos);
            case TokenType.Divided:
                return DividedToken.of(pos);
            case TokenType.BracketOpen:
                return BracketOpenToken.of(pos);
            case TokenType.BracketClose:
                return BracketCloseToken.of(pos);
            default:
                return NumberToken.of(pos, Number(x));
        }
    }
}
