import {IStack} from '../interfaces';

export class InMemoryStack implements IStack {
    private stack: any[] = [];

    push(item: any): void {
        this.stack.push(item);
    }

    pop(): any {
        return this.stack.pop();
    }

    peek(): any {
        return this.stack[this.stack.length - 1];
    }

    size(): number {
        return this.stack.length;
    }
}