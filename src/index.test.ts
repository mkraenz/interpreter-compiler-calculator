import { expect } from "chai";
import { interpret } from ".";

describe("interpret()", () => {
    it("returns 102 for ( 2 + 5 + 3 ) * 10 + 2", () => {
        const input = "( 2 + 5 + 3 ) * 10 + 2";

        const result = interpret(input);

        expect(result).to.equal(102);
    });

    it("returns 22 for ( 2 ) * 10 + 2", () => {
        const input = "( 2 ) * 10 + 2";

        const result = interpret(input);

        expect(result).to.equal(22);
    });

    it("returns 75.7 for ( 2.5 + 3.5 ) * 10 + ( 5 * 3.14 )", () => {
        const input = "( 2.5 + 3.5 ) * 10 + ( 5 * 3.14 )";

        const result = interpret(input);

        expect(result).to.equal(75.7);
    });
});
