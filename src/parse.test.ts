import { expect } from "chai";
import { flow } from "fp-ts/lib/function";
import { PlusExpression } from "./expressions/PlusExpression";
import { TerminalExpression } from "./expressions/TerminalExpression";
import { TimesExpression } from "./expressions/TimesExpression";
import { parse } from "./parse";
import { Tokenizer } from "./tokens/Tokenizer";

const tokenizeAndParse = flow(Tokenizer.read, parse);
describe("tokenize and parse", () => {
    it("works for 5 + 3", () => {
        const input = "5 + 3";

        const result = tokenizeAndParse(input);

        expect(result).to.deep.equal(
            PlusExpression.of(
                TerminalExpression.of(5),
                TerminalExpression.of(3)
            )
        );
    });

    it("works for 5 + 3 + 1", () => {
        const input = "5 + 3 + 1";

        const result = tokenizeAndParse(input);

        expect(result).to.deep.equal(
            PlusExpression.of(
                PlusExpression.of(
                    TerminalExpression.of(5),
                    TerminalExpression.of(3)
                ),
                TerminalExpression.of(1)
            )
        );
    });

    it("works for 4 * 5 + 3", () => {
        const input = "4 * 5 + 3";

        const result = tokenizeAndParse(input);

        expect(result).to.deep.equal(
            PlusExpression.of(
                TimesExpression.of(
                    TerminalExpression.of(4),
                    TerminalExpression.of(5)
                ),
                TerminalExpression.of(3)
            )
        );
    });

    it("works for 4 * 5 + 3 * 8", () => {
        const input = "4 * 5 + 3 * 8";

        const result = tokenizeAndParse(input);

        expect(result).to.deep.equal(
            TimesExpression.of(
                PlusExpression.of(
                    TimesExpression.of(
                        TerminalExpression.of(4),
                        TerminalExpression.of(5)
                    ),
                    TerminalExpression.of(3)
                ),
                TerminalExpression.of(8)
            )
        );
    });

    it("works for ( 4 * 5 )", () => {
        const input = "( 4 * 5 )";

        const result = tokenizeAndParse(input);

        expect(result).to.deep.equal(
            TimesExpression.of(
                TerminalExpression.of(4),
                TerminalExpression.of(5)
            )
        );
    });

    it("works for ( 4 * 5 ) + 3", () => {
        const input = "( 4 * 5 ) + 3";

        const result = tokenizeAndParse(input);

        expect(result).to.deep.equal(
            PlusExpression.of(
                TimesExpression.of(
                    TerminalExpression.of(4),
                    TerminalExpression.of(5)
                ),
                TerminalExpression.of(3)
            )
        );
    });

    it("works for ( 4 * 5 ) + ( 2 * 3 )", () => {
        const input = "( 4 * 5 ) + ( 2 * 3 )";

        const result = tokenizeAndParse(input);

        expect(result).to.deep.equal(
            PlusExpression.of(
                TimesExpression.of(
                    TerminalExpression.of(4),
                    TerminalExpression.of(5)
                ),
                TimesExpression.of(
                    TerminalExpression.of(2),
                    TerminalExpression.of(3)
                )
            )
        );
    });

    it("works for ( 4 * 5 ) + ( ( 2 * 3 ) * 7 ) ", () => {
        const input = "( 4 * 5 ) + ( ( 2 * 3 ) * 7 )";

        const result = tokenizeAndParse(input);

        expect(result).to.deep.equal(
            PlusExpression.of(
                TimesExpression.of(
                    TerminalExpression.of(4),
                    TerminalExpression.of(5)
                ),
                TimesExpression.of(
                    TimesExpression.of(
                        TerminalExpression.of(2),
                        TerminalExpression.of(3)
                    ),
                    TerminalExpression.of(7)
                )
            )
        );
    });
});
