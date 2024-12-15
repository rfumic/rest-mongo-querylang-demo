export class Stack {
    constructor() {
        this.stack = [];
    }
    pop() {
        return this.stack.pop();
    }
    push(value) {
        this.stack.push(value);
    }
    peek() {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        }
        return null;
    }
    get first() {
        return this.stack[0];
    }
    get length() {
        return this.stack.length;
    }
}

