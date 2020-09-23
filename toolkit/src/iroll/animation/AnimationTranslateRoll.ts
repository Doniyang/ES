/**
 * 该类使用动画及tranform实现滚动效果
 * 
 * 
 */

import RollDigitalizer from "../RollDigitalizer";
import Animation from "./Animation";
import PrefixStyle from "../../dom/PrefixStyle";
import Scope from "../scope/Scope";
import Notify from "../notify/Notify";

export default class AnimationTranslateRoll implements RollDigitalizer {
    readonly mode: number;
    private animation: Animation
    private scope: Scope;
    private raftime: number;
    private algorithm: AnimationKit.Algorithm;
    private notify: Notify;
    constructor(scope: Scope, algorithm: AnimationKit.Algorithm, notify: Notify) {
        this.animation = new Animation();
        this.scope = scope;
        this.raftime = 0;
        this.algorithm = algorithm;
        this.mode = 4
        this.notify = notify
    }

    private isInAnimation() {
        return this.animation.getState() === 2
    }

    private isTimeOut(now: number, duration: number) {
        return now >= duration
    }

    private onFinish() {
        if (this.isPeak()) {
            this.notify.trigger('scroll:end', this.getPosition())
        } else {
            this.resetPosition()
        }
    }

    private animationFrame(start: ScrollKit.Point, dest: ScrollKit.Point, duration: number, startTime: number) {
        let destTime = startTime + duration, now = Date.now(), newX, newY, easing;
        const that = this

        if (this.isTimeOut(now, destTime)) {
            this.translate(dest.x, dest.y);
            this.animation.cleanRafId();
            this.onFinish()
            return;
        }

        now = (now - startTime) / duration;
        easing = this.algorithm(now);
        newX = (dest.x - start.x) * easing + start.x;
        newY = (dest.y - start.y) * easing + start.y;
        this.translate(newX, newY);

        if (this.isInAnimation()) {
            this.animation.animate(function (tm) {
                that.raftime = tm
                that.animationFrame(start, dest, duration, startTime);
            })
        }
    }

    private isRapid() {
        return true
    }

    private getScrollElement(): HTMLElement {
        return this.scope.getScrollElement()
    }

    private getScrollStyle(): CSSStyleDeclaration {
        return this.getScrollElement().style;
    }

    private getZonePosition(): ScrollKit.Point {
        let pos = this.getPosition();
        let x = pos.x, y = pos.y;
        //左边
        if (!this.isHScroll() || pos.x > 0) {
            x = 0
        } else if (pos.x < this.scope.getMaxScrollWidth()) {//右边
            x = this.scope.getMaxScrollWidth()
        }
        //上边
        if (!this.isVScroll() || pos.y > 0) {
            y = 0
        } else if (pos.y < this.scope.getMaxScrollHeight()) {//下边
            y = this.scope.getMaxScrollHeight()
        }
        return { x, y }
    }

    isFreeScroll(): boolean {
        return this.scope.isAxisScroll();
    }

    isHScroll(): boolean {
        return this.scope.isLockAxisXScroll();
    }

    isVScroll(): boolean {
        return this.scope.isLockAxisYScroll();
    }

    isHPassthrough(): boolean {
        return this.scope.isAxisXPassthrough()
    }

    isVPassthrough(): boolean {
        return this.scope.isAxisYPassthrough()
    }

    isTransition(): boolean {
        return this.mode === 2
    }

    isResilient(): boolean {
        return this.scope.isBounce()
    }

    isOnRush(): boolean {
        return this.scope.isMomentum()
    }

    isPeak(): boolean {
        let pos = this.getPosition(),
            zone = this.getZonePosition();
        return pos.x === zone.x && pos.y === zone.y
    }

    isClickable(): boolean {
        return this.scope.isClickable();
    }

    isTapable(): boolean {
        return this.scope.isTap();
    }
    stop(): void {
        this.setState(0);
        this.animation.cleanRafId()
    }

    resetPosition(): void {
        let time = this.scope.getBounceTime(),
            pos = this.getZonePosition();
        this.scrollTo(pos.x, pos.y, time)
    }

    getDirectionLockThreshold(): number {
        return this.scope.getThreshold()
    }

    getPosition(): ScrollKit.Point {
        return this.scope.position();
    }

    getSize(): ScrollKit.Point {
        return { x: this.scope.getClientWidth(), y: this.scope.getClientHeight() }
    }

    getDeceleration(): number {
        return this.scope.getDeceleration();
    }

    getMaxScroll(): ScrollKit.Point {
        return { x: this.scope.getMaxScrollWidth(), y: this.scope.getMaxScrollHeight() };
    }

    getComputedPosition(): ScrollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(this.getScrollElement(), null);
        let x = 0, y = 0;
        let transform: string = marix.getPropertyValue(PrefixStyle.style('transform')) || marix.getPropertyValue('transform')
        let matrixs: string[] = transform.split(')')[0].split(', ')
        x = +(matrixs[12] || matrixs[4]);
        y = +(matrixs[13] || matrixs[5]);
        return { x, y };
    }

    getState(): number {
        return this.animation.getState();
    }
    setState(state: number): void {
        this.animation.setState(state);
    }

    setAnimation(algorithm: AnimationKit.Algorithm) {
        this.algorithm = algorithm
    }

    translate(x: number, y: number) {
        let scrollStyle = this.getScrollStyle();
        let transform = PrefixStyle.style('transform');
        let translateZ = this.isRapid() ? 'translateZ(0)' : '';
        scrollStyle.setProperty(transform, `translate(${x}px,${y}px) ${translateZ}`);
        scrollStyle.setProperty('transform', `translate(${x}px,${y}px) ${translateZ}`);
        this.scope.setAxis(x, y);
    }

    scrollTo(x: number, y: number, time: number): void {
        let now = Date.now();
        let position = this.scope.position();
        this.setState(2)
        this.animationFrame(position, { x, y }, time, now);
    }
}