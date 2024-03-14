import { EaseOutQuard, PrefixStyle, requestAnimationFrame, cancelAnimationFrame } from "@niyang-es/toolkit";
import { ToolKit } from "../shared";
export default class Transition {
    constructor(scope, transform, notify) {
        this.scope = scope;
        this.transform = transform;
        this.notify = notify;
        this.rafId = 0;
        this.rollRafId = 0;
    }
    isRunningRealTime(time) {
        return ToolKit.isLessThan(0, time) && this.scope.getProbeType() === 3;
    }
    isInTransition() {
        return this.scope.getStatus() === 1;
    }
    probe() {
        if (this.rollRafId) {
            cancelAnimationFrame(this.rollRafId);
        }
        const that = this;
        this.rollRafId = requestAnimationFrame(() => {
            let pos = that.transform.getComputedPosition();
            that.notify.trigger('scroll', pos);
            if (that.isInTransition()) {
                that.probe();
            }
            else {
                that.scope.setState(0);
                that.notify.trigger('scroll:end', pos);
            }
        });
    }
    translate(x, y) {
        this.transform.translate(x, y);
    }
    duration(time = 0) {
        const ruleKey = 'transition-duration';
        const transitionDuration = PrefixStyle.style(ruleKey);
        const rollElement = this.scope.getRollElement();
        rollElement.style.setProperty(transitionDuration, time + 'ms');
        rollElement.style.setProperty(ruleKey, time + 'ms');
        if (ToolKit.isBadAndroid() && time === 0) {
            rollElement.style.setProperty(transitionDuration, '0.0001ms');
            rollElement.style.setProperty(ruleKey, '0.0001ms');
            this.rafId = requestAnimationFrame(() => {
                rollElement.style.setProperty(transitionDuration, '0ms');
                rollElement.style.setProperty(ruleKey, '0ms');
            });
        }
    }
    animate(ease) {
        const ruleKey = 'transition-timing-function';
        const transitionTimingFunction = PrefixStyle.style(ruleKey);
        const rollElement = this.scope.getRollElement();
        rollElement.style.setProperty(transitionTimingFunction, ease);
        rollElement.style.setProperty(ruleKey, ease);
    }
    scrollTo(x, y, time, easing) {
        const ease = easing || new EaseOutQuard();
        this.scope.setStatus(1);
        this.duration(time);
        this.animate(ease.style());
        this.translate(x, y);
        if (this.isRunningRealTime(time))
            this.probe();
        if (time === 0) {
            this.notify.trigger('scroll', { x: x, y: y });
            if (this.scope.isOutBoundary()) {
                this.refresh();
            }
            else {
                this.scope.setState(0);
                this.notify.trigger('scroll:end', { x: x, y: y });
            }
        }
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
        if (this.isInTransition()) {
            this.scope.setStatus(0);
            if (this.rollRafId) {
                cancelAnimationFrame(this.rollRafId);
            }
            const pos = this.transform.getComputedPosition();
            this.translate(pos.x, pos.y);
            this.notify.trigger('scroll:end', pos);
        }
    }
    destory() {
        if (this.rollRafId) {
            cancelAnimationFrame(this.rollRafId);
        }
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
    }
}
