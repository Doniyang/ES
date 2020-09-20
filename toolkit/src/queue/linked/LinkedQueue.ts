import Queue from "../Queue";
import Node from './Node'
export default class LinkedQueue<T> implements Queue<T>{
    private length: number;
    private front: null | Node<T>;
    private rear: null | Node<T>;
    constructor() {
        this.length = 0;
        this.front = null;
        this.rear = null;
    }

    push(item: T): void {
        let node: Node<T> = new Node<T>(item), cache;
        if (this.isEmpty()) {
            this.front = node
        } else {
            cache = this.rear;
            cache?.setNextNode(node)
        }
        this.rear = node;
        this.length += 1
    }
    pop(): T {
        let cache: Node<T> = this.front as Node<T>;
        if (cache.hasNextNode()) {
            this.front = cache.getNextNode()
        }
        this.length -= 1
        return cache.item;
    }
    size(): number {
        return this.length;
    }
    clear(): void {
        this.front = null;
        this.rear = null;
        this.length = 0;
    }
    isEmpty(): boolean {
        return this.length === 0;
    }
    getFront(): T {
        return this.front?.item as T;
    }
    getRear(): T {
        return this.rear?.item as T;
    }

}