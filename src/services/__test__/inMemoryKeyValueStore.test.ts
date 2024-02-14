import {KeyValueStore} from '../inMemoryKeyValueStore';

describe('KeyValueStore', () => {
    let store: KeyValueStore;

    beforeEach(() => {
        store = new KeyValueStore();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('should add a key-value pair to the store', () => {
        const value = 'value';
        const key = 'key';
        store.add(key, value);
        expect(store.get(key)).toEqual(value);
    });

    it('should add a key-value pair with TTL to the store', () => {
        const value = 'value';
        const key = 'key';
        const ttl = 500;
        store.add(key, value, ttl);
        expect(store.get(key)).toEqual(value);
    });

    it('should return empty value for not existing key from the store', () => {
        const key = 'empty';
        expect(store.get(key)).toEqual(null);
    });

    it('should return existing value from the store with TTL', () => {
        jest.useFakeTimers();
        const value = 'value';
        const key = 'key';
        const ttl = 500;
        store.add(key, value, ttl);
        expect(store.get(key)).toEqual(value);
    });

    it('should return empty value from the store with expired TTL', () => {
        jest.useFakeTimers();
        const value = 'value';
        const key = 'key';
        const ttl = 500;
        store.add(key, value, ttl);
        expect(store.get(key)).toEqual(value);
        jest.advanceTimersByTime(ttl);
        expect(store.get(key)).toEqual(null);
    });

    it('should delete a key-value pair from the store', () => {
        const value = 'delete';
        const key = 'key';
        store.add(key, value);
        store.delete(key);
        expect(store.get(key)).toEqual(null);
    });

    it('should cover task example requests', () => {
        jest.useFakeTimers();
        store.add('name', 'John');
        expect(store.get('name')).toEqual('John');
        expect(store.get('age')).toEqual(null);
        store.add('name', 'Larry', 30000);
        
        jest.advanceTimersByTime(15000);
        expect(store.get('name')).toEqual('Larry');
        jest.advanceTimersByTime(20000);
        expect(store.get('name')).toEqual(null);
    });

});