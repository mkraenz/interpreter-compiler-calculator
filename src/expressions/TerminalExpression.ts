import { IExpression } from "./IExpression";

export class TerminalExpression implements IExpression {
    public static of(value: number) {
        return new TerminalExpression(value);
    }

    constructor(private value: number) {}

    public interpret() {
        return this.value;
    }
}
