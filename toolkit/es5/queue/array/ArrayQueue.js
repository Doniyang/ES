export default class ArrayQueue {
    constructor() {
        this.items = new Array(0);
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.shift();
    }
    size() {
        return this.items.length;
    }
    clear() {
        this.items = [];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    getFront() {
        return this.items[0];
    }
    getRear() {
        let len = this.items.length;
        return this.items[len - 1];
    }
}
