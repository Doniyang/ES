import Attribute from "./attribute/Attribute";
import EventDigitalizer from "./EventDigitalizer";
import RollProxy from "./RollProxy";

export default class Context {
    private attrs: Attribute;
    private context: null | EventDigitalizer;
    private proxy: RollProxy;
    constructor() {
        this.attrs = new Attribute();
        this.context = null;
        this.proxy = new RollProxy();
    }

    setContext(c: ({ new(): EventDigitalizer; })): void {
        this.context = new c()
    }

    execute(e: Event) {
        if ((this.context as EventDigitalizer).attainState(this.attrs.getState())) {
            (this.context as EventDigitalizer).execute(e, this.attrs, this.proxy)
        }
    }
}