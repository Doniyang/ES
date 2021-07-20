/**
 * @class Animation
 * @classdesc scroll by animation
 * @author niyang
 */
import { requestAnimationFrame, cancelAnimationFrame, Circular } from "@niyang-es/toolkit";
import { DateKit } from "../../shared";
import Roll from "../Roll";
export default class Animation extends Roll {
    /**
     * @constructor
     * @param scope
     * @param roll
     * @param notify
     */
    constructor(scope, vialog, notify) {
        super(scope, vialog);
        this.rafId = 0;
        this.rafTime = 0;
        this.notify = notify;
    }
    /**
     * @method getRafTime
     * @description get raf time
     */
    getRafTime() {
        return this.rafTime;
    }
    /**
     * @method setRafTime
     * @param tm
     * @description set requestAnimationFrame time
     */
    setRafTime(tm) {
        this.rafTime = tm;
    }
    /**
     * @method isPrending
     * @description roll is in animation
     */
    isPrending() {
        return this.getState() === 1;
    }
    /**
     * @method isRealtime
     * @description roll trigger scroll realtime
     */
    isRealtime() {
        return this.getScope().getProbe() === 3;
    }
    /**
     * @method isTimeout
     * @param now
     * @param duration
     * @description animation is over
     */
    isTimeout(now, duration) {
        return now >= duration;
    }
    /**
     * @method finish
     * @param pos
     * @description finish roll
     */
    finish(pos) {
        if (this.isRealtime()) {
            this.notify.trigger('scroll', pos);
        }
        this.notify.trigger('scroll:end', pos);
    }
    /**
     * @method stopAnimationFrame
     * @description sop animation
     */
    stopAnimationFrame() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
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
    animationFrameStep(start, dest, duration, startTime, algorithm) {
        let destTime = startTime + duration, now = this.getRafTime(), newX, newY, easing;
        const that = this;
        if (this.isTimeout(now, destTime)) {
            this.translate(dest.x, dest.y);
            this.stopAnimationFrame();
            this.rafId = 0;
            this.finish(dest);
            return void (0);
        }
        now = (now - startTime) / duration;
        easing = algorithm(now);
        newX = (dest.x - start.x) * easing + start.x;
        newY = (dest.y - start.y) * easing + start.y;
        this.translate(newX, newY);
        if (this.isRealtime()) {
            this.notify.trigger('scroll', { x: newX, y: newY });
        }
        if (this.isPrending()) {
            this.animate(function (tm) {
                that.setRafTime(tm);
                that.animationFrameStep(start, dest, duration, startTime, algorithm);
            });
        }
    }
    /**
     * @method animate
     * @param callback
     */
    animate(callback) {
        this.rafId = requestAnimationFrame(callback);
    }
    /**
     * @method scrollTo
     * @param x
     * @param y
     * @param time
     * @param easing
     * @description scroll to some point
     */
    scrollTo(x, y, time, easing) {
        let now = DateKit.now();
        let position = this.getPosition();
        this.setState(1);
        this.setRafTime(now);
        this.animationFrameStep(position, { x, y }, time, now, easing);
    }
    /**
     * @method stop
     * @description roll is over
     */
    stop() {
        this.setState(0);
        this.stopAnimationFrame();
    }
    /**
     * @method getAnimation
     */
    getAnimation() {
        return (new Circular()).algorithm;
    }
}
