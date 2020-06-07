import { BracketCloseToken } from "./BracketCloseToken";
import { BracketOpenToken } from "./BracketOpenToken";
import { DividedToken } from "./DividedToken";
import { MinusToken } from "./MinusToken";
import { NumberToken } from "./NumberToken";
import { PlusToken } from "./PlusToken";
import { TimesToken } from "./TimesToken";

export type Token =
    | NumberToken
    | PlusToken
    | MinusToken
    | TimesToken
    | DividedToken
    | BracketOpenToken
    | BracketCloseToken;
