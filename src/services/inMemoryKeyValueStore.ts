import {IKeyValueStore, IKeyValuePair} from '../interfaces';

export class KeyValueStore implements IKeyValueStore {
    private store: Map<string, IKeyValuePair>;

    constructor() {
        this.store = new Map<string, IKeyValuePair>();
    }

    add(key: string, value: any, ttl?: number) {
        this.store.set(key, {
            value,
            ttl: ttl ? Date.now() + ttl : 0
        });
    }

    get(key: string) {
        const entry = this.store.get(key);
        if (entry && (!entry.ttl || entry.ttl > Date.now())) {
            return entry.value;
        }
        return null;
    }

    delete(key: string) {
        this.store.delete(key);
    }
}
