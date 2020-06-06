import { expect } from "chai";
import { PlusExpression } from "./PlusExpression";
import { TerminalExpression } from "./TerminalExpression";

describe("PlusExpression", () => {
    it("returns 5 for 3 + 2", () => {
        const ast = PlusExpression.of(
            TerminalExpression.of(3),
            TerminalExpression.of(2)
        );

        const result = ast.interpret();

        expect(result).to.equal(5);
    });

    it("returns 17 for (1 + 2) + (10 + 4)", () => {
        const ast = PlusExpression.of(
            PlusExpression.of(
                TerminalExpression.of(1),
                TerminalExpression.of(2)
            ),
            PlusExpression.of(
                TerminalExpression.of(10),
                TerminalExpression.of(4)
            )
        );

        const result = ast.interpret();

        expect(result).to.equal(17);
    });
});
