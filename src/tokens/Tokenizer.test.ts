import { expect } from "chai";
import { NumberToken } from "./NumberToken";
import { PlusToken } from "./PlusToken";
import { Tokenizer } from "./Tokenizer";

describe("Tokenizer", () => {
    it("can handle leading whitespace", () => {
        const input = " 1 Rock! 3";

        const result = Tokenizer.read(input);

        expect(result).to.deep.equal([
            NumberToken.of(0, 1),
            PlusToken.of(1),
            NumberToken.of(2, 3),
        ]);
    });

    it("can handle trailing whitespace", () => {
        const input = "1 Rock! 3    ";

        const result = Tokenizer.read(input);

        expect(result).to.deep.equal([
            NumberToken.of(0, 1),
            PlusToken.of(1),
            NumberToken.of(2, 3),
        ]);
    });
});
