/**
 * @class Animation
 * @classdesc scroll by animation
 * @author niyang
 */
import {requestAnimationFrame, cancelAnimationFrame, Circular} from "@niyang-es/toolkit";
import Notify from "../../notify/Notify";
import Scope from "../../scope/Scope";
import {DateKit} from "../../shared";
import RollDigitalizer from "../RollDigitalizer";
import Roll from "../Roll";
import Variate from "../Variate";

export default class Animation extends Roll implements RollDigitalizer {
    /**
     * @name rafId
     */
    private rafId: number;
    /**
     * @name rafTime
     * @description the animation dispatch time
     */
    private rafTime: number;
    /**
     * @name notify
     * @description notification
     */
    private notify: Notify;

    /**
     * @constructor
     * @param scope
     * @param roll
     * @param notify
     */
    constructor(scope: Scope, roll: Variate, notify: Notify) {
        super(scope, roll);
        this.rafId = 0
        this.rafTime = 0;
        this.notify = notify;
    }

    /**
     * @method getRafTime
     * @description get raf time
     */
    private getRafTime(): number {
        return this.rafTime;
    }

    /**
     * @method setRafTime
     * @param tm
     * @description set requestAnimationFrame time
     */
    private setRafTime(tm: number): void {
        this.rafTime = tm
    }

    /**
     * @method isPrending
     * @description roll is in animation
     */
    private isPrending(): boolean {
        return this.getState() === 1;
    }

    /**
     * @method isRealtime
     * @description roll trigger scroll realtime
     */
    private isRealtime(): boolean {
        return this.getScope().getProbe() === 3
    }

    /**
     * @method isTimeout
     * @param now
     * @param duration
     * @description animation is over
     */
    private isTimeout(now: number, duration: number) {
        return now >= duration
    }

    /**
     * @method finish
     * @param pos
     * @description finish roll
     */
    private finish(pos: ScrollKit.Point) {
        if (this.isRealtime()) {
            this.notify.trigger('scroll', pos)
        }
        this.notify.trigger('scroll:end', pos)
    }

    /**
     * @method stopAnimationFrame
     * @description sop animation
     */
    private stopAnimationFrame() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId)
        }
    }

    /**
     * @method animationFrameStep
     * @param start
     * @param dest
     * @param duration
     * @param startTime
     * @param algorithm
     */
    private animationFrameStep(start: ScrollKit.Point, dest: ScrollKit.Point, duration: number, startTime: number, algorithm: ScrollKit.Algorithm): void {
        let destTime = startTime + duration, now = this.getRafTime(), newX, newY, easing;
        const that = this

        if (this.isTimeout(now, destTime)) {
            this.translate(dest.x, dest.y);
            this.stopAnimationFrame();
            this.rafId = 0
            this.finish(dest)
            return void (0);
        }

        now = (now - startTime) / duration;
        easing = algorithm(now);
        newX = (dest.x - start.x) * easing + start.x;
        newY = (dest.y - start.y) * easing + start.y;
        this.translate(newX, newY);
        if (this.isRealtime()) {
            this.notify.trigger('scroll', {x: newX, y: newY})
        }
        if (this.isPrending()) {
            this.animate(function (tm) {
                that.setRafTime(tm);
                that.animationFrameStep(start, dest, duration, startTime, algorithm);
            })
        }
    }

    /**
     * @method animate
     * @param callback
     */
    private animate(callback: FrameRequestCallback) {
        this.rafId = requestAnimationFrame(callback)
    }

    /**
     * @method scrollTo
     * @param x
     * @param y
     * @param time
     * @param easing
     * @description scroll to some point
     */
    scrollTo(x: number, y: number, time: number, easing: ScrollKit.Algorithm): void {
        let now = DateKit.now();
        let position = this.getPosition();
        this.setState(1);
        this.setRafTime(now)
        this.animationFrameStep(position, {x, y}, time, now, easing);
    }

    /**
     * @method stop
     * @description roll is over
     */
    stop(): void {
        this.setState(0);
        this.stopAnimationFrame()
    }

    /**
     * @method getAnimation
     */
    getAnimation(): ScrollKit.Algorithm {
        return (new Circular()).algorithm
    }
}
