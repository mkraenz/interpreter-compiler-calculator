import { expect } from "chai";
import { PlusExpression } from "./PlusExpression";
import { TerminalExpression } from "./TerminalExpression";
import { TimesExpression } from "./TimesExpression";

describe("Plus and Times Expression", () => {
    it("returns 20 for (3 + 2) * 4", () => {
        const ast = TimesExpression.of(
            PlusExpression.of(
                TerminalExpression.of(3),
                TerminalExpression.of(2)
            ),
            TerminalExpression.of(4)
        );

        const result = ast.interpret();

        expect(result).to.equal(20);
    });

    it("returns 42 for (1 * 2) + (10 * 4)", () => {
        const ast = PlusExpression.of(
            TimesExpression.of(
                TerminalExpression.of(1),
                TerminalExpression.of(2)
            ),
            TimesExpression.of(
                TerminalExpression.of(10),
                TerminalExpression.of(4)
            )
        );

        const result = ast.interpret();

        expect(result).to.equal(42);
    });
});
