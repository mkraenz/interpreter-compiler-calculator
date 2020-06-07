import { IExpression } from "./IExpression";

export class EmptyExpression implements IExpression {
    public static instanceof(x: unknown): x is EmptyExpression {
        return x instanceof EmptyExpression;
    }

    public static of() {
        return new EmptyExpression();
    }

    public interpret(): number {
        throw new Error("Cannot interpret the EmptyExpression");
    }
}
