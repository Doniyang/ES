/**
 * 该类使用动画实现滚动效果
 */
import RollDigitalizer from "../RollDigitalizer";
import Animation from "./Animation";
import Scope from "../scope/Scope";
import Notify from "../notify/Notify";

export default class AnimationRoll implements RollDigitalizer {
    readonly mode: number
    private scope: Scope;
    private raftime: number;
    private notify: null | Notify
    private algorithm: AnimationKit.Algorithm;
    private animation: Animation;
    constructor(scope: Scope, algorithm: AnimationKit.Algorithm) {
        this.animation = new Animation();
        this.scope = scope;
        this.raftime = 0;
        this.algorithm = algorithm;
        this.mode = 3;
        this.notify = null
    }


    private isInAnimation() {
        return this.animation.getState() === 2
    }

    private isTimeOut(now: number, duration: number) {
        return now >= duration
    }

    private animationFrame(start: ScrollKit.Point, dest: ScrollKit.Point, duration: number, startTime: number) {
        let destTime = startTime + duration, now = Date.now(), newX, newY, easing;
        const that = this

        if (this.isTimeOut(now, destTime)) {
            this.translate(dest.x, dest.y);
            this.animation.cleanRafId();
            this.raftime = 0
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
        return this.mode === 1
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

    getDeceleration():number{
        return this.scope.getDeceleration();
    }

    getMaxScroll(): ScrollKit.Point {
        return { x: this.scope.getMaxScrollWidth(), y: this.scope.getMaxScrollHeight() };
    }

    getComputedPosition(): ScrollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(this.getScrollElement(), null);
        let x = 0, y = 0;
        x = +marix.getPropertyValue('left').replace(/[^-\d.]/g, '');
        y = +marix.getPropertyValue('top').replace(/[^-\d.]/g, '');
        return { x, y };
    }

    getState(): number {
        return this.animation.getState();
    }

    setAnimation(algorithm: AnimationKit.Algorithm) {
        this.algorithm = algorithm
    }

    setState(state: number): void {
        this.animation.setState(state);
    }

    translate(x: number, y: number): void {
        let scrollStyle: CSSStyleDeclaration = this.getScrollStyle();
        scrollStyle.setProperty('top', Math.round(y) + 'px');
        scrollStyle.setProperty('left', Math.round(x) + 'px');
        this.scope.setAxis(x, y);
    }
    scrollTo(x: number, y: number, time: number): void {
        let now = Date.now();
        let position = this.scope.position();
        const that = this;

        this.animation.animate(function (tm) {
            that.raftime = tm
            that.animationFrame(position, { x, y }, time, now);
        })
    }
}