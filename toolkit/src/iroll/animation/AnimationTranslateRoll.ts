/**
 * 该类使用动画及tranform实现滚动效果
 * 
 * 
 */

import RollDigitalizer from "../RollDigitalizer";
import Animation from "./Animation";
import PrefixStyle from "../../dom/PrefixStyle";
import Scope from "../scope/Scope";

export default class AnimationTranslateRoll implements RollDigitalizer {
    readonly mode: number;
    private animation: Animation
    private scope: Scope;
    private raftime: number;
    private algorithm: AnimationKit.Algorithm;
    constructor(scope: Scope, algorithm: AnimationKit.Algorithm) {
        this.animation = new Animation();
        this.scope = scope;
        this.raftime = 0;
        this.algorithm = algorithm;
        this.mode = 4
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
            this.animation.cleanRafId()
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
        return this.HWCompositing && PrefixStyle.has(PrefixStyle.style('perspective'))
    }

    private getScrollElement(): HTMLElement {
        return this.scope.getScrollElement()
    }

    private getScrollStyle(): CSSStyleDeclaration {
        return this.getScrollElement().style;
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

    stop(): void {
        this.setState(0);
        this.animation.cleanRafId()
    }

    getDirectionLockThreshold(): number {
        return this.scope.getThreshold()
    }

    getPosition(): ScrollKit.Point {
        return this.scope.position();
    }

    getMaxScroll(): ScrollKit.Point {
        return { x: this.scope.getMaxScrollWidth(), y: this.scope.getMaxScrollHeight() };
    }

    getComputedPosition(): ScrollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(this.getScrollElement(), null);
        let x = 0, y = 0;
        let matrixs: string[] = marix.getPropertyValue(PrefixStyle.style('transform')).split(')')[0].split(', ')
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