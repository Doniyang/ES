
import { ClassicEvent } from "@niyang-es/notify";
import Notify from "../notify/Notify";
import Designor from "./Designor";

export default class RollProxy implements Designor {
    private roll: null | Designor;
    private notify: Notify;
    constructor(notify: Notify) {
        this.roll = null
        this.notify = notify
    }
    

    get disabled(): boolean {
        return this.roll === null
    }

    build(roll: Designor): void {
        this.roll = roll
    }

    trigger(e: string | ClassicEvent, ...args: Array<ScrollKit.NotifyParams>) {
        (this.notify as Notify).trigger(e, args)
    }

    scrollTo(x: number, y: number, time: number): void {
        this.roll?.scrollTo(x, y, time);
    }
    translate(x: number, y: number): void {
        this.roll?.translate(x, y);
    }

    getState(): number {
        return (this.roll as Designor).getState();
    }
    setState(state: number): void {
        this.roll?.setState(state);
    }

    getComputedPosition(): ScrollKit.Point {
        return (this.roll as RollDigitalizer).getComputedPosition()
    }

    getMaxScroll(): ScrollKit.Point {
        return (this.roll as RollDigitalizer).getMaxScroll()
    }

    getPosition(): ScrollKit.Point {
        return (this.roll as Designor).getPosition();
    }

    stop(): void {
        this.roll?.stop()
        this.trigger('scroll:end', this.getPosition())
    }

    resetPosition(): void {
        this.roll?.resetPosition()
    }
    getAnimation(): string | ScrollKit.Algorithm {
       return (this.roll as Designor).getAnimation()
    }
}