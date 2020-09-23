export default class Node {
    static instance: null | Node;
    constructor();
    create(): HTMLElement;
    static getInstance(): Node;
}
