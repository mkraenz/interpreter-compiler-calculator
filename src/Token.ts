enum TokenType {
    Plus = "+",
    Number = "Number",
    Times = "*",
    BracketOpen = "(",
    BracketClose = ")",
}

class Token {
    public static of(x: string) {
        switch (x) {
            case "+":
                return new Token(TokenType.Plus);
            case "*":
                return new Token(TokenType.Times);
            case "(":
                return new Token(TokenType.BracketOpen);
            case ")":
                return new Token(TokenType.BracketClose);
            default:
                return new Token(TokenType.Number, Number(x));
        }
    }

    constructor(
        public readonly type: TokenType,
        public readonly value?: number
    ) {}
}
