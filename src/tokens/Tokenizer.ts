import { NumberToken } from "./NumberToken";
import { PlusToken } from "./PlusToken";
import { TimesToken } from "./TimesToken";
import { TokenType } from "./TokenType";

// aka Lexer, Lexical Analyzer
export class Tokenizer {
    public static tokenize(s: string) {
        const chars = s.split(" ");
        return chars.map(Tokenizer.of);
    }

    private static of(x: string, pos: number) {
        switch (x) {
            case "+":
                return new PlusToken(TokenType.Plus, pos);
            case "*":
                return new TimesToken(TokenType.Times, pos);
            default:
                return new NumberToken(TokenType.Number, pos, Number(x));
        }
    }
}
