export interface IStack {
    /**
     * Add an item to the stack
     * @param item
     */
    push(item: any): void;

    /**
     * Return the top item of the stack.
     * Should also remove that item from the top of the stack
     */
    pop(): any;

    /**
     * Return the top item of the stack. Without removing it.
     */
    peek(): any;

    /**
     * Return the size of the stack
     */
    size(): number;
}