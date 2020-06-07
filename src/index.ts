import { flow } from "fp-ts/lib/function";
import { parse } from "./parse";
import { Tokenizer } from "./tokens/Tokenizer";

export const interpret = flow(Tokenizer.read, parse, x => x.interpret());
