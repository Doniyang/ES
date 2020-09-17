import RollDigitalizer from "./RollDigitalizer";
import Notifier from "../notify/Notifier";
import ClassicEvent from "../event/ClassicEvent";
import Notify from "./notify/Notify";

export default class RollProxy  implements RollDigitalizer {
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

    trigger(e: string | ClassicEvent, ...args: Array<argsOption>) {
        (this.notify as Notify).trigger(e, args)
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

    stop(): void {
        this.roll?.stop()
        this.trigger('scroll:end', this.getPosition())
    }

    resetPosition(): void {
        this.roll?.resetPosition()
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

    isPeak(): boolean {
        return (this.roll as RollDigitalizer).isPeak();
    }

    isClickable(): boolean {
        return (this.roll as RollDigitalizer).isClickable();
    }

    isTapable(): boolean {
        return (this.roll as RollDigitalizer).isTapable();
    }
}