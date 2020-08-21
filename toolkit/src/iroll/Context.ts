import Attribute from "./Attribute";
import Rollable from "./Rollable";
import Digitalizer from "./Digitalizer";

export default class Context {
    private attrs: Attribute;
    private context: null | Rollable;
    private proxy: Digitalizer;
    constructor(proxy: Digitalizer) {
        this.attrs = new Attribute();
        this.context = null;
        this.proxy = proxy;
    }

    setContext(c: ({ new(): Rollable; })): void {
        this.context = new c()
    }
    execute(e: Event) {
        if ((this.context as Rollable).attainState(this.attrs.getState())) {
            (this.context as Rollable).execute(e, this.attrs, this.proxy)
        }
    }
}