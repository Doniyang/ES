import RollDigitalizer from "./RollDigitalizer";
import Notifier from "../notify/Notifier";
import ClassicEvent from "../event/ClassicEvent";

export default class RollProxy implements RollDigitalizer {
    private roll: null | RollDigitalizer;

    private notify: Notifier

    constructor() {
        this.roll = null;
        this.notify = new Notifier()
    }
    build(roll: RollDigitalizer): void {
        this.roll = roll
    }

    on(evt: string, fn: Callbackable<ClassicEvent>) {
        this.notify.on(evt, fn)
    }

    off(evt: string, fn?: Callbackable<ClassicEvent>) {
        this.notify.off(evt, fn)
    }

    trigger(e: string | ClassicEvent, ...args: Array<argsOption>) {
        this.notify.notify(e, args)
    }

    scrollTo(x: number, y: number, time: number): void {
        this.roll?.scrollTo(x, y, time);
    }
    translate(x: number, y: number): void {
        this.roll?.translate(x, y);
    }
    getState(): number {
        return (this.roll as RollDigitalizer).getState();
    }
    setState(state: number): void {
        this.roll?.setState(state);
    }
}