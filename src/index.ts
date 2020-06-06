import { parse } from "./parse";

const input = "1 + 55564 + ( 1235 * 546578 ) + 9996 + 38 * 12";
// const tokens = tokenize(input);
const ast = parse(input);
const result = ast.interpret();
// tslint:disable-next-line: no-console
console.log(result);
