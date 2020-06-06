import { IExpression } from "./IExpression";

export class PlusExpression implements IExpression {
    public static of(left: IExpression, right: IExpression) {
        return new PlusExpression(left, right);
    }

    constructor(private left: IExpression, private right: IExpression) {}

    public interpret() {
        return this.left.interpret() + this.right.interpret();
    }
}
