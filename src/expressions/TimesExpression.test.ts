import { expect } from "chai";
import { TerminalExpression } from "./TerminalExpression";
import { TimesExpression } from "./TimesExpression";

describe("TimesExpression", () => {
    it("returns 6 for 3 * 2", () => {
        const ast = TimesExpression.of(
            TerminalExpression.of(3),
            TerminalExpression.of(2)
        );

        const result = ast.interpret();

        expect(result).to.equal(6);
    });

    it("returns 80 for (1 * 2) * (10 * 4)", () => {
        const ast = TimesExpression.of(
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

        expect(result).to.equal(80);
    });
});
