export default class Node<T> {
    private node;
    private next;
    constructor(item: T);
    get item(): T;
    setNextNode(node: Node<T>): void;
    getNextNode(): Node<T>;
    hasNextNode(): boolean;
}
