export default class Node {
    constructor(item) {
        this.node = item;
        this.next = null;
    }
    get item() {
        return this.node;
    }
    setNextNode(node) {
        this.next = node;
    }
    getNextNode() {
        return this.next;
    }
    hasNextNode() {
        return this.next !== null;
    }
}
