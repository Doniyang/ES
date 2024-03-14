import { EaseOutQuard, cancelAnimationFrame, requestAnimationFrame } from "@niyang-es/toolkit";
import { DateKit } from "../shared";
export default class Animation {
    constructor(scope, transform, notify) {
        this.scope = scope;
        this.transform = transform;
        this.notify = notify;
        this.rafId = 0;
    }
    isRunningRealTime() {
        return this.scope.getProbeType() === 3;
    }
    isAnimating() {
        return this.scope.getStatus() === 2;
    }
    translate(x, y) {
        this.transform.translate(x, y);
    }
    animate(options) {
        const { startX, startY, destX, destY, startTime, destTime, duration, ease } = options;
        const now = DateKit.getTime();
        const time = (now - startTime) / duration;
        const easing = ease.algorithm(time);
        let newX = (destX - startX) * easing + startX;
        let newY = (destY - startY) * easing + startY;
        this.translate(newX, newY);
        if (now >= destTime) {
            this.scope.setStatus(0);
            this.translate(destX, destY);
            this.notify.trigger('scroll', { x: destX, y: destY });
            if (this.scope.isOutBoundary()) {
                this.refresh();
            }
            else {
                this.notify.trigger('scroll:end', this.scope.getZeta());
            }
        }
        else {
            const that = this;
            if (this.rafId)
                cancelAnimationFrame(this.rafId);
            this.rafId = requestAnimationFrame(() => {
                that.animate(options);
            });
            if (this.isRunningRealTime()) {
                this.notify.trigger('scroll', { x: newX, y: newY });
            }
        }
    }
    scrollTo(x, y, duration, easing) {
        const pos = this.scope.getZeta();
        const ease = easing || new EaseOutQuard();
        const startTime = DateKit.getTime();
        const destTime = startTime + duration;
        this.scope.setStatus(2);
        this.animate({ startX: pos.x, startY: pos.y, duration: duration, startTime: startTime, destTime: destTime, destX: x, destY: y, ease: ease });
    }
    refresh() {
        const pos = this.scope.getZeta();
        let newX = Math.min(0, pos.x);
        let newY = Math.min(0, pos.y);
        newX = Math.max(newX, this.scope.getMaxScrollX());
        newY = Math.max(newY, this.scope.getMaxScrollY());
        this.scrollTo(newX, newY, this.scope.getBounceTime(), new EaseOutQuard());
    }
    stop() {
        if (this.isAnimating()) {
            this.scope.setStatus(0);
            if (this.rafId)
                cancelAnimationFrame(this.rafId);
            this.notify.trigger('scroll:end', this.transform.getComputedPosition());
        }
    }
    destory() {
        if (this.rafId)
            cancelAnimationFrame(this.rafId);
    }
}
