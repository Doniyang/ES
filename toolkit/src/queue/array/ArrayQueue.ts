import Queue from "../Queue";

export default class ArrayQueue<K> implements Queue<K>{
    private items: Array<K>;

    constructor() {
        this.items = new Array(0);
    }

    push(item: K): void {
        this.items.push(item);
    }
    pop(): K {
        return this.items.shift() as K;
    }
    size(): number {
        return this.items.length;
    }
    clear(): void {
        this.items = [];
    }
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    getFront(): K {
        return this.items[0];
    }
    getRear(): K {
        let len = this.items.length;
        return this.items[len - 1];
    }
} 