import { ParserError } from "./errors/ParserError";
import { EmptyExpression } from "./expressions/EmptyExpression";
import { IExpression } from "./expressions/IExpression";
import { MinusExpression } from "./expressions/MinusExpression";
import { PlusExpression } from "./expressions/PlusExpression";
import { TerminalExpression } from "./expressions/TerminalExpression";
import { TimesExpression } from "./expressions/TimesExpression";
import { BracketCloseToken } from "./tokens/BracketCloseToken";
import { BracketOpenToken } from "./tokens/BracketOpenToken";
import { MinusToken } from "./tokens/MinusToken";
import { NumberToken } from "./tokens/NumberToken";
import { PlusToken } from "./tokens/PlusToken";
import { TimesToken } from "./tokens/TimesToken";
import { Token } from "./tokens/Token";

type Operation = PlusExpression | TimesExpression | MinusExpression;
type OperatorToken = PlusToken | TimesToken | MinusToken;
const isOperator = (x: Token): x is OperatorToken =>
    PlusToken.instanceof(x) ||
    TimesToken.instanceof(x) ||
    MinusToken.instanceof(x);

interface IAstAccumulator {
    ast: IExpression;
    nextIndexForParsing: number;
}

export function parse(tokens: Token[]) {
    return _parse(tokens).ast;
}

function _parse(tokens: Token[]) {
    const AST = tokens.reduce(
        (acc, token, i) => {
            if (token.pos < acc.nextIndexForParsing) {
                return acc;
            }
            const unparsedTokens = () => tokens.slice(i);
            if (NumberToken.instanceof(token)) {
                return {
                    ast: TerminalExpression.of(token.value),
                    nextIndexForParsing: i + 1,
                };
            }
            if (isOperator(token)) {
                return parseOperator(unparsedTokens(), acc.ast);
            }
            if (BracketOpenToken.instanceof(token)) {
                return parseBracketInternals(unparsedTokens());
            }
            if (BracketCloseToken.instanceof(token)) {
                return acc;
            }

            throw new Error(
                `ParseError at position ${
                    (token as any).pos
                }: Unknown character ${JSON.stringify(token)}`
            );
        },
        { ast: EmptyExpression.of(), nextIndexForParsing: 0 } as IAstAccumulator
    );
    return AST;
}

const parseOperator = (tokens: Token[], left: IExpression): IAstAccumulator => {
    const operator = tokens[0];

    if (EmptyExpression.instanceof(left)) {
        throw new ParserError(
            operator.pos,
            "Left-hand side of operator cannot be empty"
        );
    }
    const right = lookAhead(tokens.slice(1));
    const astAccumulatorOf = (
        of: (left: IExpression, right: IExpression) => IExpression
    ): IAstAccumulator => ({
        ast: of(left, right.ast),
        nextIndexForParsing: right.nextIndexForParsing,
    });
    if (PlusToken.instanceof(operator)) {
        return astAccumulatorOf(PlusExpression.of);
    }
    if (TimesToken.instanceof(operator)) {
        return astAccumulatorOf(TimesExpression.of);
    }
    if (MinusToken.instanceof(operator)) {
        return astAccumulatorOf(MinusExpression.of);
    }
    throw new ParserError(operator.pos, "Unknown operator");
};

const lookAhead = (tokens: Token[]): IAstAccumulator => {
    const token = tokens[0];
    if (NumberToken.instanceof(token)) {
        return {
            ast: TerminalExpression.of(token.value),
            nextIndexForParsing: token.pos + 1,
        };
    }
    if (BracketOpenToken.instanceof(token)) {
        return parseBracketInternals(tokens);
    }
    throw new ParserError(
        token.pos,
        "Lookahead failed due to unknown character."
    );
};

const parseBracketInternals = (tokens: Token[]): IAstAccumulator => {
    const token = tokens[0];
    const closingBracketIndex = findMatchingClosingBracketIndex(
        tokens.slice(1)
    );
    if (closingBracketIndex === -1) {
        throw new ParserError(
            token.pos,
            "Could not find matching closing bracket"
        );
    }
    const subAcc = _parse(tokens.slice(1, closingBracketIndex + 1));
    return {
        ast: subAcc.ast,
        nextIndexForParsing: subAcc.nextIndexForParsing,
    };
};

/** In the higher level function, the token right before tokens[0] should be an opening bracket. */
const findMatchingClosingBracketIndex = (tokens: Token[]): number => {
    const bracketStack: BracketOpenToken[] = [];

    for (const token of tokens) {
        if (BracketOpenToken.instanceof(token)) {
            bracketStack.push(token);
            continue;
        }
        if (BracketCloseToken.instanceof(token)) {
            const openBracket = bracketStack.pop();
            if (!openBracket) {
                return token.pos;
            }
        }
    }
    return -1;
};
