import { IExpression } from "./expressions/IExpression";
import { PlusExpression } from "./expressions/PlusExpression";
import { TerminalExpression } from "./expressions/TerminalExpression";
import { TimesExpression } from "./expressions/TimesExpression";

const operators = ["+", "*"];

export function parse(s: string) {
    const leafs = s.split(" ");
    let ast: IExpression; // left expression
    const operatorStack: string[] = []; // operator
    leafs.forEach((leaf, i) => {
        if (i === 0) {
            const initialLeaf = Number(leaf);
            if (Number.isNaN(initialLeaf)) {
                throw new Error(`ParserError at position ${i}`);
            }
            ast = TerminalExpression.of(initialLeaf);
            return;
        }

        if (operators.includes(leaf)) {
            operatorStack.push(leaf);
        }

        if (isNumber(leaf)) {
            const val = Number(leaf);
            if (operatorStack.length === 0) {
                throw new Error(
                    `ParserError at position ${i}. Expected an operator but found a number`
                );
            }
            const operator = operatorStack.pop();
            if (operator === "+") {
                ast = PlusExpression.of(ast, TerminalExpression.of(val));
            }
            if (operator === "*") {
                ast = TimesExpression.of(ast, TerminalExpression.of(val));
            }
        }
    });
    if (ast!) {
        return ast!;
    }
    throw new Error("ParserError. Missing input string");
}

const isNumber = (x: unknown): x is number => !Number.isNaN(Number(x));
