import * as assert from "assert";
import { IExpression } from "./expressions/IExpression";
import { PlusExpression } from "./expressions/PlusExpression";
import { TerminalExpression } from "./expressions/TerminalExpression";
import { TimesExpression } from "./expressions/TimesExpression";
import { NumberToken } from "./tokens/NumberToken";
import { PlusToken } from "./tokens/PlusToken";
import { TimesToken } from "./tokens/TimesToken";
import { Token } from "./tokens/Token";

type OperatorToken = PlusToken | TimesToken;
const isOperator = (x: Token): x is OperatorToken =>
    PlusToken.instanceof(x) || TimesToken.instanceof(x);

const isNumberToken = (x: Token): x is NumberToken => x instanceof NumberToken;

export function parse(tokens: Token[]) {
    let ast: IExpression; // left expression
    const operatorStack: OperatorToken[] = []; // operator
    tokens.forEach((token, i) => {
        if (i === 0) {
            assert(isNumberToken(token));
            ast = TerminalExpression.of(token.value);
            return;
        }

        if (isNumberToken(token)) {
            const val = token.value;
            const operator = operatorStack.pop();
            if (!operator) {
                throw new Error(
                    `ParserError at position ${i}. Expected an operator but found a number`
                );
            }
            if (PlusToken.instanceof(operator)) {
                ast = PlusExpression.of(ast, TerminalExpression.of(val));
            } else if (TimesToken.instanceof(operator)) {
                ast = TimesExpression.of(ast, TerminalExpression.of(val));
            }
        }

        if (isOperator(token)) {
            operatorStack.push(token);
        }
    });
    if (ast!) {
        return ast!;
    }
    throw new Error("ParserError. Missing input string");
}
