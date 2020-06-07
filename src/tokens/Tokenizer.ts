import { BracketCloseToken } from "./BracketCloseToken";
import { BracketOpenToken } from "./BracketOpenToken";
import { NumberToken } from "./NumberToken";
import { PlusToken } from "./PlusToken";
import { TimesToken } from "./TimesToken";

// aka Lexer, Lexical Analyzer
export class Tokenizer {
    public static read(s: string) {
        const sanitized = s.trim();
        const chars = sanitized.split(" ");
        return chars.map(Tokenizer.of);
    }

    private static of(x: string, pos: number) {
        switch (x) {
            case "+":
                return PlusToken.of(pos);
            case "*":
                return TimesToken.of(pos);
            case "(":
                return BracketOpenToken.of(pos);
            case ")":
                return BracketCloseToken.of(pos);
            default:
                return NumberToken.of(pos, Number(x));
        }
    }
}
