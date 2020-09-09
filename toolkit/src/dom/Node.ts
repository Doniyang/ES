export default class Node {
    private static vdom: null | HTMLDivElement;
    public static getVDom(): HTMLDivElement {
        if (this.vdom === null) {
            this.vdom = document.createElement('div')
        }
        return this.vdom as HTMLDivElement
    }
} 