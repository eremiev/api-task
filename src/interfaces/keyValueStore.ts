export interface IKeyValueStore {
    /**
     * Adding a key to the store
     * @param key
     * @param value
     * @param ttl
     */
    add(key: string, value: any, ttl?: number): void;

    /**
     * Getting the value for a given key
     * @param key
     */
    get(key: string): any;

    /**
     * Deleting the value stored for a given key
     * @param key
     */
    delete(key: string): void;
}