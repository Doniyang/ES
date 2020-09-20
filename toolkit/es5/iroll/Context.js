import LinkedQueue from "../queue/linked/LinkedQueue";
import Attribute from "./attribute/Attribute";
export default class Context {
    constructor(proxy) {
        this.attrs = new Attribute();
        this.context = new LinkedQueue();
        this.proxy = proxy;
    }
    setStart(x, y) {
        this.attrs.setStart(x, y);
    }
    getStartX() {
        return this.attrs.getStartX();
    }
    getStartY() {
        return this.attrs.getStartY();
    }
    setState(state) {
        this.attrs.setState(state);
    }
    setMode(m) {
        this.attrs.setMode(m);
    }
    setContext(Digitalizer) {
        this.context.push(new Digitalizer());
    }
    execute(e) {
        if (!this.context.isEmpty()) {
            const digitalizer = this.context.pop();
            digitalizer.execute(e, this.attrs, this.proxy);
        }
    }
}
