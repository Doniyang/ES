export default class Node<T>{
    private node: T;
    private next: null | Node<T>;
    constructor(item: T) {
        this.node = item;
        this.next = null
    }

    get item(): T {
        return this.node;
    }

    setNextNode(node: Node<T>) {
        this.next = node
    }
    getNextNode(): Node<T> {
        return this.next as Node<T>;
    }
    hasNextNode(): boolean {
        return this.next !== null;
    }

}