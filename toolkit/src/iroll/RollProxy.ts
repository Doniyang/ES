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


    get disabled(): boolean {
        return this.roll === null
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

    setAnimation(easing: string | AnimationKit.Algorithm): void {
        this.roll?.setAnimation(easing)
    }

    getComputedPosition(): ScrollKit.Point {
        return (this.roll as RollDigitalizer).getComputedPosition()
    }

    getMaxScroll(): ScrollKit.Point {
        return (this.roll as RollDigitalizer).getMaxScroll()
    }

    getPosition(): ScrollKit.Point {
        return (this.roll as RollDigitalizer).getPosition();
    }

    getDirectionLockThreshold(): number {
        return (this.roll as RollDigitalizer).getDirectionLockThreshold();
    }

    stop() {
        this.roll?.stop()
        this.trigger('scroll:end', this.getPosition())
    }

    isFreeScroll(): boolean {
        return (this.roll as RollDigitalizer).isFreeScroll();
    }

    isHScroll(): boolean {
        return (this.roll as RollDigitalizer).isHScroll();
    }

    isVScroll(): boolean {
        return (this.roll as RollDigitalizer).isVScroll();
    }

    isHPassthrough(): boolean {
        return (this.roll as RollDigitalizer).isHPassthrough();
    }

    isVPassthrough(): boolean {
        return (this.roll as RollDigitalizer).isVPassthrough();
    }

    isTransition(): boolean {
        return (this.roll as RollDigitalizer).isTransition();
    }

    isResilient(): boolean {
        return (this.roll as RollDigitalizer).isResilient();
    }
    isOnRush(): boolean {
        return (this.roll as RollDigitalizer).isOnRush();
    }
}