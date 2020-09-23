import Queue from "../Queue";
export default class ArrayQueue<K> implements Queue<K> {
    private items;
    constructor();
    push(item: K): void;
    pop(): K;
    size(): number;
    clear(): void;
    isEmpty(): boolean;
    getFront(): K;
    getRear(): K;
}
