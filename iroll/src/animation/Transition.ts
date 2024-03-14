import { EaseOutQuard, PrefixStyle, requestAnimationFrame, cancelAnimationFrame } from "@niyang-es/toolkit";
import { Probe, State, Status, ToolKit } from "../shared";
import Digitalizer from "./Digitalizer";

export default class Transition implements Digitalizer {
    private readonly scope: Scope
    private readonly transform: Transform
    private readonly notify: Notify
    private rafId: number
    private rollRafId: number
    constructor(scope: Scope, transform: Transform, notify: Notify) {
        this.scope = scope
        this.transform = transform
        this.notify = notify
        this.rafId = 0
        this.rollRafId = 0
    }

    private isRunningRealTime(time: number): boolean {
        return ToolKit.isLessThan(0, time) && this.scope.getProbeType() === Probe.Realtime
    }

    private isInTransition(): boolean {
        return this.scope.getStatus() === Status.Transiting
    }

    private probe() {
        if (this.rollRafId) { cancelAnimationFrame(this.rollRafId) }
        const that = this
        this.rollRafId = requestAnimationFrame(() => {
            let pos = that.transform.getComputedPosition()
            that.notify.trigger('scroll', pos);
            if (that.isInTransition()) {
                that.probe()
            } else {
                that.scope.setState(State.None)
                that.notify.trigger('scroll:end', pos);
            }
        })
    }

    private translate(x: number, y: number): void {
        this.transform.translate(x, y)
    }

    private duration(time: number = 0) {
        const ruleKey = 'transition-duration'
        const transitionDuration: string = PrefixStyle.style(ruleKey);
        const rollElement = this.scope.getRollElement()
        rollElement.style.setProperty(transitionDuration, time + 'ms')
        rollElement.style.setProperty(ruleKey, time + 'ms')
        if (ToolKit.isBadAndroid() && time === 0) {
            rollElement.style.setProperty(transitionDuration, '0.0001ms')
            rollElement.style.setProperty(ruleKey, '0.0001ms')
            this.rafId = requestAnimationFrame(() => {
                rollElement.style.setProperty(transitionDuration, '0ms')
                rollElement.style.setProperty(ruleKey, '0ms')
            })
        }
    }

    private animate(ease: string) {
        const ruleKey = 'transition-timing-function'
        const transitionTimingFunction = PrefixStyle.style(ruleKey)
        const rollElement = this.scope.getRollElement()
        rollElement.style.setProperty(transitionTimingFunction, ease)
        rollElement.style.setProperty(ruleKey, ease)
    }

    public scrollTo(x: number, y: number, time: number, easing?: RollKit.Animation): void {
        const ease = easing || new EaseOutQuard()
        this.scope.setStatus(Status.Transiting)
        this.duration(time)
        this.animate(ease.style())
        this.translate(x, y)
        if (this.isRunningRealTime(time)) this.probe()
        if (time === 0) {
            this.notify.trigger('scroll', { x: x, y: y })
            if (this.scope.isOutBoundary()) {
                this.refresh()
            } else {
                this.scope.setState(State.None)
                this.notify.trigger('scroll:end', { x: x, y: y })
            }
        }

    }

    public refresh(): void {
        const pos = this.scope.getZeta()
        let newX = Math.min(0, pos.x)
        let newY = Math.min(0, pos.y)
        newX = Math.max(newX, this.scope.getMaxScrollX())
        newY = Math.max(newY, this.scope.getMaxScrollY())
        this.scrollTo(newX, newY, this.scope.getBounceTime(), new EaseOutQuard())
    }
    public stop(): void {
        if (this.isInTransition()) {
            this.scope.setStatus(Status.None)
            if (this.rollRafId) { cancelAnimationFrame(this.rollRafId) }
            const pos = this.transform.getComputedPosition()
            this.translate(pos.x, pos.y)
            this.notify.trigger('scroll:end', pos)
        }

    }

    public destory(): void {
        if (this.rollRafId) { cancelAnimationFrame(this.rollRafId) }
        if (this.rafId) { cancelAnimationFrame(this.rafId) }
    }
}