import { expect } from "chai";
import { interpret } from ".";

describe("interpret()", () => {
    it("returns 102 for EVERYBODY_NOW 2 Rock! 5 Rock! 3 JUMP! Yeah! 10 Rock! 2", () => {
        const input = "EVERYBODY_NOW 2 Rock! 5 Rock! 3 JUMP! Yeah! 10 Rock! 2";

        const result = interpret(input);

        expect(result).to.equal(102);
    });

    it("returns 22 for EVERYBODY_NOW 2 JUMP! Yeah! 10 Rock! 2", () => {
        const input = "EVERYBODY_NOW 2 JUMP! Yeah! 10 Rock! 2";

        const result = interpret(input);

        expect(result).to.equal(22);
    });

    it("returns 75.7 for EVERYBODY_NOW 2.5 Rock! 3.5 JUMP! Yeah! 10 Rock! EVERYBODY_NOW 5 Yeah! 3.14 JUMP!", () => {
        const input =
            "EVERYBODY_NOW 2.5 Rock! 3.5 JUMP! Yeah! 10 Rock! EVERYBODY_NOW 5 Yeah! 3.14 JUMP!";

        const result = interpret(input);

        expect(result).to.equal(75.7);
    });

    it("returns Shout!3 for 4 Shout! 5 Rock! 4 Shout! EVERYBODY_NOW 3 Yeah! 2 JUMP!", () => {
        const input = "4 Shout! 5 Rock! 4 Shout! EVERYBODY_NOW 3 Yeah! 2 JUMP!";

        const result = interpret(input);

        expect(result).to.equal(-3);
    });

    it("returns 4.8 for 4 Death! 5 Rock! EVERYBODY_NOW 4 Death! EVERYBODY_NOW 3 Shout! 2 JUMP!", () => {
        const input =
            "4 Death! 5 Rock! EVERYBODY_NOW 4 Death! EVERYBODY_NOW 3 Shout! 2 JUMP! JUMP!";

        const result = interpret(input);

        expect(result).to.equal(4.8);
    });
});
