import { parse } from "./parse";
import { Tokenizer } from "./tokens/Tokenizer";

const input = "1 + 55564 + 1235 * 2";
const tokens = Tokenizer.tokenize(input);
const ast = parse(tokens);
const result = ast.interpret();
// tslint:disable-next-line: no-console
console.log(result);
