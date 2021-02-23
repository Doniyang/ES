
import { ClassicEvent } from "@niyang-es/notify";
import Scope from "src/scope/Scope";
import Notify from "../notify/Notify";
import RollDigitalizer from "./RollDigitalizer";

export default class RollProxy implements RollDigitalizer {
    private roll: null | RollDigitalizer;
    private notify: Notify;
    constructor(notify: Notify) {
        this.roll = null
        this.notify = notify
    }

    get disabled(): boolean {
        return this.roll === null
    }

    build(roll: RollDigitalizer): void {
        this.roll = roll
    }

    trigger(e: string | ClassicEvent, ...args: Array<ScrollKit.NotifyParams>) {
        (this.notify as Notify).trigger(e, args)
    }

    scrollTo(x: number, y: number, time: number, easing: string | ScrollKit.Algorithm): void {
        this.roll?.scrollTo(x, y, time, easing);
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

    getComputedPosition(): ScrollKit.Point {
        return (this.roll as RollDigitalizer).getComputedPosition()
    }
    getPosition(): ScrollKit.Point {
        return (this.roll as RollDigitalizer).getPosition();
    }

    stop(): void {
        this.roll?.stop()
        this.trigger('scroll:end', this.getPosition())
    }

    resetPosition(): void {
        this.roll?.resetPosition()
    }
    getAnimation(): string | ScrollKit.Algorithm {
        return (this.roll as RollDigitalizer).getAnimation()
    }

    getScope(): Scope {
        return (this.roll as RollDigitalizer).getScope()
    }
}