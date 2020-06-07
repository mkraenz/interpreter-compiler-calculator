import { BracketCloseToken } from "./BracketCloseToken";
import { BracketOpenToken } from "./BracketOpenToken";
import { NumberToken } from "./NumberToken";
import { PlusToken } from "./PlusToken";
import { TimesToken } from "./TimesToken";

export type Token =
    | PlusToken
    | TimesToken
    | NumberToken
    | BracketOpenToken
    | BracketCloseToken;
