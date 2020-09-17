import Attribute from "./attribute/Attribute";
import EventDigitalizer from "./EventDigitalizer";
import RollProxy from "./RollProxy";

export default class Context {
    private attrs: Attribute;
    private context: null | EventDigitalizer;
    private proxy: RollProxy;
    private cache: ScrollKit.Cache<EventDigitalizer>
    constructor(proxy:RollProxy) {
        this.attrs = new Attribute();
        this.context = null;
        this.proxy = proxy;
        this.cache = {};
    }

    private isPropInCache(cache: ScrollKit.Cache<EventDigitalizer>, key: string): boolean {
        return Object.prototype.hasOwnProperty.call(cache, key)
    }

    setStart(x: number, y: number) {
        this.attrs.setStart(x, y)
    }

    setState(state: number) {
        this.attrs.setState(state)
    }

    setMode(m: number) {
        this.attrs.setMode(m)
    }

    setContext(key: string, context: ({ new(): EventDigitalizer; })): void {
        if (this.isPropInCache(this.cache, key)) {
            this.context = this.cache[key]
        } else {
            this.context = this.cache[key] = new context()
        }
    }

    execute(e: Event) {
        if ((this.context as EventDigitalizer).attainState(this.attrs.getState())) {
            (this.context as EventDigitalizer).execute(e, this.attrs, this.proxy)
        }
    }
}