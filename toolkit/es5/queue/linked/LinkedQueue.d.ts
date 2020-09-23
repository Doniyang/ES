import Queue from "../Queue";
export default class LinkedQueue<T> implements Queue<T> {
    private length;
    private front;
    private rear;
    constructor();
    push(item: T): void;
    pop(): T;
    size(): number;
    clear(): void;
    isEmpty(): boolean;
    getFront(): T;
    getRear(): T;
}
