export default class Node {
    constructor() { }
    create() {
        return document.createElement('div');
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new Node();
        }
        return this.instance;
    }
}
Node.instance = null;
