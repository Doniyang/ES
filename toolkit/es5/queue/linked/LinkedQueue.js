import Node from './Node';
export default class LinkedQueue {
    constructor() {
        this.length = 0;
        this.front = null;
        this.rear = null;
    }
    push(item) {
        let node = new Node(item), cache;
        if (this.isEmpty()) {
            this.front = node;
        }
        else {
            cache = this.rear;
            cache === null || cache === void 0 ? void 0 : cache.setNextNode(node);
        }
        this.rear = node;
        this.length += 1;
    }
    pop() {
        let cache = this.front;
        if (cache.hasNextNode()) {
            this.front = cache.getNextNode();
        }
        this.length -= 1;
        return cache.item;
    }
    size() {
        return this.length;
    }
    clear() {
        this.front = null;
        this.rear = null;
        this.length = 0;
    }
    isEmpty() {
        return this.length === 0;
    }
    getFront() {
        var _a;
        return (_a = this.front) === null || _a === void 0 ? void 0 : _a.item;
    }
    getRear() {
        var _a;
        return (_a = this.rear) === null || _a === void 0 ? void 0 : _a.item;
    }
}
