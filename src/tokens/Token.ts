import { NumberToken } from "./NumberToken";
import { PlusToken } from "./PlusToken";
import { TimesToken } from "./TimesToken";

export type Token = PlusToken | TimesToken | NumberToken;
