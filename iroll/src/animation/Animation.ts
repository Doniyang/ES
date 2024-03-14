import { EaseOutQuard, cancelAnimationFrame, requestAnimationFrame } from "@niyang-es/toolkit";
import Digitalizer from "./Digitalizer";
import { DateKit, Probe, Status } from "../shared";
/**
 * @classdesc animate with JS
 * @author Niyang
 */
export default class Animation implements Digitalizer {

  private readonly scope: Scope;

  private readonly transform: Transform

  private readonly notify: Notify

  private rafId: number

  constructor(scope: Scope, transform: Transform, notify: Notify) {
    this.scope = scope
    this.transform = transform
    this.notify = notify
    this.rafId = 0
  }

  private isRunningRealTime(): boolean {
    return this.scope.getProbeType() === Probe.Realtime
  }

  private isAnimating(): boolean {
    return this.scope.getStatus() === Status.Aninating
  }

  private translate(x: number, y: number): void {
    this.transform.translate(x, y)
  }

  private animate(options: RollKit.AnimationOptions) {
    const { startX, startY, destX, destY, startTime, destTime, duration, ease } = options

    const now = DateKit.getTime()
    const time = (now - startTime) / duration;
    const easing = ease.algorithm(time)
    let newX = (destX - startX) * easing + startX
    let newY = (destY - startY) * easing + startY

    this.translate(newX, newY)

    if (now >= destTime) {
      this.scope.setStatus(Status.None)
      this.translate(destX, destY);
      this.notify.trigger('scroll', { x: destX, y: destY })

      if (this.scope.isOutBoundary()) {
        this.refresh()
      } else {
        this.notify.trigger('scroll:end', this.scope.getZeta())
      }
    } else {
      const that = this
      if (this.rafId) cancelAnimationFrame(this.rafId)
      this.rafId = requestAnimationFrame(() => {
        that.animate(options)
      })
      if (this.isRunningRealTime()) {
        this.notify.trigger('scroll', { x: newX, y: newY })
      }
    }
  }

  public scrollTo(x: number, y: number, duration: number, easing?: RollKit.Animation): void {
    const pos = this.scope.getZeta()
    const ease = easing || new EaseOutQuard()
    const startTime = DateKit.getTime()
    const destTime = startTime + duration
    this.scope.setStatus(Status.Aninating)
    this.animate({ startX: pos.x, startY: pos.y, duration: duration, startTime: startTime, destTime: destTime, destX: x, destY: y, ease: ease })
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
    if(this.isAnimating()){
      this.scope.setStatus(Status.None)
      if (this.rafId) cancelAnimationFrame(this.rafId)
      this.notify.trigger('scroll:end', this.transform.getComputedPosition())  
    }
  }

  public destory(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId)
  }
}

