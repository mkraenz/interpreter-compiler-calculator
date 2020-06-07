import { flow } from "fp-ts/lib/function";
import { parse } from "./parse";
import { Tokenizer } from "./tokens/Tokenizer";

export const interpret = flow(Tokenizer.read, parse, x => x.interpret());

const main = () => {
    const input = "1 + 55564 + 1235 * 2";
    const tokens = Tokenizer.read(input);
    const ast = parse(tokens);
    const result = ast.interpret();
    // tslint:disable-next-line: no-console
    console.log(result);
};
