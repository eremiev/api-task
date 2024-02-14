import {InMemoryStack} from '../inMemoryStack';

describe('inMemoryStack', () => {
    let stack: InMemoryStack;

    beforeEach(() => {
        stack = new InMemoryStack();
    });

    it('should add an item to the stack', () => {
        let size = stack.size();
        expect(size).toEqual(0);

        const item = 'first item';
        stack.push(item);
        size = stack.size();
        expect(size).toEqual(1);
        expect(stack.peek()).toEqual(item);
    });

    it('should return the top item of the stack', () => {
        const first = 'first item';
        const last = 'last item';
        stack.push(first);
        stack.push(last);
        const topItem = stack.pop();
        expect(topItem).toEqual(last);
    });

    it('should remove the top item from the stack', () => {
        const first = 'first item';
        const last = 'last item';
        stack.push(first);
        stack.push(last);
        const topItem = stack.pop();
        expect(stack.size()).toEqual(1);
    });

    it('should return undefined if is empty stack', () => {
        expect(stack.pop()).toEqual(undefined);
    });

    it('should cover task example requests', () => {
        stack.push('Hello');
        stack.push('World');
        expect(stack.pop()).toEqual('World');
        stack.push('Again');
        expect(stack.pop()).toEqual('Again');
        expect(stack.pop()).toEqual('Hello');
    });
});