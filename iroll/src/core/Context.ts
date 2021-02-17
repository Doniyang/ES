import { LinkedQueue } from "@niyang-es/toolkit";
import Attribute from "./attribute/Attribute";
import EventDigitalizer from "./EventDigitalizer";
import RollProxy from "../translate/RollProxy";

export default class Context {
    private attrs: Attribute;
    private context: LinkedQueue<EventDigitalizer>;
    private proxy: RollProxy;
    constructor(proxy: RollProxy) {
        this.attrs = new Attribute();
        this.context = new LinkedQueue<EventDigitalizer>();
        this.proxy = proxy;
    }

    setStart(x: number, y: number) {
        this.attrs.setStart(x, y)
    }

    getStartX(): number {
        return this.attrs.getStartX()
    }

    getStartY(): number {
        return this.attrs.getStartY()
    }

    setState(state: number) {
        this.attrs.setState(state)
    }

    setMode(m: number) {
        this.attrs.setMode(m)
    }

    setContext(Digitalizer: ({ new(): EventDigitalizer; })): void {
        this.context.push(new Digitalizer())
    }

    execute(e: Event) {
        while (!this.context.isEmpty()) {
            const digitalizer: EventDigitalizer = this.context.pop();
            digitalizer.execute(e, this.attrs, this.proxy)
        }
    }
}