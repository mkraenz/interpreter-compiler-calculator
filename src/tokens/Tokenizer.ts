import { NumberToken } from "./NumberToken";
import { PlusToken } from "./PlusToken";
import { TimesToken } from "./TimesToken";
import { TokenType } from "./TokenType";

// aka Lexer, Lexical Analyzer
export class Tokenizer {
    public static tokenize(s: string) {
        const literals = s.split(" ");
        return literals.map(Tokenizer.of);
    }

    private static of(x: string) {
        switch (x) {
            case "+":
                return new PlusToken(TokenType.Plus);
            case "*":
                return new TimesToken(TokenType.Times);
            default:
                return new NumberToken(TokenType.Number, Number(x));
        }
    }
}
