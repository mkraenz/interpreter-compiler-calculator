import * as assert from "assert";
import { EmptyExpression } from "./expressions/EmptyExpression";
import { PlusExpression } from "./expressions/PlusExpression";
import { TerminalExpression } from "./expressions/TerminalExpression";
import { TimesExpression } from "./expressions/TimesExpression";
import { BracketCloseToken } from "./tokens/BracketCloseToken";
import { BracketOpenToken } from "./tokens/BracketOpenToken";
import { NumberToken } from "./tokens/NumberToken";
import { PlusToken } from "./tokens/PlusToken";
import { TimesToken } from "./tokens/TimesToken";
import { Token } from "./tokens/Token";

type OperatorToken = PlusToken | TimesToken;
const isOperator = (x: Token): x is OperatorToken =>
    PlusToken.instanceof(x) || TimesToken.instanceof(x);

export function parse(tokens: Token[]) {
    const operatorStack: OperatorToken[] = [];
    const bracketOpenStack: BracketOpenToken[] = [];
    const AST = tokens.reduce((ast, token) => {
        if (token.pos === 0) {
            assert(NumberToken.instanceof(token));
            return TerminalExpression.of(token.value);
        }

        if (NumberToken.instanceof(token)) {
            const val = token.value;
            const operator = operatorStack.pop();
            if (!operator) {
                throw new Error(
                    `ParserError at position ${token.pos}. Expected an operator but found a number`
                );
            }
            if (PlusToken.instanceof(operator)) {
                return PlusExpression.of(ast, TerminalExpression.of(val));
            } else if (TimesToken.instanceof(operator)) {
                return TimesExpression.of(ast, TerminalExpression.of(val));
            }
        }

        if (isOperator(token)) {
            operatorStack.push(token);
            return ast;
        }
        if (BracketOpenToken.instanceof(token)) {
            bracketOpenStack.push(token);
            const closingBracketIndex = findMatchingClosingBracketIndex(
                tokens.slice(token.pos + 1)
            );
            if (closingBracketIndex === -1) {
                throw new Error(
                    `ParserError at position ${token.pos}: Could not find matching closing bracket.`
                );
            }
            const subTree = parse(
                tokens.slice(token.pos + 1, closingBracketIndex)
            );
        }
        throw new Error(
            `ParseError at position ${token.pos}: Unknown character`
        );
    }, EmptyExpression.of());
    if (AST!) {
        return AST!;
    }
    throw new Error("ParserError. Missing input string");
}

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
