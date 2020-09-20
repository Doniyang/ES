export default class Node {
    public static instance: null | Node = null;
    constructor() { }
    public create(): HTMLElement {
        return document.createElement('div')
    }
    
    public static getInstance(): Node {
        if (this.instance === null) {
            this.instance = new Node()
        }
        return this.instance
    }
} 